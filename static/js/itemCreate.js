import LocaleFetchCall from './localeFetchCall.js'

let errorTag = null
let firebaseUser = null

// Create listener to remove error tag text
const creatErrorTag = () => {
  errorTag = document.getElementById('itemErrors')

  errorTag.addEventListener('click', (e) => {
    e.preventDefault()
    errorTag.innerHTML = ''
  })
}

// JS listener that will trigger form post. Only posts if firebaseUser is present
const createFormSumbission = () => {
  const form = document.querySelector('#createItem form')
  document.querySelector('#createItem form button').addEventListener('click', (e) => {
    e.preventDefault()
    if (firebaseUser) { submitForm(form) }
  })
}

// posts item data to create new item
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
        errorTag.innerHTML = `${item.errors} X`
      }
    }).catch(err => {
      errorTag.innerHTML = 'Failed to create category X'
    })
  })
}

export default {
  // Load item create form and error messages
  load() {
    const div = document.getElementById('createItem')
    if (div == null) { return }

    creatErrorTag()
    createFormSumbission()
  },

  // Updates firebaseUser as user logs in and out
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
