#include <avr/io.h>
#include <util/delay.h>
#include <avr/interrupt.h>

#define F_CPU 8000000UL
#define BAUD 9600
#define MYUBRR (F_CPU/16/BAUD-1)

void uart_init() {
	unsigned int ubrr = MYUBRR;
	UBRRH = (unsigned char)(ubrr>>8);
	UBRRL = (unsigned char)ubrr;

	UCSRB = (1<<RXEN) | (1<<TXEN); // включаем прием и передачу
	UCSRC = (1<<URSEL) | (1<<UCSZ1) | (1<<UCSZ0); // 8 бит данных, 1 стоп-бит
}

unsigned char uart_receive() {
	while (!(UCSRA & (1<<RXC))); // ждём, пока байт придёт
	return UDR;
}

void checkStatusCode();

void onPinPC0();
void onPinPC1();
void onPinPC2();

void offPinPC0();
void offPinPC1();
void offPinPC2();

unsigned char receiveData;

int main(void) {
	DDRC |= (1 << PC0) | (1 << PC1) | (1 << PC2); // порты PC0, PC1, PC2 на выход
	//PORTC |= (1 << PC0) | (1 << PC1) | (1 << PC2); // логичсекая 1 на порты PC0, PC1, PC2
	
	uart_init();
	
	while (1) {
		receiveData = uart_receive();
		
		checkStatusCode();
	}
}

void checkStatusCode() {
	switch(receiveData) {
	case 0x01:
		onPinPC0();
		offPinPC1();
		offPinPC2();
		break;
	case 0x02:
		onPinPC1();
		offPinPC0();
		offPinPC2();
		break;
	case 0x03:
		onPinPC2();
		offPinPC0();
		offPinPC1();;
		break;
	}
}

void onPinPC0() {
	PORTC |= (1 << PC0);
}

void onPinPC1() {
	PORTC |= (1 << PC1);
}

void onPinPC2() {
	PORTC |= (1 << PC2);
}

void offPinPC0() {
	PORTC &= ~(1 << PC0);
}

void offPinPC1() {
	PORTC &= ~(1 << PC1);
}

void offPinPC2() {
	PORTC &= ~(1 << PC2);
}