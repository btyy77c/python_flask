import FormHelpers from './formHelpers.js'

export default {
  login(provider) {
    const div = this.userSignInDiv()
    div.innerHTML = ''

    FormHelpers.createButton(div, 'Sign In With Google Email').addEventListener('click', (e) => {
      firebase.auth().signInWithRedirect(provider)
    })
  },

  logout() {
    const div = this.userSignInDiv()
    div.innerHTML = ''

    FormHelpers.createButton(div, 'Sign Out').addEventListener('click', (e) => {
      firebase.auth().signOut()
    })
  },

  userSignInDiv() {
    return document.getElementById('userSignIn')
  }
}
