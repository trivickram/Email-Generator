import pandas as pd
import uuid
import time
import logging
import os
import shutil

# Try to import chromadb with fallback
try:
    # Fix SQLite version issue for ChromaDB
    __import__('pysqlite3')
    import sys
    sys.modules['sqlite3'] = sys.modules.pop('pysqlite3')
except ImportError:
    pass

try:
    import chromadb
    from chromadb.config import Settings
    CHROMADB_AVAILABLE = True
    logger = logging.getLogger(__name__)
    logger.info("ChromaDB imported successfully")
except ImportError as e:
    CHROMADB_AVAILABLE = False
    logger = logging.getLogger(__name__)
    logger.warning(f"ChromaDB not available: {e}. Portfolio matching will use simple text matching.")
except RuntimeError as e:
    CHROMADB_AVAILABLE = False
    logger = logging.getLogger(__name__)
    logger.warning(f"ChromaDB runtime error: {e}. Portfolio matching will use simple text matching.")

# Configure logging
logging.basicConfig(level=logging.INFO)


class Portfolio:
    def __init__(self, file_path=None):
        logger.info("📚 Initializing Portfolio class...")
        if file_path is None:
            # Default to the data directory
            file_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'my_portfolio.csv')
        self.file_path = file_path
        self.data = pd.read_csv(file_path)
        self.vectorstore_path = 'vectorstore'
        self.chromadb_available = CHROMADB_AVAILABLE
        
        if self.chromadb_available:
            # Initialize ChromaDB with proper error handling
            try:
                self.chroma_client = self._initialize_chroma_client()
                self.collection = self.chroma_client.get_or_create_collection(name="portfolio")
                logger.info("ChromaDB initialized successfully")
            except Exception as e:
                logger.warning(f"ChromaDB initialization failed: {e}. Falling back to simple matching.")
                self.chromadb_available = False
                self.chroma_client = None
                self.collection = None
        else:
            self.chroma_client = None
            self.collection = None
            logger.info("Using fallback portfolio matching (ChromaDB not available)")

    def _initialize_chroma_client(self):
        """Initialize ChromaDB client with proper error handling and cleanup"""
        if not self.chromadb_available:
            return None
            
        try:
            # Try to create a new client
            client = chromadb.PersistentClient(
                path=self.vectorstore_path,
                settings=Settings(
                    anonymized_telemetry=False,
                    allow_reset=True
                )
            )
            logger.info("ChromaDB initialized successfully")
            return client
            
        except ValueError as e:
            if "different settings" in str(e):
                logger.warning("ChromaDB instance exists with different settings. Attempting cleanup...")
                
                # Try to reset the existing instance
                try:
                    # Create a client with reset capability
                    temp_client = chromadb.PersistentClient(
                        path=self.vectorstore_path,
                        settings=Settings(allow_reset=True)
                    )
                    temp_client.reset()
                    logger.info("ChromaDB reset successful")
                    
                    # Now create a new client
                    client = chromadb.PersistentClient(
                        path=self.vectorstore_path,
                        settings=Settings(
                            anonymized_telemetry=False,
                            allow_reset=True
                        )
                    )
                    logger.info("ChromaDB re-initialized successfully after reset")
                    return client
                    
                except Exception as reset_error:
                    logger.warning(f"Reset failed: {reset_error}. Trying alternative approach...")
                    
                    # Alternative: Remove the vectorstore directory and recreate
                    try:
                        if os.path.exists(self.vectorstore_path):
                            shutil.rmtree(self.vectorstore_path)
                            logger.info("Removed existing vectorstore directory")
                        
                        # Create fresh client
                        client = chromadb.PersistentClient(
                            path=self.vectorstore_path,
                            settings=Settings(
                                anonymized_telemetry=False,
                                allow_reset=True
                            )
                        )
                        logger.info("ChromaDB initialized with fresh vectorstore")
                        return client
                        
                    except Exception as cleanup_error:
                        logger.error(f"Failed to cleanup and reinitialize: {cleanup_error}")
                        
                        # Final fallback: use in-memory client
                        logger.warning("Using in-memory ChromaDB as fallback")
                        return chromadb.Client()
            else:
                raise
                
        except Exception as e:
            logger.error(f"ChromaDB initialization error: {e}")
            # Fallback to in-memory client
            logger.warning("Using in-memory ChromaDB as fallback")
            return chromadb.Client()

    def load_portfolio(self):
        """Load portfolio data into ChromaDB with retry logic"""
        if not self.chromadb_available or self.collection is None:
            logger.info("ChromaDB not available, portfolio data loaded from CSV only")
            return
            
        try:
            if self.collection.count() > 0:
                logger.info(f"Portfolio already loaded with {self.collection.count()} items")
                return
            
            logger.info("Loading portfolio data into ChromaDB...")
            
            # Add data in batches to avoid timeout
            batch_size = 5
            for i in range(0, len(self.data), batch_size):
                batch = self.data.iloc[i:i+batch_size]
                
                documents = []
                metadatas = []
                ids = []
                
                for _, row in batch.iterrows():
                    documents.append(str(row["Techstack"]))
                    metadatas.append({"links": str(row["Links"])})
                    ids.append(str(uuid.uuid4()))
                
                # Add batch with retry logic
                max_retries = 3
                for attempt in range(max_retries):
                    try:
                        self.collection.add(
                            documents=documents,
                            metadatas=metadatas,
                            ids=ids
                        )
                        logger.info(f"Added batch {i//batch_size + 1}/{(len(self.data)-1)//batch_size + 1}")
                        break
                    except Exception as e:
                        if attempt < max_retries - 1:
                            logger.warning(f"Batch add attempt {attempt + 1} failed, retrying: {e}")
                            time.sleep(2)  # Wait before retry
                        else:
                            logger.error(f"Failed to add batch after {max_retries} attempts: {e}")
                            raise
                
                # Small delay between batches
                time.sleep(0.5)
            
            logger.info(f"Portfolio loaded successfully with {self.collection.count()} items")
            
        except Exception as e:
            logger.error(f"Error loading portfolio: {e}")
            raise

    def query_links(self, skills):
        """Query for relevant portfolio links"""
        try:
            if not skills:
                return []
            
            # Fallback to simple text matching if ChromaDB is not available
            if not self.chromadb_available or self.collection is None:
                return self._simple_skill_matching(skills)
            
            # Ensure we have data loaded
            if self.collection.count() == 0:
                logger.warning("Portfolio not loaded, loading now...")
                self.load_portfolio()
            
            result = self.collection.query(query_texts=skills, n_results=2)
            return result.get('metadatas', [])
        except Exception as e:
            logger.error(f"Error querying portfolio: {e}")
            # Fallback to simple matching
            return self._simple_skill_matching(skills)

    def _simple_skill_matching(self, skills):
        """Fallback method for portfolio matching when ChromaDB is not available"""
        try:
            if not skills:
                return []
            
            # Convert skills to lowercase for matching
            skills_lower = [skill.lower() for skill in skills]
            matches = []
            
            for _, row in self.data.iterrows():
                techstack = str(row.get("Techstack", "")).lower()
                # Check if any skill matches the techstack
                for skill in skills_lower:
                    if skill in techstack:
                        matches.append({"links": str(row.get("Links", ""))})
                        break  # Avoid duplicate entries for the same project
                
                # Limit to 2 matches (similar to ChromaDB query)
                if len(matches) >= 2:
                    break
            
            logger.info(f"Simple matching found {len(matches)} portfolio matches")
            return matches
            
        except Exception as e:
            logger.error(f"Error in simple skill matching: {e}")
            return []