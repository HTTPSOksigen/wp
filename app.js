const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const { Client } = require('whatsapp-web.js')

const app = express();
const server = http.createServer(app)
const io = new Server(server)
//asdasd
const port = 3000;

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

const client = new Client()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});

client.on('qr', (qr) => {
    io.emit('qr', qr); 
});
app.post('/send-message', (req, res) => {
    const hedefNomre = "994707420024";
    const mesajYazi = req.body.message

    client.sendMessage(`${hedefNomre}@c.us`, mesajYazi)
        .then((response) => {
            console.log('Mesaj uğurla gönderildi:', response);
            res.send('Mesaj uğurla gönderildi');
        })
        .catch((error) => {
            console.error('Mesaj göndererken xeta bas verdi:', error);
            res.status(500).send('Xəta baş verdi');
        });
});


client.initialize();

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
