const chai = require('chai');
const expect = chai.expect;

const Pantry = require('../src/pantry');

describe('Pantry', function() {
  let pantry;
  let pantryData;
  let recipeData;

  beforeEach(function() {
    pantryData = [
                {
                  "ingredient": 11477,
                  "amount": 4,
                  "name": "zucchini squash",
                  "estimatedCostInCents": 742
                },
                {
                  "ingredient": 11297,
                  "amount": 4,
                  "name": "flat leaf parsley leaves",
                  "estimatedCostInCents": 1030
                },
                {
                  "ingredient": 1082047,
                  "amount": 10,
                  "name": "kosher salt",
                  "estimatedCostInCents": 972
                },
                {
                  "ingredient": 20081,
                  "amount": 5,
                  "name": "wheat flour",
                  "estimatedCostInCents": 142
                },
                {
                  "ingredient": 11215,
                  "amount": 5,
                  "name": "wheat flour",
                  "estimatedCostInCents": 142
                },
                {
                  "ingredient": 2047,
                  "amount": 6,
                  "name": "salt",
                  "estimatedCostInCents": 280
                },
                {
                  "ingredient": 1123,
                  "amount": 8,
                  "name": "eggs",
                  "estimatedCostInCents": 472
                },
                {
                  "ingredient": 11282,
                  "amount": 4,
                  "name": "onions",
                  "estimatedCostInCents": 439
                },
                {
                  "ingredient": 6172,
                  "amount": 2,
                  "name": "chicken stock",
                  "estimatedCostInCents": 454
                },
                {
                  "ingredient": 2044,
                  "amount": 2,
                  "name": "basil",
                  "estimatedCostInCents": 203
                },
                {
                  "ingredient": 2050,
                  "amount": 4,
                  "name": "vanilla",
                  "estimatedCostInCents": 926
                },
                {
                  "ingredient": 1032009,
                  "amount": 3,
                  "name": "dried red chili",
                  "estimatedCostInCents": 1015
                },
                {
                  "ingredient": 5114,
                  "amount": 3,
                  "name": "roasted chicken",
                  "estimatedCostInCents": 708
                },
                {
                  "ingredient": 1017,
                  "amount": 2,
                  "name": "cream cheese",
                  "estimatedCostInCents": 955
                },
                {
                  "ingredient": 19334,
                  "amount": 7,
                  "name": "bicarbonate of soda",
                  "estimatedCostInCents": 582
                },
                {
                  "ingredient": 1001,
                  "amount": 6,
                  "name": "butter",
                  "estimatedCostInCents": 618
                },
                {
                  "ingredient": 1145,
                  "amount": 2,
                  "name": "canned chipotle chilies in adobo",
                  "estimatedCostInCents": 299
                },
                {
                  "ingredient": 10019903,
                  "amount": 2,
                  "name": "buttermilk",
                  "estimatedCostInCents": 773
                },
                {
                  "ingredient": 9152,
                  "amount": 4,
                  "name": "lemon juice",
                  "estimatedCostInCents": 274
                },
                {
                  "ingredient": 10611282,
                  "amount": 2,
                  "name": "white onions",
                  "estimatedCostInCents": 449
                },
                {
                  "ingredient": 93607,
                  "amount": 2,
                  "name": "almondmilk",
                  "estimatedCostInCents": 787
                },
                {
                  "ingredient": 14106,
                  "amount": 4,
                  "name": "white wine",
                  "estimatedCostInCents": 675
                },
            ];
    recipeData = [{
          "id": 595736,
          "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
          "ingredients": [
              {
                  "id": 20081,
                  "quantity": {
                      "amount": 1.5,
                      "unit": "c"
                  }
              },
              {
                  "id": 14106,
                  "quantity": {
                      "amount": 0.5,
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
                      "amount": 24,
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
                  "id": 2050,
                  "quantity": {
                      "amount": 0.5,
                      "unit": "tsp"
                  }
              }
            }]
    pantry = new Pantry(pantryData);
  })

  it('is a function', function() {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instance of Recipe', function() {
    expect(pantry).to.be.an.instanceof(Pantry);
  });
});
