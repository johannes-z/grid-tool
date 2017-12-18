export default class Client {
  constructor () {
    this.socket = {
      readyState: 0
    }
  }

  init (ip, port) {
    this.socket = new WebSocket(`wss://${ip}:${port}`, {
      rejectUnauthorized: false
    })

    var promise = new Promise((resolve, reject) => {
      // Connection opened
      this.socket.addEventListener('open', event => {
        resolve()
      })

      // Connection errored
      this.socket.addEventListener('error', event => {
        reject(event)
      })

      // Listen for messages
      this.socket.addEventListener('message', event => {
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
