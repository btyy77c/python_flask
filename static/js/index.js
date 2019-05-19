import CategoryCreate from './categoryCreate.js'
import CategoryDelete from './categoryDelete.js'
import CategoryUpdate from './categoryUpdate.js'
import FirebaseConfig from './firebaseConfig.js'
import User from './user.js'

// Initialize Firebase Authentication
!firebase.apps.length ? firebase.initializeApp(FirebaseConfig) : firebase.app()
const provider = new firebase.auth.GoogleAuthProvider()

firebase.auth().onAuthStateChanged(user => {
  user ? User.logout() : User.login(provider)
  CategoryCreate.load(user)
  CategoryDelete.load(user)
  CategoryUpdate.load(user)
})
