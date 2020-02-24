const chai = require('chai');

const expect = chai.expect;
import pantryData from './data/pantry-data';
import recipeData from './data/recipe-data';
import ingredientsData from './data/ingredient-data';

const Pantry = require('../src/pantry');

describe('Pantry', function() {
  let pantry;
  let allIngredients;
  let incompleteRecipe;

  beforeEach(function() {
      incompleteRecipe = {
        "id": 595736,
        "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
        "ingredients": [
            {
                "id": 20081,
                "quantity": {
                    "amount": 11.5,
                    "unit": "c"
                }
            },
            {
                "id": 14106,
                "quantity": {
                    "amount": 7.5,
                    "unit": "tsp"
                }
            },
            {
                "id": 1123,
                "quantity": {
                    "amount": 1,
                    "unit": "large"
                }
            },
            {
                "id": 93607,
                "quantity": {
                    "amount": 0.5,
                    "unit": "c"
                }
            },
            {
                "id": 10611282,
                "quantity": {
                    "amount": 3,
                    "unit": "Tbsp"
                }
            },
            {
                "id": 19334,
                "quantity": {
                    "amount": 0.5,
                    "unit": "c"
                }
            },
            {
                "id": 2047,
                "quantity": {
                    "amount": 0.5,
                    "unit": "tsp"
                }
            },
            {
                "id": 9152,
                "quantity": {
                    "amount": 4,
                    "unit": "servings"
                }
            },
            {
                "id": 10019903,
                "quantity": {
                    "amount": 2,
                    "unit": "c"
                }
            },
            {
                "id": 1145,
                "quantity": {
                    "amount": 0.5,
                    "unit": "c"
                }
            },
            {
                "id": 1,
                "quantity": {
                    "amount": 0.5,
                    "unit": "c"
                }
            },
            {
                "id": 2050,
                "quantity": {
                    "amount": 0.5,
                    "unit": "tsp"
                }
            }]
          }
    pantry = new Pantry(pantryData);
  })

  it('is a function', function() {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instance of Recipe', function() {
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it('should determine whether my pantry has enough ingredients to cook a given meal', function() {
    expect(pantry.hasEnoughIngredientsForRecipe(recipeData)).to.eq(true);
  });

  it('should determine the amount of ingredients still needed to cook a given meal, based on whats in my pantry', function() {
    expect(pantry.ingredientsNeededForARecipe(incompleteRecipe, ingredientsData)).to.deep.eq( [{
        "id": 20081,
        "name": "wheat flour",
        "amountNeeded": 6.5,
      },
      {
        "id": 14106,
        "name": "white wine",
        "amountNeeded": 3.5,
      },
      {
        "id": 1,
        "name": "vegetable stock",
        "estimatedCostInCents": 613,
        "amountNeeded": 0.5
      }
    ]);
  });

  it('should calculate how much it will cost to buy the necessary ingredients needed to cook a given meal', function() {
    expect(pantry.calcCostOfIngredientsNeeded(ingredientsData, recipeData)).to.eq(6448.5);
  });

});
