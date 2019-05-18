import ErrorTag from './errorTag.js'
import FormHelpers from './FormHelpers.js'

let form = null

const addForm = (div) => {
  form = document.createElement('form')
  form.innerHTML = 'helllo!!!'
  div.appendChild(form)
}

const removeForm = () => {
  form.parentNode.removeChild(form)
  form = null
}

export default {
  load() {
    console.log('helllo!')
    const div = document.getElementById('categoryEdit')
    if (div == null) { return }

    const path = location.pathname

    FormHelpers.createButton(div, 'Edit Form').addEventListener('click', (e) => {
      if (form == null) {
        addForm(div)
      } else {
        removeForm()
      }
    })

    ErrorTag.load('categoryErrorMessages')
  }
}
