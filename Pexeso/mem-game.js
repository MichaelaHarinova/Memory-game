
const totalNumOfCards = 20;
let playField = new Array(totalNumOfCards);
let cardImages = new Array(totalNumOfCards / 2);
let numberOfCardsFlipped = 0;
let flippedCards = [];
let counterOfTries = 0;
init();

function init() {

    generatePlayField();
    preLoadImages();
    setUpInterface();
    attachEventListeners();
    //   console.log("play field", playField);
}

function generatePlayField() {
    //initialize play field with empty positions
    playField.fill(-1, 0);

    //get 10x unique card
    for (let i = 0; i < 10; i++) {
        let uniqueCard = getUniqueCard();

        // place it in random empty position  - 2x
        for (let j = 0; j < 2; j++) {
            let emptyCardPosition = getEmptyCardPosition();

            playField[emptyCardPosition] = uniqueCard;
        }
    }

    function getUniqueCard() {
        //generates a random number between 0-9
        let chooseRandomCard = Math.floor(Math.random() * 10);

        //checks if the generated card already exists in the play field, if yes - generates new random card
        while (playField.indexOf(chooseRandomCard) !== -1) {
            chooseRandomCard = Math.floor(Math.random() * 10);
        }
        return chooseRandomCard;
    }

    function getEmptyCardPosition() {
        //generates a random number between 0-19
        let index = Math.floor(Math.random() * 20);

        //checks if the position in array is already taken or not, if yes - generates new random position
        while (playField[index] !== -1) {
            index = Math.floor(Math.random() * 20);
        }
        return index;
    }

}


function preLoadImages() {
    //assign an image per unique value in the playField array. (getUniqueCard())
    for (let i = 0; i < 10; i++) {
        //choose random number between 0-25
        let randomImage = Math.floor(Math.random() * 25);
        //checks if the position in array is already taken or not, if yes - generates new random position
        while (cardImages.indexOf(randomImage + ".jpg") !== -1) {
            randomImage = Math.floor(Math.random() * 25);
        }
        //add the random image value on position i of the cardImages array
        cardImages[i] = randomImage + ".jpg";
    }
 //   console.log("card images", cardImages);
}

//interface
function setUpInterface() {

    createNumOfTriesDisplay ()
    createButton();
    createTable();



    function createNumOfTriesDisplay (){
        let numOfTries = document.createElement("div");
        numOfTries.setAttribute("id", "tries");
        let p= document.createElement("p");
        p.setAttribute("id","counter");
        numOfTries.appendChild(p);
        p.innerText = "0";
        document.getElementById("container").appendChild(numOfTries);
    }

    function createButton() {
        let button = document.createElement("button");
        button.innerText = "Reset";
        document.getElementById("bu").appendChild(button);
    }

    function createTable() {

        let table = document.createElement("table");

        document.getElementById("target").appendChild(table);
        //i =column =td
        for (let i = 0; i < 4; i++) {
            let tr = document.createElement("tr");
            table.appendChild(tr);
            //j= row = tr
            for (let j = 0; j < 5; j++) {
                let td = document.createElement("td");
                let img = document.createElement("img");
                img.setAttribute("src", "img/beCode.png");
                let cellNumber = (i * 5) + j;
                let cardImgIndex = playField[cellNumber];
                let cardImg = cardImages[cardImgIndex];

                img.setAttribute("data-flipped-card", "img/" + cardImg);
                td.innerText = "";

                td.appendChild(img);
                tr.appendChild(td);
            }
        }
    }

}

function attachEventListeners() {

    document.querySelector("button").addEventListener("click", function refreshPage() {
        window.location.reload();
    });

    document.querySelectorAll("td").forEach(td =>
        td.addEventListener("click", () => {

            //checks if the card is already flipped or not
            if (td.querySelector("img").getAttribute("src") !== "img/beCode.png" ){
                return;
            }

            //first click
            if (numberOfCardsFlipped === 0) {
                //saves img element in array
                flippedCards.push(td.querySelector("img"));
                //switch of images
                td.querySelector("img").setAttribute("src", td.querySelector("img").getAttribute("data-flipped-card"));
                numberOfCardsFlipped++;
                //second click
            } else if (numberOfCardsFlipped === 1) {
                //when the clicked card is the same card like the first clicked card (saved), return (jump out of the function)
                //   if (td.querySelector("img") === flippedCards[0]) {
                //       return;
                //   }
                flippedCards.push(td.querySelector("img"));
                td.querySelector("img").setAttribute("src", td.querySelector("img").getAttribute("data-flipped-card"));

                counterOfTries++;
                document.getElementById("counter").innerText = counterOfTries.toString();
                //if match keep it displayed
                if (flippedCards[0].getAttribute("data-flipped-card") === flippedCards[1].getAttribute("data-flipped-card")) {
                    numberOfCardsFlipped = 0;
                    flippedCards = [];

                    //if NO match, turn them back after 1.5sec, reset array and number of flipped cards
                } else {
                    setTimeout(() => {
                        flippedCards[0].setAttribute("src", "img/beCode.png");
                        flippedCards[1].setAttribute("src", "img/beCode.png");
                        numberOfCardsFlipped = 0;
                        flippedCards = [];
                    }, 1500);

                    numberOfCardsFlipped++;
                }
                //stops turning cards after 2 clicks (after 2 cards are displayed)
            } else if (numberOfCardsFlipped === 2) {

            }

        }))
}