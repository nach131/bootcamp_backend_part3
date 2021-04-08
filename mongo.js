const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB_URI

// conexion mongodb
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => {
    console.log('Esta conectado a Mongo Atlas')
  }).catch(err => {
    console.log(err)
  })

// para que se desconecta mongo cuando hay un error
process.on('uncaughtExcetion', () => {
  mongoose.connection.disconnect()
})