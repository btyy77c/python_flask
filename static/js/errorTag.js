let errorTag = null

export default {
  load(divID) {
    errorTag = document.getElementById(divID)

    errorTag.addEventListener('click', (e) => {
      e.preventDefault()
      this.changeErrorMessage('')
    })
  },

  changeErrorMessage(message) {
    errorTag.innerHTML = message
  }
}
