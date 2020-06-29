/*class char{
    constructor(description, id, image, name, shortDescription){
        this.description = description,
        this.id = id,
        this.image = image,
        this.name = name,
        this.shortDescription = shortDescription
    }
}*/


const API_url =  async function (){

    const response = await fetch ('https://character-database.becode.xyz/characters');
    const response2 = await response.json();
    let char1 = document.querySelector("#char1");
    let target = document.getElementById("target");
    console.log(response2);
  
    response2.forEach((element, ) => {
        document.querySelector(".row").innerHTML += `
        <div class="col-lg-4">
        <button type="submit" class="buttonCreate"><a href="#">Delete</a></button>
        <button type="submit" class="buttonCreate"><a href="creacharacter.html">Create</a></button>
        
       <div class="our-team-main">
       
       
       <div class="team-front">
       <img src="data:image/png;base64,${element.image}" class="img-fluid" id="img1" />
       <h3 id="name1">${element.name}</h3>
       <p id="short1">${element.shortDescription}</p>
       </div>
       
       <div class="team-back">
       
       <span id="description1">
       ${element.description}
       </span>
       
       </div>
       
        
       
       </div>
       
       </div>`
           
    });
};

function generate() {
    let id = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
      response.json().push(id);
    }
    
    
    API_url();

/*let charList = [];
function printChar(data) {
    for (item of data) {
        if (item.image) {
            image64 = item.image
             console.log(image64);
        }
        const div = document.createElement('div');
        div.classList = 'charCard'
        const target = document.querySelector('.target');
         const image64 = item.image;
        const imgsrc = image64.querySelectorAll('.img');
        imgsrc.innerHTML= data.imgsrc;

        const name = item.name;
        const short = item.shortDescription;
        const long = item.description;
         console.log(name);

       const template = `
       <div class="col-lg-4">
       <div class="our-team-main">
       
       <div class="team-front">
       <img src="data:image/png;base64,${image64}" class="img-fluid" id="img1" />
       <h3 id="name1">${name}</h3>
       <p id="short1">${short}</p>
       </div>
       
       <div class="team-back">
       <span id="description1">
       ${long}
       </span>
       </div>
       
       </div>
       </div>
        `;

        
        div.innerHTML = template;
    }    ;




(async () => {
    const getChar = async () => { return await axios({ url: API_url }) };
    const response = await getChar();
    const data = await response.data;

    data.forEach(element => {
        charList.push(element);
    });

    printChar(data);
    console.log(data)
};*/
