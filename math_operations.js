/**
 ** Add method
 ** This method takes the query parameter from the url and response stream, in order to go throw the params
 ** and make the add operation, and to send the response on the response stream.
 **/
function add (query, response) {
  var suma = 0
  for (var propName in query) {
      var splitted = query[propName]
      if(isNumeric(splitted)) {
        //Ok, it's a number
        var number = Number(splitted)
        suma += number
      } else {
        //It's not a number, so we show an error message and sends to the client
        response.writeHead(400, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({result:'error, el input debe ser numerico'}))
      }
  }
  //If everithing was OK, we send code 200 response, using json format
  response.writeHead(200, {'Content-Type': 'application/json'})
  response.end(JSON.stringify({result:suma}))
}

function mult (query, response) {
  var mult = 1
  for (var propName in query) {
      var splitted = query[propName]
      if(isNumeric(splitted)) {
        //Ok, it's a number
        var number = Number(splitted)
        mult *= number
      } else {
        //It's not a number, so we show an error message and sends to the client
        response.writeHead(400, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({result:'error, el input debe ser numerico'}))
      }
  }
  //If everithing was OK, we send code 200 response, using json format
  response.writeHead(200, {'Content-Type': 'application/json'})
  response.end(JSON.stringify({result:mult}))
}

function fib (query, response) {
  var ant1=0
  var ant2=1
  var fibo=''
  var i=0
  for (var propName in query) {
      if (i>0){
        response.writeHead(500, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({result:'error, el input debe ser unico'}))
      }
      var splitted = query[propName]
      if(isNumeric(splitted)) {
        //Ok, it's a number
        var number = Number(splitted)
        if(number<=0){
          response.writeHead(600, {'Content-Type': 'application/json'})
          response.end(JSON.stringify({result:'error, el input debe ser mayor que 0'}))
        }
      } else {
        //It's not a number, so we show an error message and sends to the client
        response.writeHead(400, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({result:'error, el input debe ser numerico'}))
      }
      i+=1
    }
  for(i=0;i<number-2;i++) {
    if(number === 1){
      response.end(JSON.stringify({result:ant1}))
    }
    if(number === 2) {
      response.end(JSON.stringify({result:String(ant1) + ' ' + String(ant2)}))
    }
    if(i== 0){
      fibo += String(ant1) + ' ' + String(ant2) + ' '
    }
    var aux =ant1
    ant1=ant2
    ant2 +=aux
    fibo +=String(ant2)+' '
  }
  response.writeHead(200, {'Content-Type': 'application/json'})
  response.end(JSON.stringify({result:fibo}))

  }

/**
 ** isNumeric returns true if input is a number. This can be done using the oppsite behaviour from isNaN function
 **/
function isNumeric(num) {
  //isNaN returns false if the input is a number, true otherwise
  return !isNaN(num)
}

//In this line we export the functions to be used in other javascript files. We must import this module with 'require' signature
module.exports.add = add
module.exports.mult = mult
module.exports.fib = fib
