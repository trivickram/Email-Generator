import re
import logging

def clean_text(text):
    # Remove HTML tags
    text = re.sub(r'<[^>]*?>', '', text)
    # Remove URLs
    text = re.sub(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', '', text)
    # Remove special characters
    text = re.sub(r'[^a-zA-Z0-9 ]', '', text)
    # Replace multiple spaces with a single space
    text = re.sub(r'\s{2,}', ' ', text)
    # Trim leading and trailing whitespace
    text = text.strip()
    # Remove extra whitespace
    text = ' '.join(text.split())
    return text

if __name__ == "__main__":
    import os
    from dotenv import load_dotenv
    load_dotenv()
    
    key = os.getenv("GROQ_API_KEY")
    if key is None:
        logging.warning("GROQ_API_KEY not found.")
    else:
        logging.info(f"GROQ_API_KEY found: {key[:10]}...")
