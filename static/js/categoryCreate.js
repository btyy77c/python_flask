const formErrorMessageId = 'formErrorMessage'

const addButton = (div, label) => {
  const button = document.createElement('button')
  button.innerHTML = label
  div.appendChild(button)
  return button
}

const addErrorTag = (form) => {
  const p = document.createElement('p')
  p.id = formErrorMessageId
  form.appendChild(p)
  return p
}

const addFormFields = (form) => {
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

const changeErrorMessage = (message) => {
  const p = document.getElementById(formErrorMessageId)
  p.innerHTML = message
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
        changeErrorMessage(`${json.errors} X`)
      }
    })
  }).catch(err => {
    changeErrorMessage('Failed to create category X')
  })
}

export default {
  load() {
    let div = document.getElementById('createCategory')
    if (div == null) { return }

    let form = document.createElement('form')
    div.appendChild(form)

    addFormFields(form)

    addButton(form, 'Create Category').addEventListener('click', (e) => {
      e.preventDefault()
      submitForm(form)
    })

    addErrorTag(form).addEventListener('click', (e) => {
      e.preventDefault()
      changeErrorMessage('')
    })
  }
}
