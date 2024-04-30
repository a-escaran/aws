const fs = require('fs');
const axios = require('axios');
const AWS = require('aws-sdk');

async function populateImages(accessKeyId, secretAccessKey, sessionToken) {
    try {
        // Set AWS credentials
        AWS.config.credentials = {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            sessionToken: sessionToken
        };

        // Log the AWS credentials being used
        console.log(AWS.config.credentials);

        // Set the region for AWS services
        AWS.config.update({ region: 'us-east-1' });
        const s3 = new AWS.S3();

        // Read the JSON file
        const artistData = JSON.parse(fs.readFileSync('./public/a1.json', 'utf8'));

        // Iterate through each artist object
        for (const artist of artistData.songs) {
            // Download image
            const response = await axios.get(artist.img_url, { responseType: 'arraybuffer' });
            const imageBuffer = Buffer.from(response.data, 'binary');

            // Upload image to S3
            const uploadParams = {
                Bucket: 's3784498images', 
                Key: artist.img_url.split('/').pop(), // Use image filename as key
                Body: imageBuffer,
                ContentType: response.headers['content-type']
            };

            await s3.upload(uploadParams).promise();
            console.log(`Image uploaded: ${artist.img_url}`);
        }

        console.log('All images uploaded successfully.');
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

module.exports = populateImages;
