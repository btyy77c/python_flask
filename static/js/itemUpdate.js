import LocaleFetchCall from './localeFetchCall.js'

let errorTag = null
let firebaseUser = null
let path = null

const creatErrorTag = () => {
  errorTag = document.getElementById('itemErrors')

  errorTag.addEventListener('click', (e) => {
    e.preventDefault()
    errorTag.innerHTML = ''
  })
}

const createFormSumbission = () => {
  const form = document.querySelector('#editItem form')

  document.querySelector('#editDisplay').addEventListener('click', (e) => {
    e.preventDefault()
    if (firebaseUser) { hideOrDisplay(form) }
  })

  document.querySelector('#editItem form button').addEventListener('click', (e) => {
    e.preventDefault()
    if (firebaseUser) { submitForm(form, path) }
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
  firebaseUser.getIdToken(true).then(token => {
    const body = JSON.stringify({
      user_token: token,
      category_id: form.category_id.value,
      description: form.description.value,
      id: form.id.value,
      title: form.title.value,
    })

    LocaleFetchCall.fetchCall(path, 'PUT', body).then(item => {
      if (item.errors == undefined) {
        window.location.replace(`/item/${item.title}`)
      } else {
        errorTag.innerHTML = `${category.errors} X`
      }
    }).catch(err => {
      errorTag.innerHTML = 'Failed to update category X'
    })
  })
}

export default {
  load() {
    const div = document.getElementById('editItem')
    if (div == null) { return }

    path = location.pathname

    creatErrorTag()
    createFormSumbission()
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
