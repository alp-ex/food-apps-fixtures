#!/usr/bin/env bash

# https://github.com/typicode/json-server

# Install json server
if [ ! -d "node_modules" ]; then
    npm install json-server
fi

# Run server
npx json-server db.json --routes routes.json