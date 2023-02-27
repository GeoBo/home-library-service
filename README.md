# Home Library Service - part 3

## Instructions:
1. Сlone repo  
2. Rename the file '.env.example'  to '.env'  
3. Start Docker Desktop
4. Open terminal and enter command "npm start"  
5. Open second terminal and enter command "npm run test:auth"

## Warnings:

1) If images from Docker Hub don't run, change docker-compose content from 'image' to 'dockerfile'.
2) With some system configurations, the application can suddenly stop while working. 
If DB has launched, but there are no messages from the application in the console, it is necessary to restart the PC, remove all containers, images and volumes of Docker and build again.
3) Error "Port is alloсated" - restart the system or assigned to the .env file to another port (change from 4000 to 4001).
4) Error "Endpoint for "default" not found" - delete the meta.json file at 'C:\Users\your-username\.docker\contexts\meta\meta.json', it will be created automatically.
5) If the database migration error, clean the folder "app/src/db/migrations" and run app again.

## Attention!: 
Migrations are generated and ran automatically during the launch of the application. To check the migration, stop the application, make changes in entity, and then start 'docker compose up' again.
