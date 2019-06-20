# Basic Python Flask App
## Deployment of App to "Production"
#### IP address
- 34.205.90.150
#### SSH port
- 2200
#### Site URL
- http://34.205.90.150/

### Summary of Software Installed
- `python3-pip`, `libpcre3`, `libpcre3-dev` were installed for python (https://github.com/btyy77c/python_flask/blob/production/Dockerfile-python)
- `nginx` was installed for nginx (https://github.com/btyy77c/python_flask/blob/production/Dockerfile-nginx)
- The requirements.txt file installed `firebase_admin`, `flask`, `sqlalchemy`, and `uWSGI` (https://github.com/btyy77c/python_flask/blob/production/requirements.txt)
- Git, Docker, and docker-compose were installed on the AWS server

### Summary of Configurations Made
### Setup User and Ports
- I pretty much just followed these instructions:
https://github.com/kcalata/Linux-Server-Configuration/blob/master/README.md I added a `grader` user who is able to ssh into the server.  I also limited the sever ports to `2200`, `123`, and `80`

### Added Deployment Software
- Two Dockerfiles were created, one for nginx (https://github.com/btyy77c/python_flask/blob/production/Dockerfile-nginx), and one for python (https://github.com/btyy77c/python_flask/blob/production/Dockerfile-python)
- An nginx.conf file was added for server configurations (https://github.com/btyy77c/python_flask/blob/production/nginx.conf)
- A uwsgi.ini file was created for WSGI configurations (https://github.com/btyy77c/python_flask/blob/production/uwsgi.ini)
- A docker-compose file (https://github.com/btyy77c/python_flask/blob/production/docker-compose.yml) was added to manage the nginx/app connections
- My configuration files (`creds.json` and `firebaseConfig.js`) were added to the serve in location `/var/www/catalog`
- My application was added to the server in location `/var/www/catalog/catalog`
- To update the application:

### Added Flask Application
I followed these setps to start my application
1. ssh into server
2. Make sure Git, Docker, and docker-compose are installed and running on the server
3. cd to the folder `/var/www/catalog`
4. Run `sudo touch creds.json` and `sudo touch firebaseConfig.js`
5. Run `sudo nano creds.json` and past credentials into file
4. To add my application, I originally ran `sudo git clone https://github.com/btyy77c/python_flask.git catalog`.  To obtain updates from my app, I would run `git pull origin production`
5. Once the files are on the server, run `sudo docker-compose down` to shut down any running containers
4. Run `sudo docker-compose build` to build new docker images.
5. Run `sudo docker-compose up` to restart the containers
* You can also repeat steps 1-4 on your local machine and visit the app locally at http://0.0.0.0:8000/.  You'll need to make sure you have the `creds.json` and the `firebaseConfig.js` files located in the app's parent folder.

### third-party resources
- I reviewed a lot of medium, stackoverflow, and GitHub sites
- The three sites I referenced most were:
1. https://github.com/kcalata/Linux-Server-Configuration/blob/master/README.md
2. https://github.com/ashokjain001/Linux_Server_Configuration
3. https://medium.com/bitcraft/docker-composing-a-python-3-flask-app-line-by-line-93b721105777

----------------------
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
