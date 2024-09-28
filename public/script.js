// redirect.js
window.onload = async function () {
  console.log('Start redirect script');
  const SHEET_ID = '1dWUL3W7p5Wff_cvXQwd-hD3-kP4A2Y4glcK72XoIkfo'; // Google Sheet ID
  const API_KEY = 'AIzaSyCXmMCqNqYHkE7ttfsktdAUdKAgWnNVo6E'; // Google Sheets API key

  // Extract the short code from the URL
  const hashShortCode = window.location.hash.substring(1);
  let link = window.location.href
  const fragmentLink = link.split('/')
  console.log('11', fragmentLink)
  const l = fragmentLink.pop()
  console.log('13',l)
  console.log('14',hashShortCode)
  let sCode = hashShortCode==='' ? l : hashShortCode
console.log('16',sCode);
  if (sCode) {
    console.log('18',sCode)
      // Fetch the data from Google Sheets
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/url!A:B?key=${API_KEY}`;
      console.log('Fetching data from:', url);
      try {
          const response = await fetch(url);
          const data = await response.json();

          // Loop through the sheet data to find a matching short code
          let found = false;
          data.values.forEach(row => {
              if (row[0] === sCode) {
                console.log('30',sCode)
                  window.location.href = row[1]; // Redirect to the original URL
                  console.log(row[1])
                  found = true;
              }
          });

          if (!found) {
              document.body.innerHTML = "<p>Shortened link not found.</p>";
              window.location.href = 'https://rsh.web.app/#lsurl'
              document.body.style.display = 'block'; // Show body content if not found
          }
      } catch (error) {
          console.error("Error fetching link: ", error);
          document.body.innerHTML = "<p>Error occurred while fetching the link.</p>";
          window.location.href = 'https://rsh.web.app/#lsurl'
          document.body.style.display = 'block'; // Show body content on error
      }
  } else {
      document.body.innerHTML = "<p>No short code provided in the URL.</p>";
      window.location.href = 'https://rsh.web.app/#lsurl'
      document.body.style.display = 'block'; // Show body content if no short code
  }
};
