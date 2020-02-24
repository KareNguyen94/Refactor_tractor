class Pantry {
  constructor(pantryIngredients) {
    this.ingredients = pantryIngredients;
  }

  findIngredient(ingredients, searchIngredient) {
    return ingredients.find(ingredient => {
      return ingredient.id === searchIngredient.id;
    });
  }

  hasEnoughIngredientsForRecipe(recipeData) {
    return recipeData.ingredients.every((recipeIngredient => {
      let existingIngredient = this.findIngredient(this.ingredients, recipeIngredient);
      if (existingIngredient) {
        return existingIngredient.amount >= recipeIngredient.quantity.amount;
      }
    }))
  }

  createMissingIngredient(existingIngredient, recipeIngredient, missingIngredients, ingredientsData) {
    if (existingIngredient) {
      missingIngredients = this.createIngredientIfDearth(existingIngredient, recipeIngredient, missingIngredients)
    } else {
      let nonExistingIngredient = this.findIngredient(ingredientsData, recipeIngredient);
      nonExistingIngredient.amountNeeded = recipeIngredient.quantity.amount;
      missingIngredients.push(nonExistingIngredient);
    }
    return missingIngredients;
  }

  createIngredientIfDearth(existingIngredient, recipeIngredient, missingIngredients) {
    if (existingIngredient.amount < recipeIngredient.quantity.amount) {
      missingIngredients.push({
        id: existingIngredient.id,
        name: existingIngredient.name,
        amountNeeded: recipeIngredient.quantity.amount - existingIngredient.amount
      })
    }
    return missingIngredients;
  }

  ingredientsNeededForARecipe(recipeData, ingredientsData) {
    return recipeData.ingredients.reduce((missingIngredients, recipeIngredient) => {
      let existingIngredient = this.findIngredient(this.ingredients, recipeIngredient);
      missingIngredients = this.createMissingIngredient(existingIngredient, recipeIngredient, missingIngredients, ingredientsData);
      return missingIngredients;
    }, []);
  }
}

module.exports = Pantry;
