import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  useTheme
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Brush as BrushIcon,
  Cloud as CloudIcon,
  Psychology as PsychologyIcon,
  Email as EmailIcon
} from '@mui/icons-material';

const features = [
  {
    icon: <PsychologyIcon color="primary" />,
    title: "AI-Powered Job Analysis",
    description: "Advanced LLM analysis extracts key requirements, skills, and company details from job postings automatically."
  },
  {
    icon: <EmailIcon color="primary" />,
    title: "Personalized Email Generation",
    description: "Creates compelling, personalized cold emails that highlight relevant portfolio projects and experience."
  },
  {
    icon: <SpeedIcon color="primary" />,
    title: "Lightning Fast Processing",
    description: "Generates professional emails in seconds using optimized Groq API integration."
  },
  {
    icon: <SecurityIcon color="primary" />,
    title: "Privacy First",
    description: "Your data stays secure with local processing and encrypted API communications."
  },
  {
    icon: <BrushIcon color="primary" />,
    title: "Professional Templates",
    description: "Carefully crafted email templates optimized for different industries and roles."
  },
  {
    icon: <CloudIcon color="primary" />,
    title: "Portfolio Integration",
    description: "Automatically matches your portfolio projects to job requirements using vector similarity search."
  }
];

const techStack = [
  { category: "Frontend", items: ["React.js", "Material-UI", "Framer Motion", "React Query"] },
  { category: "Backend", items: ["Node.js", "Express", "Python Bridge", "RESTful API"] },
  { category: "AI/ML", items: ["LangChain", "Groq API", "Llama Models", "ChromaDB"] },
  { category: "Data", items: ["Vector Database", "CSV Processing", "Web Scraping"] },
  { category: "Deployment", items: ["Local & Cloud", "Docker Ready", "Environment Config"] }
];

const AboutPage = () => {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '80vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            About Cold Email Generator
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
            An AI-powered solution that transforms job applications with personalized,
            professional cold emails tailored to each opportunity.
          </Typography>
        </Box>

        {/* Problem & Solution */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 4, height: '100%', bgcolor: theme.palette.error.light + '10' }}>
              <Typography variant="h4" gutterBottom color="error">
                The Problem
              </Typography>
              <Typography variant="body1" paragraph>
                Job seekers spend hours crafting personalized emails for each application,
                often struggling to:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="• Match skills to specific job requirements" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Highlight relevant portfolio projects" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Maintain professional tone consistently" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Scale outreach efforts effectively" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 4, height: '100%', bgcolor: theme.palette.success.light + '10' }}>
              <Typography variant="h4" gutterBottom color="success.main">
                Our Solution
              </Typography>
              <Typography variant="body1" paragraph>
                An intelligent system that analyzes job postings and generates
                personalized emails by:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="AI-powered job requirement extraction" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Automatic portfolio project matching" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Professional email template generation" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Scalable automation workflow" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>

        {/* Features Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" component="h2" gutterBottom textAlign="center">
            Key Features
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Paper elevation={1} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {feature.icon}
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* How It Works */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" component="h2" gutterBottom textAlign="center">
            How It Works
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {[
              {
                step: "1",
                title: "Job URL Input",
                description: "Simply paste the job posting URL from any major job board or company website."
              },
              {
                step: "2",
                title: "AI Analysis",
                description: "Our LLM analyzes the job posting to extract requirements, skills, and company information."
              },
              {
                step: "3",
                title: "Portfolio Matching",
                description: "Vector search finds your most relevant portfolio projects and experiences."
              },
              {
                step: "4",
                title: "Email Generation",
                description: "AI generates a personalized, professional email highlighting your best matches."
              }
            ].map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 3, 
                    textAlign: 'center', 
                    height: '100%',
                    bgcolor: index % 2 === 0 ? theme.palette.primary.light + '15' : theme.palette.secondary.light + '15'
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2
                    }}
                  >
                    <Typography variant="h4" color="white" fontWeight="bold">
                      {step.step}
                    </Typography>
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Technical Architecture */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" component="h2" gutterBottom textAlign="center">
            Technical Architecture
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {techStack.map((tech, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    {tech.category}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {tech.items.map((item, idx) => (
                      <Chip 
                        key={idx} 
                        label={item} 
                        size="small" 
                        variant="outlined"
                        sx={{ alignSelf: 'flex-start' }}
                      />
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* FAQ Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" component="h2" gutterBottom textAlign="center">
            Frequently Asked Questions
          </Typography>
          <Box sx={{ mt: 4 }}>
            {[
              {
                question: "How accurate is the job analysis?",
                answer: "Our AI uses advanced language models to extract job requirements with high accuracy. It can identify skills, experience levels, company culture, and specific requirements from most job postings."
              },
              {
                question: "Can I customize the generated emails?",
                answer: "Yes! The generated email serves as a professional starting point. You can edit, customize, and personalize it further before sending."
              },
              {
                question: "What job boards are supported?",
                answer: "The tool works with any publicly accessible job posting URL, including LinkedIn, Indeed, Glassdoor, company career pages, and more."
              },
              {
                question: "How does portfolio matching work?",
                answer: "We use vector similarity search to match job requirements with your portfolio projects. The system analyzes project descriptions, technologies used, and outcomes to find the best matches."
              },
              {
                question: "Is my data secure?",
                answer: "Yes, your portfolio data is stored locally, and all API communications are encrypted. We prioritize privacy and data security."
              }
            ].map((faq, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1">{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>

        {/* Call to Action */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            bgcolor: theme.palette.primary.main,
            color: 'white'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Ready to Transform Your Job Applications?
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
            Start generating personalized cold emails that get results
          </Typography>
          <Alert severity="info" sx={{ maxWidth: 600, mx: 'auto' }}>
            <Typography variant="body1">
              Use the navigation menu to go to the Generator and paste any job URL to get started!
            </Typography>
          </Alert>
        </Paper>
      </Container>
    </Box>
  );
};

export default AboutPage;
