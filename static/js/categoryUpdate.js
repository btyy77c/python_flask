import ErrorTag from './errorTag.js'
import LocaleFetchCall from './localeFetchCall.js'

let firebaseUser = null
let path = null

const hideOrDisplay = (form) => {
  if (form.classList.contains('hidden')) {
    form.classList.remove('hidden')
  } else {
    form.classList.add('hidden')
  }
}

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
        ErrorTag.changeErrorMessage(`${category.errors} X`)
      }
    }).catch(err => {
      ErrorTag.changeErrorMessage('Failed to update category X')
    })
  })
}

export default {
  load() {
    const div = document.getElementById('categoryEdit')
    if (div == null) { return }

    path = location.pathname
    ErrorTag.load('editErrors')

    const form = document.querySelector('#categoryEdit form')

    document.querySelector('#editDisplay').addEventListener('click', (e) => {
      e.preventDefault()
      if (firebaseUser) { hideOrDisplay(form) }
    })

    document.querySelector('#categoryEdit form button').addEventListener('click', (e) => {
      e.preventDefault()
      if (firebaseUser) { submitForm(form, path) }
    })
  },

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
