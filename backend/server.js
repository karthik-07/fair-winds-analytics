const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

//To parse JSON
app.use(express.json());

//API endpoint to test connection
app.post('/test-connection', async(req, res) => {
    try {
        const { apiUrl, apiKey, accessToken, username, password, companyName } = req.body;

        //Validate form
        if (!apiUrl || !apiKey || !apiKey || !accessToken || !username || !password || !companyName) {
            return res.status(400).json ({
                success: false,
                message: 'All fields are requried'
            });
        }

        //Checking if API URL is reachable (valid)
        let isValid = true;

        if (!apiUrl.startsWith('http://') && !apiUrl.startsWith('https://')) {
            isValid = false;
        }

        //Simulating delay for testing
        await new Promise(resolve => setTimeout(resolve, 1500));
    
        if (!isValid) {
          return res.status(400).json({ 
            success: false, 
            message: 'Invalid API URL. Must start with http:// or https://' 
          });
        }

        //storing successfull connection details in .env file
        const connectionData = `
            API_URL = ${apiUrl}
            API_KEY = ${apiKey}
            ACCESS_TOKEN = ${accessToken}
            USERNAME = ${username}
            PASSWORD = **********
            COMPANY_NAME = ${companyName}
            TIMESTAMP = ${new Date().toISOString()}
          `;
          
          // Make sure the data directory exists
          const dataDir = path.join(__dirname, 'data');
          if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir);
          }
          
          // Write connection data to .env
          fs.writeFileSync(
            path.join(dataDir, '.env'),
            connectionData.trim()
          );
          
          // Return success response
          return res.json({ 
            success: true, 
            message: 'Connection successful!' 
          });
    } catch (error) {
        console.error('Error testing connection:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
})

//Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '../frontend/dist')));

//Handle all other routes and serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });