# Basic Python Flask App
#### Example of a basic WebApp setup
- The app is connected to a postgres database. The database has two tables: Categories and Items.
- The app allows anyone to view Categories and Items
- The app allows a user to write to the database, after user login.
- User login is using Google's Firebase Authentication.  I only setup google email auth but firebase allows additional authentication options.

#### Setup Steps

1. Clone application locally
2. Setup a Firebase Account: https://firebase.google.com/
3. Add your Firebase credentials to a file located in `static/js/firebaseConfig.js`
The file should look like:
```
export default {
  apiKey: <Your Key>,
  authDomain: <Your Domain>,
  databaseURL: <Your Database>,
  projectId: <Your Project ID>
  storageBucket: <Your storage>,
  messagingSenderId: <Your Sender Id>,
  appId: <Your App ID>
}
```
Once this is setup, the action `firebase.initializeApp(firebaseConfig)` that is called in the `static/js/index.js` file should begin working.
4. Run `python application.py` to start your local server
5. Visit http://localhost:8000/ in a local browser
