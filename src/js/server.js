const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8082 })

wss.on('connection', function connection (ws, req) {
  const ip = req.connection.remoteAddress
  console.log(ip)
  ws.on('message', function incoming (message) {
    console.log('received: %s', message)
  })
  ws.on('error', err => {
    if (err.code === 'ECONNRESET') console.log('client connection reset')
  })

  ws.send('something')
})
