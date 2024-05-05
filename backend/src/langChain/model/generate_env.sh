#!/bin/bash

# Check if the argument is provided
if [ $# -eq 0 ]; then
    echo "Please provide your OpenAI API key as an argument."
    exit 1
fi

# Write the API key to the .env file
echo "GOOGLE_API_KEY=$1" > .env

echo "Environment variable GOOGLE_API_KEY set successfully."

