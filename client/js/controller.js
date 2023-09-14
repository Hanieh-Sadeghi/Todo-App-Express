// import _view from "./view.js";

const download = document.getElementById("download");
const upload = document.getElementById("upload");

const url = "http://localhost:3000/v1/api";
console.log('download')

fetch(url) 
 .then((response) => {
  console.log(response)
  // console.log(download)

  //  return response.json();
});

// .then((data) => {
//   let authors = data;

// })


