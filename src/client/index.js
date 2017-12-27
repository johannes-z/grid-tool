export default class Client {
  constructor () {
    this.socket = {
      readyState: 0
    }
  }

  init (ip, port) {
    let protocol = window.location.protocol
    protocol = protocol.substring(0, protocol.length - 1)
    let wsProtocol = protocol === 'http' ? 'ws' : 'wss'

    this.socket = new WebSocket(`${wsProtocol}://${ip}:${port}`)

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
