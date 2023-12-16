<<<<<<< HEAD
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
]
let orderMenu = []
let orderPrice = []
let orderAmount = []


function render() {
    let menu = document.getElementById('menu');
    menu.innerHTML = '';

    for (let i = 0; i < menus.length; i++) {
        menuLoad(i);
=======


let menus = [
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
]

let amounts = [1, 1, 1];
let orderMenu = []
let orderPrice = []


function init() {

    let TextHier2 = document.getElementById('TextHier2');
    TextHier2.innerHTML = '';

    for (let j = 0; j < menus.length; j++) {
        TextHier2.innerHTML += `
        <div>
        ${menus[j]['name']} - ${menus[j]['price']} € - Anzahl: ${amounts[j]} 
        <button> Kaufen </button>
        </div> 
        `
    }
}


function getValueFromInput(id) {
    return document.getElementById(id).value;
}

function getMenuFromInput() {
    return getValueFromInput('menu').trim();
}

function getPriceFromInput() {
    let price = getValueFromInput('price');
    var x = Number(price);
    return x;
}

function onAddMenu() {
    let newMenu = getMenuFromInput();
    let newPrice = getPriceFromInput();
    let i = getMenuIndex(newMenu);

    if (i === -1) {
        menus.push({ 'name': newMenu, 'price': newPrice });
        amounts.push(1);
    } else {
        amounts[i] = amounts[i] + newPrice;
    }

    updateMenuDisplay();
}


function getMenuIndex(menuIndex) {
    for (let i = 0; i < menus.length; i++) {
        if (menus[i]['name'] === menuIndex) {
            return i;
        }
    }
    return -1;
}


function updateMenuDisplay() {
    let menuDisplay = document.getElementById('TextHier');
    menuDisplay.innerHTML = '';

    for (let i = 0; i < menus.length; i++) {
        menuDisplay.innerHTML += `
    
            <div>
                ${menus[i]['name']} - ${menus[i]['price'] * amounts[i]} € - Anzahl: ${amounts[i]}
            </div>`;
>>>>>>> 6001a88fce483b0f32452beb0826b16562173ed1
    }
}


function menuLoad(i) {
    let menu = document.getElementById('menu');
    const element = menus[i]
    
    menu.innerHTML += /*html*/ `
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

function addToBasket(index) {
    let amount = getAmountFromInput(index);
    const menu = menus[index];
    let orderBasket = getMenuIndex(menu['name']);

    if (orderBasket == -1) {
        orderAmount.push(amount);
        orderMenu.push(menu['name']);
        orderPrice.push(menu['price']);
    } else {
        let addAmount = orderAmount[orderBasket] + amount;
        orderAmount.splice(orderBasket, 1, addAmount);
    }

    renderBasket();
}

function renderBasket() {
    let basket = document.getElementById("basket");
    let sum = 0;
    basket.innerHTML = '';
    for (let i = 0; i < orderMenu.length; i++) {
        let price = orderAmount[i] * orderPrice[i];
        sum += orderAmount[i] * orderPrice[i];
        basket.innerHTML += `
    <div class="basketCard">
    <b>${orderMenu[i]}</b>
    <span class="basketSpan"><input id="amountBasket${i}" type="number" value="${orderAmount[i]}" step="1" min="1">
    <img class ="deletFromBasket" src="img/reload.png" onclick="reloadNewAmount(${i})">
    <img class ="deletFromBasket" src="img/delete.png" onclick="removeFromBasket(${i})"></span>
    ${price.toFixed(2)}€
    </div>
    `;
    }
    basket.innerHTML += `<div><b>Total: ${sum.toFixed(2)}€<b/></div>`;
}

function reloadNewAmount(index) {
    let newAmount = +document.getElementById("amountBasket" + index).value;
    const menu = menus[index];
    let orderBasket = getMenuIndex(menu['name']);
    orderAmount.splice( orderBasket, 1, newAmount);
    renderBasket();
}

function getAmountFromInput(input) {
    let amountValue = +document.getElementById("amount" + input).value;
    return amountValue;
}

function getMenuIndex(menu) {
    let indexOf = orderMenu.indexOf(menu);
    return indexOf;
}

function removeFromBasket(index) {
    orderMenu.splice(index, 1);
    orderAmount.splice(index, 1);
    orderPrice.splice(index, 1);
    renderBasket();
}