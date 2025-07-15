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
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
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
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        p: 2,
        display: 'inline-flex',
        mb: 2,
        alignSelf: 'center',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
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
      background: '#000000',
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
        {/* Floating orbs */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <Box sx={{
            position: 'absolute',
            top: '15%',
            right: '15%',
            width: { xs: '300px', md: '500px' },
            height: { xs: '300px', md: '500px' },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }} />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 40, 0],
            x: [0, -25, 0],
            rotate: [0, -15, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <Box sx={{
            position: 'absolute',
            bottom: '10%',
            left: '10%',
            width: { xs: '250px', md: '400px' },
            height: { xs: '250px', md: '400px' },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }} />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -20, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <Box sx={{
            position: 'absolute',
            top: '60%',
            right: '5%',
            width: { xs: '200px', md: '350px' },
            height: { xs: '200px', md: '350px' },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.04) 0%, transparent 70%)',
            filter: 'blur(60px)',
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
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Typography 
                variant="h1" 
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '4.5rem', lg: '5.5rem' },
                  fontWeight: 900,
                  color: 'white',
                  mb: 2,
                  background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.9) 50%, #ffffff 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  letterSpacing: '-0.02em',
                }}
              >
                AI Cold Email
                <Box component="span" sx={{ 
                  display: 'block',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Generator
                </Box>
              </Typography>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Typography 
                variant="h5" 
                sx={{ 
                  maxWidth: 900, 
                  mx: 'auto',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: { xs: '1.1rem', md: '1.4rem' },
                  lineHeight: 1.6,
                  mb: 6,
                  fontWeight: 400
                }}
              >
                Transform any job posting into a personalized cold email using cutting-edge AI. 
                <Box component="span" sx={{ color: 'rgba(99, 102, 241, 0.9)', fontWeight: 600 }}>
                  Our intelligent system
                </Box> analyzes requirements and crafts compelling outreach messages.
              </Typography>
            </motion.div>

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
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Box sx={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '32px',
                boxShadow: '0 32px 64px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 40px 80px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.5), transparent)',
                },
              }}>
                <Box sx={{ p: 6, position: 'relative', zIndex: 1 }}>
                  {/* Header Icon */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mb: 4 
                  }}>
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotateY: [0, 15, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Box sx={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(25px)',
                        borderRadius: '28px',
                        p: 4,
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          borderRadius: '28px',
                          background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.05), transparent)',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                        },
                        '&:hover::after': {
                          opacity: 1,
                        }
                      }}>
                        <LinkIcon sx={{ 
                          color: 'white', 
                          fontSize: '3rem',
                          filter: 'drop-shadow(0 4px 12px rgba(99, 102, 241, 0.3))'
                        }} />
                      </Box>
                    </motion.div>
                  </Box>

                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 800,
                      textAlign: 'center',
                      mb: 2,
                      color: 'white',
                      fontSize: { xs: '1.8rem', md: '2.2rem' },
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Drop Your Link
                  </Typography>

                  <Typography 
                    variant="body1" 
                    sx={{ 
                      textAlign: 'center',
                      mb: 5,
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '1.1rem',
                      lineHeight: 1.7,
                      maxWidth: '400px',
                      mx: 'auto'
                    }}
                  >
                    Paste any job posting URL and watch AI craft your perfect cold email in seconds
                  </Typography>
                  
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ mb: 5 }}>
                      <TextField
                        fullWidth
                        label="Job Posting URL"
                        placeholder="https://company.com/careers/job/123"
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
                            py: 1,
                            '& input': {
                              padding: '20px 24px',
                              fontSize: '1.1rem',
                            }
                          },
                          '& .MuiFormHelperText-root': {
                            background: 'rgba(239, 68, 68, 0.9)',
                            backdropFilter: 'blur(10px)',
                            margin: '12px 0 0 0',
                            padding: '12px 20px',
                            borderRadius: '16px',
                            color: 'white',
                            fontSize: '0.9rem',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
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
                            <CircularProgress size={28} sx={{ color: 'rgba(255, 255, 255, 0.9)' }} />
                          </motion.div>
                        ) : (
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <SendIcon />
                          </motion.div>
                        )}
                        sx={{
                          py: 2.5,
                          fontSize: '1.3rem',
                          fontWeight: 700,
                          borderRadius: '24px',
                          textTransform: 'none',
                          letterSpacing: '0.5px',
                          position: 'relative',
                          overflow: 'hidden',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: '-100%',
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                            transition: 'left 0.6s ease',
                          },
                          '&:hover::before': {
                            left: '100%',
                          },
                        }}
                      >
                        {emailMutation.isLoading ? 'Creating Magic...' : '✨ Generate Email'}
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
                        mt: 5, 
                        p: 4,
                        textAlign: 'center',
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                      }}>
                        <motion.div
                          animate={{ 
                            scale: [1, 1.05, 1],
                            opacity: [0.8, 1, 0.8]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Typography variant="h6" sx={{ 
                            color: 'white', 
                            mb: 1,
                            fontWeight: 700,
                            fontSize: '1.2rem'
                          }}>
                            🤖 AI Working Its Magic
                          </Typography>
                        </motion.div>
                        <Typography variant="body1" sx={{ 
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontSize: '1rem',
                          lineHeight: 1.6
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
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {result ? (
                <Fade in={!!result}>
                  <Box sx={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(30px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '32px',
                    boxShadow: '0 32px 64px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 40px 80px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                    },
                  }}>
                    <Box sx={{ p: 6, position: 'relative', zIndex: 1 }}>
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
                            background: 'rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(25px)',
                            borderRadius: '28px',
                            p: 4,
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                          }}>
                            <CheckIcon sx={{ 
                              color: 'white', 
                              fontSize: '3rem',
                              filter: 'drop-shadow(0 4px 12px rgba(255, 255, 255, 0.2))'
                            }} />
                          </Box>
                        </motion.div>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 5 }}>
                        <Typography 
                          variant="h3" 
                          sx={{ 
                            fontWeight: 800,
                            color: 'white',
                            fontSize: { xs: '1.8rem', md: '2.2rem' },
                            letterSpacing: '-0.01em',
                          }}
                        >
                          Email Ready! ✨
                        </Typography>
                        
                        <Stack direction="row" spacing={2}>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Tooltip title="Copy to clipboard" arrow>
                              <Button
                                onClick={() => copyToClipboard(result.email)}
                                sx={{
                                  minWidth: 'auto',
                                  p: 2,
                                  borderRadius: '20px',
                                  background: 'rgba(255, 255, 255, 0.08)',
                                  backdropFilter: 'blur(20px)',
                                  border: '1px solid rgba(255, 255, 255, 0.15)',
                                  color: 'white',
                                  '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    transform: 'translateY(-3px)',
                                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)'
                                  }
                                }}
                              >
                                <CopyIcon />
                              </Button>
                            </Tooltip>
                          </motion.div>
                          
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Tooltip title="Download email" arrow>
                              <Button
                                onClick={downloadEmail}
                                sx={{
                                  minWidth: 'auto',
                                  p: 2,
                                  borderRadius: '20px',
                                  background: 'rgba(255, 255, 255, 0.08)',
                                  backdropFilter: 'blur(20px)',
                                  border: '1px solid rgba(255, 255, 255, 0.15)',
                                  color: 'white',
                                  '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    transform: 'translateY(-3px)',
                                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)'
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
                          <Box sx={{ mb: 5 }}>
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                mb: 3, 
                                fontWeight: 700,
                                color: 'white',
                                fontSize: '1.3rem',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              🎯 Matched Portfolio Projects
                            </Typography>
                            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                              {result.matched_projects.map((project, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0, x: -20 }}
                                  animate={{ opacity: 1, scale: 1, x: 0 }}
                                  transition={{ delay: 0.1 * index, type: "spring", stiffness: 200 }}
                                >
                                  <Chip
                                    label={project.title || project}
                                    sx={{
                                      background: 'rgba(255, 255, 255, 0.1)',
                                      backdropFilter: 'blur(15px)',
                                      border: '1px solid rgba(255, 255, 255, 0.2)',
                                      color: 'white',
                                      fontWeight: 600,
                                      fontSize: '0.95rem',
                                      borderRadius: '16px',
                                      py: 3,
                                      px: 2,
                                      '&:hover': {
                                        background: 'rgba(255, 255, 255, 0.15)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
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
                            fontWeight: 700,
                            color: 'white',
                            fontSize: '1.3rem',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          ✉️ Your Personalized Email
                        </Typography>
                        
                        <Box sx={{
                          background: 'rgba(255, 255, 255, 0.04)',
                          backdropFilter: 'blur(25px)',
                          borderRadius: '28px',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          maxHeight: '600px',
                          overflow: 'auto',
                          position: 'relative',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                          },
                          // Custom scrollbar
                          '&::-webkit-scrollbar': {
                            width: '6px',
                          },
                          '&::-webkit-scrollbar-track': {
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '12px',
                            margin: '8px',
                          },
                          '&::-webkit-scrollbar-thumb': {
                            background: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '12px',
                            '&:hover': {
                              background: 'rgba(255, 255, 255, 0.3)',
                            }
                          }
                        }}>
                          <Box sx={{ p: 5 }}>
                            <ReactMarkdown
                              components={{
                                p: ({ children }) => (
                                  <Typography 
                                    variant="body1" 
                                    sx={{ 
                                      mb: 3, 
                                      lineHeight: 1.8,
                                      color: 'rgba(255, 255, 255, 0.9)',
                                      fontSize: '1.1rem'
                                    }}
                                  >
                                    {children}
                                  </Typography>
                                ),
                                h1: ({ children }) => (
                                  <Typography 
                                    variant="h5" 
                                    sx={{ 
                                      mb: 3, 
                                      fontWeight: 700,
                                      color: 'white',
                                      fontSize: '1.4rem'
                                    }}
                                  >
                                    {children}
                                  </Typography>
                                ),
                                h2: ({ children }) => (
                                  <Typography 
                                    variant="h6" 
                                    sx={{ 
                                      mb: 2.5, 
                                      fontWeight: 600,
                                      color: 'rgba(255, 255, 255, 0.95)',
                                      fontSize: '1.2rem'
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
                  background: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(30px)',
                  border: '2px dashed rgba(255, 255, 255, 0.1)',
                  borderRadius: '32px',
                  minHeight: '600px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    border: '2px dashed rgba(255, 255, 255, 0.15)',
                    background: 'rgba(255, 255, 255, 0.03)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.005) 50%, transparent 70%)',
                    animation: 'shimmer 6s infinite',
                  },
                  '@keyframes shimmer': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                  }
                }}>
                  <Box sx={{ textAlign: 'center', p: 8, position: 'relative', zIndex: 1 }}>
                    <motion.div
                      animate={{ 
                        y: [0, -20, 0],
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.15, 1]
                      }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Typography 
                        variant="h1" 
                        sx={{ 
                          mb: 4, 
                          fontSize: '5rem',
                          filter: 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.4))'
                        }}
                      >
                        ✨
                      </Typography>
                    </motion.div>
                    
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: 'white', 
                        mb: 2,
                        fontWeight: 800,
                        fontSize: { xs: '1.8rem', md: '2.2rem' },
                        letterSpacing: '-0.01em'
                      }}
                    >
                      Your AI-Generated Email
                    </Typography>
                    
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.6)',
                        mb: 4,
                        fontSize: '1.2rem',
                        lineHeight: 1.6,
                        fontWeight: 400
                      }}
                    >
                      Will appear here like magic ✨
                    </Typography>
                    
                    <motion.div
                      animate={{ 
                        scale: [1, 1.05, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Box sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 3,
                        px: 4,
                        py: 2,
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(15px)',
                        borderRadius: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}>
                        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.1rem' }}>
                          Enter a job URL to get started
                        </Typography>
                        <motion.div
                          animate={{ x: [0, 8, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Typography sx={{ color: 'rgba(99, 102, 241, 0.8)', fontSize: '1.2rem' }}>→</Typography>
                        </motion.div>
                      </Box>
                    </motion.div>
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
