#!/bin/sh

## Arch linux is very specific about what/how apps are installed and run. 
## At the time of developing 'electron-container' the command 'npm  install' was a user friendly install with  Win10 and Debian, but not with Arch Linux.
## This script installs electron targeted for use with an Arch Linux.

## Recommended, but not required: Install this script first as not-root. Not doing so 'might' give Nodejs mixed messages about your intended usecase.

sudo pacman -S --needed nodejs
sudo pacman -S --needed npm
	
npm install --arch=ia64 electron
npm install --platform=linux electron
npm install electron -g
