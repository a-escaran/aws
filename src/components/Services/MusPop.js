const AWS = require('aws-sdk');
const fs = require('fs').promises;

async function MusPop() {
    try {
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

        // Read the JSON file containing song data
        const jsonData = await fs.readFile('./public/a1.json', 'utf8');
        const artistData = JSON.parse(jsonData);

        // Access the 'songs' array from the JSON object
        const singles = artistData.songs;

        // Check if 'singles' is an array
        if (!Array.isArray(singles)) {
            throw new Error('Songs data is not in the expected format');
        }

        // Iterate over each song and insert it into the DynamoDB table
        for (const song of singles) {
            await insertSong(dynamodb, song.title, song.artist, song.year, song.web_url, song.img_url);
        }

        console.log('All songs inserted successfully');
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function insertSong(dynamodb, title, artist, year, web_url, img_url) {
    try {
        // Define parameters for putting an item into the table
        const params = {
            TableName: 'songs',
            Item: {
                'title': { S: title }, // Partition key attribute
                'artist': { S: artist }, // Sort key attribute
                'year': { N: year }, // Number attribute
                'web_url': { S: web_url }, // String attribute
                'img_url': { S: img_url } // String attribute
            }
        };

        // Put the item into the table
        await dynamodb.putItem(params).promise();
        console.log(`Song '${title}' by '${artist}' inserted successfully`);
    } catch (error) {
        console.error(`Unable to insert song '${title}' by '${artist}'. Error:`, error);
        throw error;
    }
}

module.exports = MusPop;
