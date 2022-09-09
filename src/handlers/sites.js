const sites = async (req) => {
	const { query } = req
  const token = query.token
  if(token){
    const getSites = await fetch('https://www.googleapis.com/webmasters/v3/sites',{
      "headers": {
        "Authorization": `Bearer ${token}`
      }
    })
    const sites = await getSites.json()
    return new Response(JSON.stringify(sites), {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    })  
  }else{
    return new Response(JSON.stringify({error:true, message:"Missing Token Param"}), {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    })  
  }
}

export default sites