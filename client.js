const socket = io('http://localhost:8000');

const container = document.querySelector(".container");
const messageInput = document.getElementById('messageInp');
const form = document.getElementById('send');


const newName = prompt("Enter Your name:");
if (newName != 'null') {
    socket.emit('new-user-joined', newName);
}


function append(message, position){
    let messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    container.append(messageElement);
}
socket.on('user-connected', name => {
    append(`${name} has joined`, 'right');
})
// function sendMessage(){
//     socket.emit('send', messageInput)
//     append("You: " + messageInput, 'right')
// }
form.addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit('send', messageInput.value);
    append("You: " + messageInput.value, 'right');
    messageInput.value='';
});

socket.on('receive', data => {
    append(`${data.name} : ${data.message}`, 'left')
})

socket.on('dissconect', name => {
    append(`${name} has disconnected`, 'left')
})

