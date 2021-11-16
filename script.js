let url = 'https://mock-api.driven.com.br/api/v4/uol';

const enterTheChat = () => {
    const user = document.querySelector('.enter-name').value;
    const userName = {
        name: user
    }
    console.log(userName);
}

const startChat = () => {
    const promisse =axios.get(`${url}/messages`);
    promisse.then(messagesChat);
}

const messagesChat = (response) => {
    console.log(response.data);

    //ok, já sei que as mensagens estão chegando, e meu servirdor me retorna um array
    //e eu quero percorrer esse array filtrando as mensagens, ok? ok! chama :v

    const messagens = document.querySelector('.message-container');
    messagens.innerHTML = ''; //quero que comece vazio :v
    //agora vou percorrer esse array 
    for(let i = 0 ; i < response.data.length ; i++) {
        if (response.data[i].type === 'status') {
            messagens.innerHTML += `
            <li class="message-status">
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

startChat();
