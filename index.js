/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // loop over each item in the data
    games.forEach(game => {
        // create a new div element, which will become the game card
        const gameCard = document.createElement('div');

        // add the class game-card to the div
        gameCard.classList.add('game-card');

        // set the inner HTML using a template literal to display some info about each game
        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p><strong>Pledged: </strong>$${game.pledged}</p>
            <p><strong>Goal: </strong>$${game.goal}</p>
            <p><strong>Backers: </strong>${game.backers}</p>
        `;

        // append the game card to the games-container
        const gamesContainer = document.getElementById('games-container');
        gamesContainer.appendChild(gameCard);
    });
}

addGamesToPage(GAMES_JSON);


// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);
// console.log(totalContributions);
// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()} Contributions`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `${totalRaised.toLocaleString()} Raised`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length} Games`;
// let animals = ["giraffe", "horse", "narwhal", "chinchilla"];
// let firstLetters = animals.reduce((sum, animal) => {
//     return animal.charAt(0);
// }, "");

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    console.log(unfundedGames.length);
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    console.log(fundedGames.length);
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    console.log(GAMES_JSON.length);
    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const totalGames = GAMES_JSON.length;
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const message = `A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} games. 
    Currently, ${unfundedGamesCount} game${unfundedGamesCount > 1 ? 's' : ''} remain unfunded. 
    We need your help to fund these amazing games!`;


// create a new DOM element containing the template string and append it to the description container
const descriptionMessage = document.createElement("p");
descriptionMessage.innerHTML = message;
descriptionContainer.appendChild(descriptionMessage);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement("p");
firstGameElement.innerHTML = `${firstGame.name} with a pledge of $${firstGame.pledged.toLocaleString()}`;
firstGameContainer.appendChild(firstGameElement);

// do the same for the runner up item
const secondGameElement = document.createElement("p");
secondGameElement.innerHTML = `${secondGame.name} with a pledge of $${secondGame.pledged.toLocaleString()}`;
secondGameContainer.appendChild(secondGameElement);

// const numbers = [1, 2, 3, 4, 5, 6];
// const [one, two, ...rest] = numbers;
// console.log(rest);


//adding search functionality 
document.getElementById('search-bar').addEventListener('input', function (event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredGames = GAMES_JSON.filter(game => 
      game.name.toLowerCase().includes(searchTerm)
    );
    //updateGameDisplay(filteredGames.length === 0? GAMES_JSON : filteredGames);

    // if (filteredGames.length === 0) {
    //     updateGameDisplay(GAMES_JSON); // Show all games if no match
    // } else {
    //     updateGameDisplay(filteredGames); // Show filtered games
    //     document.getElementById("games-container").scrollIntoView({
    //         behavior: "smooth"
    //     });
    // }
    updateGameDisplay(filteredGames); // Show filtered games
        document.getElementById("games-container").scrollIntoView({
            behavior: "smooth"
        });
});
  
function updateGameDisplay(games) {
const gameContainer = document.getElementById('games-container');
gameContainer.innerHTML = '';
games.forEach(game => {
    const gameCard = createGameCard(game);
    gameContainer.appendChild(gameCard);
});
}

function createGameCard(game) {
const div = document.createElement('div');
div.classList.add('game-card');
div.innerHTML = `
    <img src="${game.img}" class="game-img" />
    <h3>${game.name}</h3>
    <p>${game.description}</p>
    <p>Pledged: $${game.pledged}</p>
    <p>Backers: ${game.backers}</p>
`;
return div;
}

  