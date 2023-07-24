'use strict';

const id = document.getElementById('input-id');
const name = document.getElementById('input-name');
const type = document.getElementById('input-type');
const breed = document.getElementById('input-breed');
const vaccinated = document.getElementById('input-vaccinated');
const dewormed = document.getElementById('input-dewormed');
const sterilized = document.getElementById('input-sterilized');


const table = document.querySelector('tbody');
const find = document.getElementById('find-btn');

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

//sreach
find.addEventListener('click',function(){
    let petFind = petArr;

    if(id.value){
        petFind = petFind.filter((pet)=>pet.id.includes(id.value));
    }
    if(name.value){
        petFind = petFind.filter((pet)=>pet.name.includes(name.value));
    }
    if(type.value !== "Select Type"){
        petFind = petFind.filter((pet)=>pet.type === type.value);
    }
    if(breed.value !== "Select Breed"){
        petFind = petFind.filter((pet)=>pet.breed === breed.value);
    }
    if(vaccinated.checked === true){
        petFind = petFind.filter((pet)=>pet.vaccinated === true);
    }
    if(dewormed.checked === true){
        petFind = petFind.filter((pet)=>pet.dewormed === true);
    }
    if(sterilized.checked === true){
        petFind = petFind.filter((pet)=>pet.sterilized === true);
    }
    renderTableData(petFind);
})
//show breed
for(let i=0;i<breedArr.length;i++){
    const option = document.createElement("option");
    option.innerHTML = `${breedArr[i].breed}`;
    breed.appendChild(option);
}
