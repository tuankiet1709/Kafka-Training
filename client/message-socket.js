const socket = io("http://localhost:3000", { transports: ['websocket', 'polling', 'flashsocket'] })
const socket2 = io("http://localhost:3002", { transports: ['websocket', 'polling', 'flashsocket'] })

const user = document.getElementById('user');
const price = document.getElementById('price');
const messages = document.getElementById('messages');

const handleSubmitNewMessage = () => {
	socket.emit('message', { 
		userId: user.value,
		price: parseFloat(price.value)
	});
};

socket2.on('message2', (data) => {
	console.log(data);
	handleNewMessage(data);
});

const handleNewMessage = (message) => {
	messages.appendChild(buildNewMessage(message));
};

const buildNewMessage = (message) => {
	const li = document.createElement('li');
	li.appendChild(document.createTextNode(message));
	return li;
};
