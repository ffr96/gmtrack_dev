# GM Track - dev

App for logging everything related to your training; you can log your exercises, weight and (todo) strength.  
**Client side** built with **React, RR, Redux, Tailwind** (and a few more libraries).  
**Server side** built with **Expressjs, Mongoose** (and a few more libraries).

App is available at [GM Track](gmtrack2.heroku.app), deployed version will be a little outdated when compared to dev version.  
If heroku's server is dormant, it will take a few seconds to boot up.

Client can be run by installing the dependencies then  
`npm start`

Server can be run by installing the dependencies then  
`npm run dev`

### TODO:

_Lots of updates_  
But pretty much:

- add strength functionality, update weight and log pages to split logs up on multiple pages.
- add more tests cases and have better coverage

# Changes to build a version that is deployable:

- On Server - Index.ts add app.use(express.static('build'))
- On Client - Change baseUrl to ''
- On Package.json of server, add:  
  _build: tsc index.ts --esModuleInterop_  
  _start: node index.js_
