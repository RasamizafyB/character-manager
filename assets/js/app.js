
const character = async () =>{

    const charact = await fetch('https://character-database.becode.xyz/characters');
    const charactArray = await charact.json();
    console.log(charactArray);  
    
    const template = document.getElementById('templ');

    const target = document.getElementById('target');
    
            
    charactArray.forEach((el) => {
        const charactHTML = template.cloneNode(true).content;
        charactHTML.querySelector('.bd-placeholder-img card-img-top').xmlns = el.image;
        charactHTML.querySelector('.text-dark').textContent = el.name;
        charactHTML.querySelector('.card-text').textContent = el.card-text;

        target.appendChild(charactHTML);
    }); 
}
character();

