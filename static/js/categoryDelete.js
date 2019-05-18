import ErrorTag from './errorTag.js'

const createButton = (div) => {
  const button = document.createElement('button')
  button.innerHTML = 'Delete'
  div.appendChild(button)
  return button
}

const deleteCategory = (path) => {
  fetch(path, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => {
    response.json().then(json => {
      if (json.errors == undefined) {
        window.location.replace('/')
      } else {
         ErrorTag.changeErrorMessage(`${json.errors} X`)
      }
    }).catch(err => {
      ErrorTag.changeErrorMessage('Failed to delete category X')
    })
  })
}

export default {
  load() {
    const div = document.getElementById('categoryDelete')
    if (div == null) { return }
    const path = location.pathname

    createButton(div).addEventListener('click', (e) => {
      e.preventDefault()
      deleteCategory(path)
    })

    ErrorTag.load('categoryErrorMessages')
  }
}
