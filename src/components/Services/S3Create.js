const AWS = require('aws-sdk');

// AWS configuration
AWS.config.credentials = {
  accessKeyId: '',
  secretAccessKey: '',
  sessionToken: '', 
  profile: ''
};


// Log the AWS credentials being used
console.log(AWS.config.credentials);

// Set the region for AWS services
AWS.config.update({ region: 'us-east-1' });

const s3 = new AWS.S3();

// Function to create an S3 bucket
async function createBucket(s3784498images) {
  try {
    const params = {
      Bucket: s3784498images,
      ACL: 'private' // You can adjust the ACL as needed
    };

    await s3.createBucket(params).promise();
    console.log(`Bucket created: ${s3784498images}`);
  } catch (error) {
    console.error('Error creating bucket:', error);
  }
}

module.exports = createBucket;