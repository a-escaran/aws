const AWS = require('aws-sdk');
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function UserPop(accessKeyId, secretAccessKey, sessionToken) {
    await delay(15000);
    try {
        // Specify the AWS credentials profile
        AWS.config.credentials = {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            sessionToken: sessionToken, 
            profile: 'default'
        };


        // Set the region for AWS services
        AWS.config.update({ region: 'us-east-1' });

        // Create DynamoDB service object
        const dynamodb = new AWS.DynamoDB();

        // Array of HIMYM characters with their attributes
        const characters = [
            { firstname: 'Ted', fullname: 'TedMosby', email: 'TedMosby@example.com' },
            { firstname: 'Robin', fullname: 'RobinScherbatsky', email: 'RobinScherbatsky@example.com' },
            { firstname: 'Barney', fullname: 'BarneyStinson', email: 'BarneyStinson@example.com' },
            { firstname: 'Lily', fullname: 'LilyAldrin', email: 'LilyAldrin@example.com' },
            { firstname: 'Marshall', fullname: 'MarshallEriksen', email: 'MarshallEriksen@example.com' },
            { firstname: 'Ranjit', fullname: 'RanjitSingh', email: 'RanjitSingh@example.com' },
            { firstname: 'Carl', fullname: 'CarlMacLaren', email: 'CarlMacLaren@example.com' },
            { firstname: 'Wendy', fullname: 'WendyTheWaitress', email: 'WendyTheWaitress@example.com' },
            { firstname: 'James', fullname: 'JamesStinson', email: 'JamesStinson@example.com' },
            { firstname: 'Tracy', fullname: 'TracyMcConnell', email: 'TracyMcConnell@example.com' }
        ];

        // Insert each character into the table
        for (const character of characters) {
            await insertItem(dynamodb, character.email, character.fullname, character.firstname);
        }

        // Log success message
        console.log('All characters inserted successfully');
        return;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function insertItem(dynamodb, email, password, username) {
    try {
        // Define parameters for putting an item into the table
        const params = {
            TableName: 'login',
            Item: {
                'email': { S: email }, // Partition key attribute
                'password': { S: password }, // Sort key attribute
                'username': { S: username } // Username attribute
            }
        };

        // Put the item into the table
        await dynamodb.putItem(params).promise();
        console.log(`Character '${username}' inserted successfully`);
    } catch (error) {
        console.error(`Unable to insert character '${username}'. Error:`, error);
        throw error;
    }
}

module.exports = UserPop;
