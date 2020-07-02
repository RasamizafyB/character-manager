// Declaration des variable

    //Get character on api

let charact;
let charactArray;

    //add character

let newName;
let newShortDescription;
let newDescription;
let newCharact;

    //convert image to base64

let file;
let convertBase64;
let imgBase64;
let imgBase64_1;

    //delete character

let buttunDelete;
let deleteId;

    //edit character

let buttunEdite;
let editName;
let editImage;
let editShortDescription;
let editDescription;
let editId;

    //view single character

let viewName;
let viewShortDescription;
let viewDescription;
let viewImage;

    //for the button edit and view

let body;

    //get id character on api

let IdCharacter;
let characterId = async (id) =>await (await fetch("https://character-database.becode.xyz/characters/" + id)).json();

//display the characters on HTML

const API_url =  async function (){
    charact= await fetch ('https://character-database.becode.xyz/characters');
    charactArray= await charact.json();  
    charactArray.forEach((element, ) => {
        document.querySelector(".row").innerHTML += `
        <div class="col-lg-4 offset-xs-1" id="${element.id}">
            <div class="our-team-main">    
                <div class="team-front">
                    <img src="data:image;base64,${element.image}"  class="img-fluid" id="img1">
                    <h3 id="name1">${element.name}</h3>
                    <p id="short1">${element.shortDescription}</p>
                </div>   
                <div class="team-back">
                    <div class="button" style="right:95px;">
                        <button type="button" class="btn btn-sm btn-outline-secondary view" data-toggle="modal" data-target="#viewCharacter">View</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary edit" data-toggle="modal" data-target="#editCharacter">Edit</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary delete1" data-toggle="modal" data-target="#deleteCharacter">Delete</button>
                    </div>  
                    <span id="description1">
                        ${element.description}
                    </span> 
                </div> 
            </div>     
       </div>`         
    });
};
API_url().then(() => {
    Delete();
});

//change the image to base64
    
function encodeImageFileAsURL(element) {
    file = element.files[0];
    convertBase64 = new FileReader();
    convertBase64.onloadend = function() {
    imgBase64_1 = convertBase64.result;
    imgBase64 = convertBase64.result
            .replace('data:', '')
            .replace(/^.+,/, '');
    }
    convertBase64.readAsDataURL(file);
}

//Add a new character

function Add(){
    newName = document.getElementById('recipient-name');
    newShortDescription = document.getElementById('recipient-shortDescription');
    newDescription = document.getElementById('message-description');
    document.getElementById('add-charact').addEventListener('click', async function(){
        if(newName == false || newShortDescription == false || newDescription == false){
            alert('Complet form please'); 
        }else{
            await fetch("https://character-database.becode.xyz/characters", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({
                    description : newDescription.value,
                    shortDescription : newShortDescription.value,
                    name : newName.value,
                    image : imgBase64,
                }),
            });
            document.location.reload();
        }      
    });
}
Add();

//Delete a character

function Delete(){
    body = document.querySelector('body');
    body.addEventListener("click", async function (e) {
        if (e.target.classList.contains("delete1")) {
            deleteId = e.target.parentElement.parentElement.parentElement.parentElement.id
            document.getElementById('confirm').addEventListener('click', async function(){
                await fetch("https://character-database.becode.xyz/characters/" + deleteId, {
                    method: "DELETE"
                })
                document.location.reload();
            });
        };     
    });         
}
Delete();

//Edit an existing character

function Edite(){ 
    editShortDescription = document.getElementById('editShortDescription');
    editDescription = document.getElementById('editDescription');
    editImage = document.getElementById('editImage');
    editName = document.getElementById('editName');
    body = document.querySelector('body');
    body.addEventListener("click", async function (e) {
        if (e.target.classList.contains("edit")) {
            editId = e.target.parentElement.parentElement.parentElement.parentElement.id
            IdCharacter = await characterId(editId)
            editName.value = IdCharacter.name;
            editDescription.value = IdCharacter.description;
            editShortDescription.value = IdCharacter.shortDescription;
            editImage.src = "data:image/jpeg;base64," + IdCharacter.image;
            document.getElementById('editCharact').addEventListener('click', async function(){
                await fetch("https://character-database.becode.xyz/characters/" + editId, {
                    method: "PUT",
                    headers: new Headers({
                        "Content-type": "application/json; charset=UTF-8",
                    }),
                    body: JSON.stringify({
                        name: editName.value,
                        description: editDescription.value,
                        shortDescription: editShortDescription.value,
                        image : imgBase64 || IdCharacter.image,
                    }),
                })
                document.location.reload();
           });
        }
    });     
}
Edite();

//View the select character

function View(){ 
    viewName = document.getElementById('viewName');
    viewShortDescription = document.getElementById('viewShortDescription');
    viewDescription = document.getElementById('viewDescription')
    viewImage = document.getElementById("viewImage")
    body = document.querySelector('body');
    body.addEventListener("click", async function (e) {
        if (e.target.classList.contains("view")) {
            editId = e.target.parentElement.parentElement.parentElement.parentElement.id
            IdCharacter = await characterId(editId)
            viewName.innerHTML = IdCharacter.name;
            viewDescription.innerHTML = IdCharacter.description;
            viewShortDescription.innerHTML = IdCharacter.shortDescription;
            viewImage.src = "data:image/jpeg;base64," + IdCharacter.image;
        }
    }); 
}    
View(); 
