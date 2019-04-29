#!/bin/sh

## At the time of making this app, there 'were' issues with just blindly installing Electron as a dev dependancy.
## This script is recommended but not required. Install this script first as not-root. Installing as root 'might' give Nodejs mixed messages about your intended usecase and user permissions.

currentDirPath=$(dirname $0)
cd $currentDirPath

sudo pacman -Sy --needed base base-devel

sudo pacman -S --needed nodejs
sudo pacman -S --needed npm

## Personalize the Architecture
npm install --arch=ia64 electron
npm install --platform=linux electron
npm install electron -g

npm install
