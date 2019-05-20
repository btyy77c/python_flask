import ErrorTag from './errorTag.js'
import LocaleFetchCall from './localeFetchCall.js'

let firebaseUser = null
let path = null

const addCategoryDropdown = (form) => {
  LocaleFetchCall.fetchCall('/categories', 'GET', null).then(categories => {
    console.log(categories)
  })
}

const hideOrDisplay = (form) => {
  if (form.classList.contains('hidden')) {
    form.classList.remove('hidden')
  } else {
    form.classList.add('hidden')
  }
}

const submitForm = (form, path) => {

}

export default {
  load() {
    const div = document.getElementById('editItem')
    if (div == null) { return }

    path = location.pathname
    ErrorTag.load('itemErrors')

    const form = document.querySelector('#editItem form')

    addCategoryDropdown(form)

    document.querySelector('#editDisplay').addEventListener('click', (e) => {
      e.preventDefault()
      if (firebaseUser) { hideOrDisplay(form) }
    })

    document.querySelector('#editItem form button').addEventListener('click', (e) => {
      e.preventDefault()
      if (firebaseUser) { submitForm(form, path) }
    })
  },

  updateUser(user) {
    firebaseUser = user
    const div = document.getElementById('editItem')
    if (div == null) { return }

    if (firebaseUser) {
      div.classList.remove('hidden')
    } else {
      div.classList.add('hidden')
    }
  }
}
