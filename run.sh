#!/bin/bash

cd client

npm install

npm run build

cd ..

chmod +x copy_static_files.sh generate_react_controller.sh

./copy_static_files.sh

./generate_react_controller.sh

cd server && ./mvnw spring-boot:run
