let url = 'https://mock-api.driven.com.br/api/v4/uol';
let user;

const startChat = () => {

    //const hidden = document.querySelector('.login');
    //hidden.classList.add(hidden);

    resquestMessages();
    setInterval(resquestMessages, 3000);
    setInterval(validatePermanence, 5000);
}

const enterTheChat = () => {

    //user = document.querySelector('.enter-name').value;
    user = prompt('qual seu nome?');
    const userName = {
        name: user
    }
    console.log(userName);
    const promise = axios.post(`${url}/participants`, userName);
    promise.then(startChat);
    promise.catch(errorEntering);
}

const validatePermanence = () => {
    axios.post(`${url}/status`, {
        name: user
    });
    //console.log(promise);
    console.log(user)

}

function errorEntering(error) {

    //const visible = document.querySelector('.login');

    if (error.response.status === 400){
        alert('Já existe um usuário com esse nome ou o campo está vazio, por favor insira um nome válido 🙂');
    }
    window.location.reload();
    //visible.classList.remove(hidden);
}


const resquestMessages = () => {
    console.log('mensagens chegando')
    const promisse = axios.get(`${url}/messages`);
    promisse.then(messagesChat);
}

const messagesChat = (response) => {
  
    const messagens = document.querySelector('.message-container');
    messagens.innerHTML = ''; 
    for(let i = 0 ; i < response.data.length ; i++) {
        if (response.data[i].type === 'status') {
            messagens.innerHTML += `
            <li class="message-status">
                <span class="time">(${response.data[i].time})</span>
                <strong>${response.data[i].from}</strong>
                <span>${response.data[i].text}</span>
            </li>
            `
        }
        if (response.data[i].type === 'message') {
            messagens.innerHTML += `
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
        response.data[i].from === user || response.data[i].to === user) {
            messagens.innerHTML += `
            <li class="message-public">
                <span class="time">(${response.data[i].time})</span>
                <strong>${response.data[i].from}</strong>
                <span> para </span>
                <strong>${response.data[i].to}: </strong>
                <span>${response.data[i].text}</span>
            </li>
            `
        }
    }
}

enterTheChat();
