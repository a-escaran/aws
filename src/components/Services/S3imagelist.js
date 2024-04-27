const AWS = require('aws-sdk');

AWS.config.credentials = {
    accessKeyId: '',
    secretAccessKey: '',
    sessionToken: '', 
    profile: ''

};


// Set the region for AWS services
AWS.config.update({ region: 'us-east-1' });
const s3 = new AWS.S3();

async function listImageNames(bucketName) {
    const params = {
        Bucket: bucketName
    };

    try {
        const response = await s3.listObjectsV2(params).promise();
        console.log('Response:', response); // Log the response object to see what's returned
        const imageNames = response.Contents.map(obj => obj.Key).filter(key => key.endsWith('.jpg') || key.endsWith('.jpeg') || key.endsWith('.png'));
        console.log('Image Names:', imageNames); // Log the image names after filtering
        return imageNames;
    } catch (error) {
        console.error('Error listing image names:', error);
        throw error;
    }
}
module.exports = listImageNames;