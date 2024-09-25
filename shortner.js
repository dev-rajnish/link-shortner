const fs = require('fs');

// File paths
const firebaseJsonPath = 'firebase.json';
const redirectsFilePath = '_redirects.txt';

// Check if firebase.json exists and read it
let firebaseConfig = {};
if (fs.existsSync(firebaseJsonPath)) {
  firebaseConfig = JSON.parse(fs.readFileSync(firebaseJsonPath, 'utf-8'));
} else {
  // Initialize firebase.json structure if not present
  firebaseConfig = { hosting: { redirects: [] } };
}

// Read the _redirects.txt file
const redirectsFile = fs.readFileSync(redirectsFilePath, 'utf-8');

// Split the content into lines
const redirectsLines = redirectsFile.split('\n');

// Loop through each line and add new redirects
redirectsLines.forEach(line => {
  // Ignore empty lines
  if (!line.trim()) return;

  // Split the line into parts (source, destination, status code)
  const [source, destination] = line.split(/\s+/);

  // Create a redirect object
  const redirect = {
    source,
    destination,
    type: 301
  };

  // Check if the redirect already exists in firebase.json
  const existingRedirect = firebaseConfig.hosting.redirects.find(r => r.source === source);
  if (!existingRedirect) {
    // Add the new redirect if it doesn't already exist
    firebaseConfig.hosting.redirects.push(redirect);
  }
});

// Write the updated firebase.json file
fs.writeFileSync(firebaseJsonPath, JSON.stringify(firebaseConfig, null, 2));

console.log('New redirects have been added to firebase.json!');
