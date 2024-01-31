let shoppingCartNames = [];
let shoppingCartPrices = [];

let arrayMenu = [
    {
        'name': 'Pizza Salami',
        'recepte': ['Tomatensoße', 'Salami', 'Käse', 'Peperoni'],
        'price': 30,
    },

    {
        'name': 'Pasta Carbonara',
        'recepte': ['Tomatensoße', 'Apfel'],
        'price': 10,
    },

    {
        'name': 'Curry Wurst',
        'recepte': ['Kartoffel', 'Curry', 'Ketchup'],
        'price': 5,
    },

]

function init() {
    let basket = document.getElementById("foodID");
    basket.innerHTML = "";

    for (let i = 0; i < arrayMenu.length; i++) {

        const element = arrayMenu[i];
        basket.innerHTML += `
        
    <div class="menu-conatiner">
        <div class="menu-box">
            <div>
                <div>
                    <h1>${element['name']} </h1>
                </div>
                <div>${element['recepte']}</div>
            </div>
    
            <div class="menu-rightside">
                <div><h3>${element['price']} €</h3></div>
                <div><button onclick="addFoodBasket(${i})">Kaufen</button></div>
            </div>
        </div>
    </div>
     `;
    }
}


function addFoodBasket(index) {
    // sobald du auf Zeile 45 Button Klickst, gelangt 'name' und 'price' von einem (arrayMenu) zu anderen
    // "noch" leeren Array (shoppingCartNames) und (shoppingCartPrices)
    shoppingCartNames.push(arrayMenu[index]['name'])
    shoppingCartPrices.push(arrayMenu[index]['price'])

    let basket_2 = document.getElementById('warenkorbID');
    basket_2.innerHTML = "";

    for (let j = 0; j < shoppingCartNames.length; j++) {
        basket_2.innerHTML += `
        ${shoppingCartNames[j]} + ${shoppingCartPrices[j]} <br>
        `;
    }

    sumOfBasket();
}

function sumOfBasket() {

    let priceID = document.getElementById('priceID');
    priceID.innerHTML = "";

    let sum = 0;

    for (let k = 0; k < shoppingCartPrices.length; k++) {
        sum += shoppingCartPrices[k] // sum = entspricht ShoppingCartPrices Array beginne mit 0 und zähle 
                                    // gesamten Inhalt zusammen (addieren)


        priceID.innerHTML += `
        <div>
        Die Summe beträgt ${sum} €
        </div>
        `
    }




}




