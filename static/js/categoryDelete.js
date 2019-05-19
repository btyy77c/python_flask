import ErrorTag from './errorTag.js'
import FormHelpers from './FormHelpers.js'
import LocaleFetchCall from './localeFetchCall.js'

let firebaseUser = null

const deleteCategory = (path) => {
  LocaleFetchCall.fetchCall(path, 'DELETE', null).then(category => {
    if (category.errors == undefined) {
      window.location.replace('/')
    } else {
      ErrorTag.changeErrorMessage(`${json.errors} X`)
    }
  }).catch(err => {
    ErrorTag.changeErrorMessage('Failed to delete category X')
  })
}

export default {
  load(user) {
    firebaseUser = user
    const div = document.getElementById('categoryDelete')
    if (div == null) { return }
    //const path = location.pathname

    //FormHelpers.createButton(div, 'Delete').addEventListener('click', (e) => {
    //  e.preventDefault()
    //  deleteCategory(path)
    //})

    //ErrorTag.load('categoryErrorMessages')
  }
}
