const createButton = (div, label) => {
  const button = document.createElement('button')
  button.innerHTML = label
  div.appendChild(button)
  return button
}

const userSignInDiv = () => {
  return document.getElementById('userSignIn')
}

export default {
  login(provider) {
    const div = userSignInDiv()
    div.innerHTML = ''

    createButton(div, 'Sign In With Google Email').addEventListener('click', (e) => {
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
