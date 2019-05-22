const createSpan = (div, label) => {
  const span = document.createElement('span')
  span.innerHTML = label
  div.appendChild(span)
  return button
}

const userSignInDiv = () => {
  return document.getElementById('userSignIn')
}

export default {
  login(provider) {
    const div = userSignInDiv()
    div.innerHTML = ''

    createSpan(div, 'Sign In With Google Email').addEventListener('click', (e) => {
      firebase.auth().signInWithRedirect(provider)
    })
  },

  logout(user) {
    const div = userSignInDiv()
    div.innerHTML = ''

    createButton(div, `Sign Out ${user.email}`).addEventListener('click', (e) => {
      firebase.auth().signOut()
    })
  }
}
