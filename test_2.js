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
    const basket = document.getElementById("foodID");
    basket.innerHTML = '';

    for (let i = 0; i < arrayMenu.length; i++) {
        generateMenuHTML(i);
    }
}

function generateMenuHTML(i) {

    const basket = document.getElementById("foodID");
    const element = arrayMenu[i];

    basket.innerHTML += `
    <div class="menu-container">
        <div class="menu-box">
            <div>
                <div>
                    <h1>${element['name']}</h1>
                </div>
                <div>${element['recepte']}</div>
            </div>

            <div class="menu-rightside">
                <div><h3>${element['price']} €</h3></div>
                <div><button onclick="addToBasket(${i})">Kaufen</button></div>
            </div>
        </div>
    </div>
    `;
}


function addToBasket(index) {


    shoppingCartNames.push(arrayMenu[index]['name'])
    shoppingCartPrices.push(arrayMenu[index]['price'])

    let basket_2 = document.getElementById('addToBasketID');
    basket_2.innerHTML = "";

    for (let j = 0; j < shoppingCartNames.length; j++) {
        basket_2.innerHTML += `
        ${shoppingCartNames[j]} <br>
        `;
    }

}




