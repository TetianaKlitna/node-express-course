const http = require('http');
var StringDecoder = require('string_decoder').StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder('utf-8');
  let body = '';
  req.on('data', function (data) {
    body += decode.write(data);
  });
  req.on('end', function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split('&');
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split('=');
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let attempts = 5;
let answer = Math.floor(Math.random() * 100) + 1;
let guess = '';
let message = '';
let win = false;

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  let newGame = '';
  let guessInput =
    '<form method="POST" action="/newgame"> <input name="guess" ></input><button type="submit">Submit</button></form>';
  if (win || attempts === 0) {
    newGame =
      '<form method="POST" action="/"><button type="submit">New Game</button></form>';
    guessInput = '';
  }
  return `
  <body>
  <h1>Guessing Game</h1>
  <p>Enter a guess number between 1 and 100:</p>
  <p>Answer: ${answer}; Guess value: ${guess}</p>
  ${guessInput}
  <p>${message}</p>
  ${newGame}
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log('req.method is ', req.method);
  console.log('req.url is ', req.url);

  if (req.method === 'POST') {
    getBody(req, (body) => {
      console.log('The body of the post is ', body);

      // here, you can add your own logic
      if (req.url === '/') {
        attempts = 5;
        answer = Math.floor(Math.random() * 100) + 1;
        guess = '';
        message = '';
        win = false;
      } else if (req.url === '/newgame') {
        if (body['guess']) {
          guess = Number(body['guess']);
        } else {
          guess = 'Nothing was entered.';
        }

        if (guess < answer) {
          message =
            '<span style="color:red">WRONG!</span> Too low! Try a higher number.<br>';
        } else if (guess > answer) {
          message =
            '<span style="color:red">WRONG!</span> Too high! Try a lower number.<br>';
        } else {
          message =
            '<span style="color:green"><b>Congratulations!</b> You guessed it!</span>';
          win = true;
        }

        if (!win) {
          attempts--;
          message += `<b>You have ${attempts} attempt left.</b>`;

          if (attempts === 0) {
            message = `<span style="color:red"><b>Out of attempts!</b> The correct number was ${answer}.</span>`;
          }
        }
      }

      // Your code changes would end here
      res.writeHead(303, {
        Location: '/',
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.listen(3000);
console.log('The server is listening on port 3000.');
