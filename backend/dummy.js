var axios = require('axios');
var FormData = require('form-data');
var data = new FormData();
const info = {
    "price": 600,
    "image": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    "name": "customProduct"
}
data.append('info', JSON.stringify(info));
data.append('Store', 'KStore');
data.append('itemID', 'custom01');

var config = {
  method: 'post',
  url: 'http://localhost:8080/add_item',
  headers: { 
    'Content-Type': 'application/json', 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
