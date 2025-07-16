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
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(30px)',
      border: '0.5px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '24px',
      p: { xs: 3, md: 4 },
      textAlign: 'center',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '240px',
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-12px) scale(1.02)',
        background: 'rgba(255, 255, 255, 0.06)',
        border: '0.5px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 32px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
      }
    }}>
      <Box sx={{
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '20px',
        p: 2.5,
        display: 'inline-flex',
        mb: 3,
        alignSelf: 'center',
        backdropFilter: 'blur(20px)',
        border: '0.5px solid rgba(255, 255, 255, 0.12)',
        transition: 'all 0.3s ease',
        '&:hover': {
          background: 'rgba(255, 255, 255, 0.12)',
          transform: 'scale(1.05)',
        }
      }}>
        {icon}
      </Box>
      <Typography variant="h6" sx={{ 
        fontWeight: 600, 
        mb: 2, 
        color: 'white',
        fontSize: '1.25rem',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ 
        flexGrow: 1,
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '1rem',
        lineHeight: 1.5,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      }}>
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
                  fontSize: { xs: '3.5rem', md: '6rem', lg: '8rem' },
                  fontWeight: 900, // Ultra-bold like Apple
                  color: 'white',
                  mb: 4,
                  background: `
                    linear-gradient(180deg, 
                      #ffffff 0%, 
                      #e5e7eb 20%, 
                      #d1d5db 40%, 
                      #9ca3af 60%, 
                      #6b7280 80%, 
                      #4b5563 100%
                    )
                  `,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: { xs: '-0.04em', md: '-0.06em' },
                  lineHeight: { xs: 0.9, md: 0.85 },
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", system-ui, sans-serif',
                  textTransform: 'none',
                  position: 'relative',
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
                  // Apple's signature text shadow for depth
                  textShadow: `
                    0 1px 0 rgba(255, 255, 255, 0.4),
                    0 2px 2px rgba(0, 0, 0, 0.2),
                    0 4px 8px rgba(0, 0, 0, 0.1)
                  `,
                  // Titanium-like metallic effect
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `
                      linear-gradient(45deg, 
                        transparent 30%, 
                        rgba(255, 255, 255, 0.1) 50%, 
                        transparent 70%
                      )
                    `,
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 3s ease-in-out infinite',
                    pointerEvents: 'none',
                  },
                  '@keyframes shimmer': {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                  },
                }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  AI Cold Email
                </motion.span>
                <Box component="span" sx={{ 
                  display: 'block',
                  background: `
                    linear-gradient(180deg, 
                      rgba(255, 255, 255, 0.9) 0%, 
                      rgba(229, 231, 235, 0.8) 30%, 
                      rgba(156, 163, 175, 0.7) 70%, 
                      rgba(107, 114, 128, 0.6) 100%
                    )
                  `,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 200, // Thinner for "Generator" like Apple does
                  mt: 1,
                  opacity: 0.85,
                }}>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.9 }}
                  >
                    Generator
                  </motion.span>
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
                  maxWidth: 800, 
                  mx: 'auto',
                  color: 'rgba(255, 255, 255, 0.75)',
                  fontSize: { xs: '1.125rem', md: '1.3rem', lg: '1.4rem' },
                  lineHeight: { xs: 1.5, md: 1.4 },
                  mb: 8,
                  fontWeight: 400,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                  letterSpacing: '0.01em',
                }}
              >
                Transform any job posting into a personalized cold email using cutting-edge AI. 
                <Box component="span" sx={{ color: 'rgba(255, 255, 255, 0.95)', fontWeight: 500 }}>
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
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(40px)',
                border: '0.5px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '32px',
                boxShadow: '0 32px 64px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '0.5px solid rgba(255, 255, 255, 0.12)',
                  transform: 'translateY(-8px)',
                  boxShadow: '0 48px 96px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
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
                      fontWeight: 600,
                      textAlign: 'center',
                      mb: 2,
                      color: 'white',
                      fontSize: { xs: '2rem', md: '2.5rem' },
                      letterSpacing: '-0.02em',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                    }}
                  >
                    Drop Your Link
                  </Typography>

                  <Typography 
                    variant="body1" 
                    sx={{ 
                      textAlign: 'center',
                      mb: 6,
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '1.125rem',
                      lineHeight: 1.6,
                      maxWidth: '420px',
                      mx: 'auto',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
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
                          py: 3,
                          fontSize: '1.125rem',
                          fontWeight: 600,
                          borderRadius: '28px',
                          textTransform: 'none',
                          letterSpacing: '0.01em',
                          position: 'relative',
                          overflow: 'hidden',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                          background: 'rgba(255, 255, 255, 0.08)',
                          backdropFilter: 'blur(20px)',
                          border: '0.5px solid rgba(255, 255, 255, 0.15)',
                          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 0.12)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                          },
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: '-100%',
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                            transition: 'left 0.7s ease',
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
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(40px)',
                    border: '0.5px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '32px',
                    boxShadow: '0 32px 64px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '0.5px solid rgba(255, 255, 255, 0.12)',
                      transform: 'translateY(-8px)',
                      boxShadow: '0 48px 96px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
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
                            fontWeight: 600,
                            color: 'white',
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            letterSpacing: '-0.02em',
                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
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
                  background: 'rgba(255, 255, 255, 0.015)',
                  backdropFilter: 'blur(40px)',
                  border: '1px dashed rgba(255, 255, 255, 0.08)',
                  borderRadius: '32px',
                  minHeight: '600px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  '&:hover': {
                    border: '1px dashed rgba(255, 255, 255, 0.15)',
                    background: 'rgba(255, 255, 255, 0.025)',
                    transform: 'translateY(-4px)',
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
                        mb: 3,
                        fontWeight: 600,
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        letterSpacing: '-0.02em',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                      }}
                    >
                      Your AI-Generated Email
                    </Typography>
                    
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)',
                        mb: 6,
                        fontSize: '1.25rem',
                        lineHeight: 1.5,
                        fontWeight: 400,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
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
                        gap: 4,
                        px: 5,
                        py: 3,
                        background: 'rgba(255, 255, 255, 0.06)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        border: '0.5px solid rgba(255, 255, 255, 0.12)',
                        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.1)',
                          transform: 'translateY(-2px)',
                        }
                      }}>
                        <Typography variant="body1" sx={{ 
                          color: 'rgba(255, 255, 255, 0.8)', 
                          fontSize: '1.125rem',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                        }}>
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
