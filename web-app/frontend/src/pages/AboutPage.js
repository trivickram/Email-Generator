import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Code as CodeIcon,
  Psychology as AIIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const technologies = [
    'React.js', 'Node.js', 'Python', 'Material-UI', 'Express.js',
    'Groq AI', 'ChromaDB', 'LangChain', 'Streamlit'
  ];

  const features = [
    {
      icon: <AIIcon color="primary" />,
      title: 'AI-Powered Analysis',
      description: 'Uses Groq\'s Llama models to intelligently analyze job postings and extract key requirements.'
    },
    {
      icon: <CodeIcon color="primary" />,
      title: 'Portfolio Matching',
      description: 'Advanced vector search using ChromaDB to match relevant portfolio projects to job skills.'
    },
    {
      icon: <SpeedIcon color="primary" />,
      title: 'Fast Generation',
      description: 'Generate personalized cold emails in seconds with professional quality output.'
    },
    {
      icon: <SecurityIcon color="primary" />,
      title: 'Secure & Private',
      description: 'Your data is processed securely with no storage of personal information.'
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ maxWidth: 1000, mx: 'auto', p: 2 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
            About Cold Email Generator
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            An AI-powered tool that transforms job postings into personalized cold emails, 
            helping you connect with potential opportunities more effectively.
          </Typography>
        </Box>

        {/* How it Works */}
        <Card elevation={3} sx={{ mb: 6 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
              🔄 How It Works
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper elevation={1} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                  <Typography variant="h2" color="primary.main" gutterBottom>1</Typography>
                  <Typography variant="h6" gutterBottom>Analyze Job Posting</Typography>
                  <Typography variant="body2" color="text.secondary">
                    AI scrapes and analyzes the job posting to extract role, skills, and requirements
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={1} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                  <Typography variant="h2" color="primary.main" gutterBottom>2</Typography>
                  <Typography variant="h6" gutterBottom>Match Portfolio</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Vector search finds relevant portfolio projects that match the job requirements
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={1} sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                  <Typography variant="h2" color="primary.main" gutterBottom>3</Typography>
                  <Typography variant="h6" gutterBottom>Generate Email</Typography>
                  <Typography variant="body2" color="text.secondary">
                    AI crafts a personalized cold email highlighting relevant experience and skills
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Features */}
        <Card elevation={3} sx={{ mb: 6 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
              ✨ Key Features
            </Typography>
            <Grid container spacing={3}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{ mt: 1 }}>{feature.icon}</Box>
                    <Box>
                      <Typography variant="h6" gutterBottom>{feature.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card elevation={3} sx={{ mb: 6 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
              🛠️ Technology Stack
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mb: 3 }}>
              Built with modern technologies for performance, reliability, and scalability
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
              {technologies.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  color="primary"
                  variant="outlined"
                  sx={{ fontSize: '0.9rem', py: 1 }}
                />
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Architecture */}
        <Card elevation={3} sx={{ mb: 6 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
              🏗️ Architecture
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={1} sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom color="primary">Frontend</Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                      <ListItemText primary="React.js with Material-UI" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                      <ListItemText primary="Responsive design" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                      <ListItemText primary="Real-time updates" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                      <ListItemText primary="Modern animations" />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={1} sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom color="primary">Backend</Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                      <ListItemText primary="Node.js/Express API" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                      <ListItemText primary="Python integration" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                      <ListItemText primary="Groq AI/LangChain" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                      <ListItemText primary="ChromaDB vector store" />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Footer */}
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Built with ❤️ for more effective job applications and professional networking
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

export default AboutPage;
