# cf-gsc
Cloudflare Worker for Google Search Console

# Why
Showcase how you could build a simple cloudflare worker to download GSC data from their API using oAuth. Ideally you could set this up to send the data to BigQuery on a [https://developers.cloudflare.com/workers/platform/cron-triggers/](cron), but I will let you do that integration or save it for another day 🤔

# Code
This codebase leverages [https://github.com/kwhitley/itty-router](https://github.com/kwhitley/itty-router) to simplify and make it easier to read/refactor. 

* index.js - main routes file
* handlers/auth.js - oauth for Google
* handlers/builder.js - UI for downloading GSC data w/access token
* handlers/homepage.js - Login to Google via oAuth
* handlers/query.js - GSC API Wrapper for downloading data
* handlers/sites.js - GSC API wrapper for showing sites you have connected in GSC

# Demo
### Homepage
![Homepage](screenshot-homepage.png)
### Auth
![Auth](screenshot-auth.png)
### Builder UI
![Builder](screenshot-builder-ui.png)

# Set up
You will need to setup an API key via [Google](https://console.cloud.google.com/apis/credentials?project=XXXX) Do not forget to update the environment variables in wrangler.toml file

# Thanks
This repo was sparked from this [Twitter Thread](https://twitter.com/DataChaz/status/1565432139197325315)
Special thanks to the following:
* Charly Wargnier [@DataChaz](https://twitter.com/DataChaz)
* Greg Bernhardt [@GregBernhardt4](https://twitter.com/GregBernhardt4)
* JC Chouinard [@ChouinardJC](https://twitter.com/ChouinardJC)