import LocaleFetchCall from './localeFetchCall.js'

let errorTag = null
let firebaseUser = null

const creatErrorTag = () => {
  errorTag = document.getElementById('createCategoryErrors')

  errorTag.addEventListener('click', (e) => {
    e.preventDefault()
    errorTag.innerHTML = ''
  })
}

const createFormSumbission = () => {
  const form = document.querySelector('#createCategory form')
  document.querySelector('#createCategory form button').addEventListener('click', (e) => {
    e.preventDefault()
    if (firebaseUser) { submitForm(form) }
  })
}

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
        errorTag.innerHTML = `${category.errors} X`
      }
    }).catch(err => {
      errorTag.innerHTML = 'Failed to create category X'
    })
  })
}

export default {
  load() {
    const div = document.getElementById('createCategory')
    if (div == null) { return }

    creatErrorTag()
    createFormSumbission()
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
