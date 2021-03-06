Serverless URI Minimizer
=======

A simple [URI minimizer](http://miniuri.me) built upon a serverless infrastructure and hosted statically.

List of technologies used:
  - Node.js
  - AWS Lambda
  - AWS Api Gateway
  - AWS RDS
  - AWS S3

### How does it work?
On request to create a shortened URI, an api endpoint is called which generates a random 5 character string and then maps that string to the URI requesting to be shortened. When navigating to a shrotened URI another endpoint is called which grabs the full URI for the shortened code (if one exists) and then redirects to a) the returned URI or b) http://miniuri.me, depending on whether the record exists.

###But I thought S3 couldn't do URL Rewrites?

In order to get around this limitation I decided to use a simple "hack." Any request to a statically hosted site on S3 that doesn't havea  resource is sent to an error URL which can be defined. In order to properly redirect I made it so all request misses go to a file: ```/redirect.html``` which then uses ```window.location``` to parse for the path name of the requested url. If the pathname matches an existing short_key the user will then be redirected to the matching URI, else a redirect will occur back to http://miniuri.me.

### Set Up Instructions
1. Clone the repo.
2. Create a file db-credentials.js under ```lambda/lib``. See below for an example configuration.
3. Peform any necessary steps on AWS (create API Gateway, provision RDS instance, create Lambda function, etc.)
4. Upload files in ```public/``` to an s3 bucket.
5. Once Lambda function is created ```cd lambda``` and run ```deploy-to-lambda.sh```. Replace function name in script, if necessary.
 
#### Example db-credentials.json
```
module.exports = {
  host: 'db.example.com',
  user: 'user',
  password: 'password*',
  database: 'db_name',
  multipleStatements: true
};
```
  
