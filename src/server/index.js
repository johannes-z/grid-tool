const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8082, rejectUnauthorized: false })

let connections = []
let tokens = []

wss.on('connection', function connection (ws, req) {
  const ip = req.connection.remoteAddress
  connections.push(ip)
  console.log(connections)
  ws.on('message', function incoming (message) {
    console.log('received: %s', message)

    let { action, payload } = JSON.parse(message)
    switch (action) {
      case 'created':
        tokens.push(payload)
        break
      case 'moved':
        let index = tokens.findIndex(t => t.id === payload.id)
        tokens[index] = payload
        break
      default:
        break
    }

    wss.clients.forEach(client => {
      client.send(JSON.stringify(tokens))
    })

    console.log(tokens)
  })
  ws.on('error', err => {
    if (err.code === 'ECONNRESET') console.log('client connection reset')
  })
  ws.on('close', () => connections.splice(connections.indexOf(ip), 1))

  ws.send(JSON.stringify(tokens))
})
