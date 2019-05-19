import ErrorTag from './errorTag.js'
import FormHelpers from './FormHelpers.js'

let firebaseUser = null

const createForm = (div) => {
  const form = document.createElement('form')
  FormHelpers.createInputField(form, 'title', 'Item Title')
  FormHelpers.createTextArea(form, 'description', 'Item Description')
  div.appendChild(form)
  console.log(div)
}

export default {
  load(user) {
    firebaseUser = user
    const div = document.getElementById('createItem')
    if (div == null) { return }

    //div.innerHTML = ''

    //if (firebaseUser) {
    //  createForm(div)
    //  ErrorTag.load('itemErrors')
    //}
  }
}
