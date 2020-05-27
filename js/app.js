// var url = 'http://newsapi.org/v2/top-headlines?' +
//           'country=us&' +
//           'apiKey=30c7f43b252741f2b6b6b7d12b486cea';
// var req = new Request(url);
// fetch(req, { referrer: location.href })
//     .then(function(response) {
//         console.log(response.json());
//     })

var url = 'http://newsapi.org/v2/top-headlines?' +
          'sources=bbc-news&' +
          'apiKey=30c7f43b252741f2b6b6b7d12b486cea';
var req = new Request(url);
fetch(req)
    .then(function(response) {
        console.log(response.json());
    })