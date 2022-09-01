const productTable = document.getElementById('productTable');

const naslovForme = document.getElementById('naslovForme');

const frmName = document.getElementById('frmName');
const frmPrice = document.getElementById('frmPrice');
const frmDesc = document.getElementById('frmDesc');
const frmCategory = document.getElementById('frmCategory');
const frmQty = document.getElementById('frmQty');
const lblImg = document.getElementById('lblImg');
const img = document.getElementById('img');

const addButton = document.getElementById('addButton');
const editButton = document.getElementById('editButton');
const cancelButton = document.getElementById('cancelButton');




let proizvodi = [];
let editProizvod;
let editMode = false;
let editId = null;

const ispisProizvoda = () => {

    productTable.innerHTML = '';

    //ispisemo proizvode
    proizvodi.forEach(proizvod => {
        productTable.innerHTML += `
        <tr>
            <th scope="row">${proizvod.id}</th>
            <td><img src="http://localhost:3000/${proizvod.img}" alt="Photo" height="30px"/></td>
            <td>${proizvod.name}</td>
            <td>${proizvod.qty}</td>
            <td>$${proizvod.price}</td>
            <td><button class="btn btn-info" onclick="viewProduct(${proizvod.id})">View</button></td>
            <td><button class="btn btn-warning" onclick="editProduct(${proizvod.id})">Edit</button></td>
            <td><button class="btn btn-danger" onclick="removeProduct(${proizvod.id})">Delete</button></td>
        </tr> 
        `;
        console.log(proizvodi);
    })
}



window.addEventListener('load', () => {
    fetch('http://localhost:3000/')
        .then(res => res.json())
        .then(resJson => {
            console.log(resJson);
            proizvodi = [...resJson];
            console.log(proizvodi);
        })
        .then(_ => {
            ispisProizvoda();

        })
        .catch(err => console.log(err));
})


const viewProduct = (id) => {
    localStorage.setItem("singleProduct", id);
    window.location = "single.html";
}


const removeProduct = (id) => {
    fetch(`http://localhost:3000/delete/${id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(resJson => {
            fetch('http://localhost:3000/')
                .then(proizvodiRaw => proizvodiRaw.json())
                .then(proizvodiJson => {
                    proizvodi = proizvodiJson;
                })
                .then(_ => {
                    ispisProizvoda();
                })
                .catch(err => console.log(err));
        })
}



const editProduct = (id) => {

    editId = id;
    addButton.hidden = true;
    img.hidden = true;
    lblImg.hidden = true;
    editButton.hidden = false;
    cancelButton.hidden = false;

    naslovForme.innerText = 'Edit product';


    fetch(`http://localhost:3000/${id}`)
        .then(proizvodRaw => proizvodRaw.json())
        .then(proizvodJson => {
            editProizvod = proizvodJson[0];
            console.log(proizvodJson[0]);

            frmName.value = proizvodJson[0].name;
            frmPrice.value = proizvodJson[0].price;
            frmDesc.value = proizvodJson[0].desc;
            frmCategory.value = proizvodJson[0].category;
            frmQty.value = proizvodJson[0].qty;
        })
        .catch(err => console.log(err));
}



editButton.addEventListener('click', () => {
    data = {
        name: frmName.value,
        price: Number(frmPrice.value),
        desc: frmDesc.value,
        category: frmCategory.value,
        qty: Number(frmQty.value)
    };


    fetch(`http://localhost:3000/edit/${editId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(proizvodRaw => proizvodRaw.json())
        .then(proizvodJson => {

            frmName.value = '';
            frmPrice.value = '';
            frmDesc.value = '';
            frmCategory.value = '';
            frmQty.value = '';

            editId = null;
            addButton.hidden = false;
            img.hidden = false;
            lblImg.hidden = false;

            editButton.hidden = true;
            cancelButton.hidden = true;

            naslovForme.innerText = 'New product';


        })
        .then(_ => {
            fetch('http://localhost:3000/')
                .then(res => res.json())
                .then(resJson => {
                    proizvodi = [...resJson];
                })
                .then(_ => {
                    ispisProizvoda();

                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err))

})


cancelButton.addEventListener('click', () => {
    editId = null;
    addButton.hidden = false;
    img.hidden = false;
    lblImg.hidden = false;

    editButton.hidden = true;
    cancelButton.hidden = true;

    naslovForme.innerText = 'New product';


    frmName.value = '';
    frmPrice.value = '';
    frmDesc.value = '';
    frmCategory.value = '';
    frmQty.value = '';
})