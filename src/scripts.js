import $ from 'jquery';
import domUpdates from './dom-updates.js'

import './css/base.scss';
import './css/styles.scss';
import './images/apple-logo.png'
import './images/apple-logo-outline.png'
import './images/search.png'
import './images/cookbook.png'
import './images/seasoning.png'

import User from './user';
import Recipe from './recipe';

let menuOpen = false;
let pantryInfo = [];
let recipes = [];
let searchInput = document.querySelector("#search-input");
let tagList = document.querySelector(".tag-list");
let user;


const receiveUserData = (dataSet, type, dataFunction) => {
  fetch(`https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/${type}/${dataSet}`)
  .then(response => response.json())
  .then(data => dataFunction(data[dataSet]))
  .catch(error => console.log(error.message))
}

// GENERATE A USER ON LOAD
const getUserData = (data) => {
  user = new User(data[Math.floor(Math.random() * data.length)]);
  let firstName = user.name.split(" ")[0];
  // let welcomeMsg = `
  //   <div class="welcome-msg">
  //     <h1>Welcome ${firstName}!</h1>
  //   </div>`;
  // $(".banner-image").prepend(welcomeMsg);
domUpdates.welcomeMessage(firstName);
  getIngredientData();
};

// CREATE RECIPE CARDS
const createRecipeHandler = (recipeData) => {
  recipeData.forEach(recipe => {
    let recipeInfo = new Recipe(recipe);
    let shortRecipeName = recipeInfo.name;
    recipes.push(recipeInfo);
    if (recipeInfo.name.length > 40) {
      shortRecipeName = recipeInfo.name.substring(0, 40) + "...";
    }
    // addToDom(recipeInfo, shortRecipeName)
    domUpdates.addCardsToDom(recipeInfo, shortRecipeName);
  });
}

const getRecipeData = (recipeData) => {
  createRecipeHandler(recipeData);
  findTags(recipeData);
};

// const addToDom = (recipeInfo, shortRecipeName) => {
  // ;
  // let cardHtml = `
  //   <div class="recipe-card" id=${recipeInfo.id}>
  //     <h3 maxlength="40">${shortRecipeName}</h3>
  //     <div class="card-photo-container">
  //       <img src=${recipeInfo.image} class="card-photo-preview" alt="${recipeInfo.name} recipe" title="${recipeInfo.name} recipe">
  //       <div class="text">
  //         <div>Click for Instructions</div>
  //       </div>
  //     </div>
  //     <h4>${recipeInfo.tags[0]}</h4>
  //     <img src="../images/apple-logo-outline.png" alt="unfilled apple icon" class="card-apple-icon">
  //   </div>`
  // $('main').append(cardHtml);
// }

// FILTER BY RECIPE TAGS
const findTags = (recipeData) => {
  let tags = [];
  recipeData.forEach(recipe => {
    recipe.tags.forEach(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });
  tags.sort();
  // listTags(tags); // will need to run domUpdates here
  domUpdates.listTags(tags)
};

// const listTags = (allTags) => {
//   allTags.forEach(tag => {
//     let tagHtml = `<li><input type="checkbox" class="checked-tag" id="${tag}">
//       <label for="${tag}">${capitalize(tag)}</label></li>`;
//     $(tagList).append(tagHtml);
//   });
// }

// const capitalize = (words) => {
//   return words.split(" ").map(word => {
//     return word.charAt(0).toUpperCase() + word.slice(1);
//   }).join(" ");
// }

const findCheckedBoxes = () => {
  // let tagCheckboxes = $(".checked-tag");
  // let checkboxInfo = Array.from(tagCheckboxes)
  // let checkboxInfo = Array.from($(".checked-tag"))
  // let selectedTags = checkboxInfo.filter(box => {
  let selectedTags = [...$(".checked-tag")].filter(box => {
    return box.checked;
  })
  findTaggedRecipes(selectedTags);
};

const findTaggedRecipes = (selected) => {
  let filteredResults = [];
  selected.forEach(tag => {
    let allRecipes = recipes.filter(recipe => {
      return recipe.tags.includes(tag.id);
    });
    allRecipes.forEach(recipe => {
      if (!filteredResults.includes(recipe)) {
        filteredResults.push(recipe);
      }
    })
  });
  // showAllRecipes();
  domUpdates.showAllRecipes(recipes);
  if (filteredResults.length > 0) {
    filterRecipes(filteredResults);
  }
}

const filterRecipes = (filtered) => {
  let foundRecipes = recipes.filter(recipe => {
    return !filtered.includes(recipe);
  });
  hideUnselectedRecipes(foundRecipes)
}

const hideUnselectedRecipes = (foundRecipes) => {
  foundRecipes.forEach(recipe => {
    $(`#${recipe.id}`).hide()
  });
}

// FAVORITE RECIPE FUNCTIONALITY
function addToMyRecipes() {
  if (event.target.className === "card-apple-icon") {
    let cardId = parseInt(event.target.closest(".recipe-card").id)
    if (!user.favoriteRecipes.includes(cardId)) {
      event.target.src = "../images/apple-logo.png";
      user.saveRecipe(cardId);
    } else {
      event.target.src = "../images/apple-logo-outline.png";
      user.removeRecipe(cardId);
    }
  } else if (event.target.id === "exit-recipe-btn") {
    // exitRecipe();
    domUpdates.exitRecipe();
  } else if (isDescendant(event.target.closest(".recipe-card"), event.target)) {
    openRecipeInfo(event);
  }
}

const isDescendant = (parent, child) => {
  let node = child;
  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

const showSavedRecipes = () => {
  let unsavedRecipes = recipes.filter(recipe => {
    return !user.favoriteRecipes.includes(recipe.id);
  });
  unsavedRecipes.forEach(recipe => {
    $(`#${recipe.id}`).hide()
  });
  // showMyRecipesBanner();
  // domUpdates.showMyRecipesBanner();
  domUpdates.showOrHideBanner('.my-recipes-banner', '.welcome-msg')
}

// CREATE RECIPE INSTRUCTIONS
const openRecipeInfo = (event) => {
  // $(".recipe-instructions").css('display', 'inline')
  let recipeId = event.path.find(e => e.id).id;
  fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/recipes/recipeData')
    .then(response => response.json())
    .then(data => {
      let recipe = data.recipeData.find(recipe => recipe.id === Number(recipeId))
      fetchRecipe(recipe)
    })
    .catch(error => console.log(error.message))

    domUpdates.showRecipeInstuctions();
    domUpdates.applyOverlay();
    // $(".recipe-instructions").append("<div id='inner-instructions'></div>")
    // $(".recipe-instructions").before("<section id='overlay'></div>")
}

const fetchRecipe = (recipe) => {
  fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/ingredients/ingredientsData')
    .then(response => response.json())
    .then(data => {
      let ingredients = recipe.ingredients.forEach((recipeIngredient) => {
        const ingredient = data.ingredientsData.find(ingredient => ingredient.id == recipeIngredient.id)
        recipeIngredient.name = ingredient.name;
      })
      domUpdates.generateRecipeTitle(recipe, generateIngredients(recipe))
      // generateRecipeTitle(recipe, generateIngredients(recipe));
      // addRecipeImage(recipe);
      domUpdates.addRecipeImage(recipe);
      generateInstructions(recipe);
    })
    .catch(error => console.log(error.message))
}

// const generateRecipeTitle = (recipe, ingredients) => {
//   let recipeTitle = `
//     <button id="exit-recipe-btn">X</button>
//     <h3 id="recipe-title">${recipe.name}</h3>
//     <h4>Ingredients</h4>
//     <p>${ingredients}</p>`
//   $("#inner-instructions").append(recipeTitle)
// }

// const addRecipeImage = (recipe) => {
// $("#recipe-title").css('background-image', `url(${recipe.image})`)
// }

const generateIngredients = (recipe) => {
  return recipe && recipe.ingredients.map(i => {
    return `${i.name} (${i.quantity.amount} ${i.quantity.unit})`
    // add method of capitalize back in when we figure out ingredients
  }).join(", ");
}

const generateInstructions = (recipe) => {
  // let instructionsList = "";
  let instructions = recipe.instructions.map(i => {
    return i.instruction
  });
  // debugger
  domUpdates.populateInstructions(instructions);
  // instructions.forEach(i => {
  //   instructionsList += `<li>${i}</li>`
  // });
  // $("#inner-instructions").append("<h4>Instructions</h4>");
  // $("#inner-instructions").append(`<ol>${instructionsList}</ol>`);
}



// const exitRecipe = () => {
//   if ($("#inner-instructions")) {
//     $("#inner-instructions").remove()
//   }
//   $(".recipe-instructions").hide();
//   $("#overlay").remove();
// }

// TOGGLE DISPLAYS
// const showMyRecipesBanner = () => {
//     $(".welcome-msg").hide()
//     $('.my-recipes-banner').show()
// }



// const showWelcomeBanner = () => {
//   $(".welcome-msg").css('display', "flex");
//   $(".my-recipes-banner").hide()
// }

// SEARCH RECIPES
const pressEnterSearch = (event) => {
  event.preventDefault();
  searchRecipes();
}

const extractRecipes = (recipeData) => {
  let searchedRecipes = recipeData.filter(recipe => {
    return recipe.name.toLowerCase().includes(searchInput.value.toLowerCase());
  });
  filterNonSearched(createRecipeObject(searchedRecipes));
}

const searchRecipes = () => {
  // showAllRecipes();
  domUpdates.showAllRecipes(recipes);
  receiveUserData('recipeData', 'recipes', extractRecipes);
}

const filterNonSearched = (filtered) => {
  let found = recipes.filter(recipe => {
    let ids = filtered.map(f => f.id);
    return !ids.includes(recipe.id)
  })
  hideUnselectedRecipes(found);
}

const createRecipeObject = (recipes) => {
  recipes = recipes.map(recipe => new Recipe(recipe));
  return recipes
}

const toggleMenu = () => {
  menuOpen = !menuOpen;
  if (menuOpen) {
    $(".drop-menu").css('display', 'block')
  } else {
    // $(".drop-menu").css('display', 'none')
    $(".drop-menu").hide();
  }
}

const showRecipesHandler = () => {
  domUpdates.showAllRecipes(recipes);
  domUpdates.showOrHideBanner('.welcome-msg','.my-recipes-banner');
};

// const showAllRecipes = () => {
//   recipes.forEach(recipe => {
//     $(`#${recipe.id}`).css('display', "block");
//   });
//   // domUpdates.showWelcomeBanner();
//   domUpdates.showOrHideBanner('.welcome-msg','.my-recipes-banner')
// }

// CREATE AND USE PANTRY
const findPantryInfo = (ingredientsData) => {
  user.pantry.forEach(item => {
    let itemInfo = ingredientsData.find(ingredient => {
      return ingredient.id === item.ingredient;
    });
    let originalIngredient = pantryInfo.find(ingredient => {
      if (itemInfo) {
        return ingredient.name === itemInfo.name;
      }
    });
    if (itemInfo && originalIngredient) {
      originalIngredient.count += item.amount;
    } else if (itemInfo) {
      pantryInfo.push({name: itemInfo.name, count: item.amount});
    }
  });
  let sortedPantry = pantryInfo.sort((a, b) => a.name.localeCompare(b.name));
  // displayPantryInfo(pantryInfo.sort((a, b) => a.name.localeCompare(b.name)));
  domUpdates.displayPantryInfo(sortedPantry);
};



// const displayPantryInfo = (pantry) => {
//   pantry.forEach(ingredient => {
//     let ingredientHtml = `<li><input type="checkbox" class="pantry-checkbox" id="${ingredient.name}">
//       <label for="${ingredient.name}">${ingredient.name}, ${ingredient.count}</label></li>`;
//     $(".pantry-list").append(ingredientHtml);
//   });
// }

const getIngredientData = () => {
  fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/ingredients/ingredientsData')
  .then(response => response.json())
  .then(data => {
    findPantryInfo(data.ingredientsData)
  })
  .catch(error => console.log(error.message))
}

const findCheckedPantryBoxes = () => {
  let pantryCheckboxes = $(".pantry-checkbox");
  let pantryCheckboxInfo = Array.from(pantryCheckboxes)
  let selectedIngredients = pantryCheckboxInfo.filter(box => {
    return box.checked;
  })
  // showAllRecipes();
  domUpdates.showAllRecipes(recipes);
  if (selectedIngredients.length > 0) {
    findRecipesWithCheckedIngredients(selectedIngredients);
  }
}

//FUNCTION DOES NOT WORK? WHATS MISSING?
const findRecipesWithCheckedIngredients = (selected) => {
  let recipeChecker = (arr, target) => target.every(v => arr.includes(v));
  let ingredientNames = selected.map(item => {
    return item.id;
  })
  recipes.forEach(recipe => {
    let allRecipeIngredients = [];
    recipe.ingredients.forEach(ingredient => {
      allRecipeIngredients.push(ingredient.name);
    });
    if (!recipeChecker(allRecipeIngredients, ingredientNames)) {
      $(`#${recipe.id}`).hide();
    }
  })
}

$('.show-pantry-recipes-btn').click(findCheckedPantryBoxes);
$('.show-all-btn').click(showRecipesHandler);
// $('.show-all-btn').click(showAllRecipes);
$('.my-pantry-btn').click(toggleMenu);
$('.search-btn').click(searchRecipes);
$('#search').submit(pressEnterSearch);
$(".filter-btn").click(findCheckedBoxes);
$(".saved-recipes-btn").click(showSavedRecipes);
$('main').click(addToMyRecipes);

receiveUserData('wcUsersData', 'users', getUserData);
receiveUserData('recipeData', 'recipes', getRecipeData);
