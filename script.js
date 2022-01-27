import Data from "./data.gitignore/config.js";
let weerData="";
let landenData="";
async function fetchApi(stad) {     
   
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+stad+','+landCode+'&APPID='+Data.key)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
        console.log(data);
        weerData= data;
        displayWeather();
    })
    .catch(function() {
        // catch any errors
        alert(stad+" is not known in this application");
    });
}

async function fetchCities() {  

    fetch('https://countriesnow.space/api/v0.1/countries')  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
        landenData=data.data;
        
        for(let i=0;i<=landenData.length;i++){            
        const newOption=document.createElement("option")
        newOption.innerText=landenData[i].country;
        document.getElementById("landen").appendChild(newOption);
        
        }
        
        }
    )
    .catch(function() {
        
        // catch any errors
    });
}
const invoer=document.getElementById("landen")
let huidigLand="";
let huidiglandPositie=0;
let landCode="";
invoer.onchange= function maakLijst(land){
    
    
    huidigLand=invoer.value;
    
    document.getElementById("steden").innerHTML="<option>Choose the city</option>";
    
   
   for(let i=0;i<landenData.length;i++){
       let raren=landenData[i].country;
       huidiglandPositie=i;
       
    if(invoer.value==raren){
        landCode=landenData[huidiglandPositie].iso2;
       console.log(landCode);
        for(let b=0;b<=landenData[i].cities.length;b++){
            const newOption=document.createElement("option")
            newOption.innerText=landenData[i].cities[b];
            document.getElementById("steden").appendChild(newOption);
            }
        }
    }           
    
}
const invoerStad=document.getElementById("steden")
invoerStad.onchange= function readyToFetch(){
    
    console.log(invoerStad.value);
    fetchApi(invoerStad.value);
           
    
}

function displayWeather(){
    const voorspelZone=document.getElementById("voorspelling");
    voorspelZone.innerHTML="";
    let dagenVanDeWeek=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    for(let i=0;i<40;i=i+8){
    
    const newDiv4=document.createElement("div");
    newDiv4.className="eenDag";
    voorspelZone.appendChild(newDiv4);

    const newTitle=document.createElement("h4");
    newTitle.innerText= dagenVanDeWeek[i/8];
    newDiv4.appendChild(newTitle);
    
    const newDiv2=document.createElement("div");
    newDiv2.innerText="Temp: "+(weerData.list[i].main.temp-273.15).toFixed(2)+ '°C';
    newDiv4.appendChild(newDiv2);
    
    const newDiv3=document.createElement("div");
    newDiv3.innerText="Feel's like: "+(weerData.list[i].main.feels_like-273.15).toFixed(2)+ "°C";
    newDiv4.appendChild(newDiv3);
    
    const newImg=document.createElement("img");
    newImg.src="http://openweathermap.org/img/wn/"+weerData.list[i].weather[0].icon+".png";
    //10d@2x
    newDiv4.appendChild(newImg);

    }
}

fetchCities();

