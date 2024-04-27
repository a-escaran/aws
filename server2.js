const express = require('express');
const bodyParser = require('body-parser');
const { DynamoDB, config: AWSConfig } = require('aws-sdk');
const cors = require('cors');

const app = express();
// Enable CORS
app.use(cors());
const PORT = process.env.PORT || 5000;

// Set AWS credentials
AWSConfig.credentials = {
    accessKeyId: '',
    secretAccessKey: '',
    sessionToken: '', 
    profile: ''

};

AWSConfig.update({ region: 'us-east-1' });

// Initialize DynamoDB client
const dynamodb = new DynamoDB.DocumentClient();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Login endpoint
app.post('/api/login', async (req, res) => { // Change to POST method for submitting credentials
    const { email, password } = req.body;

    // Perform validation against DynamoDB
    try {
        // Query DynamoDB to check if the user exists with the provided email and password
        const params = {
            TableName: 'login2',
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

app.post('/api/register', async (req, res) => {
    const { email, password, username} = req.body;

    // Check if the user already exists
    const existingUserParams = {
        TableName: 'login2',
        Key: {
            email: email
        }
    };

    try {
        const existingUser = await dynamodb.get(existingUserParams).promise();
        if (existingUser && existingUser.Item) {
            return res.status(400).json({ success: false, error: 'User already exists' });
        }
    } catch (error) {
        console.error('Error checking existing user:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }

    // Create a new user
    const newUserParams = {
        TableName: 'login2',
        Item: {
            email: email,
            password: password,
            username: username
        }
    };

    try {
        await dynamodb.put(newUserParams).promise();
        res.json({ success: true, message: 'Registration successful' });
    } catch (error) {
        console.error('Error creating new user:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});