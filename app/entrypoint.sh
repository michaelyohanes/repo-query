#!/bin/sh
echo "Installing app"
npm i

echo "Cleaning up dist folder"
npm run clean

echo "Compiling"
npm run build

echo "Running app on http://localhost:3000"
npm run start