// apiKey: f688191515cc453fb543eb624095d76a

// Top headlines /v2/top-headlines: https://newsapi.org/v2/top-headlines?country=us&apiKey=f688191515cc453fb543eb624095d76a

// Everything /v2/everything https://newsapi.org/v2/everything?q=bitcoin&apiKey=f688191515cc453fb543eb624095d76a

// Sources /v2/sources ://newsapi.org/v2/sources?apiKey=f688191515cc453fb543eb624095d76a




// const newS = {
//     "status": "ok",
//     "totalResults": 38,
//     -"articles": [
//     -{
//     -"source": {
//     "id": null,
//     "name": "Theguardian.com"
//     },
//     "author": "Oliver Holmes",
//     "title": "Israeli court rules Netanyahu can form government under criminal indictment - The Guardian",
//     "description": "Decision removes last barrier to country’s longest serving leader forming unity government with former rival Benny Gantz",
//     "url": "https://www.theguardian.com/world/2020/may/07/israel-netanyahu-and-gantz-get-supreme-court-nod-for-coalition",
//     "urlToImage": "https://i.guim.co.uk/img/media/731c4526db02a8371bc951d4101a6d5c99f8ebb3/0_0_5472_3283/master/5472.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=4caf8cbc6f2acd7247beb94b07726458",
//     "publishedAt": "2020-05-07T06:32:00Z",
//     "content": "Israels top court has ruled Benjamin Netanyahu can legally form a government while under criminal indictment for corruption, paving the way for him to be sworn in as prime minister next week.\r\nThe unanimous decision, released overnight, swatted down last-ditc… [+2986 chars]"
//     }
//     ]
// }


// let url = 'http://newsapi.org/v2/top-headlines?' +
//         'country=us&' +
//         'apiKey=f688191515cc453fb543eb624095d76a';
// let req = new Request(url);
// fetch(req)
//     .then(function(response) {
//         console.log(response.json());
//     })


// AJAX GET
function getUsers(cb) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
    xhr.addEventListener("load", () => {
        const users = JSON.parse(xhr.responseText)
        cb(users)
    })

    xhr.addEventListener("error", () => {
        console.log("ERROR");
    })

    xhr.send();
}

function GetAjax(object, cb, url, method) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText)
        cb(response)
    });
    xhr.addEventListener("error", () => {
        console.log("ERROR");
    });
    if (object) {
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        xhr.send(JSON.stringify(object));
    } else if (!object) {
        xhr.send();
    }
}

// AJAX POST
function postUser(object, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://jsonplaceholder.typicode.com/users");
    xhr.addEventListener("load", () => {
        const user = JSON.parse(xhr.responseText);
        cb(user);
    });

    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8")

    xhr.addEventListener("error", () => {
        console.log("ERROR");
    });

    xhr.send(JSON.stringify(object));
}

// Materialize code
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
    });