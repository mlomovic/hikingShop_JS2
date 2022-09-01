const cartTable = document.getElementById('cartTable');
const featuredArea = document.querySelector('.istaknuto');


window.addEventListener('load', () => {
    if (localStorage.getItem('korpa')) {
        korpa = JSON.parse(localStorage.getItem('korpa'));
        console.log(`korpa`);
    }
    cartTable.innerHTML = '';
    console.log(korpa);
    korpa.forEach(stavka => {
        cartTable.innerHTML += `
            <tr>
                <th scope="row">${stavka.id}</th>
                <td><img src="http://localhost:3000/${stavka.img}" alt="Photo" height="30px"/></td>
                <td>${stavka.name}</td>
                <td>$${stavka.price}</td>
                <td>${stavka.qty}</td>
                <td>$${stavka.price * stavka.qty}</td>
                <td><button class="btn btn-danger" onclick="removeItem(${stavka.id})">X</button></td>
            </tr>
        `;
    })


    let total = korpa.reduce((acc, curVal) => {
        return acc + curVal.qty * curVal.price;
    }, 0);

    cartTable.innerHTML += `
    <th scope="row"></th>
                <td></td>
                <td></td>
                <td></td>
                <td>total:</td>
                <td>$${total}</td>
    `;



    // featureInit();

});



const removeItem = (id) => {
    korpa = JSON.parse(localStorage.getItem('korpa'));
    korpa.splice(id, 1);
    localStorage.setItem('korpa', JSON.stringify(korpa));


    cartTable.innerHTML = '';

    korpa.forEach(stavka => {
        cartTable.innerHTML += `
            <tr>
                <th scope="row">${stavka.id}</th>
                <td><img src="http://localhost:3000/${stavka.img}" alt="Photo" height="30px"/></td>
                <td>${stavka.name}</td>
                <td>$${stavka.price}</td>
                <td>${stavka.qty}</td>
                <td>$${stavka.price * stavka.qty}</td>
                <td><button class="btn btn-danger" onclick="removeItem(${stavka.id})">X</button></td>
            </tr>
        `;
    })

    let total = korpa.reduce((acc, curVal) => {
        return acc + curVal.qty * curVal.price;
    }, 0);

    cartTable.innerHTML += `
    <th scope="row"></th>
                <td></td>
                <td></td>
                <td></td>
                <td>total:</td>
                <td>$${total}</td>
    `

}


const clearCart = () => {
    localStorage.setItem('korpa', '[]');
    korpa = [];

    cartTable.innerHTML = '';
}


// const featureInit = () => {
//     fetch('http://localhost:3000/')
//     .then(res => res.json())
//     .then(proizvodi => {
      
//         featuredArea.innerHTML = '';

//         proizvodi.forEach(proizvod => {
//             featuredArea.innerHTML +=`
//                 <div class="item">
//                     <a onclick="goToSingle(${proizvod.id})">
//                     <img src="http://localhost:3000/${proizvod.img}" alt=""/>
//                         <h3>${proizvod.name}</h3>
//                         <p>$${proizvod.price}</p>
//                     </a>
//                 </div>
//             `;
//         })

//     })
//     .catch(err => console.log(err));
// }



const goToSingle = (id) =>{
    localStorage.setItem("singleProduct", id); // snima u local storage key-value par singleProduct: id
    window.location = "single.html";
}