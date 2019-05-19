import categoryCreate from './categoryCreate.js'
import categoryDelete from './categoryDelete.js'
import categoryUpdate from './categoryUpdate.js'
import firebaseConfig from './firebaseConfig.js'

// Initialize Firebase Authentication
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

document.addEventListener("DOMContentLoaded", function() {
  categoryCreate.load()
  categoryDelete.load()
  categoryUpdate.load()
})
