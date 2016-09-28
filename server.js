const path = require('path')
const express = require('express')

module.exports = {
  app: function () {
    const app = express()
    const indexPath = path.join(__dirname, 'index.html')
    const publicPath = express.static(path.join(__dirname, 'public'))
    const srcPath = express.static(path.join(__dirname, 'src'))

    app.use('/public', publicPath)
    app.use('/src', srcPath)
    app.get('/', function (_, res) { res.sendFile(indexPath) })

    return app
  }
}