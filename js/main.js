const http = httpResponse();
// Materialize code
document.addEventListener('DOMContentLoaded', function () {
    let elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
    loadNews();
});

function httpResponse() {
    return {
        get(url, cb) {
            try {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.addEventListener("load", () => {
                    if (Math.floor(xhr.status / 100) !== 2) {
                        cb(`Error: ${xhr.status}`, xhr);
                        return;
                    }
                    const response = JSON.parse(xhr.responseText);
                    cb(null, response);
                });

                xhr.addEventListener('error', () => {
                    cb(`Error. Status code: ${xhr.status}`, xhr);
                });
                xhr.send();
            } catch (error) {
                cb(error);
            }
        },
        post(url, cb, headers, object) {
            try {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', url);
                xhr.addEventListener("load", () => {
                    if (Math.floor(xhr.status / 100) !== 2) {
                        cb(`Error: ${xhr.status}`, xhr);
                        return;
                    }
                    const response = JSON.parse(xhr.responseText);
                    cb(null, response);
                });

                xhr.addEventListener('error', () => {
                    cb(`Error. Status code: ${xhr.status}`, xhr);
                });
                if (headers) {
                    Object.entries(headers).forEach(([key, value]) => {
                        xhr.setRequestHeader(key, value);
                    });
                }
                xhr.send(JSON.stringify(object));
            } catch (error) {
                cb(error);
            }
        }
    };
}

// Сервис для работы с API
const newsService = (function () {
    const apiKey = "f688191515cc453fb543eb624095d76a";
    const url = "https://newsapi.org/v2";

    return {
        topHeadlines(country = "us", query = "", cb) {
            http.get(`${url}/top-headlines?country=${country}&q=${query}&apiKey=${apiKey}`, cb);
        },
    };
}());

// Загрузка новостей
function loadNews() {
    newsService.topHeadlines("ua", "", cbGetResponse);
}

// КолБек для topHeadlines
function cbGetResponse(err, resp) {
    if (err) {
        return {
            error: resp
        };
    }
    console.log(resp);
    // return resp;
}

// http.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=f688191515cc453fb543eb624095d76a", (error, response) => {
//     if (error) {
//         // console.log(error, response);
//         return {
//             error: response
//         };
//     }
//     console.log(response);
//     return response;
// });