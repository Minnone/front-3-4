const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const requestHandler = (req, res) => {
    let filePath = './index.html';
    
    if (req.url === '/') {
        filePath = path.join(__dirname, 'index.html');
    } else if (req.url === '/styles.css') {
        filePath = path.join(__dirname, 'styles.css');
    } else {
        filePath = path.join(__dirname, '404.html');
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>error  </h1>');
        return;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end('Ошибка сервера');
        }
        res.writeHead(200);
        res.end(data);
    });
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
