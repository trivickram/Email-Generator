import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  Grid,
  Container,
  Stack,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Send as SendIcon,
  ContentCopy as CopyIcon,
  Download as DownloadIcon,
  Link as LinkIcon,
  AutoAwesome as AIIcon,
  CheckCircle as CheckIcon,
  TrendingUp as TrendingIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { emailApi } from '../services/api';

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    style={{ height: '100%' }}
  >
    <Card sx={{
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '20px',
      p: 3,
      textAlign: 'center',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '200px',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      }
    }}>
      <Box sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        p: 2,
        display: 'inline-flex',
        mb: 2,
        alignSelf: 'center'
      }}>
        {icon}
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
        {description}
      </Typography>
    </Card>
  </motion.div>
);

const HomePage = () => {
  const [result, setResult] = useState(null);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const jobUrl = watch('jobUrl');

  const emailMutation = useMutation(emailApi.generateEmail, {
    onSuccess: (data) => {
      setResult(data.data);
      toast.success('🎉 Cold email generated successfully!');
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
    toast.success('📋 Copied to clipboard!');
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
    toast.success('📥 Email downloaded!');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 1
      }}>
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Box sx={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: { xs: '200px', md: '400px' },
            height: { xs: '200px', md: '400px' },
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
          }} />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <Box sx={{
            position: 'absolute',
            bottom: '5%',
            left: '5%',
            width: { xs: '150px', md: '300px' },
            height: { xs: '150px', md: '300px' },
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
          }} />
        </motion.div>
      </Box>

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, py: 4 }}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '2.5rem', md: '4.5rem' },
                fontWeight: 800,
                color: 'white',
                mb: 2,
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              🚀 AI Cold Email Generator
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                maxWidth: 800, 
                mx: 'auto',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                lineHeight: 1.6,
                mb: 6
              }}
            >
              Transform any job posting into a personalized cold email using cutting-edge AI. 
              Our intelligent system analyzes requirements and crafts compelling outreach messages.
            </Typography>

            {/* Feature Cards */}
            <Grid container spacing={3} sx={{ mb: 6 }}>
              <Grid item xs={12} md={3}>
                <FeatureCard
                  icon={<AIIcon sx={{ color: 'white', fontSize: '2rem' }} />}
                  title="AI-Powered"
                  description="Advanced language models analyze job requirements"
                  delay={0.2}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FeatureCard
                  icon={<SpeedIcon sx={{ color: 'white', fontSize: '2rem' }} />}
                  title="Lightning Fast"
                  description="Generate emails in seconds, not hours"
                  delay={0.3}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FeatureCard
                  icon={<TrendingIcon sx={{ color: 'white', fontSize: '2rem' }} />}
                  title="Portfolio Match"
                  description="Automatically matches your relevant projects"
                  delay={0.4}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FeatureCard
                  icon={<CheckIcon sx={{ color: 'white', fontSize: '2rem' }} />}
                  title="Personalized"
                  description="Tailored content for maximum impact"
                  delay={0.5}
                />
              </Grid>
            </Grid>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {/* Input Form */}
          <Grid item xs={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card sx={{ 
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '24px',
                overflow: 'visible',
                position: 'sticky',
                top: 20
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                    <Box sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '12px',
                      p: 1.5,
                    }}>
                      <LinkIcon sx={{ color: 'white', fontSize: '1.5rem' }} />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      Job URL Input
                    </Typography>
                  </Stack>
                  
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                      fullWidth
                      label="Job Posting URL"
                      placeholder="https://jobs.company.com/job/123"
                      variant="outlined"
                      sx={{ mb: 3 }}
                      {...register('jobUrl', {
                        required: 'Job URL is required',
                        pattern: {
                          value: /^https?:\/\/.+/,
                          message: 'Please enter a valid URL'
                        }
                      })}
                      error={!!errors.jobUrl}
                      helperText={errors.jobUrl?.message}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={emailMutation.isLoading || !jobUrl}
                      startIcon={emailMutation.isLoading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                      sx={{
                        py: 1.5,
                        fontSize: '1.1rem',
                        borderRadius: '12px'
                      }}
                    >
                      {emailMutation.isLoading ? 'Generating...' : 'Generate Cold Email'}
                    </Button>
                  </form>

                  {emailMutation.isLoading && (
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        🤖 AI is analyzing the job posting and crafting your email...
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Results */}
          <Grid item xs={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {result ? (
                <Fade in={!!result}>
                  <Card sx={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '24px',
                  }}>
                    <CardContent sx={{ p: 4 }}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                          <CheckIcon sx={{ color: 'success.main', mr: 1 }} />
                          Generated Email
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <Tooltip title="Copy to clipboard">
                            <IconButton 
                              onClick={() => copyToClipboard(result.email)}
                              sx={{ 
                                background: 'rgba(102, 126, 234, 0.1)',
                                '&:hover': { background: 'rgba(102, 126, 234, 0.2)' }
                              }}
                            >
                              <CopyIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Download email">
                            <IconButton 
                              onClick={downloadEmail}
                              sx={{ 
                                background: 'rgba(102, 126, 234, 0.1)',
                                '&:hover': { background: 'rgba(102, 126, 234, 0.2)' }
                              }}
                            >
                              <DownloadIcon />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </Stack>

                      {/* Matched Projects */}
                      {result.matched_projects && result.matched_projects.length > 0 && (
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                            🎯 Matched Projects
                          </Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {result.matched_projects.map((project, index) => (
                              <Chip
                                key={index}
                                label={project.title || project}
                                variant="filled"
                                sx={{ mb: 1 }}
                              />
                            ))}
                          </Stack>
                        </Box>
                      )}

                      {/* Email Content */}
                      <Box sx={{
                        background: 'rgba(248, 250, 252, 0.8)',
                        borderRadius: '16px',
                        p: 3,
                        border: '1px solid rgba(226, 232, 240, 0.5)',
                        maxHeight: '400px',
                        overflow: 'auto'
                      }}>
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => (
                              <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
                                {children}
                              </Typography>
                            ),
                            h1: ({ children }) => (
                              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                                {children}
                              </Typography>
                            ),
                            h2: ({ children }) => (
                              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                {children}
                              </Typography>
                            ),
                          }}
                        >
                          {result.email}
                        </ReactMarkdown>
                      </Box>
                    </CardContent>
                  </Card>
                </Fade>
              ) : (
                <Card sx={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: '2px dashed rgba(102, 126, 234, 0.3)',
                  borderRadius: '24px',
                  minHeight: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Box sx={{ textAlign: 'center', p: 4 }}>
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Typography variant="h2" sx={{ mb: 2, opacity: 0.5 }}>
                        ✨
                      </Typography>
                    </motion.div>
                    <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                      Your generated email will appear here
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Enter a job URL and click generate to get started
                    </Typography>
                  </Box>
                </Card>
              )}
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
