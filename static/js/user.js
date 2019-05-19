import FormHelpers from './formHelpers.js'

const userSignInDiv = () => {
  return document.getElementById('userSignIn')
}

export default {
  login(provider) {
    const div = userSignInDiv()
    div.innerHTML = ''

    FormHelpers.createButton(div, 'Sign In With Google Email').addEventListener('click', (e) => {
      firebase.auth().signInWithRedirect(provider)
    })
  },

  logout(user) {
    const div = userSignInDiv()
    div.innerHTML = ''

    FormHelpers.createButton(div, `Sign Out ${user.email}`).addEventListener('click', (e) => {
      firebase.auth().signOut()
    })
  }
}
