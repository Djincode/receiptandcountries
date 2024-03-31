let searchInput = document.getElementById("user-inp");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s="
let resultContent = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let firstlistUl = document.getElementById("ingredient-list");
let showRecipeBtn = document.getElementById("show-recipe");
let recipe = document.getElementById("recipe");

searchBtn.addEventListener("click", async()=>{

let serchterm = searchInput.value.trim().toLowerCase();
if(serchterm === "" || serchterm === null){
    return;
}
const resp = await (await fetch(url)).json();
let filtered = resp.meals.filter(item=>{
    return item.strMeal.toLowerCase().includes(serchterm);
})
console.log(filtered);
let ingredients = [];

for (let i = 1; i <= 20; i++) {
    const ingredient =filtered[0][`strIngredient${i}`];
    const measure = filtered[0][`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${ingredient}- ${measure}`);
    }
}

let listUl = document.createElement("ul");
ingredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.textContent = ingredient;
    listUl.appendChild(li);
});



resultContent.innerHTML = `<img src='${filtered[0].strMealThumb}'>
<div class="details">
    <h2>${filtered[0].strMeal}</h2>
    <h4>${filtered[0].strArea}</h4>
</div>
<div id="ingredient-con">
</div>
<div id="recipe">
    <button id="hide-recipe">X</button>
    <pre id="instructions">istruduction hissesi</pre>
</div>
<button id="show-recipe">View Recipe</button>
`

let ingredientCon = document.getElementById("ingredient-con");
    ingredientCon.appendChild(listUl);


    let showRecipeBtn = document.getElementById("show-recipe");
    let recipe = document.getElementById("recipe");
    let recipeText = document.getElementById("instructions");
    let hide = document.getElementById("hide-recipe")         
     showRecipeBtn.addEventListener("click", ()=>{
        recipe.style.display = "block"
        recipeText.innerText = `${filtered[0].strInstructions}`

     })

     hide.addEventListener("click",()=>{
        recipe.style.display = "none"
     })
})






