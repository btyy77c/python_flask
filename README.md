# Basic Python Flask App
#### Example of a basic WebApp setup
- The app is connected to a sqlite3 database. The database has two tables: Categories and Items.
- The app allows anyone to view Categories and Items
- The app allows a user to write to the database, after user login.
- User login is using Google's Firebase Authentication.  I only setup google email auth but firebase allows additional authentication options.

#### Setup Steps

1. Clone application locally
2. Setup a Firebase Account: https://firebase.google.com/
3. Run `sudo pip install firebase-admin` to install python firebase (https://github.com/firebase/firebase-admin-python)
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
