# This is a redirect file for Streamlit Cloud compatibility
# If Streamlit Cloud is looking in the wrong location, this will redirect to the correct app

import sys
import os

# Add paths to shared modules
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'shared'))
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'data'))

# Import and run the main app
try:
    # Import the main streamlit_app from root
    import main as main_app
    
    # Run the main function
    if hasattr(main_app, 'main'):
        main_app.main()
    else:
        # If no main function, just import everything
        pass
        
except ImportError as e:
    import streamlit as st
    st.error(f"❌ Could not import main app: {e}")
    st.info("🔧 Please check the import paths and ensure all modules are available.")
    st.code("""
    Current Directory Structure:
    - streamlit-app/: Local Streamlit application
    - shared/: Shared Python modules (chains, portfolio, utils)
    - data/: Portfolio and data files
    """)
