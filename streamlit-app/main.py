import streamlit as st
import sys
import os

# Add paths to shared modules
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'shared'))
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'data'))

from langchain_community.document_loaders import WebBaseLoader

from chains import Chain
from portfolio import Portfolio
from utils import clean_text

# Initialize components only once using session state
@st.cache_resource
def get_chain():
    """Initialize Chain only once and cache it"""
    return Chain()

@st.cache_resource
def get_portfolio():
    """Initialize Portfolio only once and cache it"""
    return Portfolio()

@st.cache_resource
def get_clean_text_func():
    """Get clean_text function"""
    return clean_text

def create_streamlit_app():
    st.title("📧 Cold Mail Generator")
    
    # Get cached instances (only created once)
    with st.spinner("🔄 Initializing components..."):
        try:
            chain = get_chain()
            portfolio = get_portfolio()
            clean_text_func = get_clean_text_func()
            st.success("✅ Components initialized!")
        except Exception as e:
            st.error(f"❌ Initialization failed: {e}")
            st.stop()
    
    st.markdown("---")
    url_input = st.text_input("Enter a URL:", value="https://jobs.nike.com/job/R-43840")
    submit_button = st.button("Submit")

    if submit_button:
        try:
            with st.spinner("🔄 Processing job posting..."):
                # Load portfolio first
                st.info("📚 Loading portfolio database...")
                portfolio.load_portfolio()
                
                # Scrape and clean data
                st.info("🌐 Scraping job posting...")
                loader = WebBaseLoader([url_input])
                data = clean_text_func(loader.load().pop().page_content)
                
                # Extract jobs
                st.info("🤖 Extracting job details with AI...")
                jobs = chain.extract_jobs(data)
                
                # Generate emails
                st.info("✉️ Generating personalized emails...")
                for job in jobs:
                    skills = job.get('skills', [])
                    links = portfolio.query_links(skills)
                    email = chain.write_mail(job, links)
                    
                    st.success("✅ Email generated successfully!")
                    st.code(email, language='markdown')
                    
        except Exception as e:
            st.error(f"❌ An Error Occurred: {str(e)}")
            st.error("💡 **Troubleshooting tips:**")
            st.error("- Check your internet connection")
            st.error("- Verify the job posting URL is accessible")
            st.error("- Try again in a few moments")
            
            # Show detailed error for debugging
            with st.expander("🔍 Technical Details"):
                st.text(f"Error type: {type(e).__name__}")
                st.text(f"Error message: {str(e)}")
                import traceback
                st.text(f"Traceback:\n{traceback.format_exc()}")


if __name__ == "__main__":
    st.set_page_config(layout="wide", page_title="Cold Email Generator", page_icon="📧")
    create_streamlit_app()