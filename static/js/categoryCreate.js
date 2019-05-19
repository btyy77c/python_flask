import ErrorTag from './errorTag.js'
import FormHelpers from './FormHelpers.js'
import LocaleFetchCall from './localeFetchCall.js'

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
  const body = JSON.stringify({
    created_by: 'A Fake User',
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
}

export default {
  load() {
    let div = document.getElementById('createCategory')
    if (div == null) { return }

    ErrorTag.load('createCategoryErrors')
    createForm(div)
  }
}
