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
const container_form = document.getElementById('container-form');


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
            <td><button class="btn btn-primary" onclick="editPet('${petArr[i].id }')">Edit</button></td>
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

// function editSubmit(){
//     const editList = document.querySelectorAll('.btn.btn-primary');
// }
//show input
function editPet(index){
    container_form.classList.remove('hide');
    const pet = petArr.find((petItem)=> petItem.id === index);
    id.value = index;
    age.value=pet.age;
    name.value=pet.name;    
    type.value=pet.type;
    weight.value=pet.weight;
    length.value=pet.length;
    color.value=pet.color;
    vaccinated.checked=pet.vaccinated;
    dewormed.checked=pet.dewormed;
    sterilized.checked=pet.sterilized;

    renderBreed();

    breed.value=`${pet.breed}`;
}

//show breed and type
type.addEventListener('click',renderBreed);

function renderBreed() {
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
//Submit edit
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
        // date: new Date()
    }
    const validate = validateData(data);
    if (validate) {
        const index = petArr.findIndex((pet)=>pet.id===data.id);
        data.date = petArr[index].date;
        petArr[index] = data;
        saveToStorage("petArr",petArr);
        container_form.classList.add('hide');
        renderTableData(petArr);
    }
    
    
});

//validate
function validateData(data){
    let isValidate = true;
    if(data.name.trim() ===''){
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