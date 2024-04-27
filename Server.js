const express = require('express');
// const createBucket = require('./src/components/Services/S3Create'); 
// const populateBucket = require('./src/components/Services/S3pop'); 
const MusPop = require('./src/components/Services/MusPop')


const app = express();
const PORT = process.env.PORT || 5000;

// Define routes
// app.get('/api/create-bucket', async (req, res) => {
//   await listImageNames('s3784498images'); 
//   res.json({ message: 'Bucket created successfully' });
// });

app.get('/api/populate-songs', async (req, res) => {
  try {
    await MusPop(); // Call MusPop function to populate songs
    res.json({ message: 'Songs populated successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
  
// app.get('/api/populate-bucket', async (req, res) => {
//   await populateBucket('s3784498images'); 
//   res.json({ message: 'Bucket populated successfully' });
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
