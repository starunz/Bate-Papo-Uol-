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
}

startChat();
