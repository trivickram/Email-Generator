import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Button,
  Chip,
  useTheme
} from '@mui/material';
import {
  Code as CodeIcon,
  Storage as StorageIcon,
  Cloud as CloudIcon,
  Security as SecurityIcon,
  Build as BuildIcon,
  PlayArrow as PlayArrowIcon,
  GitHub as GitHubIcon
} from '@mui/icons-material';

const DocumentationPage = () => {
  const theme = useTheme();

  const setupSteps = [
    {
      title: "1. Clone Repository",
      code: `git clone <repository-url>
cd NewApp`,
      description: "Get the latest version of the code"
    },
    {
      title: "2. Backend Setup",
      code: `cd web-app/backend
npm install`,
      description: "Install Node.js dependencies"
    },
    {
      title: "3. Frontend Setup", 
      code: `cd web-app/frontend
npm install`,
      description: "Install React dependencies"
    },
    {
      title: "4. Python Environment",
      code: `pip install -r requirements.txt`,
      description: "Install Python dependencies"
    },
    {
      title: "5. Environment Variables",
      code: `# Create .env file in streamlit-app directory
GROQ_API_KEY=your_groq_api_key_here`,
      description: "Configure API keys"
    }
  ];

  const apiEndpoints = [
    {
      method: "POST",
      endpoint: "/api/email/generate",
      description: "Generate cold email from job URL",
      payload: { jobUrl: "https://example.com/job" },
      response: "Generated email with job analysis"
    },
    {
      method: "GET", 
      endpoint: "/api/portfolio",
      description: "Get portfolio data",
      response: "Array of portfolio projects"
    },
    {
      method: "POST",
      endpoint: "/api/portfolio/match",
      description: "Find relevant portfolio matches",
      payload: { skills: ["React", "Python", "AI"] },
      response: "Matched portfolio projects"
    }
  ];

  const architectureComponents = [
    {
      name: "React Frontend",
      description: "Modern web interface with Material-UI components",
      tech: ["React.js", "Material-UI", "React Query", "Framer Motion"]
    },
    {
      name: "Node.js Backend",
      description: "RESTful API server with Python bridge",
      tech: ["Express.js", "Node.js", "Python Bridge", "CORS"]
    },
    {
      name: "Python AI Core",
      description: "AI processing and email generation",
      tech: ["LangChain", "Groq API", "ChromaDB", "WebBaseLoader"]
    },
    {
      name: "Vector Database",
      description: "Portfolio similarity matching",
      tech: ["ChromaDB", "Vector Search", "Embeddings"]
    }
  ];

  return (
    <Box sx={{ minHeight: '80vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Documentation
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Complete guide to setup, deployment, and API usage
          </Typography>
        </Box>

        {/* Quick Start */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" gutterBottom>
            Quick Start
          </Typography>
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body1">
              <strong>Prerequisites:</strong> Node.js 16+, Python 3.8+, Git
            </Typography>
          </Alert>
          
          <Grid container spacing={3}>
            {setupSteps.map((step, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card elevation={2} sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      {step.title}
                    </Typography>
                    <Typography variant="body2" paragraph color="text.secondary">
                      {step.description}
                    </Typography>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        bgcolor: theme.palette.grey[100],
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        overflow: 'auto'
                      }}
                    >
                      <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                        {step.code}
                      </pre>
                    </Paper>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Architecture */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" gutterBottom>
            System Architecture
          </Typography>
          <Grid container spacing={3}>
            {architectureComponents.map((component, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CodeIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      {component.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" paragraph color="text.secondary">
                    {component.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {component.tech.map((tech, idx) => (
                      <Chip 
                        key={idx} 
                        label={tech} 
                        size="small" 
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* API Reference */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" gutterBottom>
            API Reference
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            RESTful API endpoints for integration with the Cold Email Generator
          </Typography>
          
          {apiEndpoints.map((api, index) => (
            <Paper key={index} elevation={1} sx={{ p: 3, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Chip 
                  label={api.method} 
                  color={api.method === 'GET' ? 'success' : 'primary'}
                  sx={{ mr: 2 }}
                />
                <Typography variant="h6" component="code" sx={{ fontFamily: 'monospace' }}>
                  {api.endpoint}
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                {api.description}
              </Typography>
              
              {api.payload && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Request Body:
                  </Typography>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: theme.palette.grey[100] }}>
                    <pre style={{ margin: 0, fontSize: '0.85rem' }}>
                      {JSON.stringify(api.payload, null, 2)}
                    </pre>
                  </Paper>
                </Box>
              )}
              
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Response:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {api.response}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>

        {/* Development */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" gutterBottom>
            Development Guide
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PlayArrowIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h5">
                    Running Locally
                  </Typography>
                </Box>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <StorageIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Backend Server"
                      secondary="npm run dev (Port 5000)"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CodeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Frontend Dev Server"
                      secondary="npm start (Port 3000)"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <BuildIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Streamlit App"
                      secondary="streamlit run app/main.py"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SecurityIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h5">
                    Environment Setup
                  </Typography>
                </Box>
                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="GROQ_API_KEY"
                      secondary="Required for AI processing"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="NODE_ENV"
                      secondary="development/production"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="PORT"
                      secondary="Backend server port (default: 5000)"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Deployment */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" gutterBottom>
            Deployment Options
          </Typography>
          
          <Grid container spacing={3}>
            {[
              {
                icon: <CloudIcon color="primary" />,
                title: "Cloud Deployment",
                description: "Deploy to Heroku, Vercel, or AWS",
                features: ["Auto-scaling", "CDN", "SSL", "Monitoring"]
              },
              {
                icon: <BuildIcon color="primary" />,
                title: "Docker Container",
                description: "Containerized deployment",
                features: ["Portable", "Scalable", "Isolated", "Version controlled"]
              },
              {
                icon: <StorageIcon color="primary" />,
                title: "Local Server",
                description: "Self-hosted deployment",
                features: ["Full control", "Custom config", "Private", "Cost-effective"]
              }
            ].map((option, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper elevation={2} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>
                    {option.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {option.title}
                  </Typography>
                  <Typography variant="body2" paragraph color="text.secondary">
                    {option.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                    {option.features.map((feature, idx) => (
                      <Chip key={idx} label={feature} size="small" />
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Support */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            bgcolor: theme.palette.primary.light + '20'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Need Help?
          </Typography>
          <Typography variant="body1" paragraph>
            Check out our comprehensive guides and community resources
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              variant="outlined" 
              startIcon={<GitHubIcon />}
              onClick={() => window.open('#', '_blank')}
            >
              GitHub Repository
            </Button>
            <Button 
              variant="outlined"
              onClick={() => window.open('#', '_blank')}
            >
              View Examples
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default DocumentationPage;
