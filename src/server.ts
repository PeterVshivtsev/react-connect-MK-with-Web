import { SerialPort } from "serialport";


const port = new SerialPort({
  path: 'COM5',
  baudRate: 9600,
});

port.on('open', () => {
  console.log('COM5 открыт');

  setInterval(() => {
    port.write('1', (err) => {
      if (err) {
        console.error('Ошибка записи:', err.message);
      } else {
        console.log('Отправлено: 1');
      }
    });
  }, 200);
});

port.on('error', (err) => {
  console.error('Ошибка порта:', err.message);
});