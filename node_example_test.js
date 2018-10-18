var http = require('http')

var server = http.createServer(function (request, response) {
  var url = request.url
  var data = url.split('?')

  if(data[0] === '/fibonacci') {
    var ant1 = 0
    var ant2 = 1
    var splitted = data[1].split('=')[1]
    if(isNumeric(splitted)) {
      var number = Number(splitted)
      for (i=0;i<number;i++) {
        var aux=ant1
        ant1=ant2
        ant2=aux + ant2
        response.writeHead(ant1)
      }
    }else{
      response.writeHead(400, {'Content-Type': 'application/json'})
      response.end(JSON.stringify({result:'error, el input debe ser numerico'}))
    }
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify({result:'\n Esta es la serie Fibonacci de 5 terminos'}))
  }


  if(data[0] === '/multiplicacion') {
    var mult = 1
    var input = data[1].split('&')
    input.forEach(function(numero) {
      var splitted = numero.split('=')[1]
      if(isNumeric(splitted)) {
        var number = Number(splitted)
        mult *= number
      } else{
        response.writeHead(400, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({result:'error, el input debe ser numerico'}))
      }
    })
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify({result:mult}))
  }

  if(data[0] === '/suma') {
    var suma = 0
    var input = data[1].split('&')
    input.forEach(function(numero) {
      var splitted = numero.split('=')[1]
      if(isNumeric(splitted)) {
        //Ok, it's a number
        var number = Number(splitted)
        suma += number
      } else {
        //It's not a number, so we show an error message and sends to the client
        response.writeHead(400, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({result:'error, el input debe ser numerico'}))
      }
    })
    //If everithing was OK, we send code 200 response, using json format
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify({result:suma}))
  }
})

/**
 ** isNumeric returns true if input is a number. This can be done using the oppsite behaviour from isNaN function
 **/
function isNumeric(num) {
  //isNaN returns false if the input is a number, true otherwise
  return !isNaN(num)
}

server.listen(8080)
