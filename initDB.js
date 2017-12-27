var fs = require('fs')
var sqlite3 = require('sqlite3').verbose()

var db = new sqlite3.Database('./database.sqlite')

// Recreate db file
fs.unlinkSync('./database.sqlite')
fs.writeFileSync('./database.sqlite', '')

db.serialize(() => {
  // Init db tables
  db.run(`
    CREATE TABLE room (
      id INTEGER PRIMARY KEY,
      name TEXT,
      pw TEXT,
      admin_pw TEXT
    )
  `)
  db.run(`
    CREATE TABLE tokens (
      id INTEGER PRIMARY KEY,
      room_id INTEGER,
      x INTEGER,
      y INTEGER,
      text TEXT,
      FOREIGN KEY(room_id) REFERENCES room(id)
    )
  `)
})

db.close()
