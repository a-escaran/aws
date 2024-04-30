const fs = require('fs');
const AWS = require('aws-sdk');
const express = require('express');
const cors = require('cors');
const populateImages = require('./src/components/Services/S3pop')
const MusPop = require('./src/components/Services/MusPop')

const app = express();
app.use(cors());

// Specify the filepath to your AWS credentials file
const credentialsPath = './credentials'; // Update this path according to your environment

// Read the AWS credentials file
fs.readFile(credentialsPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading AWS credentials file:', err);
    return;
  }

  // Initialize default values
  let profile = 'default';
  let sessionToken = '';//Value to be added when needed to be used literally the only thing i couldnt automate for some ungodly reason
  let accessKeyId, secretAccessKey;

  // Parse the credentials from the file
  data.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length === 2) {
      const key = parts[0].trim();
      const value = parts[1].trim();
      if (key === 'profile') {
        profile = value;
      } else if (key === 'aws_access_key_id') {
        accessKeyId = value;
      } else if (key === 'aws_secret_access_key') {
        secretAccessKey = value;
      } 
    }
  });

  // Set AWS credentials
  AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    sessionToken: sessionToken,
    region: "us-east-1"
  });

  // Define a route to handle requests
  app.get('/aws-credentials', (req, res) => {
    res.json({ accessKeyId, secretAccessKey, sessionToken });
  });

  app.get('/api/populate-songs', async (req, res) => {
    try {
      // Extract AWS credentials from AWS configuration
      const { accessKeyId, secretAccessKey, sessionToken } = AWS.config.credentials || {};
      // Call MusPop function with AWS credentials
      await MusPop(accessKeyId, secretAccessKey, sessionToken);
      res.json({ message: 'Songs populated successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
    
  app.get('/api/populate-bucket', async (req, res) => {
    try {
      // Extract AWS credentials from AWS configuration
      const { accessKeyId, secretAccessKey, sessionToken } = AWS.config.credentials || {};
      // Call populateImages function with AWS credentials
      await populateImages(accessKeyId, secretAccessKey, sessionToken);
      res.json({ message: 'Bucket populated successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Login endpoint
app.post('/api/login', async (req, res) => { // Change to POST method for submitting credentials
  const { email, password } = req.body;

  // Perform validation against DynamoDB
  try {
      // Query DynamoDB to check if the user exists with the provided email and password
      const params = {
          TableName: 'login',
          Key: {
              email: email,
              password: password // Include password in the key
          }
      };

      // Perform the query
      const data = await dynamodb.get(params).promise();

      // If a user with the provided email and password exists
      if (data && data.Item) {
          // Return success response
          res.json({ success: true, message: 'Login successful' });
      } else {
          // Return error response if user not found or credentials are incorrect
          res.status(401).json({ success: false, error: 'Invalid email or password' });
      }
  } catch (error) {
      console.error('Error:', error);
      // Return error response if there's an internal server error
      res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

  // Start the Express server
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
});
