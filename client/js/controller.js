// import _view from "./view.js";

const download = document.getElementById("download");
const upload = document.getElementById("upload");

const url = "http://localhost:3000/v1/api";

fetch(url) 
 .then((response) => {
  console(response)
  //  return response.json();
});

// .then((data) => {
//   let authors = data;

// })


