'use strict';

const navEl = document.getElementById('sidebar');
navEl.addEventListener('click',function(){
    this.classList.toggle("active");
})

const data1 = {
    id : 'P001',
    name: 'MeoCat',
    age:5,
    type:'Dog',
    weight:5,
    length:50,
    color:'blue',
    breed:'Husky',
    vaccinated:true,
    dewormed:true,
    sterilized:true,
    date:new Date()
}
const data2 = {
    id : 'P002',
    name: 'Tom',
    age:3,
    type:'Cat',
    weight:5,
    length:50,
    color:'red',
    breed:'Tabby',
    vaccinated:true,
    dewormed:true,
    sterilized:true,
    date:new Date()
}
const breed1 = {
    breed:"Tabby",
    type:"Cat"
}
const breed2 = {
    breed:"Mixed Breed",
    type:"Cat"
}
const breed3 = {
    breed:"Mixed Breed",
    type:"Dog"
}
const breed4 = {
    breed:"Husky",
    type:"Dog"
}



//Lay du lieu petArr
if(getFromStorage("petArr")==null){
    saveToStorage("petArr", [data1, data2]);
}
let petArr = getFromStorage("petArr")??[];
console.log(petArr)

//Lay du lieu breedArr
if(!getFromStorage("breedArr")){
    saveToStorage("breedArr",[breed1,breed2,breed3,breed4]);
}
let breedArr = getFromStorage("breedArr")??[];
console.log(breedArr)

////////////
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}