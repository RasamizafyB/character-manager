
let charact;
let charactArray;

let newName;
let newShortDescription;
let newDescription;
let newCharact;

let file;
let reader;
let result;

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

let body;
let characterId = async (id) =>await (await fetch("https://character-database.becode.xyz/characters/" + id)).json();

let response=[];
let response2=[];
const API_url =  async function (){

    charact= await fetch ('https://character-database.becode.xyz/characters');
    charactArray= await charact.json();
    
    console.log(charactArray);
  
    charactArray.forEach((element, ) => {
        document.querySelector(".row").innerHTML += `
        <div class="col-lg-4" id="${element.id}">
        
        
       <div class="our-team-main">
       
       
       <div class="team-front">
       <img src="data:image;base64,${element.image}" width="100px" height="100px" class="img-fluid" id="img1">
       <h3 id="name1">${element.name}</h3>
       <p id="short1">${element.shortDescription}</p>
       </div>
       
       
       <div class="team-back">
       <div class="button">
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
    
function encodeImageFileAsURL(element) {
    file = element.files[0];
    reader = new FileReader();
    reader.onloadend = function() {
        result = reader.result
        .replace('data:', '')
        .replace(/^.+,/, '');
      console.log('RESULT', result);
    }
    reader.readAsDataURL(file);
  }
    
    

  
  
  document.getElementById('add-charact').addEventListener('click', function(){


    

    newName = document.getElementById('recipient-name').value;
    newShortDescription = document.getElementById('recipient-shortDescription').value;
    newDescription = document.getElementById('message-description').value;


    if(newName == false || newShortDescription == false || newDescription == false){
        alert('Complet form please'); 
    }else{
        addCharact();
    }
    function createCharact() {
        
         newCharact = {
            description : newDescription,
            shortDescription : newShortDescription,
            name : newName,
            image : result,
        }
       
        
       charactArray.push(newCharact);
       console.log(charactArray);
        
        
        return newCharact;
    };

     
    async function addCharact() {
        const pushCharact = await fetch("https://character-database.becode.xyz/characters", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(await createCharact()),
        });
        document.location.reload();
        return pushCharact;
    };
    
       
   
});



function Delete(){
    body = document.querySelector('body');
    body.addEventListener("click", async function (e) {
        if (e.target.classList.contains("delete1")) {
             
            deleteId = e.target.parentElement.parentElement.parentElement.parentElement.id
            //console.log(deleteId);
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


function Edite(){ 
    editShortDescription = document.getElementById('editShortDescription');
    editDescription = document.getElementById('editDescription');
    editImage = document.getElementById('editImage');
    editName = document.getElementById('editName');
    body = document.querySelector('body');
    body.addEventListener("click", async function (e) {
        if (e.target.classList.contains("edit")) {
           // let indexFromButtonId = e.target.getAttribute("data-edit")
            editId = e.target.parentElement.parentElement.parentElement.parentElement.id
            //console.log(editId);
            IdCharacter = await characterId(editId)
            //console.log(IdCharacter); 
            editName.value = IdCharacter.name;
            editDescription.value = IdCharacter.description;
            editShortDescription.value = IdCharacter.shortDescription;
            editImage.src = "data:image/jpeg;base64," + IdCharacter.image;
            //console.log(editImage);
            
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
                            image : result || IdCharacter.image,
                          }),
                })
                document.location.reload();
           });
        }
    });     
}
Edite();


function View(){ 
    viewName = document.getElementById('viewName');
    viewShortDescription = document.getElementById('viewShortDescription');
    viewDescription = document.getElementById('viewDescription')
    viewImage = document.getElementById("viewImage")
    body = document.querySelector('body');
    body.addEventListener("click", async function (e) {
        if (e.target.classList.contains("view")) {
           // let indexFromButtonId = e.target.getAttribute("data-edit")
            editId = e.target.parentElement.parentElement.parentElement.parentElement.id
            //console.log(editId);
            IdCharacter = await characterId(editId)
            //console.log(IdCharacter); 
            viewName.innerHTML = IdCharacter.name;
            viewDescription.innerHTML = IdCharacter.description;
            viewShortDescription.innerHTML = IdCharacter.shortDescription;
            viewImage.src = "data:image/jpeg;base64," + IdCharacter.image;
            //console.log(editImage);
        }
    }); 
}    
View(); 
