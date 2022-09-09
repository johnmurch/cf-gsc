const Homepage = () => {
  // Construct the oauth URL for Google
  let BASEURL = "https://accounts.google.com/o/oauth2/v2/auth"
  let ACCESS_TYPE = "?access_type=offline"
  let SCOPE = `&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fwebmasters.readonly`
  let PROMPT = "&prompt=consent"
  let RESPONSE_TYPE = "&response_type=code"
  let CLIENT_ID_PARAM = `&client_id=${CLIENT_ID}` // pass in from environment variable!
  let REDIRECT_URL = `&redirect_uri=${encodeURI(REDIRECT_URI)}` // be sure to set this for your token!
  
  // BUILD THE LOGIN LINK!
  let loginLink = `${BASEURL}${ACCESS_TYPE}${SCOPE}${PROMPT}${RESPONSE_TYPE}${CLIENT_ID_PARAM}${REDIRECT_URL}`
  
  const html = `<!DOCTYPE html>
  <body>
    <h1>Google oAuth</h1>
    <p><a href="${loginLink}">Login</a></p>
  </body>
  </html>`;

  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  });
}

export default Homepage