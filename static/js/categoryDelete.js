import ErrorTag from './errorTag.js'
import LocaleFetchCall from './localeFetchCall.js'

let firebaseUser = null
let path = null

const deleteCategory = (path) => {
  firebaseUser.getIdToken(true).then(token => {
    const body = JSON.stringify({ user_token: token })

    LocaleFetchCall.fetchCall(path, 'DELETE', body).then(category => {
      if (category.errors == undefined) {
        window.location.replace('/')
      } else {
        ErrorTag.changeErrorMessage(`${category.errors} X`)
      }
    }).catch(err => {
      console.log(err)
      ErrorTag.changeErrorMessage('Failed to delete category X')
    })
  })
}

export default {
  load() {
    const div = document.getElementById('categoryDelete')
    if (div == null) { return }

    path = location.pathname
    ErrorTag.load('deleteErrors')

    document.querySelector('#categoryDelete button').addEventListener('click', (e) => {
      e.preventDefault()
      if (firebaseUser) { deleteCategory(path) }
    })
  },

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
