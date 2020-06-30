
// const fileUpload = require('fuctbase64');

let charact;
let charactArray;


const character = async () =>{

    charact = await fetch('https://character-database.becode.xyz/characters');
    charactArray = await charact.json();
    console.log(charactArray);  
    
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
                    <button type="button" class="btn btn-sm btn-outline-secondary edit">Edit</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary delete1">Delete</button>
                    </div>
                </div>
              </div>
            </div>
          </div>`
    }); 
}
character();


let reader;
let result;
let result1;

function encodeImageFileAsURL(element) {
    var file = element.files[0];
    reader = new FileReader();
    reader.onloadend = function() {
        result = reader.result;
        result1 = result.substring(23, result.length)
      console.log('RESULT', result1)
    }
    reader.readAsDataURL(file);
  }

document.getElementById('add-charact').addEventListener('click', function(){
    
    let newName = document.getElementById('recipient-name').value;
    let newShortDescription = document.getElementById('recipient-shortDescription').value;
    let newDescription = document.getElementById('message-description').value

    if(newName == false || newShortDescription == false || newDescription == false){
        alert('Complet form please'); 
    }else{
        addCharact();
    }
    async function createCharact() {
        let newCharact = {
            description : newDescription,
            shortDescription : newShortDescription,
            name : newName,
            image : result1,
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
        return pushCharact;
    };
});

   let buttunEdite = document.getElementsByClassName('edit');
   console.log(buttunEdite);
   
   for(i = 0; i < buttunEdite.length; i++){
    buttunEdite[i].addEventListener('click', function(){

        // alert('Are you sure to deleted the character?')
        // if(alert == true){
        //     deleteCharact(heroId);
        // }else{
        //     return
        // }
       // let id = this.id;
        console.log("bonjour");
        
      });
   }

//   async function deleteCharact() {
//     // const heroObject = JSON.stringify({
//     //   id: id
//     // });

//     const delCharact =  "http://localhost:3000/heroes/" + heroId;
//     await fetch(delCharact , {
//       method: "DELETE",
//       headers: new Headers({
//         "content-type": "application/json"
//       })
//     })
//       .then(response => response.json())
//       .then(data => console.log(data))
//       .catch(err => console.error(err));
//     console.log(heroId);
//   };


