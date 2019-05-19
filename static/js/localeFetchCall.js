export default {
  fetchCall(path, method, body) {
    return fetch(path, {
      method: method,
      body: body,
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      if (response.status == 200) {
        return response.json().then(json => {
          return json
        })
      } else {
        return { errors: 'Error processing.' }
      }
    }).catch(err => {
      return { errors: 'Internet Connect Error. Please Try Again' }
    })
  }
}
