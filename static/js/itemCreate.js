import ErrorTag from './errorTag.js'
import LocaleFetchCall from './localeFetchCall.js'

let firebaseUser = null

const submitForm = (form) => {
  firebaseUser.getIdToken(true).then(token => {
    const body = JSON.stringify({
      user_token: token,
      category_id: form.category_id.value,
      description: form.description.value,
      title: form.title.value
    })

    LocaleFetchCall.fetchCall('/items', 'POST', body).then(item => {
      if (item.errors == undefined) {
        location.reload()
      } else {
        ErrorTag.changeErrorMessage(`${item.errors} X`)
      }
    }).catch(err => {
      ErrorTag.changeErrorMessage('Failed to create category X')
    })
  })
}

export default {
  load() {
    const div = document.getElementById('createItem')
    if (div == null) { return }

    ErrorTag.load('itemErrors')
    const form = document.querySelector('#createItem form')
    document.querySelector('#createItem form button').addEventListener('click', (e) => {
      e.preventDefault()
      if (firebaseUser) { submitForm(form) }
    })
  },

  updateUser(user) {
    firebaseUser = user
    const div = document.getElementById('createItem')
    if (div == null) { return }

    if (firebaseUser) {
      div.classList.remove('hidden')
    } else {
      div.classList.add('hidden')
    }
  }
}
