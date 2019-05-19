import ErrorTag from './errorTag.js'
import LocaleFetchCall from './localeFetchCall.js'

let firebaseUser = null

export default {
  load() {
    const div = document.getElementById('createItem')
    if (div == null) { return }

    ErrorTag.load('itemErrors')
    const form = document.querySelector('#createItem form')
    document.querySelector('#createItem form button').addEventListener('click', (e) => {
      e.preventDefault()
      console.log('clicked!!')
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
