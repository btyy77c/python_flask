import LocaleFetchCall from './localeFetchCall.js'

let errorTag = null
let firebaseUser = null

const creatErrorTag = () => {
  errorTag = document.getElementById('itemErrors')

  errorTag.addEventListener('click', (e) => {
    e.preventDefault()
    errorTag.innerHTML = ''
  })
}

const createFormSumbission = () => {
  const form = document.querySelector('#createItem form')
  document.querySelector('#createItem form button').addEventListener('click', (e) => {
    e.preventDefault()
    if (firebaseUser) { submitForm(form) }
  })
}

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
  load() {
    const div = document.getElementById('createItem')
    if (div == null) { return }

    creatErrorTag()
    createFormSumbission()
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
