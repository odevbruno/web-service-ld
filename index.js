const express = require('express');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/peso', (req, res) => {
  const serialPort = new SerialPort({ path: 'COM5', baudRate: 9600 });
  const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));

  parser.on('data', (data) => {
    res.send(`${data}`);
    serialPort.close();
  });

  serialPort.on('error', (err) => {
    res.status(500).send(`Erro na porta serial: ${err.message}`);
  });

  serialPort.on('open', () => {
    console.log('Porta serial aberta');
  });

  serialPort.on('close', () => {
    console.log('Porta serial fechada');
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
