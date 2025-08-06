import os
from langchain_groq import ChatGroq as _ChatGroq
# Patch ChatGroq to ignore unsupported 'proxies' argument from environment
class ChatGroq(_ChatGroq):
    def __init__(self, *args, proxies=None, **kwargs):
        # Accept and ignore 'proxies' parameter to match base signature
        super().__init__(*args, **kwargs)
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.exceptions import OutputParserException
from dotenv import load_dotenv
import logging

# Load environment variables
# Try to find .env file in streamlit-app directory
dotenv_path = os.path.join(os.path.dirname(__file__), '..', 'streamlit-app', '.env')
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)
else:
    load_dotenv()  # Fallback to default behavior

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")


import streamlit as st

class Chain:
    def __init__(self):
        logging.info("🔧 Initializing Chain class...")
        # Initialize the LLM with the required API key
        
        # Try to get API key from Streamlit secrets first, then environment
        groq_api_key = None
        try:
            groq_api_key = st.secrets["GROQ_API_KEY"]
            logging.info("Using API key from Streamlit secrets")
        except:
            groq_api_key = os.getenv("GROQ_API_KEY")
            logging.info("Using API key from environment variables")
            
        if not groq_api_key or groq_api_key.strip() == "":
            logging.critical("GROQ_API_KEY is not set. Please add it to your environment variables or Streamlit secrets.")
            st.error("❌ GROQ_API_KEY is not configured. Please contact the administrator.")
            raise EnvironmentError("GROQ_API_KEY is missing. Please get a free API key from https://console.groq.com/keys")

        if groq_api_key.strip() == "your_api_key_here":
            logging.critical("Please replace 'your_api_key_here' with your actual Groq API key")
            st.error("❌ Please configure a valid GROQ_API_KEY")
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
            res = chain_email.invoke({"job_description": str(job), "link_list": links})
            logging.info("Email generated successfully.")
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
