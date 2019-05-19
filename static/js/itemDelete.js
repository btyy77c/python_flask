import ErrorTag from './errorTag.js'
import LocaleFetchCall from './localeFetchCall.js'

let firebaseUser = null
let path = null

const deleteItem = (path) => {
  firebaseUser.getIdToken(true).then(token => {
    const body = JSON.stringify({ user_token: token })

    LocaleFetchCall.fetchCall(path, 'DELETE', body).then(item => {
      if (item.errors == undefined) {
        console.log(item)
        window.location.replace('/')
      } else {
        ErrorTag.changeErrorMessage(`${item.errors} X`)
      }
    }).catch(err => {
      console.log(err)
      ErrorTag.changeErrorMessage('Failed to delete item X')
    })
  })
}

export default {
  load() {
    const div = document.getElementById('itemDelete')
    if (div == null) { return }

    path = location.pathname
    ErrorTag.load('deleteErrors')

    document.querySelector('#itemDelete button').addEventListener('click', (e) => {
      e.preventDefault()
      if (firebaseUser) { deleteItem(path) }
    })
  },

  updateUser(user) {
    firebaseUser = user
    const div = document.getElementById('itemDelete')
    if (div == null) { return }

    if (firebaseUser) {
      div.classList.remove('hidden')
    } else {
      div.classList.add('hidden')
    }
  }
}
