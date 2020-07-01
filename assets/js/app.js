
// Declaration des variable

let charact;
let charactArray;

let newName;
let newShortDescription;
let newDescription;
let newCharact;

let file;
let convertBase64;
let imgBase64;
let imgBase64_1;

let buttunDelete;
let deleteId;

let IdCharacter;

let buttunEdite;
let editName;
let editImage;
let editShortDescription;
let editDescription;
let editId;

let viewName;
let viewShortDescription;
let viewDescription;
let viewImage;

let body;;
let characterId = async (id) =>await (await fetch("https://character-database.becode.xyz/characters/" + id)).json();

const character = async () =>{
    charact = await fetch('https://character-database.becode.xyz/characters');
    charactArray = await charact.json();
    //console.log(charactArray);     
    const template = document.getElementById('templ');
    charactArray.forEach((el) => {
        document.querySelector(".row").innerHTML += 
            `<div class="col-md-4">
                <div class="card mb-4 shadow-sm" id="${el.id}">
                    <div class="bd-placeholder-img card-img-top"> 
                        <img src="data:image/jpeg;base64,${el.image}" width="100%" height="300">
                            <div class="overlay">
                                <div class="text">${el.description}</div>
                            </div>
                    </div>
                    <div class="card-body">
                        <h1 class="text-dark">${el.name}</h1>
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

function encodeImageFileAsURL(element) {
    file = element.files[0];
    convertBase64 = new FileReader();
    convertBase64.onloadend = function() {
        imgBase64 = convertBase64.result
                .replace('data:', '')
                .replace(/^.+,/, '');
    console.log('RESULT', imgBase64)
    }
    convertBase64.readAsDataURL(file);
  }

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

function Delete(){
    buttunDelete = document.getElementsByClassName('delete1');
    //console.log(buttunDelete);
    for(let i = 0; i < buttunDelete.length; i++){
        buttunDelete[i].addEventListener('click', async (e) => {
            deleteId = e.target.parentElement.parentElement.parentElement.parentElement.id
            //console.log(i);
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

function Edite(){ 
    editShortDescription = document.getElementById('editShortDescription');
    editDescription = document.getElementById('editDescription');
    //editImage = document.getElementById('editFile');
    editName = document.getElementById('editName');
    body = document.querySelector('body');
    body.addEventListener("click", async function (e) {
        if (e.target.classList.contains("edit")) {
           // let indexFromButtonId = e.target.getAttribute("data-edit")
            editId = e.target.parentElement.parentElement.parentElement.parentElement.id
            console.log(editId);
            IdCharacter = await characterId(editId)
            //console.log(IdCharacter); 
            editName.value = IdCharacter.name;
            editDescription.value = IdCharacter.description;
            editShortDescription.value = IdCharacter.shortDescription;
           // editImage.value = "data:image/jpeg;base64," + IdCharacter.image;
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
                            image : imgBase64,
                          }),
                })
                document.location.reload();
           });
        }
    });     
}
Edite();

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
            //console.log(IdCharacter); 
            viewName.innerHTML = IdCharacter.name;
            viewDescription.innerHTML = IdCharacter.description;
            viewShortDescription.innerHTML = IdCharacter.shortDescription;
            viewImage.src = "data:image/jpeg;base64," + IdCharacter.image;
            console.log(viewImage);
        };
    })
        
}
viewCharact();


