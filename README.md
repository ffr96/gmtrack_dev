# GM Track - dev
Client can be run by installing the dependencies then    
_npm start_

Server can be run by installing the dependencies then   
_npm run dev_

# Changes to build a version thats deployable:   
- On Server - Index.ts add app.use(express.static('build'))   
- On Client - Change baseUrl to ''   
- On Package.json of server, add:  
_build: tsc index.ts --esModuleInterop_   
_start: node index.js_   

With that it _should_ be enough to deploy the build to a server. However, for _some reason_ when building, TS can't seem able to find the type extension of Express 
and for that reason it might also be needed to instead extend the Request interface and use that on routers/middleware.
