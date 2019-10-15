const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

const bodyParser = require('body-parser');
const sendGrid = require('@sendGrid/mail');
require('dotenv').config();

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

  app.post('/api/email', (req, res, next) => {
    console.log('called recieved in backend');
    sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: 'michael.ingley@gmail.com',
      from: req.body.email,
      subject: 'portfolio site contact from  ' + req.body.name,
      text: req.body.message,
    };
    sendGrid.send(msg)
      .then(result => {
        res.status(200).json({
          success: true
        })
      })
      .catch(err => {
        console.log('error====>', err);
        res.status(401).json({
          success: false
        })
      })
  })

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}
