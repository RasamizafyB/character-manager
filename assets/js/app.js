
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

const character = async () =>{
    charact = await fetch('https://character-database.becode.xyz/characters');
    charactArray = await charact.json();   
    const template = document.getElementById('templ');
    charactArray.forEach((el) => {
        document.querySelector(".row").innerHTML += 
            `<div class="col-md-4">
                <div class="card mb-4 shadow-sm" id="${el.id}">
                    <div class="bd-placeholder-img card-img-top"> 
                        <img src="data:image/jpeg;base64,${el.image}" width="100%" height="350">
                            <div class="overlay">
                                <div class="text">${el.description}</div>
                            </div>
                    </div>
                    <div class="card-body">
                        <h3 class="text-dark">${el.name}</h3>
                        <p class="card-text">${el.shortDescription}</p>
                    <div class="d-flex justify-content-between align-items-center">
                    <div class="button">
                        <button type="button" class="btn btn-sm btn-outline-secondary view" data-toggle="modal" data-target="#viewCharacter">View</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary edit" data-toggle="modal" data-target="#editCharacter" >Edit</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary delete1" data-toggle="modal" data-target="#deleteCharacter">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>`
        
    }); 
}
character().then(() => {
    Delete();
});

//change the image to base64
let newImg
function encodeImageFileAsURL(element) {
    file = element.files[0];
    convertBase64 = new FileReader();
    convertBase64.onloadend = function() {
        imgBase64_1 = convertBase64.result;
        imgBase64 = convertBase64.result
                .replace('data:', '')
                .replace(/^.+,/, '');
    //console.log('RESULT', imgBase64)
    //console.log(newImg);
    let addImage = document.getElementById("addImage")
    addImage.src = imgBase64_1; 
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
    buttunDelete = document.getElementsByClassName('delete1');
    for(let i = 0; i < buttunDelete.length; i++){
        buttunDelete[i].addEventListener('click', async (e) => {
            deleteId = e.target.parentElement.parentElement.parentElement.parentElement.id
            document.getElementById('confirm').addEventListener('click', async function(){
                await fetch("https://character-database.becode.xyz/characters/" + deleteId, {
                    method: "DELETE"
                })
                document.location.reload();
           });
        })      
    }         
}
Delete();

//Edit an existing character

function Edite(){ 
    editShortDescription = document.getElementById('editShortDescription');
    editDescription = document.getElementById('editDescription');
    editName = document.getElementById('editName');
    editImage = document.getElementById('editImage');
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

function viewCharact(){
    viewShortDescription = document.getElementById('viewShortDescription');
    viewDescription = document.getElementById('viewDescription');
    viewImage = document.getElementById('viewImage');
    viewName = document.getElementById('viewName');
    body = document.querySelector('body');
    body.addEventListener("click", async function (e) {
        if (e.target.classList.contains("view")) {
            editId = e.target.parentElement.parentElement.parentElement.parentElement.id
            console.log(editId);
            IdCharacter = await characterId(editId)
            viewName.innerHTML = IdCharacter.name;
            viewDescription.innerHTML = IdCharacter.description;
            viewShortDescription.innerHTML = IdCharacter.shortDescription;
            viewImage.src = "data:image/jpeg;base64," + IdCharacter.image;
            //console.log(viewImage);
        };
    })
        
}
viewCharact();


