const slika = document.querySelector('#slika');
const naziv = document.querySelector('#naziv');
const cena = document.querySelector('.price');
const opis = document.querySelector('#opis');
const kolicina = document.querySelector('#qty');
const kategorije = document.querySelector('.category');

const forma = document.querySelector('form');


let currentId = null;

let currentProduct = {};

// let korpa = [];

window.addEventListener('load', () => {

    currentId = localStorage.getItem("singleProduct");

    // console.log(currentId);

    fetch(`http://localhost:3000/${currentId}`)
        .then(proizvodRaw => {
            return proizvodRaw.json();
        })
        .then(proizvodJson => {

            currentProduct = proizvodJson[0];
            console.log(proizvodJson);

            slika.innerHTML = `<img src="http://localhost:3000${proizvodJson[0].img}" alt="Photo"/>`
            naziv.textContent = `${proizvodJson[0].name}`;
            cena.textContent = `$${proizvodJson[0].price}`;
            opis.textContent = `${proizvodJson[0].desc}`;

            kolicina.innerHTML = '';

            for (let i = 1; i <= proizvodJson[0].qty; i++) {
                kolicina.innerHTML += `<option value="${i}">${i}</option>`
            }


            let katTemp = proizvodJson[0].category.trim().split(',');
            // console.log(katTemp);
            kategorije.innerHTML = '';
      
            katTemp.forEach((element, idx) => {
                if (katTemp.length != idx + 1) {
                    kategorije.innerHTML += `<a href=""> ${element.trim()}</a>,`
                } else {
                    kategorije.innerHTML += `<a href=""> ${element.trim()}</a>`
                }
            })

        })
        .catch(err => console.log(err));

})



forma.addEventListener('submit', (event) => {
    event.preventDefault();
    // console.log(event.target.kolicina.value);
    // console.log(currentProduct);

    currentProduct.qty = Number(event.target.kolicina.value);

    // korpa.push(currentProduct);

    // console.log(korpa);

    if(!localStorage.getItem('korpa')){
        localStorage.setItem('korpa', '[]');
    }

    korpa = JSON.parse(localStorage.getItem('korpa'));
    korpa.push(currentProduct);
    console.log(korpa);
    localStorage.setItem('korpa', JSON.stringify(korpa));

    window.location="products.html";

})



//* Primer sa try-catch-finally

// forma.addEventListener('submit', (event) => {
//     event.preventDefault();

//     console.log(event.target.kolicina.value);

//     fetch(`http://localhost:3000/${currentId}`)
//         .then(proizvodRaw => {
//             return proizvodRaw.json();
//         })
//         .then(proizvodJson => {
//             proizvodJson[0].qty = event.target.kolicina.value;

//             if(!localStorage.getItem('korpa')){
//                 localStorage.setItem('korpa', '[]');
//             };

//             korpa = JSON.parse(localStorage.getItem('korpa'));
//             korpa.push(proizvodJson[0]);
//             console.log(korpa);
//             localStorage.setItem('korpa', JSON.stringify(korpa));

//         })
//         .catch(err => console.log(err))
//         .finally(_ =>{
//             window.location="products.html";
//         })

// })