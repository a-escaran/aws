const AWS = require('aws-sdk');

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function createLoginTable() {
    try {
       await delay(5000);
        // Specify the AWS credentials profile
        AWS.config.credentials = {
            accessKeyId: '',
            secretAccessKey: '',
            sessionToken: '', 
            profile: ''

        };

        // Set the region for AWS services
        AWS.config.update({ region: 'us-east-1' });

        // Create DynamoDB service object
        const dynamodb = new AWS.DynamoDB();

        // Define table schema
        const params = {
            TableName: 'login',
            KeySchema: [
                { AttributeName: 'email', KeyType: 'HASH' }, // Email as HASH key
                { AttributeName: 'password', KeyType: 'RANGE' } // Password as RANGE key
            ],
            AttributeDefinitions: [
                { AttributeName: 'email', AttributeType: 'S' }, // Email attribute
                { AttributeName: 'password', AttributeType: 'S' } // Password attribute
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        };

        // Create the table
        try {
            const data = await dynamodb.createTable(params).promise();
            console.log('Login table created successfully:', data);
        } catch (error) {
            if (error.code === 'ResourceInUseException') {
                // Table already exists, display a popup message
                console.log('Login table already exists.');
                return;
                // You can replace this console.log with your preferred way of displaying a popup message
            } else {
                throw error; // Re-throw other errors
            }
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

module.exports = createLoginTable;
