const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.headers);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('hello');
    res.end('geek');
})

server.listen(3000, () => {
    console.log('http://127.0.0.1:3000/ is running');
});
