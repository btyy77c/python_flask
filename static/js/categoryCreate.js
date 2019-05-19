import ErrorTag from './errorTag.js'
import FormHelpers from './FormHelpers.js'
import LocaleFetchCall from './localeFetchCall.js'

let firebaseUser = null

const addLoginMessage = (div) => {
  const p = document.createElement('p')
  p.innerHTML = 'You must sign in before you can create new categories'
  div.appendChild(p)
}

const createForm = (div) => {
  let form = document.createElement('form')
  FormHelpers.createInputField(form, 'name', 'Category Name')
  FormHelpers.createTextArea(form, 'description', 'Category Description')
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
      description: form.description.value,
      name: form.name.value
    })

    LocaleFetchCall.fetchCall('/categories', 'POST', body).then(category => {
      if (category.errors == undefined) {
        location.reload()
      } else {
        ErrorTag.changeErrorMessage(`${json.errors} X`)
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

    firebaseUser ? createForm(div) : addLoginMessage(div)

    ErrorTag.load('createCategoryErrors')
  }
}
