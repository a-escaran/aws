
const AWS = require('aws-sdk');

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function createMusicTable() {
    try {
        await delay(3000);

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
            TableName: 'music',
            KeySchema: [
                { AttributeName: 'title', KeyType: 'HASH' }, // Title as HASH key
                { AttributeName: 'artist', KeyType: 'RANGE' } // Artist as RANGE key
            ],
            AttributeDefinitions: [
                { AttributeName: 'title', AttributeType: 'S' }, // Title attribute
                { AttributeName: 'artist', AttributeType: 'S' } // Artist attribute
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        };

        // Create the table
        try {
            const data = await dynamodb.createTable(params).promise();
            console.log('Song table created successfully:', data);
        } catch (error) {
            if (error.code === 'ResourceInUseException') {
                // Table already exists, display a popup message
                console.log('Song table already exists.');
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
module.exports = createMusicTable;
