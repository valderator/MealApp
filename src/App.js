import axios from "axios"
import './App.css'

function App() {

  /*axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => {
      console.log(res.data.categories)
      const data = res.data.categories
      const categories = []
      data.forEach(element => {
        categories.push(element.strCategory)
      });

      const divContainer = document.getElementById("divContainer");

      categories.forEach(element => {
        let div = document.createElement('div'); 
        div.innerHTML = " - " + element
        divContainer.append(div); 
      });

    })
    .catch(err => {
      console.log(err)
    })*/

  function callApi(){
    axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(res => {
        const meal = res.data.meals[0]
        console.log(meal);
        document.getElementById("recipeTitle").innerHTML = meal.strMeal
        document.getElementById("recipeImage").src = meal.strMealThumb
        document.getElementById("recipeImage").width = 500
        document.getElementById("recipeImage").height = 500
        document.getElementById("instructions").innerHTML = meal.strInstructions
        document.getElementById("youtube").innerHTML = "Link to youtube video"
        document.getElementById("youtube").href = meal.strYoutube

        const keys = Object.keys(meal)
        var ingredients = []
        var details = []

        keys.forEach(key => {
          if(key.search("strIngredient") !== -1){
            ingredients.push(key)
          }
          if(key.search("strMeasure") !== -1){
            details.push(key)
          }
        });
        
        var ingDict = {}

        for(let i = 0; i < ingredients.length; i++){
          if(meal[ingredients[i]] !== '' && meal[ingredients[i]] !== null){
            ingDict[meal[ingredients[i]]] = meal[details[i]]
          }
        }

        document.getElementById("ingredients").innerHTML = "Ingredients: <br/>"

        for (const [key, value] of Object.entries(ingDict)) {
          document.getElementById("ingredients").innerHTML = document.getElementById("ingredients").innerHTML +  key + ": " + value + "<br/>";
        }

      })
      .catch(err =>{
        console.log(err);
    })
  }

  return (
    <div>
      <h4>Are you hungry? You don't know what to eat?</h4>
      <section id="divContainer"></section>
      <button className="button" id='button' onClick={callApi}>
        Get a recipe
      </button>
      <div className="wrapper">
        <div className="title" id="recipeTitle"></div> 
        <img className="image" id="recipeImage" alt=''></img>
        <div className="ingredients" id="ingredients"></div>
        <div className="instructions" id="instructions"></div>
        <a id="youtube" href="url" target="_blank"> </a>
      </div>
    </div>
  );
}



export default App;
