const http = require('http')
const url = require('url')
const math_ops = require('./math_operations')

var server = http.createServer(function (request, response) {
  const parsedUrl = url.parse(request.url, true)

  if(parsedUrl.pathname === '/suma') {
    math_ops.add(parsedUrl.query, response)
  }

  if(parsedUrl.pathname === '/multiplicacion') {
    math_ops.mult(parsedUrl.query, response)
  }
})

server.listen(8080)
