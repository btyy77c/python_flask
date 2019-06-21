# Basic Python Flask App

## Application Information
#### Example of a basic WebApp setup
- The app is connected to a sqlite3 database. The database has two tables: Categories and Items.
- The app allows anyone to view Categories and Items
- The app allows a user to write to the database, after user login.
- User login is using Google's Firebase Authentication.  I only setup google email auth but firebase allows additional authentication options.
- The application also includes two JSON api end points:
   `/item/<title>/JSON`
   `/category/<name>/items/JSON`

#### Setup Steps

1. Clone application locally
2. Setup a Firebase Account: https://firebase.google.com/
3. Install software referenced in the requirements.txt file
4. Add your Admin credentials to a file located in `creds.json`
The file should look like:
```
{
  "type": ...,
  "project_id": ...,
  "private_key_id": ...,
  "private_key": ...,
  "client_email": ...,
  "client_id": ...,
  "auth_uri": ...,
  "token_uri": ...,
  "auth_provider_x509_cert_url": ...,
  "client_x509_cert_url": ...
}
```
Once this is setup, the action `firebase_admin.initialize_app(cred)` that is called in the `models/user.py` file should begin working.

5. Add your JavaScript credentials to a file located in `static/js/firebaseConfig.js`
The file should look like:
```
export default {
  apiKey: ...,
  authDomain: ...,
  databaseURL: ...,
  projectId: ...,
  storageBucket: ...,
  messagingSenderId: ...,
  appId: ...
}
```
Once this is setup, the action `firebase.initializeApp(firebaseConfig)` that is called in the `static/js/index.js` file should begin working.

6. Run `python application.py` to start your local server
7. Visit http://localhost:8000/ in a local browser


---------------

## Deployment Information
The production app has been taken down. Below is information about running the app locally, using docker-compose.  

You can also follow similar steps to build and deploy an app (using docker-compose) on a cloud server.

1. Create a parent folder `/parent_folder`
2. cd into `/parent_folder`
3. Add the `creds.json` and `firebaseConfig.js` files into the `/parent_folder`
4. Run `git clone https://github.com/btyy77c/python_flask.git`.  The application should now be located in `/parent_folder/python_flask`
5. Make sure Docker and docker-compose software are installed on your local machine
6. cd to `/parent_folder/python_flask`. You should now be in the folder where the `docker-compose` file is located.
7. run `docker-compose build`
8. run `docker-compose up`
9. visit the app locally at http://0.0.0.0:80/
