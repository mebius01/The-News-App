// apiKey: f688191515cc453fb543eb624095d76a

// Top headlines /v2/top-headlines:
// const rootUrl = "https://newsapi.org/v2/";
// const apiKey = "f688191515cc453fb543eb624095d76a";

// const prephix = "top-headlines";
// const country = {
//     us: "USA",
//     ua: "Ukraina",
//     fr: "France"
// };
// let q = '';
// const category = {
//     business: "Business",
//     entertainment: "Entertainment",
//     general: "General",
//     health: "Health",
//     science: "Science",
//     sports: "Sports",
//     technology: "echnology",
// }


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

// selectCountry.options[1].selected = true
selectCountry.addEventListener('change', getValue);
selectCategory.addEventListener('change', getValue);
search.addEventListener('keyup', inputSearch);


function inputSearch() {
    q = search.value;
    console.log(q);
    return q;
}

function getValue(event) {
    let target = event.target;
    let index = target.selectedIndex;
    option = target.options[index];
    // return option.value;

    grid.innerHTML = '';

    GetAjax("GET", `https://newsapi.org/v2/${prephix}?country=${option.value}&category=${""}&q=${q}&apiKey=${apiKey}`, (err, response) => {
        if (err) {
            console.log(err, response);
            return;
        }
        const arr = response.articles;
        createFragment(arr);
    });
    if (grid.childElementCount) {

    }
    console.log(option.value);
}

// // Формирует одну карточку
// function createCard(articleObj) {
//     const article = document.createElement('article');
//     article.classList.add("card");
//     article.insertAdjacentHTML('afterbegin', `<div class="card-image waves-effect waves-block waves-light">
//             <img class="activator" src="${articleObj.urlToImage}">
//         </div>
//         <div class="card-content">
//             <span class="card-title activator grey-text text-darken-4">
//                 ${articleObj.title}
//                 <i class="material-icons right">more_vert</i>
//             </span>
//             <p><a href="${articleObj.url}" target="_blank">${articleObj.source.name}</a></p>
//         </div>
//         <div class="card-reveal">
//             <span class="card-title grey-text text-darken-4">
//             ${articleObj.title}
//                 <i class="material-icons right">close</i>
//             </span>
//             <p>${articleObj.content}</p>
//         </div>`);
//     return article;
// }

// // Формирует фрагмент
// function createFragment(arr) {
//     const fragment = document.createDocumentFragment();
//     arr.forEach(article => {
//         fragment.appendChild(createCard(article));
//     });
//     grid.appendChild(fragment);
// }

// GetAjax("GET", `https://newsapi.org/v2/${prephix}?country=us&category=${""}&q=${q}&apiKey=${apiKey}`, (err, response) => {
//     if (err) {
//         console.log(err, response);
//         return;
//     }
//     const arr = response.articles;
//     createFragment(arr);
// });

// // Materialize code
// document.addEventListener('DOMContentLoaded', function () {
//     let elems = document.querySelectorAll('select');
//     M.FormSelect.init(elems);
// });

// function helpCreateElement(el, arrClass, cont) {
//     const element = document.createElement(el);
//     if (arrClass) {
//         arrClass.forEach(item => {
//             element.classList.add(item);
//         });
//     }
//     if (cont) {
//         element.append(cont);
//     }
//     return element;
// }

// function GetAjax(method, url, cb, object) {
//     try {
//         const xhr = new XMLHttpRequest();
//         xhr.open(method, url);
//         xhr.addEventListener("load", () => {
//             if (Math.floor(xhr.status / 100) !== 2) {
//                 cb(`Error: ${xhr.status}`, xhr);
//                 return;
//             }
//             const response = JSON.parse(xhr.responseText);
//             cb(null, response);
//         });

//         if (object) {
//             xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
//             xhr.send(JSON.stringify(object));
//         } else {
//             xhr.send();
//         }
//     } catch (error) {
//         cb(error);
//     }

// }

// // Custom Http Module
// function customHttp() {
//     return {
//         get(url, cb) {
//             try {
//                 const xhr = new XMLHttpRequest();
//                 xhr.open('GET', url);
//                 xhr.addEventListener('load', () => {
//                     if (Math.floor(xhr.status / 100) !== 2) {
//                         cb(`Error. Status code: ${xhr.status}`, xhr);
//                         return;
//                     }
//                     const response = JSON.parse(xhr.responseText);
//                     cb(null, response);
//                 });

//                 xhr.addEventListener('error', () => {
//                     cb(`Error. Status code: ${xhr.status}`, xhr);
//                 });

//                 xhr.send();
//             } catch (error) {
//                 cb(error);
//             }
//         },
//         post(url, body, headers, cb) {
//             try {
//                 const xhr = new XMLHttpRequest();
//                 xhr.open('POST', url);
//                 xhr.addEventListener('load', () => {
//                     if (Math.floor(xhr.status / 100) !== 2) {
//                         cb(`Error. Status code: ${xhr.status}`, xhr);
//                         return;
//                     }
//                     const response = JSON.parse(xhr.responseText);
//                     cb(null, response);
//                 });

//                 xhr.addEventListener('error', () => {
//                     cb(`Error. Status code: ${xhr.status}`, xhr);
//                 });

//                 if (headers) {
//                     Object.entries(headers).forEach(([key, value]) => {
//                         xhr.setRequestHeader(key, value);
//                     });
//                 }

//                 xhr.send(JSON.stringify(body));
//             } catch (error) {
//                 cb(error);
//             }
//         },
//     };
// }
// // Init http module
// const http = customHttp();