const builder = async (req) => {
	const { query } = req
  let token = query.token || ""
  if(token && token!=""){
    const html = `<!DOCTYPE html>
    <body>
      <div>
        Token: <input type="text" id="token" value="${token}">
        <button id="btn">Copy Text</button>
      </div>
      <hr>
      <div>
        <div>startDate:<input type="text" id="startDate" value="2022-01-01"></div>
        <div>endDate:<input type="text" id="endDate" value="2022-09-01"></div>
        <div>site:<select id="site" name="site"></select>
        <button id="fetch">Fetch</button>
      </div>
      
      <hr>
      Data Source:<br>
      <a href="${BASE_URL}/data/sites?token=${token}">View Sites</a>
  
      <script>
        document.getElementById("btn").addEventListener("click", function() { var text = document.getElementById("token"); text.select(); text.setSelectionRange(0, 99999); navigator.clipboard.writeText(text.value); })
  
        let dropdown = document.getElementById('site');
        dropdown.length = 0;
        let defaultOption = document.createElement('option');
        defaultOption.text = 'Choose Site';

        dropdown.add(defaultOption);
        dropdown.selectedIndex = 0;

        fetch('/data/sites?token=${token}').then(function (response) {
          return response.json();
        }).then(function (data) {
          let siteEntries = data.siteEntry.sort((a,b) => (a.siteUrl>b.siteUrl) ? 1 : -1);
          siteEntries.map((s) => {
            option = document.createElement('option');
            option.text = s.siteUrl + '('+s.permissionLevel + ')';
            option.value = s.siteUrl;
            dropdown.add(option);
          })
        }).catch(function (err) {
          // There was an error
          console.warn('Something went wrong.', err);
        });
        
        document.getElementById("fetch").addEventListener("click", function() {
          let site = document.getElementById("site").value
          let startDate = document.getElementById("startDate").value
          let endDate = document.getElementById("endDate").value       
          let url = "${BASE_URL}/data/query?token=${token}&startDate="+startDate+"&endDate="+endDate+"&site="+site
          navigator.clipboard.writeText(url); 
          window.open(url)
        })  
        </script>
    </body>
    </html>`;
  
    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
    });
  }else{
    const missingToken = `<!DOCTYPE html>
    <body>
      Missing Token, please <a href="/">Login</a>
    </body>
    </html>`;
    return new Response(missingToken, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
    });
  }
}

export default builder
