#!/bin/bash

# Commands for initial setup
echo 'Hello World!'
sudo apt update
mkdir /home/ubuntu/test
ls

# Copy files from source to destination
cp -r ./modules/EC2/src/dockertest /home/ubuntu/test

# Install Docker
sudo apt install -y docker.io

# Move to the dockertest directory and build Docker image
cd /home/ubuntu/test/dockertest/
sudo docker build -t demo .

# Run the Docker container
sudo docker run -itd -p 5000:5000 demo
