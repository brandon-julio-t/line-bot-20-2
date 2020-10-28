const http = require('http');

http
  .createServer((req, res) => {
    let str = '';
    req.on('data', chunk => (str += chunk));
    req.on('end', () => {
      console.log(str); // TODO

      res.writeHead(200);
      res.end();
    });
  })
  .listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);

    http
      .get({ host: 'localhost', port: '4040', path: '/api/tunnels' }, response => {
        let str = '';
        response.on('data', chunk => (str += chunk));
        response.on('end', () => {
          const tunnel = JSON.parse(str).tunnels[0];
          if (tunnel) console.log(`Bot is running. Public url: ${tunnel.public_url}`);
        });
      })
      .on('error', console.error);
  })
  .on('error', console.error);
