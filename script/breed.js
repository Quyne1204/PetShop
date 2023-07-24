'use strict';
const type = document.getElementById('input-type');
const breed = document.getElementById('input-breed');
const table = document.querySelector('tbody');

const submit = document.getElementById('submit-btn');

//submit
submit.addEventListener('click',function(){ 
    //Lay du lieu tu form
    const data = {
        type:type.value,
        breed:breed.value,
    }
    const validate = validateBreed(data);
    if (validate) {
        breedArr = getFromStorage("breedArr")??[];
        breedArr.push(data);
        saveToStorage("breedArr",breedArr);
        renderTableBreed(breedArr);
        clearInput();
    }
    
});

//show breed
function renderTableBreed(petArr) {
    let n = 0;
    table.innerHTML = '';
    for(let i = 0;i<breedArr.length;i++){
        n = n +1;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${n}</td>
            <td>${breedArr[i].breed}</td>
            <td>${breedArr[i].type}</td>
            <td><button class="btn btn-danger" onclick="deleteBreed('${breedArr[i].breed}')">Delete</button></td>
        `;
        table.appendChild(row);
    }
}
renderTableBreed();
//validate
function validateBreed(data){
    let isValidate = true;
    if(data.breed === ""){
        alert("Please select Breed!");
        isValidate = false;
    }
    if(data.type === "#"){
        alert("Please select Type!");
        isValidate = false;
    }
    return isValidate;
}
//delete breed
function deleteBreed(breed){
    const isDelete = confirm("Are you sure?");
    if(isDelete){
        for(let i=0;i<breedArr.length;i++){
            if(breed === breedArr[i].breed){
                breedArr.splice(i,1);
                saveToStorage("breedArr",breedArr);
                renderTableBreed(breedArr);
            }
        }
    }
}

//clear input
function clearInput(){
    breed.value ='',
    type.value ='#'
}

