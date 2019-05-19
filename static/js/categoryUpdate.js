import ErrorTag from './errorTag.js'
import FormHelpers from './FormHelpers.js'
import LocaleFetchCall from './localeFetchCall.js'

let form = null

const addForm = (div, path) => {
  getCategoryId(path).then(category => {
    form = document.createElement('form')
    const input = FormHelpers.createInputField(form, 'name', 'Category Name')
    input.value = category.name

    const textArea = FormHelpers.createTextArea(form, 'description', 'Category Description')
    textArea.value = category.description

    const id = category.id

    div.appendChild(form)

    FormHelpers.createButton(form, 'Update Category').addEventListener('click', (e) => {
      e.preventDefault()
      submitForm(form, path, id)
    })
  })
}

const getCategoryId = (path) => {
  return LocaleFetchCall.fetchCall(path, 'GET', null).then(response => {
    return response
  })
}

const removeForm = () => {
  form.parentNode.removeChild(form)
  form = null
}

const submitForm = (form, path, id) => {
  const body = JSON.stringify({
    created_by: 'A Fake User',
    description: form.description.value,
    id: id,
    name: form.name.value
  })

  LocaleFetchCall.fetchCall(path, 'PUT', body).then(category => {
    if (category.errors == undefined) {
      window.location.replace(`/category/${category.name}`)
    } else {
      ErrorTag.changeErrorMessage(`${category.errors} X`)
    }
  }).catch(err => {
    ErrorTag.changeErrorMessage('Failed to update category X')
  })
}

export default {
  load() {
    const div = document.getElementById('categoryEdit')
    if (div == null) { return }

    const path = location.pathname

    FormHelpers.createButton(div, 'Edit Form').addEventListener('click', (e) => {
      (form == null) ? addForm(div, path) : removeForm()
    })

    ErrorTag.load('categoryErrorMessages')
  }
}
