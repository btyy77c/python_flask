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

const addInput = (div, label, name, value, placeholder) => {
  const input = document.createElement('input')
  input.type = 'text'
  input.setAttribute('aria-label', label)
  input.name = name
  input.value = value
  input.placeholder = placeholder
  div.appendChild(input)
  return input
}

const changeErrorMessage = (message) => {
  const p = document.getElementById(formErrorMessageId)
  p.innerHTML = message
}

const submitForm = (form) => {
  fetch('/categories', {
    method: 'POST',
    body: JSON.stringify({ name: form.name.value }),
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
  createNewCategory() {
    let div = document.getElementById('createCategory')
    if (div == null) { return }

    let form = document.createElement('form')
    div.appendChild(form)

    addInput(form, 'Category Name', 'name', null, 'Category Name')

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
