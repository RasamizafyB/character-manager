const  axios  =  require ( 'axios' ) ;


const character = async () =>{
    const charact = await fetch('https://character-database.becode.xyz/characters');
    const charactArray = await charact.json;
    console.log(charactArray);
    
}