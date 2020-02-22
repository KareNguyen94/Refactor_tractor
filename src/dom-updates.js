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

  showOrHideBanner(welcome, recipe) {
    $(`${welcome}`).show()
    $(`${recipe}`).hide()
  },


  showRecipeInstuctions() {
    $(".recipe-instructions").css('display', 'inline')
    $(".recipe-instructions").append("<div id='inner-instructions'></div>")
  },

  applyOverlay() {
    $(".recipe-instructions").before("<section id='overlay'></div>")
  },
  // showMyRecipesBanner() {
  //   $(".welcome-msg").hide()
  //   $('.my-recipes-banner').show()
  // },

  generateRecipeTitle(recipe, ingredients) {
    $("#inner-instructions").append(`
      <button id="exit-recipe-btn">X</button>
      <h3 id="recipe-title">${recipe.name}</h3>
      <h4>Ingredients</h4>
      <p>${ingredients}</p>`)

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
  }
  // showWelcomeBanner() {
  //   // $(".welcome-msg").css('display', "flex");
  //   $(".welcome-msg").show();
  //   $(".my-recipes-banner").hide()
  // },





}

export default domUpdates;
