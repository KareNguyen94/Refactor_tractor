# Refactor_tractor

### Introduction
This is a group project from Mod2 at Turing School of Software and Design. We were given one week to rebuild/refactor another students project by switching the hard coded data to fetch API's, jQuery, SCSS and a DOM update file. The app uses the `fetch()` method to `GET` and `POST`  user/recipe data. A major learning goal for this project was to be able to re-create the same project with the necessary implementations. The app overall is meant for a user to track recipes they like/dislike and things they would like to cook if they have enough ingredients also allowing to search/filter recipes/tags.

### Screenshots
![screenshot 1](https://user-images.githubusercontent.com/52137660/75312489-4991b780-5817-11ea-9a33-c172a742a8ea.png)

### Directions for Use
- On page load you will see recipe cards populate of all sorts that have a favorite button, to cook button and cook now button.
- The apple icon is the favorites and will have it's own page that will show all of your favorites.
- The chef hat is the to cook and will have it's own page of all the recipes a user would like tp cook.
- The cook now button will show what a user is missing in their pantry and allow them to add it as well as calculating cost of those missing ingredients.
- The search bar will allow them to search through all recipes.
- There is a column that allows them to filter recipes by tags.
- A Pantry button that will allow them to see what they have in their pantry.

### Project Learning Goals  
1. Reinforce jQuery fundamentals
2. Reinforce using Fetch to pull all data
3. understand asynchronous JS 
4. Work with fetch API using GET and POST request
5. Test with spies with DOM manipulation functions

### Technologies Used
- HTML5
- CSS/SCSS
- jQuery
- fetch API
- JavaScript
- Mocha
- Chai
- WebPack
- NPM

### How to run on a local machine
1. shut down any live servers you currently have running (`control` + `c`)
2. clone down this repo to desired location
3. cd to the directory where you cloned the repo
4. run `npm install`
5. run `npm start`
6. you should now be able to run the app within your browser from the url: `http://localhost:3000`

### This project was created by:
Jordan, Taras, and Karen
