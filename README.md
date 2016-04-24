Serverless URI Minimizer
=======

A simple URI minimizer built upon a serverless infrastructure and hosted statically.

List of technologies used:
  - Node.js
  - AWS Lambda
  - AWS Api Gateway
  - AWS RDS
  - AWS S3

On request to create a shortened URI, an api endpoint is called which generates a random 5 character string and then maps that string to the URI requesting to be shortened. When navigating to a shrotened URI, another endpoint is called which grabs the full URI for the shortened code (if one exists) and then redirects to the URI or back to http://miniuri.me, depending on whether the record exists.

##But I thought S3 couldn't do URL Rewrites?

In order to get around this limitation I decided to use a simple "hack." Any request to a statically hosted site on S3 that doesn't havea  resource is sent to an error URL which can be defined. In order to properly redirect I made it so all request misses go to a file ```/redirect/html``` which then uses ```window.location``` to parse for the path name of the requested url. If there is a match for the pathname as a short_key the user will then be redirected to the matching URI, else a redirect will occur back to http://miniuri.me.
