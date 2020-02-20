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


  showMyRecipesBanner() {
    $(".welcome-msg").hide()
    $('.my-recipes-banner').show()
  },




}

export default domUpdates;
