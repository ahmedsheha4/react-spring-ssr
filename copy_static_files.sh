#!/bin/bash

static_dir="client/build/static"
build_dir="client/build" 
resources_dir="server/src/main/resources"
templates_dir="server/src/main/resources/templates"

cp -r "$static_dir" "$resources_dir"

find "$build_dir" -name "*.html" -exec cp {} "$templates_dir" \;

echo "Files copied successfully."