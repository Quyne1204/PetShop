'use strict';

const id = document.getElementById('input-id');
const name = document.getElementById('input-name');
const age = document.getElementById('input-age');
const type = document.getElementById('input-type');
const weight = document.getElementById('input-weight');
const length = document.getElementById('input-length');
const color = document.getElementById('input-color-1');
const breed = document.getElementById('input-breed');
const vaccinated = document.getElementById('input-vaccinated');
const dewormed = document.getElementById('input-dewormed');
const sterilized = document.getElementById('input-sterilized');


const table = document.querySelector('tbody');
const submit = document.getElementById('submit-btn');
const healthyBtn = document.getElementById('healthy-btn');
const bmiBtn = document.getElementById('bmi-btn');


submit.addEventListener('click',function(){ 
    //Lay du lieu tu form
    const data = {
        id:id.value,
        age:parseInt(age.value),
        name:name.value,
        type:type.value,
        weight:parseFloat(weight.value),
        length:parseFloat(length.value),
        color:color.value,
        breed:breed.value,
        vaccinated:vaccinated.checked,
        dewormed:dewormed.checked,
        sterilized:sterilized.checked,
        date: new Date()
    }
    const validate = validateData(data);
    if (validate) {
        petArr = getFromStorage("petArr")??[];
        petArr.push(data);
        saveToStorage("petArr",petArr);
        renderTableData(petArr);
        clearInput();
    }
    
    
});


//Show data
function renderTableData(petArr) {
    table.innerHTML = '';
    for(let i = 0;i<petArr.length;i++){
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${petArr[i].id}</th>
            <td>${petArr[i].name}</td>
            <td>${petArr[i].age}</td>
            <td>${petArr[i].type}</td>
            <td>${petArr[i].weight} kg</td>
            <td>${petArr[i].length} cm</td>
            <td>${petArr[i].breed}</td>
            <td>
                <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
            </td>
            <td><i class="bi ${petArr[i].vaccinated ?"bi-check-circle-fill": "bi-x-circle-fill" }"></i></td>
            <td><i class="bi  ${petArr[i].dewormed ?"bi-check-circle-fill": "bi-x-circle-fill" }"></i></td>
            <td><i class="bi  ${petArr[i].sterilized ?"bi-check-circle-fill": "bi-x-circle-fill" }"></i></td>
            <td>${displayTime(petArr[i].date).slice(8, 10)}/${displayTime(petArr[i].date).slice(5, 7)}/${displayTime(petArr[i].date).slice(0, 4)}</td>
            <td><button class="btn btn-danger" onclick="deletePet('${petArr[i].id }')">Delete</button></td>
        `;
        table.appendChild(row);
    }
    
}
renderTableData(petArr);

function displayTime(date){
    if(typeof date === "string"){
        return date;
    }else if(typeof date === "object"){
        return JSON.parse(JSON.stringify(date));
    }
}

//validate Form
function validateData(data){
    let isValidate = true;
    if(data.id.trim() === ''){
        alert("Khong duoc de trong ID");
        isValidate = false;
    }
    if(data.name.trim() === ''){
        alert("Khong duoc de trong Name");
        isValidate = false;
    }
    if(isNaN(data.age)){
        alert("Khong duoc de trong Age");
        isValidate = false;
    }
    if(data.type === "#"){
        alert("Please select Type!");
        isValidate = false;
    }
    if(isNaN(data.weight)){
        alert("Khong duoc de trong Weight");
        isValidate = false;
    }
    if(isNaN(data.length)){
        alert("Khong duoc de trong Length");
        isValidate = false;
    }

    for(let i =0;i<petArr.length;i++){
        if(data.id === petArr[i].id){
            alert("ID must be unique!");
            isValidate = false;
            break;
        }
    }
    if(data.age<1 || data.age >15){
        alert("Age must be between 1 and 15!");
        isValidate = false;
    }
    if(data.weight<1 || data.weight >15){
        alert("Weight must be between 1 and 15!");
        isValidate = false;
    }
    if(data.length<1 || data.length >100){
        alert("Length must be between 1 and 100!");
        isValidate = false;
    }
    if(data.breed === "#"){
        alert("Please select Breed!");
        isValidate = false;
    }

    return isValidate;
}
//
function clearInput(){
    id.value = '';
    name.value ='';
    age.value = '';
    type.value = '#';
    weight.value ='';
    length.value = '';
    color.value='';
    breed.value ='#';
    vaccinated.checked = false;
    dewormed.checked = false;
    sterilized.checked = false;
}

//Xoa 
function deletePet(petId){
    const isDelete = confirm("Are you sure?");
    if(isDelete){
        for(let i = 0;i<petArr.length;i++){
            if(petId === petArr[i].id){
                petArr.splice(i,1);
                saveToStorage("petArr",petArr);
                renderTableData(petArr) ;
            }
        }
    }
}

//
type.addEventListener('click',myType);

function myType() {
    breed.innerHTML = '<option value="#">Select Type</option>';
    
    const breedDogs = breedArr.filter((breedItem)=>breedItem.type === "Dog");
    const breedCats = breedArr.filter((breedItem)=>breedItem.type === "Cat");

    if(type.value === "Dog"){
        breedDogs.forEach(function(breedItem){
            const option = document.createElement("option");
            option.innerHTML = `${breedItem.breed}`;
            breed.appendChild(option);
        })
    }else if(type.value === "Cat"){
        breedCats.forEach(function(breedItem){
            const option = document.createElement("option");
            option.innerHTML = `${breedItem.breed}`;
            breed.appendChild(option);
        })
    }
}