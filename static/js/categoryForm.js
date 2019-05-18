const addButton = (div, label) => {
  let button = document.createElement('button')
  button.innerHTML = label
  div.appendChild(button)
  return button
}

const addInput = (div, label, name, value, placeholder) => {
  let input = document.createElement('input')
  input.type = 'text'
  input.setAttribute('aria-label', label)
  input.name = name
  input.value = value
  input.placeholder = placeholder
  div.appendChild(input)
  return input
}

const submitForm = (form) => {
  fetch('/categories', {
    method: 'POST',
    body: JSON.stringify({ name: form.name.value }),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => {
    response.json().then(json => { console.log(json) })
  }).catch(err => { console.log(err) })
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
  }
}
