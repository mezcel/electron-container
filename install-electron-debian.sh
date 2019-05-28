#!/bin/bash

## Node.js v10.x:
## Using Debian based

## apt
sudo apt-get update
sudo apt-get install build-essential
sudo apt-get install curl

## dl and install a stable Nodejs version
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs

## App Npm's

npm install express
npm install socket.io
npm install poppler.js
npm install electron

npm install

