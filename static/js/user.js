// Create login/logout text
const createSpan = (div, label) => {
  div.innerHTML = ''
  const span = document.createElement('span')
  span.innerHTML = label
  div.appendChild(span)
  return span
}

// div where login/logout text is located
const userSignInDiv = () => {
  return document.getElementById('userSignIn')
}

export default {
  // add login button to page
  login(provider) {
    const div = userSignInDiv()

    createSpan(div, 'Sign In With Google Email')

    div.addEventListener('click', (e) => {
      e.preventDefault()
      firebase.auth().signInWithRedirect(provider)
    })
  },

  // add logout button to page
  logout(user) {
    const div = userSignInDiv()

    createSpan(div, `Sign Out ${user.email}`)

    div.addEventListener('click', (e) => {
      e.preventDefault()
      firebase.auth().signOut()
    })
  }
}
