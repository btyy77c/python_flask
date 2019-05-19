export default {
  createButton(div, label) {
    const button = document.createElement('button')
    button.innerHTML = label
    div.appendChild(button)
    return button
  },

  createInputField(form, name, label) {
    const input = document.createElement('input')
    input.type = 'text'
    input.setAttribute('aria-label', label)
    input.name = name
    input.value = null
    input.placeholder = label
    form.appendChild(input)
    return input
  },

  createPTag(div, text) {
    const p = document.createElement('p')
    p.innerHTML = text
    div.appendChild(text)
    return p
  },

  createTextArea(form, name, label) {
    const textArea = document.createElement('textarea')
    textArea.setAttribute('aria-label', label)
    textArea.placeholder = label
    textArea.name = name
    textArea.value = null
    form.appendChild(textArea)
    return textArea
  }
}
