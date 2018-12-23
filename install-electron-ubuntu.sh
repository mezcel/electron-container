#!/bin/bash

## Node.js v10.x:
## Using Ubuntu

curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs

## Using Debian, as root
# curl -sL https://deb.nodesource.com/setup_10.x | bash -
# apt-get install -y nodejs

## Node.js v8.x:
## Using Ubuntu
# curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
# sudo apt-get install -y nodejs

## Using Debian, as root
# curl -sL https://deb.nodesource.com/setup_8.x | bash -
# apt-get install -y nodejs

## Apps Npm's

npm install express
npm install socket.io
npm install poppler.js
npm install electron

npm install

