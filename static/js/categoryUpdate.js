import LocaleFetchCall from './localeFetchCall.js'

let errorTag = null
let firebaseUser = null
let path = null

// Create listener to remove error tag text
const creatErrorTag = () => {
  errorTag = document.getElementById('editErrors')

  errorTag.addEventListener('click', (e) => {
    e.preventDefault()
    errorTag.innerHTML = ''
  })
}

// JS listener that will trigger update action. Only updates if firebaseUser is present
const createFormSumbission = () => {
  const form = document.querySelector('#categoryEdit form')

  document.querySelector('#editDisplay').addEventListener('click', (e) => {
    e.preventDefault()
    if (firebaseUser) { hideOrDisplay(form) }
  })

  document.querySelector('#categoryEdit form button').addEventListener('click', (e) => {
    e.preventDefault()
    if (firebaseUser) { submitForm(form, path) }
  })
}

// JS to hide/display edit form
const hideOrDisplay = (form) => {
  if (form.classList.contains('hidden')) {
    form.classList.remove('hidden')
  } else {
    form.classList.add('hidden')
  }
}

// send update request to python
const submitForm = (form, path) => {
  firebaseUser.getIdToken(true).then(token => {
    const body = JSON.stringify({
      id: form.id.value,
      name: form.name.value,
      user_token: token
    })

    LocaleFetchCall.fetchCall(path, 'PUT', body).then(category => {
      if (category.errors == undefined) {
        window.location.replace(`/category/${category.name}`)
      } else {
        errorTag.innerHTML = `${category.errors} X`
      }
    }).catch(err => {
      errorTag.innerHTML = 'Failed to update category X'
    })
  })
}

export default {
  // Load category edit form and error messages
  load() {
    const div = document.getElementById('categoryEdit')
    if (div == null) { return }

    path = location.pathname
    creatErrorTag()
    createFormSumbission()
  },

  // Updates firebaseUser as user logs in and out
  updateUser(user) {
    firebaseUser = user
    const div = document.getElementById('categoryEdit')
    if (div == null) { return }

    if (firebaseUser) {
      div.classList.remove('hidden')
    } else {
      div.classList.add('hidden')
    }
  }
}
