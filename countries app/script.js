const url = "https://restcountries.com/v3.1/all";
let content = document.querySelector(".article");
let searchInput = document.querySelector(".searchinput")
let data = [];

function showCountry (countries){

    content.innerHTML = "";
    countries.forEach(item=>{
        content.innerHTML += `<div class="box">

        <img src="${item.flags.png}">
        </div>`
    })
}


const getCountries = async () =>{
    const countries = await(await fetch(url)).json();
    data= countries;
    showCountry(data);

}

 getCountries()

searchInput.addEventListener("input",(e)=>{
    const inputvalue = e.target.value.trim().toLowerCase();
    const filtered = data.filter((item)=>{
        return item.name.common.toLowerCase().includes(inputvalue)
    })
    showCountry(filtered);
})

