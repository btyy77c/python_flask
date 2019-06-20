# Basic Python Flask App
## Deployment Information
#####  IP address
- 34.205.90.150
#####  SSH port
- 2200
#####  Site URL
- http://34.205.90.150/

### Summary of Software Installed
- `python3-pip`, `libpcre3`, `libpcre3-dev` were installed for python (https://github.com/btyy77c/python_flask/blob/production/Dockerfile-python)
- `nginx` was installed for nginx (https://github.com/btyy77c/python_flask/blob/production/Dockerfile-nginx)
- The requirements.txt file installed `firebase_admin`, `flask`, `sqlalchemy`, and `uWSGI` (https://github.com/btyy77c/python_flask/blob/production/requirements.txt)
- `Git`, `Docker`, and `docker-compose` were installed on the AWS serve using apt-get.

### Summary of Configurations Made
##### Setup User and Ports
- I pretty much just followed these instructions:
https://github.com/kcalata/Linux-Server-Configuration/blob/master/README.md I added a `grader` user who is able to ssh into the server.  I also limited the sever ports to `2200`, `123`, and `80`

##### Deployment Software/Proces
###### Changes made to the app
- https://github.com/btyy77c/python_flask/pull/1/files
- Two `Dockerfiles` were created, one for nginx, and one for python
- An `nginx.conf` file was added for server configurations
- A `uwsgi.ini` file was created for WSGI configurations
- A `docker-compose` file was added to manage the nginx/app connections
###### Files Added to the Server
- My credential files (`creds.json` and `firebaseConfig.js`) were added to the serve in location `/var/www/catalog`
- My python application was added to the server in location `/var/www/catalog/catalog`

###### Process to add the application to the server
I followed these setps to start my application

1. Added credentials
 - ssh into server
 - Make sure Git, Docker, and docker-compose are installed and running on the server
 - run `sudo mkdir /var/www/catalog`
 - cd to the folder `/var/www/catalog`
 - Run `sudo touch creds.json` and `sudo touch firebaseConfig.js` while in the `/var/www/catalog` folder.
 - Run `sudo nano creds.json` and paste credentials into file
 - Run `sudo nano firebaseConfig.js` and paste credentials into file
2. Added my python application
 - Originally, I ran `sudo git clone https://github.com/btyy77c/python_flask.git catalog` to copy my whole application to the folder `/var/www/catalog/catalog`.  Once the application was added, I would cd to the folder `/var/www/catalog/catalog`, and then run `git pull origin production`.  This would add updates from GitHub.
 3. Build Application Software
 - I'd make sure I was in folder `/var/www/catalog/catalog`
 - Run `sudo docker-compose down` to shut down any running containers
 - Run `sudo docker-compose build` to build new docker images.
 - Run `sudo docker-compose up` to restart the containers
* You can also repeat steps 1-4 on your local machine and visit the app locally at http://0.0.0.0:8000/.  You'll need to make sure you have the `creds.json` and the `firebaseConfig.js` files are located in the app's parent folder.

### third-party resources
- I reviewed a lot of Medium, Stackoverflow, and GitHub sites
- The three sites I referenced most were:
1. https://github.com/kcalata/Linux-Server-Configuration/blob/master/README.md
2. https://github.com/ashokjain001/Linux_Server_Configuration
3. https://medium.com/bitcraft/docker-composing-a-python-3-flask-app-line-by-line-93b721105777

----------------------
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
