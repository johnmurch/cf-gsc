const auth = async (req) => {
	const { query } = req
  const clientSecret = CLIENT_SECRET // pass in from environment variable!
	const clientID  = CLIENT_ID // pass in from environment variable!
  const params = {
    client_id: clientID,
    client_secret: clientSecret,
    code:query.code,
    grant_type: 'authorization_code',
    redirect_uri: encodeURI(REDIRECT_URI),
  }

  const body = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    body.append(key, value)
  })

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })
  const resp = await response.json()

  const html = `<!DOCTYPE html>
  <body>
    <div>
      Token: <input type="text" id="token" value="${resp.access_token}">
      <button id="btn">Copy</button>
    </div>
    <hr>
    <a href="/builder?token=${resp.access_token}">Generate Builder</a>

    <script>
      document.getElementById("btn").addEventListener("click", function() { var text = document.getElementById("token"); text.select(); text.setSelectionRange(0, 99999); navigator.clipboard.writeText(text.value); })
      </script>
  </body>
  </html>`;

  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  });
}

export default auth