const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3002;

// Create Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // Load SSL certificates
  const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, '../certs/localhost+2-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../certs/localhost+2.pem')),
  };

  const server = createServer(httpsOptions, async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });

  server.listen(port, () => {
    console.log(`> Ready on https://${hostname}:${port}`);
    console.log(`> SSL certificates loaded from certs/`);
  });
});