# Setup guide for glm website

## Frontend

Setup config in `frontend/src/glm/config.js`. Fill in values:
serverUrl - IP address and port of backend server, for example `http://localhost:9999`.
githubClientId - Client ID from developer settings in OAuth Apps section for this application.
githubRedirectURI - Authorization callback URL value from developer settings in OAuth Apps section for this application.

If you want to server the site from a subdirectory set the value of `homepage` in frontend/package.json to the path of the subdirectory. Value should have a leading "/" and no trailing slashes.

For building the app go to frontend folder and type command `npm run-script build`. A new build folder will be created with the site ready for deployment.

## Backend

Setup config in `backend/config.json`. Fill in values:
owner - Owner of organization that hosts student repositories.
repoPrefix - Prefix that is used to get actual student repository names from their university logins.
glmRepo - Repository that has an instance of glm in it. This is used to get the currently active students for a particular subject. It lists the contents of `/config/active` directory in said repository.
assignments - A list of strings that represent the current branches/assignemnts that students should see statuses for.

Create `client-id` and `client-secret` files inside backend folder with the associated values from developer settings in OAuth Apps section for this application.

For starting the server type `npm start`.
