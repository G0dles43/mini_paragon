document.addEventListener("DOMContentLoaded", function() {
    loadFromStorage();
    printBill();
});


const controlsDialog = document.getElementById("controlsDialog");
const addButton = document.getElementById("addButton");
const closeControlsDialog = document.getElementById("closeControlsDialog");
const closeEditDialog = document.getElementById("closeEditDialog")
const submitNewProduct = document.getElementById("submitNewProduct");
const submitEdition = document.getElementById("submitEdition");
const editDialog=document.getElementById("editDialog")
const deleteDialog=document.getElementById("deleteDialog")
const confirmDelete=document.getElementById("confirmDelete")
const rejectDelete=document.getElementById("rejectDelete")
 
let bill = [];
let currentEditIndex = null;
let currentDeleteIndex = null;



addButton.addEventListener("click", (event)=>{
    controlsDialog.showModal();
});

submitNewProduct.addEventListener("click", (event)=>{
    addProduct();
});

closeControlsDialog.addEventListener("click", (event)=>{
    controlsDialog.close();
});

submitEdition.addEventListener("click", ()=>{
    const name = document.getElementById("editName").value;
    const price = parseFloat(document.getElementById("editPrice").value);
    const quantity = parseFloat(document.getElementById("editQuantity").value);

    if (name && !isNaN(price) && !isNaN(quantity) && price>0 && quantity>0) {
        bill[currentEditIndex] = { name, price, quantity };
        printBill();
    } else {
        alert("Złe dane wprowadzone");
    }

});



function loadFromStorage() {
    const storedData = localStorage.getItem("bill");
    if (storedData) {
        bill = JSON.parse(storedData);
    } else {
        bill = [];
    }
}

function printBill() {
    const tbody = document.querySelector("#bill");
    tbody.innerHTML = "";
    let productsSum=0;

    bill.forEach((product, index) => {
        const total = product.price * product.quantity;
        productsSum+=total;
        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="row">${index + 1}</td>
            <td class="row">${product.name}</td>
            <td class="row">${product.quantity}</td>
            <td class="row">${product.price.toFixed(2).replace(".", ",")} zł</td>
            <td class="row">${total.toFixed(2).replace(".", ",")} zł</td>
            <td class="row">
                <button class="edit" onclick="editProduct(${index})">Edytuj</button>
                <button class="delete" onclick="deleteProduct(${index})">Usuń</button>
            </td>
        `;
        row.style.backgroundColor = (index % 2 === 0) ? "rgb(219, 215, 215)" : "grey";
        tbody.appendChild(row);
    });

    const productsSumRow = document.createElement("tr");
    productsSumRow.innerHTML = `
            <td></td>
            <td></td>
            <td></td>
            <td class="productsSum" >RAZEM</td>
            <td class="productsSum">${productsSum.toFixed(2).replace(".", ",")} zł</td>`;
    tbody.appendChild(productsSumRow);


    const date = new Date();
    const currentDay = (date.getDate()<10) ? "0"+date.getDate() : date.getDate(); 
    const currentMonth = (date.getMonth()<10) ? "0"+(date.getMonth()+1) : date.getMonth()+1;
    const currentYear = date.getFullYear();
    document.querySelector("h1").innerHTML=`Paragon ${currentDay}|${currentMonth}|${currentYear} `;

    localStorage.setItem("bill", JSON.stringify(bill));
}

function addProduct() {
    const name = document.getElementById("name").value;
    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseFloat(document.getElementById("quantity").value);

    if (name && !isNaN(price) && !isNaN(quantity) && price>0 && quantity>0 ) {
        bill.push({ name, price, quantity });
        clearInputs();
        printBill();
    } else {
        alert("wprowadz wlasciwe dane");
    }
}

function clearInputs() {
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
}

function editProduct(index) {
    currentEditIndex=index;
    const product=bill[index];
    document.getElementById("editName").value=product.name;
    document.getElementById("editPrice").value=product.price;
    document.getElementById("editQuantity").value=product.quantity;

    editDialog.showModal();
}

closeEditDialog.addEventListener("click", ()=>{
    editDialog.close();
});


function deleteProduct(index) {
    currentDeleteIndex=index;

    deleteDialog.showModal();
}

confirmDelete.addEventListener("click", ()=>{
    bill.splice(currentDeleteIndex, 1);
    printBill();
    deleteDialog.close();
});

rejectDelete.addEventListener("click", ()=>{
    deleteDialog.close();
});

