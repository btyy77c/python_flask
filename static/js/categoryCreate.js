import ErrorTag from './errorTag.js'
import FormHelpers from './FormHelpers.js'

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
  fetch('/categories', {
    method: 'POST',
    body: JSON.stringify({
      created_by: 'A Fake User',
      description: form.description.value,
      name: form.name.value
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => {
    response.json().then(json => {
      if (json.errors == undefined) {
        location.reload()
      } else {
        ErrorTag.changeErrorMessage(`${json.errors} X`)
      }
    })
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
