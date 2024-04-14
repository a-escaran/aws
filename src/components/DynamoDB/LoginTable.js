// logintable.js

const AWS = require('aws-sdk');

function createLoginTable() {
  // Set the region for AWS services
  AWS.config.update({ region: 'us-east-1' });

  // Create DynamoDB service object
  const dynamodb = new AWS.DynamoDB();

  // Define table schema
  const params = {
    TableName: 'login',
    KeySchema: [
      { AttributeName: 'email', KeyType: 'HASH' },
      { AttributeName: 'user_name', KeyType: 'RANGE' }
    ],
    AttributeDefinitions: [
      { AttributeName: 'email', AttributeType: 'S' },
      { AttributeName: 'user_name', AttributeType: 'S' },
      { AttributeName: 'password', AttributeType: 'S' }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  };

  // Create the table
  dynamodb.createTable(params, (err, data) => {
    if (err) {
      console.error('Unable to create table. Error:', JSON.stringify(err, null, 2));
    } else {
      console.log('Table created successfully:', JSON.stringify(data, null, 2));
    }
  });
}

module.exports = createLoginTable;
