const maxRows = 25000

const query = async (req) => {
	const { query } = req
  const token = query.token
  const site = query.site
  const startDate = query.startDate
  const endDate = query.endDate

  // validate token, site, startDate and endDate are there
  try{
    if(token && site && startDate && endDate){

      // build payload for API
      let payload = {
        startDate,
        endDate,
        dimensions: ["query", "page"], // "country", "device"
        searchType: "Web", // "discover", "googleNews", "news", "image", "video"
        rowLimit: maxRows,
        startRow: 0 //offset for pagination
      }  
      const getQuery = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${site}/searchAnalytics/query`,{
        "method":"POST",
        "headers": {
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })
      const data = await getQuery.json() 
  
      // force download as file
      return new Response(JSON.stringify(data), {
        headers: {
          'content-type': 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${startDate}-${endDate}-${site}.json"`
        },
      })  
    }else{
      return new Response(JSON.stringify({error:true, message:"Missing Token and/or Site Param"}), {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      })  
    }
  }catch(e){
    console.log("ERROR",e)
    const html = `<!DOCTYPE html>
    <body>
      <h1>No Data Found</h1>
    </body>
    </html>`;
    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
    });
  }
}

export default query