import LocaleFetchCall from './localeFetchCall.js'

let errorTag = null
let firebaseUser = null
let path = null

// Create listener to remove error tag text
const creatErrorTag = () => {
  errorTag = document.getElementById('deleteErrors')

  errorTag.addEventListener('click', (e) => {
    e.preventDefault()
    errorTag.innerHTML = ''
  })
}

// JS listener that will trigger delete action. Only deletes if firebaseUser is present
const createFormSumbission = () => {
  document.querySelector('#categoryDelete button').addEventListener('click', (e) => {
    e.preventDefault()
    let c = confirm('Are you sure you want to delete this category?')
    if (c && firebaseUser) { deleteCategory(path) }
  })
}

// send deletion request to python
const deleteCategory = (path) => {
  firebaseUser.getIdToken(true).then(token => {
    const body = JSON.stringify({ user_token: token })

    LocaleFetchCall.fetchCall(path, 'DELETE', body).then(category => {
      if (category.errors == undefined) {
        window.location.replace('/')
      } else {
        errorTag.innerHTML = `${category.errors} X`
      }
    }).catch(err => {
      errorTag.innerHTML = 'Failed to delete category X'
    })
  })
}

export default {
  // Load category delete button and error messages
  load() {
    const div = document.getElementById('categoryDelete')
    if (div == null) { return }

    path = location.pathname

    creatErrorTag()
    createFormSumbission()
  },

  // Updates firebaseUser as user logs in and out
  updateUser(user) {
    firebaseUser = user
    const div = document.getElementById('categoryDelete')
    if (div == null) { return }

    if (firebaseUser) {
      div.classList.remove('hidden')
    } else {
      div.classList.add('hidden')
    }
  }
}
