import Echo from 'laravel-echo'

window.Pusher = require('pusher-js')

export default ({ store, app }, inject) => {
  inject(
    'echo',
    new Echo({
      broadcaster: 'pusher',
      key: process.env.VUE_APP_PUSHER_APP_KEY,
      cluster: 'eu',
      encrypted: true,
      authEndpoint: process.env.VUE_APP_BACKEND_URL + '/broadcasting/auth',
      auth: {
        headers: {
          Authorization: 'Bearer ' + store.getters['auth/accessToken']
        }
      }
    })
  )
}
