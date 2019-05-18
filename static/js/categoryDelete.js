let errorTag = null

const changeErrorMessage = (message) => {
  errorTag.innerHTML = message
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
        changeErrorMessage(`${json.errors} X`)
      }
    }).catch(err => {
      changeErrorMessage('Failed to delete category X')
    })
  })
}

export default {
  load() {
    const div = document.getElementById('categoryDelete')
    if (div == null) { return }
    const path = location.pathname

    const button = document.createElement('button')
    button.innerHTML = 'Delete'

    div.appendChild(button)

    button.addEventListener('click', (e) => {
      e.preventDefault()
      deleteCategory(path)
    })

    errorTag = document.getElementById('categoryErrorMessages')
    errorTag.addEventListener('click', (e) => {
      e.preventDefault()
      changeErrorMessage('')
    })
  }
}
