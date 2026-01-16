// server.ts
import express from 'express';
import cors from 'cors';
import { SerialPort } from "serialport";

// настройка Express (Веб-сервера)
const app = express();
app.use(cors());
app.use(express.json());

// настройка com-порта
const port = new SerialPort({
  path: 'COM5',
  baudRate: 9600,
});

port.on('opne', () => {
  console.error('COM5 открыт и готов к работе');
});

port.on('error', (err) => {
  console.error('Ошибка COM-порта:', err.message);
});

// принимаем данные, которые прислал react (почтоый ящик)
app.post('/send', (req, res) => { // request - запрос, responce - ответ
  const { command } = req.body;
  console.log(`Получен запрос от React. Код команды: ${command}`);

  if (command === undefined) {
    res.status(400).send('Ошибка: не передан код команды');
    return;
  }

  // кладём число, которое пришло из react в буффер и отправляем его в порт
  port.write(Buffer.from([command]), (err) => {
    if (err) {
      console.error('Ошибка записи в порт:', err.message);
      res.status(500).send('Ошибка записи в порт');
    }
    else {
      console.log(`Байт 0x0${command} отправлен в COM5`);
      res.send('Успешно'); // Отвечаем React-у, что всё ок
    }

  });
});

// запуск веб-сервера
app.listen(3001, () => {
  console.log('Сервер слушает запросы на http://localhost:3001')
});