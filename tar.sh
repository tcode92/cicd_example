#!/bin/bash

# This file is used to create a .tar.gz archive
# to be sent to the vps, include any necessary files and directories
# needed for the production environment to run correctly

FILES=(
    ./public
    ./dist
    .nvmrc
    .npmrc
    package.json
    package-lock.json
)

tar -czf dist.tar.gz "${FILES[@]}"