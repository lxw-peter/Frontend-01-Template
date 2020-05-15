const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.headers);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('hello');
    res.end(`<html maaa=a >
    <head>
        <style>
    body div #myid{
        width:100px;
        background-color: #ff5000;
    }
    body div img{
        width:30px;
        background-color: #ff1111;
    }
        </style>
    </head>
    <body>
        <div>
            <img id="myid"/>
            <img />
        </div>
    </body>
    </html>
    `);
})

server.listen(3000, () => {
    console.log('http://127.0.0.1:3000/ is running');
});
