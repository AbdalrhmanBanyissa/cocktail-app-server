const axios = require("axios");

function handleDrinksMenu(req, res) { 
  axios
  .get(process.env.URL)
  .then((drinks)=>{
      const drinksMenu = drinks.data.drinks.map((drink)=>{
          return new Menu(drink)
      })
      res.send(drinksMenu);
  })
  .catch((error)=>{console.log(error);})
}
class Menu{
    constructor(drinksMenu){
        this.drink = drinksMenu.strDrink;
        this.img = drinksMenu.strDrinkThumb;
        this.id = drinksMenu.idDrink;
    }
}
module.exports = handleDrinksMenu;
