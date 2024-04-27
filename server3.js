const fs = require('fs');
const AWS = require('aws-sdk');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Specify the filepath to your AWS credentials file
const credentialsPath = 'C:/Users/Owner/.aws/credentials'; // Update this path according to your environment

// Read the AWS credentials file
fs.readFile(credentialsPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading AWS credentials file:', err);
    return;
  }

  // Initialize default values
  let profile = 'default';
  let sessionToken = 'IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIQCHDEfOaVcJ8f9fMhrptKVT+tt2DkxJxjXNU8cU3jf7qwIgL7fFOu8Kid/FFnJtJ1trDAS2Pmf8QXLHUBRNURDcOY0qvwIIiP//////////ARAAGgwyMTExMjU3Mzk5NTMiDLxA6DH1fAqkepQK6yqTAhACXSDiyoaHTvv6a71kr8yHn1NXZNNprvcNt9fkfHaB35jQJpkb9e2q/vE6oIVsYM3lbc0liMSTYffKpMfuuwIWcCZPerKamJqpsLbyj08XgyGU+H/dM4SAzZwH64ITXOssPCOXqXeKT+PD4Z/LJspgpa+BO7kyFXpm+rA5CBBby3dSLL4dUNMe19qC+1WumFEaMSUxX2K0mktedQtAEwFVZatCAKJHeccYpxzp8AiD60R3+L3p2V1bfeU6zpv7FKjF/fE2hPW0yEPwvW+9ZQ+QP2esrVfciWUYm7uxI/1+QU4X+kXYHaR+zbFwag6tqAM9xcEgXfNuG88Zx/X9N5i9mffiW8TgD0cDV+tkx9B5pzW4MNbSorEGOp0BxBrlGN3unp3qhxqRnLVfXby/ZPUPQ68dXEVZf0n4lsean7iuhG9SI78zUYaT38s2DwjE9qUYhDWu0O/5CLiC0fPP/p/EgurG2jfZsY+rdKgFYvAYpHiznUpDdvGXNdnhNLOSbHqo205SNBSizfMsloFMaJjUcUV13HufmdwXuFdKUKZvtADHT5CKUKzS1ajo83mEgb8Xz/mcma9MYQ==';
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

  // Start the Express server
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
});
