#!/bin/bash

echo "Zipping lambda function..."
zip -r miniuri-lambda.zip .

echo "Deploying to Lambda..."
aws lambda update-function-code --function-name miniuri-create-uri --zip-file fileb://miniuri-lambda.zip --profile personal
