<<<<<<< HEAD
let menusArray = [
    {
        'name': 'Hamburger',
        'recepte': ['Tomatensoße', 'Salami', 'Käse', 'Peperoni'],
        'price': 10,
    },

    {
        'name': 'Pasta Carbonara',
        'recepte': ['Tomatensoße', 'Apfel'],
        'price': 7.5,
    },

    {
        'name': 'Pizza Salami',
        'recepte': ['Kartoffel', 'Curry', 'Ketchup'],
        'price': 15,
    },
=======
let menus = [{
    'name': 'Pizza Salami',
    'price': '12.99',
    'zutaten': ['Tomatensoße', 'Salami', 'Käse'],
},
{
    'name': 'Pizza Margherita',
    'price': '9.99',
    'zutaten': ['Tomatensoße', 'Käse'],
},
{
    'name': 'Pizza Funghi',
    'price': '12.99',
    'zutaten': ['Tomatensoße', 'frische Champignons', 'Käse'],
},
{
    'name': 'Pizza Tuna',
    'price': '13.99',
    'zutaten': ['Tomatensoße', 'Thunfisch', 'Zwiebeln', 'Käse'],
},
{
    'name': 'Pasta Bolo',
    'price': '10.49',
    'zutaten': ['Bolognesesoße'],
},
>>>>>>> 6001a88fce483b0f32452beb0826b16562173ed1
]
let orderMenu = []
let orderPrice = []
let orderAmount = []

<<<<<<< HEAD
let orderMenu = []
let orderPrice = []
let orderAmount = []

function render() {
    let menuID = document.getElementById('menuID');
    menuID.innerHTML = '';

    for (let i = 0; i < menusArray.length; i++) {
=======

function render() {
    let menu = document.getElementById('menu');
    menu.innerHTML = '';
    for (let i = 0; i < menus.length; i++) {
>>>>>>> 6001a88fce483b0f32452beb0826b16562173ed1
        menuLoad(i);
    }
}

<<<<<<< HEAD
function menuLoad(i) {
    let menuID = document.getElementById('menuID');
    const element = menus[i]

    menuID.innerHTML += /*html*/`
    <div>
        Name: ${element['name']} <br>
        Zutaten: ${element['recepte']} <br>
        Preis: ${element['price']} €  <br> 
        Anzahl: ${orderAmount[i]} <br>
        Bestellung: 
        <input id="amountID${i}" type="number" min="1" max ="10" value="1"><br> 
        <button onclick="addToBasket(${i})"> Kaufen </button> 
    <br> <br> <br>   
    </div> 
`
}


function addToBasket(index) {
    let amount = getAmountFromInput(index);
    const menu = menusArray[index]; // nun bekommt "menusArray" jedes einzelene Gericht (Json-String Abschnitt inner {}-Klammer) eine Index-Position

}

function getAmountFromInput(input) {
    let amountValue = +document.getElementById('amountID', input).value; //hier greift auf "amountID" und verknüpfung mit  Index-Wert
    return amountValue;
}

=======

function menuLoad(i) {
    let menu = document.getElementById('menu');
    const element = menus[i]
    menu.innerHTML += `
<div class="menuCard">
    <span>
    <h2>${element['name']}</h2>
    ${element['zutaten']}
    </span>
    <div class = "addArea">
    ${element['price']}
        <div class = "addArea">
            <input id="amount${i}" type="number" min="1" max ="10" value="1">
            <img class ="imgBasketAdd" src="img/basket.png" onclick="addToBasket(${i})">
        </div>

    </div>
</div>
`;
}
>>>>>>> 6001a88fce483b0f32452beb0826b16562173ed1
