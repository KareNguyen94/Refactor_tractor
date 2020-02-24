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

  ingredientsNeededForARecipe(recipeData, ingredientsData) {
    return recipeData.ingredients.reduce((missingIngredients, recipeIngredient) => {
      let existingIngredient = this.ingredients.find(ingredient => {
        return ingredient.id === recipeIngredient.id;
      });
      if (existingIngredient) {
        if (existingIngredient.amount < recipeIngredient.quantity.amount) {
          missingIngredients.push({
            id: existingIngredient.id,
            name: existingIngredient.name,
            amountNeeded: recipeIngredient.quantity.amount - existingIngredient.amount
          })
        }
      } else {
        let nonExistingIngredient = ingredientsData.find(ingredient => {
          return ingredient.id === recipeIngredient.id;
        });
        nonExistingIngredient.amountNeeded = recipeIngredient.quantity.amount;
        missingIngredients.push(nonExistingIngredient);
      }
      return missingIngredients;
    }, []);
  }
}

module.exports = Pantry;
