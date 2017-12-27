
const Room = sequelize.define('room', {
  name: {
    type: Sequelize.STRING
  },
  pw: {
    type: Sequelize.STRING
  },
  adminPW: {
    type: Sequelize.STRING
  }
})
