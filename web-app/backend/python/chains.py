import os
import sys
import json
import logging

# Configure logging first
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# Try to import required packages with error handling
try:
    from langchain_groq import ChatGroq
    print("✅ langchain_groq imported successfully", file=sys.stderr)
except ImportError as e:
    error_msg = {
        "success": False, 
        "error": f"Import error: No module named 'langchain_groq'", 
        "details": "Make sure all dependencies are installed and paths are correct", 
        "python_path": sys.path, 
        "current_dir": os.getcwd(), 
        "script_dir": os.path.dirname(__file__),
        "install_command": "pip install langchain-groq==0.1.5"
    }
    print(json.dumps(error_msg))
    sys.exit(1)

try:
    from langchain_core.prompts import PromptTemplate
    from langchain_core.output_parsers import JsonOutputParser
    from langchain_core.exceptions import OutputParserException
    print("✅ langchain_core modules imported successfully", file=sys.stderr)
except ImportError as e:
    error_msg = {
        "success": False, 
        "error": f"Import error: No module named 'langchain_core'", 
        "details": "langchain-core package not found",
        "install_command": "pip install langchain-core==0.1.52"
    }
    print(json.dumps(error_msg))
    sys.exit(1)

# Handle dotenv import gracefully
try:
    from dotenv import load_dotenv
    dotenv_available = True
except ImportError:
    print("python-dotenv not available, using system environment variables", file=sys.stderr)
    dotenv_available = False

# Load environment variables
if dotenv_available:
    # Try to find .env file in current directory or parent directories
    current_dir = os.path.dirname(__file__)
    env_paths = [
        os.path.join(current_dir, '.env'),
        os.path.join(current_dir, '..', '.env'),
        os.path.join(current_dir, '..', '..', '.env'),
        os.path.join(current_dir, '..', '..', '..', 'streamlit-app', '.env')
    ]

    for dotenv_path in env_paths:
        if os.path.exists(dotenv_path):
            load_dotenv(dotenv_path)
            break
    else:
        load_dotenv()  # Fallback to default behavior

class Chain:
    def __init__(self):
        logging.info("🔧 Initializing Chain class...")
        # Initialize the LLM with the required API key
        
        # Get API key from environment variables only (no streamlit)
        groq_api_key = None
        try:
            groq_api_key = os.getenv("GROQ_API_KEY")
            logging.info("Using API key from environment variables")
        except Exception as e:
            logging.error(f"Error accessing environment variables: {e}")
            
        if not groq_api_key or groq_api_key.strip() == "":
            logging.critical("GROQ_API_KEY is not set. Please add it to your environment variables.")
            raise EnvironmentError("GROQ_API_KEY is missing. Please get a free API key from https://console.groq.com/keys")

        if groq_api_key.strip() == "your_api_key_here":
            logging.critical("Please replace 'your_api_key_here' with your actual Groq API key")
            raise EnvironmentError("Please set a valid GROQ_API_KEY in the .env file")

        try:
            self.llm = ChatGroq(
                temperature=0, 
                groq_api_key=groq_api_key, 
                model_name="llama-3.1-8b-instant",  # Updated to current model
                timeout=60  # Increase timeout
            )
            logging.info("Chain initialized successfully with the LLM.")
            
        except Exception as e:
            logging.error(f"Failed to initialize LLM: {e}")
            if "401" in str(e) or "authentication" in str(e).lower():
                raise EnvironmentError(f"Invalid Groq API key. Please check your API key at https://console.groq.com/keys. Error: {e}")
            if "decommissioned" in str(e).lower() or "model" in str(e).lower():
                # Try fallback models
                fallback_models = [
                    "llama3-70b-8192", 
                    "mixtral-8x7b-32768",
                    "gemma-7b-it",
                    "llama3-8b-8192"
                ]
                
                for model in fallback_models:
                    try:
                        logging.info(f"Trying fallback model: {model}")
                        self.llm = ChatGroq(
                            temperature=0,
                            groq_api_key=groq_api_key,
                            model_name=model,
                            timeout=60
                        )
                        logging.info(f"Successfully initialized with fallback model: {model}")
                        return
                    except Exception as fallback_error:
                        logging.warning(f"Fallback model {model} failed: {fallback_error}")
                        continue
                
                raise EnvironmentError("All available models failed. Please check Groq documentation for current models.")
            raise EnvironmentError(f"Failed to initialize LLM: {e}")

    def extract_jobs(self, cleaned_text):
        """
        Extract job postings from cleaned text.
        Returns a list of jobs in JSON format.
        """
        prompt_extract = PromptTemplate.from_template(
            """
            ### SCRAPED TEXT FROM WEBSITE:
            {page_data}
            ### INSTRUCTION:
            The scraped text is from the career's page of a website.
            Your job is to extract the job postings and return them in JSON format containing the following keys:
            `role`, `experience`, `skills`, and `description`.
            Only return valid JSON. No preamble or explanations.
            ### VALID JSON FORMAT (NO PREAMBLE):
            """
        )
        try:
            chain_extract = prompt_extract | self.llm
            res = chain_extract.invoke(input={"page_data": cleaned_text})

            json_parser = JsonOutputParser()
            jobs = json_parser.parse(res.content)

            if not isinstance(jobs, list):
                jobs = [jobs]

            logging.info(f"Successfully extracted {len(jobs)} job postings.")
            return jobs
        except OutputParserException as e:
            logging.error("Error parsing the job postings JSON. Ensure the text is correctly formatted.")
            raise OutputParserException("Error parsing job postings JSON.") from e
        except Exception as e:
            if "401" in str(e) or "authentication" in str(e).lower():
                raise EnvironmentError("API Authentication failed. Please check your Groq API key.")
            if "rate" in str(e).lower() and "limit" in str(e).lower():
                raise Exception("Rate limit exceeded. Please wait a moment and try again.")
            logging.exception("An unexpected error occurred during job extraction.")
            raise e

    def write_mail(self, job, links):
        """
        Generate a cold email for a given job description and portfolio links.
        """
        prompt_email = PromptTemplate.from_template(
            """
            ### JOB DESCRIPTION:
            {job_description}

            ### INSTRUCTION:
            You are Trivickram, a business development executive at AtliQ. AtliQ is an AI & Software Consulting company dedicated to facilitating
            the seamless integration of business processes through automated tools. 
            Over our experience, we have empowered numerous enterprises with tailored solutions, fostering scalability, 
            process optimization, cost reduction, and heightened overall efficiency. 
            Your job is to write a cold email to the client regarding the job mentioned above describing the capability of AtliQ 
            in fulfilling their needs.
            Also add the most relevant ones from the following links to showcase AtliQ's portfolio: {link_list}
            Remember you are Trivickram, BDE at AtliQ. 
            Do not provide a preamble.
            ### EMAIL (NO PREAMBLE):

            """
        )
        try:
            chain_email = prompt_email | self.llm
            res = chain_email.invoke({
    "job_description": str(job),
    "link_list": str(links)  # make sure it's a string
})

            logging.info(f"LLM raw response: {repr(res.content)}")
            logging.info(f"🧠 Prompt Input — Job: {str(job)[:300]}")
            logging.info(f"🧠 Prompt Input — Links: {str(links)}")

            if not res.content or not res.content.strip():
                logging.warning("⚠️ Email LLM response is empty.")
                return None

            return res.content

        except Exception as e:
            if "401" in str(e) or "authentication" in str(e).lower():
                raise EnvironmentError("API Authentication failed. Please check your Groq API key.")
            if "rate" in str(e).lower() and "limit" in str(e).lower():
                raise Exception("Rate limit exceeded. Please wait a moment and try again.")
            logging.exception("Error generating the email.")
            raise e


if __name__ == "__main__":
    try:
        chain = Chain()
        logging.info("GROQ_API_KEY found and Chain initialized.")
    except Exception as e:
        logging.critical("Failed to initialize the Chain class.", exc_info=True)
