let url = 'https://mock-api.driven.com.br/api/v4/uol';
let user;
let recipient = 'Todos';
let typeMessage = 'message';
let previousMessage = '';

const startChat = () => {
    start();
    resquestMessages();
    setInterval(resquestMessages, 3000);
    setInterval(validatePermanence, 5000);
    document.addEventListener('keyup', sendEnter);
}

const enterTheChat = () => {

    user = document.querySelector('.enter-name').value;

    const userName = {
        name: user
    }

    const promise = axios.post(`${url}/participants`, userName);
    promise.then(startChat);
    promise.catch(errorEntering);
}

const validatePermanence = () => {
    axios.post(`${url}/status`, {
        name: user
    });
}

function errorEntering(error) {
    if (error.response.status === 400){
        alert('Já existe um usuário com esse nome ou o campo está vazio, por favor insira um nome válido 🙂');
    }
    login();
}

const errorSending = () => {
    alert ('Ocorreu um error, faça login novamente na sala 🙂');
    login();
}

const resquestMessages = () => {
    const promisse = axios.get(`${url}/messages`);
    promisse.then(messagesChat);
}

const messagesChat = (response) => {
  
    const messages = document.querySelector('.message-container');
    messages.innerHTML = ''; 
    for(let i = 0 ; i < response.data.length ; i++) {
        if (response.data[i].type === 'status') {
            messages.innerHTML += `
            <li class="message-status">
                <span class="time">(${response.data[i].time})</span>
                <strong>${response.data[i].from}</strong>
                <span>${response.data[i].text}</span>
            </li>
            `
        }
        if (response.data[i].type === 'message') {
            messages.innerHTML += `
            <li class="message-public">
                <span class="time">(${response.data[i].time})</span>
                <strong>${response.data[i].from}</strong>
                <span> para </span>
                <strong>${response.data[i].to}: </strong>
                <span>${response.data[i].text}</span>
            </li>
            `
        }
        if(response.data[i].type === 'private_message' && 
        (response.data[i].from === user || response.data[i].to === user || response.data[i].to === 'Todos')) {
            messages.innerHTML += `
            <li class="message-private">
                <span class="time">(${response.data[i].time})</span>
                <strong>${response.data[i].from}</strong>
                <span> reservadamente para </span>
                <strong>${response.data[i].to}: </strong>
                <span>${response.data[i].text}</span>
            </li>
            `
        }
    }
    scroll();
    console.log(response.data)
}

const sendMessage = () => {
    let toSend = document.querySelector('.input-send').value;
    const sending = {
        from: user,
        to: recipient,
        text: toSend,
        type: typeMessage
    }
    
    const promise = axios.post(`${url}/messages`, sending);
    promise.then(resquestMessages);
    promise.catch(errorSending); 
    document.querySelector('.input-send').value = ''; 
}

const sendEnter = (event) => {
    if(event.key === 'Enter') {
        sendMessage();
    }
}

const scroll = () => {
    const lastMessage = document.querySelector (".message-container li:last-of-type");
    if(lastMessage.innerHTML !== previousMessage.innerHTML) {
        lastMessage.scrollIntoView();

    }
    previousMessage = lastMessage;
}

const login = () => {
    document.querySelector('.login').classList.remove('hidden');

    document.querySelector('.header').classList.add('hidden');
    document.querySelector('.message-container').classList.add('hidden')
    document.querySelector('.footer').classList.add('hidden');
}

const start = () => {
    document.querySelector('.login').classList.add('hidden');

    document.querySelector('.header').classList.remove('hidden');
    document.querySelector('.message-container').classList.remove('hidden')
    document.querySelector('.footer').classList.remove('hidden');
}

login();
