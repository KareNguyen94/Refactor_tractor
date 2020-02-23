class Pantry {
  constructor(pantryIngredients) {
    this.ingredients = pantryIngredients;
  }

  hasEnoughIngredientsForRecipe(recipeData) {
    return recipeData.ingredients.every((recipeIngredient => {
      let existingIngredient = this.ingredients.find(ingredient => {
        return ingredient.id === recipeIngredient.id;
      });
      if (existingIngredient) {
        return existingIngredient.amount >= recipeIngredient.quantity.amount;
      }
    }))
  }
}

module.exports = Pantry;
