import CategoryCreate from './categoryCreate.js'
import CategoryDelete from './categoryDelete.js'
import categoryUpdate from './categoryUpdate.js'
import firebaseConfig from './firebaseConfig.js'
import User from './user.js'

// Initialize Firebase Authentication
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
const provider = new firebase.auth.GoogleAuthProvider()

firebase.auth().onAuthStateChanged(user => {
  user ? User.logout() : User.login(provider)
  CategoryCreate.load(user)
  CategoryDelete.load(user)
})

document.addEventListener("DOMContentLoaded", function() {
  // categoryUpdate.load()
})
