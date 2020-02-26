import $ from 'jquery'

let domUpdates = {

  welcomeMessage(firstName) {
    $(".banner-image").prepend( `
      <div class="welcome-msg">
        <h1>Welcome ${firstName}!</h1>
      </div>`)
  },


  addCardsToDom(recipeInfo, shortRecipeName) {
      $('main').append(`<div class="recipe-card" id=${recipeInfo.id}>
      <h3 maxlength="40">${shortRecipeName}</h3>
      <div class="card-photo-container">
        <img src=${recipeInfo.image} class="card-photo-preview" alt="${recipeInfo.name} recipe" title="${recipeInfo.name} recipe">
        <div class="text">
          <div>Click for Instructions</div>
        </div>
      </div>
      <h4>${recipeInfo.tags[0]}</h4>
      <button class='cook-now'>cook now</button>
      <img src="../images/cookbook.svg" alt="chef hat icon" class="chef-hat">
      <img src="../images/apple-logo-outline.png" alt="unfilled apple icon" class="card-apple-icon">
    </div>`);
    },

  listTags(allTags) {

    allTags.forEach(tag => {
      $(".tag-list").append(`<li><input type="checkbox" class="checked-tag" id="${tag}">
        <label for="${tag}">${this.capitalize(tag)}</label></li>`);
      })

  },

  capitalize(words) {
    return words.split(" ").map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ");
  },

  showOrHideBanner(hide, show) {
    $(`${show}`).show()
    $(`${hide}`).hide()
  },


  showRecipeInstuctions() {
    $(".recipe-instructions").css('display', 'inline')
    $(".recipe-instructions").append(`
      <div id='inner-instructions'>
        <button id="exit-recipe-btn" class="exit-recipe-button">X</button>
      </div>`)
  },

  applyOverlay() {
    $(".recipe-instructions").before("<section id='overlay'></div>")
  },
  // showMyRecipesBanner() {
  //   $(".welcome-msg").hide()
  //   $('.my-recipes-banner').show()
  // },

  generateRecipeTitle(recipe, title) {
    $("#inner-instructions").append(`
      <h3 id="recipe-title" class="recipe-header">${recipe.name}</h3>
      <h4>${title}</h4>`)
  },

  insertIngredients(ingredientHTML) {
    $("#inner-instructions").append(`<p>${ingredientHTML}</p>`);
  },

  addRecipeImage(recipe) {
    $("#recipe-title").css('background-image', `url(${recipe.image})`)
  },

  populateInstructions(instructions) {
    let instructionsList = "";
    instructions.forEach(i => {
      instructionsList += `<li>${i}</li>`});
    $("#inner-instructions").append("<h4>Instructions</h4>");
    $("#inner-instructions").append(`<ol>${instructionsList}</ol>`)
  },

  exitRecipe() {
    if ($("#inner-instructions")) {
      $("#inner-instructions").remove()
    }
    $(".recipe-instructions").hide();
    $("#overlay").remove();
  },


  showAllRecipes(recipes) {
    recipes.forEach(recipe => {
      $(`#${recipe.id}`).css('display', "block");
    });
  },


  displayPantryInfo(pantry) {
    pantry.forEach(ingredient => {
      let ingredientHtml = `<li><input type="checkbox" class="pantry-checkbox" id="${ingredient.name}">
        <label for="${ingredient.name}">${ingredient.name}, ${ingredient.count}</label></li>`;
      $(".pantry-list").append(ingredientHtml);
    });
  },

  insertButton() {
    $("#inner-instructions").append(`<button id="add-ingredients-btn">Add Missing Ingredients to Pantry</button>`)
  }
  // showWelcomeBanner() {
  //   // $(".welcome-msg").css('display', "flex");
  //   $(".welcome-msg").show();
  //   $(".my-recipes-banner").hide()
  // },





}

export default domUpdates;
