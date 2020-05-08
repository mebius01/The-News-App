// apiKey: f688191515cc453fb543eb624095d76a

// Top headlines /v2/top-headlines:
const rootUrl = "https://newsapi.org/v2/";
const apiKey = "f688191515cc453fb543eb624095d76a";

const prephix = "top-headlines";
const country = {
    us: "USA",
    ua: "Ukraina",
    fr: "France"
};
const q = ""
const category = ""


const grid = document.querySelector(".grid");
const selectCountry = document.querySelector('select');

// Формирует <option value="us">USA</option>
function createOtionCountry(objCountry) {
    for (let country in objCountry) {
        let option = new Option(objCountry[country], country);
        selectCountry.appendChild(option);
    }
}
createOtionCountry(country);
selectCountry.options[1].selected = true
// console.log(selectCountry.value);
// [...selectCountry.options].forEach(item => {
//     console.log(item);
// })

// Когда выбран новый элемент <option>
let c = "us"
selectCountry.options[1].selected = true
selectCountry.addEventListener('change', getValue);
function getValue() {
    option = selectCountry.options[1];
    let index = selectCountry.selectedIndex;
    option = selectCountry.options[index];
    // console.log(option.value);
    return option.value;
}
c = getValue()
console.log(c);
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
            <p>${articleObj.content}</p>
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

GetAjax("GET", `https://newsapi.org/v2/${prephix}?country=${c}&category=${category}&q=${q}&apiKey=${apiKey}`, (err, response) => {
        if (err) {
            console.log(err, response);
            return;
        }
        const arr = response.articles;
        createFragment(arr);
});


// Materialize code
document.addEventListener('DOMContentLoaded', function() {
   let elems = document.querySelectorAll('select');
   let instances = M.FormSelect.init(elems);
});

function helpCreateElement(el, arrClass, cont) {
    const element = document.createElement(el);
    if (arrClass) {
        arrClass.forEach(item => {
            element.classList.add(item);
        });
    }
    if (cont) {
        element.append(cont);
    }
    return element;
}

function GetAjax(method, url, cb, object) {
    try {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.addEventListener("load", () => {
            if (Math.floor(xhr.status / 100) !== 2) {
                cb(`Error: ${xhr.status}`, xhr);
                return;
            }
            const response = JSON.parse(xhr.responseText);
            cb(null, response);
        });

        if (object) {
            xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
            xhr.send(JSON.stringify(object));
        } else {
            xhr.send();
        }
    } catch (error) {
        cb(error);
    }

}