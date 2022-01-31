import Data from "./data.gitignore/config.js";

let countryData="";
window.onload = ()=> {
    document.getElementById("landen").focus();
    fetchAllCountries();   
};

const fetchPicture=()=>{
    let count=0;
    const stad=getStad();   
   fetch("https://api.unsplash.com/search/photos?query=" + stad + "&client_id=" +Data.accesKey)
   .then(function(resp) { return resp.json() })
   .then(function(image) {
       document.body.style.backgroundImage="url("+image.results[count].urls.regular+")";
    //    setInterval(()=>{ 
    //     document.body.style.backgroundImage="url("+image.results[count].urls.regular+")";
    //     count=count+1;
    //     if (count==9){
    //         count=0;
    //     }
    // }, 10000);       
    });
}

const fetchApi= async()=>{  
    const landCode=getLandCode();
    const stad=getStad();   
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+stad+','+landCode+'&APPID='+Data.key)  
    .then(function(resp) { return resp.json() })
    .then(function(data) {
        displayWeather(data);
    })
    .catch(function() {
        // catch any errors
        alert(stad+" is not known in this application");
        document.getElementById("voorspelling").innerHTML="<h1>Please select a different city</h1>";
    });
}

const fetchAllCountries= async()=> {  

    fetch('https://countriesnow.space/api/v0.1/countries')  
    .then(function(resp) { return resp.json() })
    .then(function(data) {
        countryData=data.data;       
        createCountryList(countryData);                
    }
    )
    .catch(function() {        
        console.log("their was an error with fetchAllCountries function")
    });
    return countryData;
}

const createCountryList=(countryData)=>{
    for(let i=0;i<=countryData.length;i++){            
        const newOption=document.createElement("option")
        newOption.innerText=countryData[i].country;
        document.getElementById("landen").appendChild(newOption);
    }        
}

document.getElementById("landen").onchange= ()=>{    
    const landenLijst=document.getElementById("landen");  
    document.getElementById("steden").innerHTML="<option>Choose the city</option>";
   
   for(let i=0;i<countryData.length;i++){
       let landNaam=countryData[i].country;       
       
        if(landenLijst.value==landNaam){        

            for(let b=0;b<=countryData[i].cities.length;b++){
                const newOption=document.createElement("option")
                newOption.innerText=countryData[i].cities[b];
                document.getElementById("steden").appendChild(newOption);
            }
            document.getElementById("steden").focus();
            }
    }             
}
const getLandCode=()=>{
    const landenLijst=document.getElementById("landen");
      
   for(let i=0;i<countryData.length;i++){
       let landNaam=countryData[i].country;
       
       
        if(landenLijst.value==landNaam){
            let landCode=countryData[i].iso2;
        return landCode;
        }
    }
}


const getStad=()=>{
    const stedenLijst=document.getElementById("steden");    
    return stedenLijst.value;
}

document.getElementById("steden").onchange= () => {  
    fetchApi();
    const stad =getStad();
    document.getElementById("titel").innerHTML="What is the weather in <span class='bold'>"+stad+"</span>"
    fetchPicture();      
}

const displayWeather=(data)=>{
    const voorspelZone=document.getElementById("voorspelling");
    voorspelZone.innerHTML="";
    let d=new Date();    
    let day = d.getDate();
    
    let month=d.getMonth()+1;
    console.log(day);
     console.log(month+1);
     //TODO: when days are bigger then 31-> start at 1 again
    let dagenVanDeWeek=[day+"/"+month,(day+1)+"/"+month,(day+2)+"/"+month,(day+3)+"/"+month,(day+4)+"/"+month,(day+5)+"/"+month,(day+6)+"/"+month];
    
    for(let i=0;i<40;i=i+8){
    
    const newDiv4=document.createElement("div");
    newDiv4.className="eenDag";
    voorspelZone.appendChild(newDiv4);

    const newTitle=document.createElement("h3");
    newTitle.innerText= dagenVanDeWeek[i/8];
    newDiv4.appendChild(newTitle);
    
    const newDiv2=document.createElement("div");
    newDiv2.innerText="Temp: "+(data.list[i].main.temp-273.15).toFixed(2)+ '°C';
    newDiv4.appendChild(newDiv2);
        
    const newImg=document.createElement("img");
    newImg.src="http://openweathermap.org/img/wn/"+data.list[i].weather[0].icon+".png";
    newDiv4.appendChild(newImg);

    const newDiv3=document.createElement("div");
    newDiv3.innerText="Feel's like: "+(data.list[i].main.feels_like-273.15).toFixed(2)+ "°C";
    newDiv4.appendChild(newDiv3);

    }
}


