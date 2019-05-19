import ErrorTag from './errorTag.js'
import FormHelpers from './FormHelpers.js'
import LocaleFetchCall from './localeFetchCall.js'

let firebaseUser = null

const createForm = (div) => {
  let form = document.createElement('form')
  FormHelpers.createInputField(form, 'name', 'Category Name')
  div.appendChild(form)

  FormHelpers.createButton(div, 'Create Category').addEventListener('click', (e) => {
    e.preventDefault()
    submitForm(form)
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
        ErrorTag.changeErrorMessage(`${category.errors} X`)
      }
    }).catch(err => {
      ErrorTag.changeErrorMessage('Failed to create category X')
    })
  })
}

export default {
  load(user) {
    firebaseUser = user
    const div = document.getElementById('createCategory')
    if (div == null) { return }

    div.innerHTML = ''

    if (firebaseUser) {
      createForm(div)
      ErrorTag.load('createCategoryErrors')
    }
  }
}
