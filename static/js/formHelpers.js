export default {
  createButton(div, label) {
    const button = document.createElement('button')
    button.innerHTML = label
    div.appendChild(button)
    return button
  }
}
