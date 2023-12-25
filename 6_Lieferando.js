
let amounts = [1, 1, 1];

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
                                                        // amount in Zeile 87 ausrechnen (multiplizieren)
    for (let i = 0; i < menus.length; i++) {
            menuDisplay.innerHTML += `
            <div>                           
                ${menus[i]['name']} - ${menus[i]['price'] * amounts[i]}  € - Anzahl: ${amounts[i]}
            </div>
            `;
        }
    }
