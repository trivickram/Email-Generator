// Change the base URL to include /api
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

// Update the generateEmail function
export const generateEmail = async (jobUrl) => {
  console.log('Making POST request to /email/generate');
  try {
    const response = await api.post('/email/generate', { job_url: jobUrl });
    return response.data;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};