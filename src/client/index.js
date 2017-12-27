export default class Client {
  constructor () {
    this.socket = {
      readyState: 0
    }
  }

  init (ip, port) {
<<<<<<< HEAD:src/client/index.js
    let protocol = window.location.protocol
    protocol = protocol.substring(0, protocol.length - 1)
    let wsProtocol = protocol === 'http' ? 'ws' : 'wss'

    this.socket = new WebSocket(`${wsProtocol}://${ip}:${port}`)
=======
    this.socket = new WebSocket(`ws://${ip}:${port}`)
>>>>>>> 8e50491eb5f2bcd8ecf2572dd4c0a5b16b58ff87:src/js/client.js

    var promise = new Promise((resolve, reject) => {
      // Connection opened
      this.socket.addEventListener('open', event => {
        resolve()
      })

      // Connection errored
      this.socket.addEventListener('error', event => {
        reject(event)
      })

      // Connection errored
      this.socket.addEventListener('close', event => {
        console.log('close')
        reject(event)
      })
    })

    return promise
  }

  send (data) {
    this.socket.send(data)
  }

  registerEventListener (type, fn) {
    this.socket.addEventListener(type, fn)
  }
}
