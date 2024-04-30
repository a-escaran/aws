# Cloud Computing Assessment 1 Project

## Author
Arman Joshua Roberto Escaran

## Description
This project is a React application developed for the Cloud Computing Assessment 1. The objective of the assessment was to create a program that runs on an EC2 server. While the typical guideline suggested the use of Java and IntelliJ, I opted to use JavaScript with React and VSCode for this implementation.

## Features
- **Create DynamoDB Table called Login**: Sets up a DynamoDB table named Login and populates it with 10 users inspired by the show "How I Met Your Mother", including email, username, and password fields.
- **Create DynamoDB Table called Music**: Establishes a DynamoDB table named Music and populates it using data from the provided `a1.json` file, including song details such as title, artist, image URL, web URL, and year.
- **Populate S3 Bucket with Images**: Uploads images referenced in the Music table's image URLs to the pre-existing S3 bucket named `s3784498Images`.
- **Input Validation for Login and Register Pages**: Implements input validation for the login and registration forms.

## Main Files
- **App.js**: Routes the application's files together to enable functionality.
- **Server3.js**: Handles all backend functionality, including reading the AWS configuration file and passing its values to the frontend JavaScript files.
- **LoginPage.js**: Frontend component for the login form and associated functionality.
- **LoginTable.js**: Creates the Login table in DynamoDB.
- **LoginValidation.js**: Manages input validation for the login form.
- **UserPop.js**: Populates the Login table created by LoginTable.js.
- **RegisterPage.js**: Frontend component for the registration form and associated functionality.
- **RegisterValidation.js**: Manages input validation for the registration form.
- **MusicTable.js**: Creates the DynamoDB table named Music.
- **MusPop.js**: Populates the Music table with songs from the `a1.json` file.
- **S3pop.js**: Populates the pre-existing S3 bucket with image uploads from the image URLs in the `a1.json` file.

