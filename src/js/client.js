export default class Client {
  init () {
    this.socket = new WebSocket('ws://localhost:8082')

    // Connection opened
    this.socket.addEventListener('open', event => {
      this.socket.send('Hello Server!')
    })

    // Connection errored
    this.socket.addEventListener('error', event => {
      console.log('error')
    })

    // Listen for messages
    this.socket.addEventListener('message', event => {
      console.log('Message from server ', event.data)
    })

    // Connection errored
    this.socket.addEventListener('close', event => {
      console.log('close')
    })
  }
}
