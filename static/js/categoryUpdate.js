import ErrorTag from './errorTag.js'

const addButton = (div, label) => {
  const button = document.createElement('button')
  button.innerHTML = label
  div.appendChild(button)
  return button
}

const addFormFields = form => {
  const input = document.createElement('input')
  input.type = 'text'
  input.setAttribute('aria-label', 'Category Name')
  input.name = 'name'
  input.value = null
  input.placeholder = 'Category Name'
  form.appendChild(input)

  const textArea = document.createElement('textarea')
  textArea.setAttribute('aria-label', 'Category Description')
  textArea.placeholder = 'Category Description'
  textArea.name = 'description'
  textArea.value = null
  form.appendChild(textArea)
}

export default {
  load() {
    console.log('helllo!')
    const div = document.getElementById('categoryEdit')
    if (div == null) { return }

    const path = location.pathname
    const form = document.createElement('form')
    div.appendChild(form)

    addFormFields(form)

    addButton(form, 'Update Category').addEventListener('click', (e) => {
      e.preventDefault()
      console.log('hello!')
    })

    ErrorTag.load('categoryErrorMessages')
  }
}
