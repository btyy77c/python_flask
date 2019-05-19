import ErrorTag from './errorTag.js'
import FormHelpers from './FormHelpers.js'
import LocaleFetchCall from './localeFetchCall.js'

let firebaseUser = null

const createButton = (div, path) => {
  FormHelpers.createButton(div, 'Delete').addEventListener('click', (e) => {
     e.preventDefault()
     deleteCategory(path)
  })
}

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
  load(user) {
    firebaseUser = user

    const div = document.getElementById('categoryDelete')
    if (div == null) { return }
    div.innerHTML = ''

    const path = location.pathname

    if (firebaseUser) {
      createButton(div, path)
      ErrorTag.load('categoryErrorMessages')
    }
  }
}
