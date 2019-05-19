import CategoryCreate from './categoryCreate.js'
import CategoryDelete from './categoryDelete.js'
import CategoryUpdate from './categoryUpdate.js'
import FirebaseConfig from './firebaseConfig.js'
import ItemCreate from './itemCreate.js'
import User from './user.js'

// Initialize Firebase Authentication
!firebase.apps.length ? firebase.initializeApp(FirebaseConfig) : firebase.app()
const provider = new firebase.auth.GoogleAuthProvider()

// Listen for firebase user
firebase.auth().onAuthStateChanged(user => {
  // Update user login button
  user ? User.logout(user) : User.login(provider)

  // Update category forms
  CategoryCreate.updateUser(user)
  CategoryDelete.updateUser(user)
  CategoryUpdate.updateUser(user)

  // Update item forms
  // ItemCreate.load(user)
})

document.addEventListener('DOMContentLoaded', () => {
  CategoryCreate.load()
  CategoryDelete.load()
  CategoryUpdate.load()
})
