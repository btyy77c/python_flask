import ErrorTag from './errorTag.js'
import LocaleFetchCall from './localeFetchCall.js'

let firebaseUser = null

const submitForm = (form) => {
  firebaseUser.getIdToken(true).then(token => {
    const body = JSON.stringify({
      user_token: token,
      name: form.name.value
    })

    LocaleFetchCall.fetchCall('/categories', 'POST', body).then(category => {
      if (category.errors == undefined) {
        location.reload()
      } else {
        ErrorTag.changeErrorMessage(`${category.errors} X`)
      }
    }).catch(err => {
      ErrorTag.changeErrorMessage('Failed to create category X')
    })
  })
}

export default {
  load() {
    const div = document.getElementById('createCategory')
    if (div == null) { return }

    ErrorTag.load('createCategoryErrors')
    const form = document.querySelector('#createCategory form')
    document.querySelector('#createCategory form button').addEventListener('click', (e) => {
      e.preventDefault()
      if (firebaseUser) { submitForm(form) }
    })
  },

  updateUser(user) {
    firebaseUser = user
    const div = document.getElementById('createCategory')
    if (div == null) { return }

    if (firebaseUser) {
      div.classList.remove('hidden')
    } else {
      div.classList.add('hidden')
    }
  }
}
