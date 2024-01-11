let titte = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mode = 'create';
let tmp;


function getTotal(){
    if (price.value != '' && taxes.value != '' && ads.value != '') {
        let result = (+price.value + +taxes.value + +ads.value ) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    }
    else {
        total.innerHTML = '';
        total.style.background = '#a00d02';
};
}


let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}


submit.onclick = function(){
    let newPro = {
        titte:titte.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
    if (mode === 'create'){
        if (count.value > 1){
            for(let i=0;i<count.value;i++){
                dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro);
        }
    }else{
            dataPro[tmp] = newPro;
            mode = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
    }

    localStorage.setItem('product', JSON.stringify(dataPro))

    clearData()
    showData()
}

function clearData() {
    titte.value= '';
    taxes.value= '';
    ads.value= '';
    price.value= '';
    discount.value= '';
    count.value= '';
    category.value= '';
    total.innerHTML= '';
}


function showData() {
    getTotal()
    let table = '';
    for (let i = 0;i<dataPro.length;i++) {
        table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].titte}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id="update" onclick="updateData(${i})">update</button></td>
                <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
            </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    let deleteAll = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        deleteAll.innerHTML = `
        <button onclick='deleteAll()'>delete all (${dataPro.length})</button>
        `
    } else {
        deleteAll.innerHTML = ``
    }
}
showData()

function deleteData(i)
{
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}

function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

function updateData(i){
    titte.value = dataPro[i].titte;
    taxes.value = dataPro[i].taxes;
    price.value = dataPro[i].price;
    discount.value = dataPro[i].discount;
    ads.value = dataPro[i].ads;
    category.value = dataPro[i].category;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mode = 'Update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth', 
    })
}

