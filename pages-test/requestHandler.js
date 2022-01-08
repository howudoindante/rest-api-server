function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
async function login() {
    const form = document.querySelector("form");
    const formData = new FormData(form);
    const object = {};
    formData.forEach(function (value, key) {
        object[key] = value;
    });
    const json = JSON.stringify(object);
    const options = {
        method: 'POST',
        body: json,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    };
    const request = await fetch('http://localhost:5000/login', options)
        .then(response => response.json())
        .then(response => {
            document.cookie = `token=${response.token}`;
        })
        .catch(err => alert(err));
}
async function register() {
    const form = document.querySelector("form");
    const formData = new FormData(form);
    const object = {};
    formData.forEach(function (value, key) {
        object[key] = value;
    });
    const json = JSON.stringify(object);
    const options = {
        method: 'POST',
        body: json,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    };
    const request = await fetch('http://localhost:5000/register', options)
        .then(response => response.json())
        .then(response => {
            alert(JSON.stringify(response));
        })
        .catch(err => alert(err));
}


async function getUsers() {
    let token = getCookie("token");
    if (!token) {
        alert("Вам необходимо залогиниться");
        return;
    }
    const options = {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        },
    };
    const request = await fetch('http://localhost:5000/users', options)
        .then(response => response.json())
        .then(response => {
            const div = document.createElement("div");
            document.body.appendChild(div);
            div.textContent = JSON.stringify(response);
        })
        .catch(err => alert(err));
}