const AWS = require('aws-sdk');

AWS.config.credentials = {
  accessKeyId: '',
  secretAccessKey: '',
  sessionToken: '', 
  profile: ''
};

AWS.config.update({ region: 'us-east-1' });

const s3 = new AWS.S3();

async function checkBucketAvailability(bucketName) {
  try {
    await s3.headBucket({ Bucket: bucketName }).promise();
    console.log(`Bucket ${bucketName} already exists.`);
    return false; // Bucket exists
  } catch (error) {
    if (error.code === 'NotFound') {
      console.log(`Bucket ${bucketName} is available.`);
      return true; // Bucket does not exist
    } else {
      console.error('Error checking bucket availability:', error);
      return false; // Error occurred
    }
  }
}

module.exports = checkBucketAvailability;