import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  Alert,
  Grid,
} from '@mui/material';
import {
  Send as SendIcon,
  ContentCopy as CopyIcon,
  Download as DownloadIcon,
  Link as LinkIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { emailApi } from '../services/api';

const HomePage = () => {
  const [result, setResult] = useState(null);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const jobUrl = watch('jobUrl');

  const emailMutation = useMutation(emailApi.generateEmail, {
    onSuccess: (data) => {
      console.log('API Response:', data.data); // Debug log
      setResult(data.data);
      toast.success('Cold email generated successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to generate email');
    },
  });

  const onSubmit = (data) => {
    emailMutation.mutate(data.jobUrl);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const downloadEmail = () => {
    if (!result?.email) return;
    
    const element = document.createElement('a');
    const file = new Blob([result.email], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'cold_email.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Email downloaded!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
            📧 AI Cold Email Generator
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Generate personalized cold emails using AI by simply pasting a job posting URL. 
            Our intelligent system analyzes the job requirements and creates tailored outreach.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Input Form */}
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <LinkIcon sx={{ mr: 1, color: 'primary.main' }} />
                  Job URL Input
                </Typography>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    fullWidth
                    label="Job Posting URL"
                    placeholder="https://jobs.company.com/job/123"
                    variant="outlined"
                    {...register('jobUrl', {
                      required: 'Job URL is required',
                      pattern: {
                        value: /^https?:\/\/.+/,
                        message: 'Please enter a valid URL starting with http:// or https://'
                      }
                    })}
                    error={!!errors.jobUrl}
                    helperText={errors.jobUrl?.message}
                    sx={{ mb: 3 }}
                  />
                  
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={emailMutation.isLoading || !jobUrl}
                    startIcon={emailMutation.isLoading ? <CircularProgress size={20} /> : <SendIcon />}
                    sx={{ py: 1.5, fontSize: '1.1rem' }}
                  >
                    {emailMutation.isLoading ? 'Generating Email...' : 'Generate Cold Email'}
                  </Button>
                </form>

                {emailMutation.isLoading && (
                  <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      <strong>Processing your request...</strong>
                      <br />
                      • Analyzing job posting
                      <br />
                      • Matching portfolio skills  
                      <br />
                      • Generating personalized email
                    </Alert>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Results */}
          <Grid item xs={12} md={6}>
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card elevation={3}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
                        <SendIcon sx={{ mr: 1, color: 'success.main' }} />
                        Generated Email
                      </Typography>
                      <Box>
                        <Tooltip title="Copy to clipboard">
                          <IconButton onClick={() => copyToClipboard(result.email)} color="primary">
                            <CopyIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Download as text file">
                          <IconButton onClick={downloadEmail} color="primary">
                            <DownloadIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>

                    {/* Job Details */}
                    {result.job && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" gutterBottom>Job Details</Typography>
                        <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                          <Typography variant="subtitle2" color="primary">Role:</Typography>
                          <Typography variant="body2" sx={{ mb: 1 }}>{result.job.role || 'N/A'}</Typography>
                          
                          <Typography variant="subtitle2" color="primary">Experience:</Typography>
                          <Typography variant="body2" sx={{ mb: 1 }}>{result.job.experience || 'N/A'}</Typography>
                          
                          <Typography variant="subtitle2" color="primary">Skills:</Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                            {Array.isArray(result.job.skills) 
                              ? result.job.skills.map((skill, index) => (
                                  <Chip key={index} label={skill} size="small" color="primary" variant="outlined" />
                                ))
                              : result.job.skills 
                                ? <Chip label={result.job.skills} size="small" color="primary" variant="outlined" />
                                : <Typography variant="body2" color="text.secondary">No skills specified</Typography>
                            }
                          </Box>
                        </Paper>
                      </Box>
                    )}

                    {/* Portfolio Matches */}
                    {result.relevant_links && result.relevant_links.length > 0 && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" gutterBottom>Portfolio Matches</Typography>
                        <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                          {result.relevant_links.flat().slice(0, 3).map((link, index) => {
                            // Handle different possible structures
                            const displayText = link?.techstack || link?.title || link?.links || (typeof link === 'string' ? link : 'Portfolio Project');
                            const linkUrl = link?.link || link?.links || link?.url || '#';
                            
                            return (
                              <Box key={index} sx={{ mb: 1 }}>
                                <Typography variant="body2" color="primary">
                                  {displayText}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {linkUrl}
                                </Typography>
                              </Box>
                            );
                          })}
                        </Paper>
                      </Box>
                    )}

                    <Divider sx={{ my: 2 }} />

                    {/* Generated Email */}
                    <Paper 
                      sx={{ 
                        p: 3, 
                        bgcolor: 'grey.50', 
                        maxHeight: 400, 
                        overflow: 'auto',
                        fontFamily: 'monospace'
                      }}
                    >
                      <ReactMarkdown>{result.email}</ReactMarkdown>
                    </Paper>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {!result && !emailMutation.isLoading && (
              <Card elevation={1} sx={{ bgcolor: 'grey.50' }}>
                <CardContent sx={{ textAlign: 'center', py: 6 }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    ✨ Ready to Generate
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Enter a job posting URL above to get started with AI-powered email generation
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>

        {/* Features */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            ✨ Features
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card elevation={2} sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Typography variant="h5" gutterBottom>🤖 AI-Powered</Typography>
                  <Typography variant="body1" color="text.secondary">
                    Uses advanced language models to analyze job postings and generate personalized content
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={2} sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Typography variant="h5" gutterBottom>🎯 Smart Matching</Typography>
                  <Typography variant="body1" color="text.secondary">
                    Automatically matches relevant portfolio projects and experience to job requirements
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={2} sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Typography variant="h5" gutterBottom>⚡ Fast & Easy</Typography>
                  <Typography variant="body1" color="text.secondary">
                    Generate professional cold emails in seconds with just a job posting URL
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </motion.div>
  );
};

export default HomePage;
