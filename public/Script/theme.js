console.log("hanieh");

let  root =  document.querySelector ('html');
let btn = document.getElementById('themeBtn');

console.log(btn)
btn.addEventListener('click', function () {

console.log(btn)
    if ( root .getAttribute ('data-theme') === 'Jungle') {
        root .setAttribute ('data-theme' , 'canad');
    } else if ( root .getAttribute('data-theme') === 'canad'){
        root.setAttribute('data-theme' , 'city');
    }else if ( root .getAttribute('data-theme') === 'city'){
        root.setAttribute('data-theme' , 'Jungle');
    }
})