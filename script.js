const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  // in cases where user is clicking too fast, stop them
  if (noClicking) return;
  if (event.target.classList.contains("flip")) return; // if card is already fliped, then do nothing

  // set currently clicked on card to change color
  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  // add flipped class to card
  if (!card1 || !card2) 
  {
    currentCard.classList.add("flip");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  // if there are two cards "selected", then start this
  if (card1 && card2)
  {
    noClicking = true;
    let correctCard1 = card1.className;
    let correctCard2 = card2.className;

    // if correct, then these cards cannot be clicked on again
    if (correctCard1 === correctCard2) 
    {
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } 
    else // else reset these cards and start over
    {
      setTimeout(function() 
      {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flip");
        card2.classList.remove("flip");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
