const listaProizvoda = document.querySelector('#listaProizvoda');

let proizvodi = [];

window.addEventListener('load', () => {
    fetch('http://localhost:3000/')
        .then(res => res.json())
        .then(resJson => {
            console.log(resJson);
            proizvodi = [...resJson];
        })
        .then(_ => {
            ispisProizvoda();
        })
        .catch(err => console.log(err));
})


const ispisProizvoda = () => {
    //ispisemo proizvode
    proizvodi.forEach(proizvod => {
        listaProizvoda.innerHTML += `
        <div class="item">
            <a onclick=goToSingle(${proizvod.id})>
                <img src="http://localhost:3000/${proizvod.img}" alt="">
                <h3>${proizvod.name}</h3>
                <p>$${proizvod.price}</p>
            </a>
        </div>
    `;
    })
}


const goToSingle = (id) =>{
    localStorage.setItem("singleProduct", id); // snima u local storage key-value par singleProduct: id
    window.location = "single.html"
    // console.log(id);
}

// local storage
// session storage