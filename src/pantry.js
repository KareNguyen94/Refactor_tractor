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
      let existingIngredient = this.ingredients.find(ingredient => {
        return ingredient.ingredient === recipeIngredient.id;
      });
      if (existingIngredient) {
        return existingIngredient.amount >= recipeIngredient.quantity.amount;
      }
    }))
  }

  createMissingIngredient(existingIngredient, recipeIngredient, missingIngredients, ingredientsData) {
    if (existingIngredient) {
      missingIngredients = this.createIngredientIfDearth(existingIngredient, recipeIngredient, missingIngredients, ingredientsData)
    } else {
      let nonExistingIngredient = this.findIngredient(ingredientsData, recipeIngredient);
      nonExistingIngredient.amountNeeded = recipeIngredient.quantity.amount;
      missingIngredients.push(nonExistingIngredient);
    }
    return missingIngredients;
  }

  createIngredientIfDearth(existingIngredient, recipeIngredient, missingIngredients, ingredientsData) {
    if (existingIngredient.amount < recipeIngredient.quantity.amount) {
      let foundIngredient = this.findIngredient(ingredientsData, recipeIngredient);
      missingIngredients.push({
        id: foundIngredient.id,
        name: foundIngredient.name,
        amountNeeded: recipeIngredient.quantity.amount - existingIngredient.amount
      })
    }
    return missingIngredients;
  }

  ingredientsNeededForARecipe(recipeData, ingredientsData) {
    return recipeData.ingredients.reduce((missingIngredients, recipeIngredient) => {
      let existingIngredient = this.ingredients.find(ingredient => {
        return ingredient.ingredient === recipeIngredient.id;
      });
      missingIngredients = this.createMissingIngredient(existingIngredient, recipeIngredient, missingIngredients, ingredientsData);
      return missingIngredients;
    }, []);
  }

  calcCostOfIngredientsNeeded(ingredientsData, recipeData) {
    let neededIngredients = recipeData.ingredients;
    return neededIngredients.reduce((cost, recipeIngredient) => {
      let foundIngredient = this.findIngredient(ingredientsData, recipeIngredient);
      cost += foundIngredient.estimatedCostInCents * recipeIngredient.quantity.amount;
      return cost
    }, 0);
  }

  buildPantryDeleteRequests(matchedRecipe, userID) {
    return matchedRecipe.ingredients.reduce((postRequests, recipeIngredient) => {
      postRequests.push({
        userID: userID,
        ingredientID: recipeIngredient.id,
        ingredientModification: -Math.abs(recipeIngredient.quantity.amount)
      });
      return postRequests
    }, [])
  }
}

module.exports = Pantry;
