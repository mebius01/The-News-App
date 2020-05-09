// Materialize code
document.addEventListener('DOMContentLoaded', function () {
    let elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
    loadNews();
});

// Константы
const country = {
    us: "USA",
    ua: "Ukraina",
    fr: "France"
};
let q = '';
const category = {
    business: "Бизнес",
    entertainment: "Развлечения",
    general: "Общее",
    health: "Здоровье",
    science: "Наука",
    sports: "Спорт",
    technology: "Технология",
}
const grid = document.querySelector(".grid");
const selectCountry = document.getElementById('selectCountry');
const selectCategory = document.getElementById('selectCategory');
const search = document.getElementById('search');

// Формирует <option value="us">USA</option>
function createOtion(objectSelect, elementSelect) {
    for (let country in objectSelect) {
        let option = new Option(objectSelect[country], country);
        elementSelect.appendChild(option);
    }
}
createOtion(country, selectCountry);
createOtion(category, selectCategory);

for (let i = 0; i < selectCountry.options.length; i++) {
    if (selectCountry.options[i].value == sessionStorage.getItem('country')) {
        selectCountry.options[i].selected = true;
    }
}

for (let i = 0; i < selectCategory.options.length; i++) {
    if (selectCategory.options[i].value == sessionStorage.getItem('category')) {
        selectCategory.options[i].selected = true;
    }
}

selectCountry.addEventListener('change', getValueCountry);
selectCategory.addEventListener('change', getValueCategory);
search.addEventListener('keyup', inputSearch);

// Обрабатывает формы
function inputSearch() {
    q = search.value;
    console.log(q);
    return q;
}

function getValueCountry(event) {
    let target = event.target;
    let index = target.selectedIndex;
    option = target.options[index];

    grid.innerHTML = '';
    sessionStorage.setItem('country', option.value);
    let country = sessionStorage.getItem('country');
    let category = sessionStorage.getItem('category');
    newsService.topHeadlines(country, category, query = "", cbGetResponse);
}

function getValueCategory(event) {
    let target = event.target;
    let index = target.selectedIndex;
    option = target.options[index];

    grid.innerHTML = '';
    sessionStorage.setItem('category', option.value);
    let country = sessionStorage.getItem('country');
    let category = sessionStorage.getItem('category');
    newsService.topHeadlines(country, category, query = "", cbGetResponse);
}


// AJAX
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
const http = httpResponse();

// Сервис для работы с API
const newsService = (function () {
    const apiKey = "f688191515cc453fb543eb624095d76a";
    const url = "https://newsapi.org/v2";

    return {
        topHeadlines(country = "us", category = "general", query = "", cbGetResponse) {
            http.get(`${url}/top-headlines?country=${country}&category=${category}&q=${query}&apiKey=${apiKey}`, cbGetResponse);
        },
    };
}());

// Принимает параметры. Вызывает калобек который отдает {status: "ok", totalResults: 30, articles: Array(20)}
function loadNews() {
    if (sessionStorage.getItem('category') == null) {
        sessionStorage.setItem('category', 'general');
    }
    if (sessionStorage.getItem('country') == null) {
        sessionStorage.setItem('country', 'ua');
    }

    let country = sessionStorage.getItem('country');
    let category = sessionStorage.getItem('category');
    newsService.topHeadlines(country, category, query = "", cbGetResponse);
}


// Формирует одну карточку
function createCard(articleObj) {
    const article = document.createElement('article');
    article.classList.add("card");
    article.insertAdjacentHTML('afterbegin', `<div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="${articleObj.urlToImage}">
        </div>
        <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">
                ${articleObj.title}
                <i class="material-icons right">more_vert</i>
            </span>
            <p><a href="${articleObj.url}" target="_blank">${articleObj.source.name}</a></p>
        </div>
        <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">
            ${articleObj.title}
                <i class="material-icons right">close</i>
            </span>
            <p>${articleObj.description}</p>
        </div>`);
    return article;
}

// Формирует фрагмент
function createFragment(arr) {
    const fragment = document.createDocumentFragment();
    arr.forEach(article => {
        fragment.appendChild(createCard(article));
    });
    grid.appendChild(fragment);
}


// КолБек для topHeadlines
function cbGetResponse(err, resp) {
    if (err) {
        return {
            error: resp
        };
    }
    createFragment(resp.articles);
}