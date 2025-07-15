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
              <Box sx={{
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.08))',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '32px',
                boxShadow: '0 25px 45px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
                  pointerEvents: 'none',
                }
              }}>
                <Box sx={{ p: 5, position: 'relative', zIndex: 1 }}>
                  {/* Header with floating icon */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mb: 4 
                  }}>
                    <motion.div
                      animate={{ 
                        y: [0, -8, 0],
                        rotateY: [0, 10, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Box sx={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        p: 3,
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          borderRadius: '24px',
                          background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                          animation: 'shimmer 3s infinite',
                        },
                        '@keyframes shimmer': {
                          '0%': { transform: 'translateX(-100%)' },
                          '100%': { transform: 'translateX(100%)' },
                        }
                      }}>
                        <LinkIcon sx={{ 
                          color: 'white', 
                          fontSize: '2.5rem',
                          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
                        }} />
                      </Box>
                    </motion.div>
                  </Box>

                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700,
                      textAlign: 'center',
                      mb: 2,
                      background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    Enter Job URL
                  </Typography>

                  <Typography 
                    variant="body1" 
                    sx={{ 
                      textAlign: 'center',
                      mb: 4,
                      color: 'rgba(255, 255, 255, 0.85)',
                      fontSize: '1.1rem',
                      lineHeight: 1.6
                    }}
                  >
                    Paste any job posting URL and let AI create your perfect cold email
                  </Typography>
                  
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ mb: 4 }}>
                      <TextField
                        fullWidth
                        label="Job Posting URL"
                        placeholder="https://jobs.company.com/job/123"
                        variant="outlined"
                        {...register('jobUrl', {
                          required: 'Job URL is required',
                          pattern: {
                            value: /^https?:\/\/.+/,
                            message: 'Please enter a valid URL'
                          }
                        })}
                        error={!!errors.jobUrl}
                        helperText={errors.jobUrl?.message}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '20px',
                            fontSize: '1.1rem',
                            '& fieldset': {
                              border: '1px solid rgba(255, 255, 255, 0.25)',
                              borderRadius: '20px',
                            },
                            '&:hover fieldset': {
                              border: '1px solid rgba(255, 255, 255, 0.4)',
                            },
                            '&.Mui-focused fieldset': {
                              border: '2px solid rgba(255, 255, 255, 0.6)',
                            },
                            '& input': {
                              color: 'white',
                              padding: '16px 20px',
                              '&::placeholder': {
                                color: 'rgba(255, 255, 255, 0.6)',
                                opacity: 1,
                              }
                            }
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255, 255, 255, 0.8)',
                            '&.Mui-focused': {
                              color: 'white',
                            }
                          },
                          '& .MuiFormHelperText-root': {
                            background: 'rgba(244, 67, 54, 0.9)',
                            backdropFilter: 'blur(10px)',
                            margin: '8px 0 0 0',
                            padding: '8px 16px',
                            borderRadius: '12px',
                            color: 'white',
                            fontSize: '0.875rem'
                          }
                        }}
                      />
                    </Box>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={emailMutation.isLoading || !jobUrl}
                        startIcon={emailMutation.isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <CircularProgress size={24} sx={{ color: 'rgba(255, 255, 255, 0.8)' }} />
                          </motion.div>
                        ) : <SendIcon />}
                        sx={{
                          py: 2,
                          fontSize: '1.2rem',
                          fontWeight: 600,
                          borderRadius: '20px',
                          background: emailMutation.isLoading 
                            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))'
                            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          color: 'white',
                          textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2))',
                            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                          },
                          '&:disabled': {
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                            color: 'rgba(255, 255, 255, 0.5)',
                          }
                        }}
                      >
                        {emailMutation.isLoading ? 'Generating Magic...' : '✨ Generate Cold Email'}
                      </Button>
                    </motion.div>
                  </form>

                  {emailMutation.isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Box sx={{ 
                        mt: 4, 
                        p: 3,
                        textAlign: 'center',
                        background: 'rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(15px)',
                        borderRadius: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.15)'
                      }}>
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Typography variant="h6" sx={{ 
                            color: 'white', 
                            mb: 1,
                            fontWeight: 600
                          }}>
                            🤖 AI Working Its Magic
                          </Typography>
                        </motion.div>
                        <Typography variant="body2" sx={{ 
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontSize: '1rem'
                        }}>
                          Analyzing job requirements and crafting your personalized email...
                        </Typography>
                      </Box>
                    </motion.div>
                  )}
                </Box>
              </Box>
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
                  <Box sx={{
                    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.08))',
                    backdropFilter: 'blur(30px)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    borderRadius: '32px',
                    boxShadow: '0 25px 45px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.6), transparent)',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, transparent 50%)',
                      pointerEvents: 'none',
                    }
                  }}>
                    <Box sx={{ p: 5, position: 'relative', zIndex: 1 }}>
                      {/* Success Header */}
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        mb: 4 
                      }}>
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        >
                          <Box sx={{
                            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(16, 185, 129, 0.2))',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '24px',
                            p: 3,
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            boxShadow: '0 15px 35px rgba(16, 185, 129, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                          }}>
                            <CheckIcon sx={{ 
                              color: '#10b981', 
                              fontSize: '2.5rem',
                              filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))'
                            }} />
                          </Box>
                        </motion.div>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                        <Typography 
                          variant="h4" 
                          sx={{ 
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          Email Generated! ✨
                        </Typography>
                        
                        <Stack direction="row" spacing={2}>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Tooltip title="Copy to clipboard" arrow>
                              <Button
                                onClick={() => copyToClipboard(result.email)}
                                sx={{
                                  minWidth: 'auto',
                                  p: 2,
                                  borderRadius: '16px',
                                  background: 'rgba(255, 255, 255, 0.15)',
                                  backdropFilter: 'blur(15px)',
                                  border: '1px solid rgba(255, 255, 255, 0.2)',
                                  color: 'white',
                                  '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.25)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
                                  }
                                }}
                              >
                                <CopyIcon />
                              </Button>
                            </Tooltip>
                          </motion.div>
                          
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Tooltip title="Download email" arrow>
                              <Button
                                onClick={downloadEmail}
                                sx={{
                                  minWidth: 'auto',
                                  p: 2,
                                  borderRadius: '16px',
                                  background: 'rgba(255, 255, 255, 0.15)',
                                  backdropFilter: 'blur(15px)',
                                  border: '1px solid rgba(255, 255, 255, 0.2)',
                                  color: 'white',
                                  '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.25)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
                                  }
                                }}
                              >
                                <DownloadIcon />
                              </Button>
                            </Tooltip>
                          </motion.div>
                        </Stack>
                      </Box>

                      {/* Matched Projects */}
                      {result.matched_projects && result.matched_projects.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <Box sx={{ mb: 4 }}>
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                mb: 3, 
                                fontWeight: 600,
                                color: 'rgba(255, 255, 255, 0.9)',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              🎯 Matched Portfolio Projects
                            </Typography>
                            <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                              {result.matched_projects.map((project, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.1 * index }}
                                >
                                  <Chip
                                    label={project.title || project}
                                    sx={{
                                      background: 'rgba(255, 255, 255, 0.15)',
                                      backdropFilter: 'blur(10px)',
                                      border: '1px solid rgba(255, 255, 255, 0.2)',
                                      color: 'white',
                                      fontWeight: 500,
                                      fontSize: '0.9rem',
                                      borderRadius: '12px',
                                      '&:hover': {
                                        background: 'rgba(255, 255, 255, 0.25)',
                                        transform: 'translateY(-1px)',
                                      }
                                    }}
                                  />
                                </motion.div>
                              ))}
                            </Stack>
                          </Box>
                        </motion.div>
                      )}

                      {/* Email Content */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            mb: 3, 
                            fontWeight: 600,
                            color: 'rgba(255, 255, 255, 0.9)',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          ✉️ Your Personalized Email
                        </Typography>
                        
                        <Box sx={{
                          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.04))',
                          backdropFilter: 'blur(20px)',
                          borderRadius: '24px',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          maxHeight: '500px',
                          overflow: 'auto',
                          position: 'relative',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                          },
                          // Custom scrollbar
                          '&::-webkit-scrollbar': {
                            width: '8px',
                          },
                          '&::-webkit-scrollbar-track': {
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '10px',
                          },
                          '&::-webkit-scrollbar-thumb': {
                            background: 'rgba(255, 255, 255, 0.3)',
                            borderRadius: '10px',
                            '&:hover': {
                              background: 'rgba(255, 255, 255, 0.4)',
                            }
                          }
                        }}>
                          <Box sx={{ p: 4 }}>
                            <ReactMarkdown
                              components={{
                                p: ({ children }) => (
                                  <Typography 
                                    variant="body1" 
                                    sx={{ 
                                      mb: 2.5, 
                                      lineHeight: 1.8,
                                      color: 'rgba(255, 255, 255, 0.9)',
                                      fontSize: '1.05rem'
                                    }}
                                  >
                                    {children}
                                  </Typography>
                                ),
                                h1: ({ children }) => (
                                  <Typography 
                                    variant="h5" 
                                    sx={{ 
                                      mb: 2.5, 
                                      fontWeight: 600,
                                      color: 'white',
                                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                                    }}
                                  >
                                    {children}
                                  </Typography>
                                ),
                                h2: ({ children }) => (
                                  <Typography 
                                    variant="h6" 
                                    sx={{ 
                                      mb: 2, 
                                      fontWeight: 600,
                                      color: 'rgba(255, 255, 255, 0.95)'
                                    }}
                                  >
                                    {children}
                                  </Typography>
                                ),
                              }}
                            >
                              {result.email}
                            </ReactMarkdown>
                          </Box>
                        </Box>
                      </motion.div>
                    </Box>
                  </Box>
                </Fade>
              ) : (
                <Box sx={{
                  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.04))',
                  backdropFilter: 'blur(30px)',
                  border: '2px dashed rgba(255, 255, 255, 0.2)',
                  borderRadius: '32px',
                  minHeight: '500px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.02) 50%, transparent 70%)',
                    animation: 'shimmer 4s infinite',
                  },
                  '@keyframes shimmer': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                  }
                }}>
                  <Box sx={{ textAlign: 'center', p: 6, position: 'relative', zIndex: 1 }}>
                    <motion.div
                      animate={{ 
                        y: [0, -15, 0],
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Typography 
                        variant="h1" 
                        sx={{ 
                          mb: 3, 
                          fontSize: '4rem',
                          filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))'
                        }}
                      >
                        ✨
                      </Typography>
                    </motion.div>
                    
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.8)', 
                        mb: 2,
                        fontWeight: 600,
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      Your AI-Generated Email
                    </Typography>
                    
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.6)',
                        mb: 3,
                        fontSize: '1.1rem',
                        lineHeight: 1.6
                      }}
                    >
                      Will appear here like magic ✨
                    </Typography>
                    
                    <Box sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 2,
                      px: 3,
                      py: 1.5,
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.15)'
                    }}>
                      <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Enter a job URL to get started
                      </Typography>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>→</Typography>
                      </motion.div>
                    </Box>
                  </Box>
                </Box>
              )}
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
