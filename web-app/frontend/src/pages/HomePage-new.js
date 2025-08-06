import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Chip,
  Tooltip,
  Grid,
  Container,
  Stack,
  Fade,
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
    transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    style={{ height: '100%' }}
  >
    <Card sx={{
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(30px)',
      border: '0.5px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '24px',
      p: { xs: 2.5, md: 3.5 },
      textAlign: 'center',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      minHeight: { xs: '200px', md: '240px' },
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
        opacity: 0,
        transition: 'opacity 0.4s ease',
      },
      '&:hover': {
        transform: { xs: 'translateY(-8px) scale(1.01)', md: 'translateY(-12px) scale(1.02)' },
        background: 'rgba(255, 255, 255, 0.06)',
        border: '0.5px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 32px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
        '&::before': {
          opacity: 1,
        }
      },
      '&:active': {
        transform: { xs: 'translateY(-4px) scale(0.99)', md: 'translateY(-8px) scale(0.99)' },
      }
    }}>
      <Box sx={{
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '20px',
        p: { xs: 2, md: 2.5 },
        display: 'inline-flex',
        mb: { xs: 2, md: 3 },
        alignSelf: 'center',
        backdropFilter: 'blur(20px)',
        border: '0.5px solid rgba(255, 255, 255, 0.12)',
        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        '&:hover': {
          background: 'rgba(255, 255, 255, 0.12)',
          transform: 'scale(1.05) rotate(2deg)',
        }
      }}>
        {React.cloneElement(icon, { 
          sx: { 
            color: 'white', 
            fontSize: { xs: '1.8rem', md: '2rem' },
            filter: 'drop-shadow(0 4px 12px rgba(255, 255, 255, 0.2))'
          } 
        })}
      </Box>
      <Typography variant="h6" sx={{ 
        fontWeight: 600, 
        mb: { xs: 1.5, md: 2 }, 
        color: 'white',
        fontSize: { xs: '1.1rem', md: '1.25rem' },
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ 
        flexGrow: 1,
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: { xs: '0.9rem', md: '1rem' },
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box sx={{ 
        minHeight: '100vh',
        background: '#000000',
        position: 'relative',
        overflow: 'hidden'
      }}>
      {/* Enhanced Animated Background Elements */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 1
      }}>
        {/* Dynamic floating orbs with better responsiveness */}
        <motion.div
          animate={{ 
            y: [0, -40, 0],
            x: [0, 30, 0],
            rotate: [0, 15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        >
          <Box sx={{
            position: 'absolute',
            top: { xs: '10%', md: '15%' },
            right: { xs: '5%', md: '15%' },
            width: { xs: '200px', sm: '300px', md: '400px', lg: '500px' },
            height: { xs: '200px', sm: '300px', md: '400px', lg: '500px' },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 50%, transparent 70%)',
            filter: 'blur(60px)',
          }} />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 50, 0],
            x: [0, -35, 0],
            rotate: [0, -20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <Box sx={{
            position: 'absolute',
            bottom: { xs: '5%', md: '10%' },
            left: { xs: '0%', md: '5%' },
            width: { xs: '180px', sm: '250px', md: '320px', lg: '400px' },
            height: { xs: '180px', sm: '250px', md: '320px', lg: '400px' },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 50%, transparent 70%)',
            filter: 'blur(80px)',
          }} />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -25, 0],
            x: [0, 20, 0],
            scale: [1, 1.15, 1],
            rotate: [0, 25, 0]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        >
          <Box sx={{
            position: 'absolute',
            top: { xs: '40%', md: '50%' },
            right: { xs: '-5%', md: '0%' },
            width: { xs: '150px', sm: '200px', md: '280px', lg: '350px' },
            height: { xs: '150px', sm: '200px', md: '280px', lg: '350px' },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 70%)',
            filter: 'blur(70px)',
          }} />
        </motion.div>

        {/* Subtle grid pattern overlay */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px)
          `,
          backgroundSize: { xs: '30px 30px', md: '40px 40px' },
          opacity: 0.3,
        }} />
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
                  fontSize: { 
                    xs: '2.5rem', 
                    sm: '3.5rem', 
                    md: '5rem', 
                    lg: '6.5rem',
                    xl: '8rem' 
                  },
                  fontWeight: 900,
                  color: 'white',
                  mb: { xs: 3, md: 4 },
                  background: `
                    linear-gradient(180deg, 
                      #ffffff 0%, 
                      #f8fafc 15%,
                      #e2e8f0 30%, 
                      #cbd5e1 50%, 
                      #94a3b8 70%, 
                      #64748b 85%,
                      #475569 100%
                    )
                  `,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: { xs: '-0.03em', md: '-0.05em', lg: '-0.06em' },
                  lineHeight: { xs: 0.95, md: 0.9, lg: 0.85 },
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", system-ui, sans-serif',
                  textTransform: 'none',
                  position: 'relative',
                  filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4))',
                  textShadow: `
                    0 1px 0 rgba(255, 255, 255, 0.4),
                    0 3px 4px rgba(0, 0, 0, 0.3),
                    0 6px 12px rgba(0, 0, 0, 0.15)
                  `,
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
                        rgba(255, 255, 255, 0.08) 50%, 
                        transparent 70%
                      )
                    `,
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 4s ease-in-out infinite',
                    pointerEvents: 'none',
                  },
                  '@keyframes shimmer': {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                  },
                  // Improved mobile text rendering
                  '@media (max-width: 600px)': {
                    textAlign: 'center',
                    wordBreak: 'break-word',
                    hyphens: 'auto',
                  }
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

            {/* Enhanced Feature Cards */}
            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 4, md: 6 } }}>
              <Grid item xs={12} sm={6} md={3}>
                <FeatureCard
                  icon={<AIIcon />}
                  title="AI-Powered"
                  description="Advanced LLaMA models analyze job requirements with precision"
                  delay={0.2}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FeatureCard
                  icon={<SpeedIcon />}
                  title="Lightning Fast"
                  description="Generate personalized emails in seconds, not hours"
                  delay={0.3}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FeatureCard
                  icon={<TrendingIcon />}
                  title="Smart Matching"
                  description="Automatically matches your relevant projects and skills"
                  delay={0.4}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FeatureCard
                  icon={<CheckIcon />}
                  title="Personalized"
                  description="Tailored content for maximum impact and engagement"
                  delay={0.5}
                />
              </Grid>
            </Grid>
          </Box>
        </motion.div>

        <Grid container spacing={{ xs: 3, md: 4 }} sx={{ alignItems: 'stretch' }}>
          {/* Enhanced Input Form */}
          <Grid item xs={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, x: -80, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                scale: { xs: 1.01, md: 1.02 },
                transition: { duration: 0.3 }
              }}
            >
              <Box sx={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(40px)',
                border: '0.5px solid rgba(255, 255, 255, 0.06)',
                borderRadius: { xs: '24px', md: '32px' },
                boxShadow: '0 32px 64px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '0.5px solid rgba(255, 255, 255, 0.12)',
                  transform: { xs: 'translateY(-8px)', md: 'translateY(-12px)' },
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
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.02) 50%, transparent 70%)',
                  opacity: 0,
                  transition: 'opacity 0.6s ease',
                },
                '&:hover::after': {
                  opacity: 1,
                },
              }}>
                <Box sx={{ p: { xs: 4, md: 6 }, position: 'relative', zIndex: 1 }}>
                  {/* Enhanced Header Icon */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mb: { xs: 3, md: 4 }
                  }}>
                    <motion.div
                      animate={{ 
                        y: [0, -15, 0],
                        rotateY: [0, 25, 0],
                        scale: [1, 1.08, 1]
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Box sx={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(25px)',
                        borderRadius: { xs: '20px', md: '28px' },
                        p: { xs: 3, md: 4 },
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
                          borderRadius: { xs: '20px', md: '28px' },
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
                          fontSize: { xs: '2.5rem', md: '3rem' },
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
                      mb: { xs: 1.5, md: 2 },
                      color: 'white',
                      fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
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
                      mb: { xs: 4, md: 6 },
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: { xs: '1rem', md: '1.125rem' },
                      lineHeight: 1.6,
                      maxWidth: '420px',
                      mx: 'auto',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                    }}
                  >
                    Paste any job posting URL and watch AI craft your perfect cold email in seconds
                  </Typography>
                  
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ mb: { xs: 4, md: 5 } }}>
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
                            py: { xs: 0.5, md: 1 },
                            borderRadius: { xs: '16px', md: '20px' },
                            background: 'rgba(255, 255, 255, 0.03)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            '&:hover': {
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                            },
                            '&.Mui-focused': {
                              background: 'rgba(255, 255, 255, 0.06)',
                              border: '1px solid rgba(99, 102, 241, 0.5)',
                              boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)',
                            },
                            '& input': {
                              padding: { xs: '16px 20px', md: '20px 24px' },
                              fontSize: { xs: '1rem', md: '1.1rem' },
                              color: 'white',
                              '&::placeholder': {
                                color: 'rgba(255, 255, 255, 0.5)',
                                opacity: 1,
                              }
                            },
                            '& fieldset': {
                              border: 'none',
                            }
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            '&.Mui-focused': {
                              color: 'rgba(99, 102, 241, 0.8)',
                            }
                          },
                          '& .MuiFormHelperText-root': {
                            background: 'rgba(239, 68, 68, 0.9)',
                            backdropFilter: 'blur(10px)',
                            margin: '12px 0 0 0',
                            padding: { xs: '10px 16px', md: '12px 20px' },
                            borderRadius: { xs: '12px', md: '16px' },
                            color: 'white',
                            fontSize: { xs: '0.85rem', md: '0.9rem' },
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                          }
                        }}
                      />
                    </Box>

                    <motion.div
                      whileHover={{ 
                        scale: emailMutation.isLoading ? 1 : 1.02,
                        y: emailMutation.isLoading ? 0 : -2 
                      }}
                      whileTap={{ scale: emailMutation.isLoading ? 1 : 0.98 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 25 
                      }}
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
                            <CircularProgress 
                              size={24} 
                              sx={{ 
                                color: 'rgba(255, 255, 255, 0.9)',
                                '& .MuiCircularProgress-circle': {
                                  strokeLinecap: 'round',
                                }
                              }} 
                            />
                          </motion.div>
                        ) : (
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <SendIcon sx={{ fontSize: { xs: '1.2rem', md: '1.4rem' } }} />
                          </motion.div>
                        )}
                        sx={{
                          py: { xs: 2.5, md: 3 },
                          px: { xs: 3, md: 4 },
                          fontSize: { xs: '1rem', md: '1.125rem' },
                          fontWeight: 600,
                          borderRadius: { xs: '20px', md: '28px' },
                          textTransform: 'none',
                          letterSpacing: '0.01em',
                          position: 'relative',
                          overflow: 'hidden',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                          background: emailMutation.isLoading 
                            ? 'rgba(255, 255, 255, 0.06)' 
                            : 'rgba(255, 255, 255, 0.08)',
                          backdropFilter: 'blur(20px)',
                          border: '0.5px solid rgba(255, 255, 255, 0.15)',
                          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                          '&:hover': {
                            background: emailMutation.isLoading 
                              ? 'rgba(255, 255, 255, 0.06)'
                              : 'rgba(255, 255, 255, 0.12)',
                            transform: emailMutation.isLoading ? 'none' : 'translateY(-2px)',
                            boxShadow: emailMutation.isLoading 
                              ? '0 8px 20px rgba(0, 0, 0, 0.3)'
                              : '0 20px 40px rgba(0, 0, 0, 0.4)',
                            border: emailMutation.isLoading 
                              ? '0.5px solid rgba(255, 255, 255, 0.15)'
                              : '0.5px solid rgba(255, 255, 255, 0.25)',
                          },
                          '&:disabled': {
                            opacity: emailMutation.isLoading ? 1 : 0.6,
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
                            left: emailMutation.isLoading ? '-100%' : '100%',
                          },
                          '& .MuiButton-startIcon': {
                            mr: { xs: 1.5, md: 2 },
                          }
                        }}
                      >
                        <motion.span
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {emailMutation.isLoading ? 'Creating Magic...' : '✨ Generate Email'}
                        </motion.span>
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
                        mt: { xs: 4, md: 5 }, 
                        p: { xs: 3, md: 4 },
                        textAlign: 'center',
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: { xs: '20px', md: '24px' },
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
                            mb: { xs: 0.5, md: 1 },
                            fontWeight: 700,
                            fontSize: { xs: '1.1rem', md: '1.2rem' },
                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                          }}>
                            🤖 AI Working Its Magic
                          </Typography>
                        </motion.div>
                        <Typography variant="body1" sx={{ 
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontSize: { xs: '0.95rem', md: '1rem' },
                          lineHeight: 1.6,
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
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
              initial={{ opacity: 0, x: 80, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              {result ? (
                <Fade in={!!result}>
                  <Box sx={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(40px)',
                    border: '0.5px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: { xs: '24px', md: '32px' },
                    boxShadow: '0 32px 64px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '0.5px solid rgba(255, 255, 255, 0.12)',
                      transform: { xs: 'translateY(-8px)', md: 'translateY(-12px)' },
                      boxShadow: '0 48px 96px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.5), transparent)',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.02) 50%, transparent 70%)',
                      opacity: 0,
                      transition: 'opacity 0.6s ease',
                    },
                    '&:hover::after': {
                      opacity: 1,
                    },
                  }}>
                    <Box sx={{ 
                      p: { xs: 4, md: 6 }, 
                      position: 'relative', 
                      zIndex: 1 
                    }}>
                      {/* Success Header */}
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        mb: { xs: 3, md: 4 }
                      }}>
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        >
                          <Box sx={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(25px)',
                            borderRadius: { xs: '20px', md: '28px' },
                            p: { xs: 3, md: 4 },
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                          }}>
                            <CheckIcon sx={{ 
                              color: 'white', 
                              fontSize: { xs: '2.5rem', md: '3rem' },
                              filter: 'drop-shadow(0 4px 12px rgba(255, 255, 255, 0.2))'
                            }} />
                          </Box>
                        </motion.div>
                      </Box>

                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        mb: { xs: 4, md: 5 },
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: { xs: 2, sm: 0 }
                      }}>
                        <Typography 
                          variant="h3" 
                          sx={{ 
                            fontWeight: 600,
                            color: 'white',
                            fontSize: { xs: '1.8rem', sm: '2rem', md: '2.5rem' },
                            letterSpacing: '-0.02em',
                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                            textAlign: { xs: 'center', sm: 'left' }
                          }}
                        >
                          Email Ready! ✨
                        </Typography>
                        
                        <Stack 
                          direction="row" 
                          spacing={{ xs: 1.5, md: 2 }}
                        >
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Tooltip title="Copy to clipboard" arrow>
                              <Button
                                onClick={() => copyToClipboard(result.email)}
                                sx={{
                                  minWidth: 'auto',
                                  p: { xs: 1.5, md: 2 },
                                  borderRadius: { xs: '16px', md: '20px' },
                                  background: 'rgba(255, 255, 255, 0.08)',
                                  backdropFilter: 'blur(20px)',
                                  border: '1px solid rgba(255, 255, 255, 0.15)',
                                  color: 'white',
                                  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                  '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    transform: 'translateY(-3px)',
                                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)',
                                    border: '1px solid rgba(255, 255, 255, 0.25)',
                                  }
                                }}
                              >
                                <CopyIcon sx={{ fontSize: { xs: '1.2rem', md: '1.4rem' } }} />
                              </Button>
                            </Tooltip>
                          </motion.div>
                          
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Tooltip title="Download as text file" arrow>
                              <Button
                                onClick={() => downloadEmail(result.email)}
                                sx={{
                                  minWidth: 'auto',
                                  p: { xs: 1.5, md: 2 },
                                  borderRadius: { xs: '16px', md: '20px' },
                                  background: 'rgba(255, 255, 255, 0.08)',
                                  backdropFilter: 'blur(20px)',
                                  border: '1px solid rgba(255, 255, 255, 0.15)',
                                  color: 'white',
                                  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                  '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    transform: 'translateY(-3px)',
                                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)',
                                    border: '1px solid rgba(255, 255, 255, 0.25)',
                                  }
                                }}
                              >
                                <DownloadIcon sx={{ fontSize: { xs: '1.2rem', md: '1.4rem' } }} />
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
                            mb: { xs: 2, md: 3 }, 
                            fontWeight: 700,
                            color: 'white',
                            fontSize: { xs: '1.1rem', md: '1.3rem' },
                            display: 'flex',
                            alignItems: 'center',
                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                          }}
                        >
                          ✉️ Your Personalized Email
                        </Typography>
                        
                        <Box sx={{
                          background: 'rgba(255, 255, 255, 0.04)',
                          backdropFilter: 'blur(25px)',
                          borderRadius: { xs: '20px', md: '28px' },
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          maxHeight: { xs: '500px', md: '600px' },
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
                            width: { xs: '4px', md: '6px' },
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
                          <Box sx={{ p: { xs: 3, md: 5 } }}>
                            <ReactMarkdown
                              components={{
                                p: ({ children }) => (
                                  <Typography 
                                    variant="body1" 
                                    sx={{ 
                                      mb: { xs: 2, md: 3 }, 
                                      lineHeight: 1.8,
                                      color: 'rgba(255, 255, 255, 0.9)',
                                      fontSize: { xs: '1rem', md: '1.1rem' },
                                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                                    }}
                                  >
                                    {children}
                                  </Typography>
                                ),
                                h1: ({ children }) => (
                                  <Typography 
                                    variant="h5" 
                                    sx={{ 
                                      mb: { xs: 2, md: 3 }, 
                                      fontWeight: 700,
                                      color: 'white',
                                      fontSize: { xs: '1.25rem', md: '1.4rem' },
                                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                                    }}
                                  >
                                    {children}
                                  </Typography>
                                ),
                                h2: ({ children }) => (
                                  <Typography 
                                    variant="h6" 
                                    sx={{ 
                                      mb: { xs: 2, md: 2.5 }, 
                                      fontWeight: 600,
                                      color: 'rgba(255, 255, 255, 0.95)',
                                      fontSize: { xs: '1.1rem', md: '1.2rem' },
                                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
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
                  borderRadius: { xs: '24px', md: '32px' },
                  minHeight: { xs: '500px', md: '600px' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  '&:hover': {
                    border: '1px dashed rgba(255, 255, 255, 0.15)',
                    background: 'rgba(255, 255, 255, 0.025)',
                    transform: { xs: 'translateY(-4px) scale(1.005)', md: 'translateY(-8px) scale(1.01)' },
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.008) 50%, transparent 70%)',
                    backgroundSize: '200% 200%',
                    animation: 'shimmerSlow 8s ease-in-out infinite',
                  },
                  '@keyframes shimmerSlow': {
                    '0%': { backgroundPosition: '-200% -200%' },
                    '50%': { backgroundPosition: '200% 200%' },
                    '100%': { backgroundPosition: '-200% -200%' },
                  }
                }}>
                  <Box sx={{ 
                    textAlign: 'center', 
                    p: { xs: 6, md: 8 }, 
                    position: 'relative', 
                    zIndex: 1 
                  }}>
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
                          mb: { xs: 3, md: 4 }, 
                          fontSize: { xs: '3.5rem', md: '5rem' },
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
                        mb: { xs: 2, md: 3 },
                        fontWeight: 600,
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
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
                        mb: { xs: 4, md: 6 },
                        fontSize: { xs: '1rem', md: '1.25rem' },
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
                        gap: { xs: 2, md: 4 },
                        px: { xs: 3, md: 5 },
                        py: { xs: 2, md: 3 },
                        background: 'rgba(255, 255, 255, 0.06)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: { xs: '16px', md: '24px' },
                        border: '0.5px solid rgba(255, 255, 255, 0.12)',
                        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.1)',
                          transform: 'translateY(-2px)',
                        }
                      }}>
                        <Typography variant="body1" sx={{ 
                          color: 'rgba(255, 255, 255, 0.8)', 
                          fontSize: { xs: '1rem', md: '1.125rem' },
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
    </motion.div>
  );
};

export default HomePage;
