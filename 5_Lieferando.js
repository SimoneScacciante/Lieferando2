
let amounts = [1, 1, 1];

let menus = [
    {
        'name': 'Pizza Salami',
        'recepte': ['Tomatensoße', 'Salami', 'Käse', 'Peperoni'],
        'price': 20,
    },

    {
        'name': 'Pasta Carbonara',
        'recepte': ['Tomatensoße', 'Apfel'],
        'price': 7.5,
    },

    {
        'name': 'Hamburger',
        'recepte': ['Kartoffel', 'Curry', 'Ketchup'],
        'price': 9,
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

    // du könntest auch "return Number(getValueFromInput('price'));" statt Zeile 14-16
}

function onAddMenu() {
    let newMenu = getMenuFromInput();
    let newPrice = getPriceFromInput();
    let i = getMenuIndex(newMenu);

    if (i === -1) {
        menus.push({ 'name': newMenu, 'price': newPrice });
        amounts.push(1);
    } else {
        amounts[i] = amounts[i] + 1;
        menus[i]['price'] = menus[i]['price'] + newPrice;
    }

    updateMenuDisplay(); 
}


function getMenuIndex(menuIndex) {
    // Durchlaufe das Array und finde den Index des Menüs mit dem passenden Namen
    for (let i = 0; i < menus.length; i++) { //  Hier wird überprüft, ob der Name des aktuellen Menüs (menus[i]['name']) 
        if (menus[i]['name'] === menuIndex) { //gleich dem gesuchten Menünamen (menuIndex) ist.
            return i; // Gib den Index zurück, wenn das Menü gefunden wurde
        }
    }

    return -1; // Gib -1 zurück, wenn das Menü nicht gefunden wurde
}


function updateMenuDisplay() {
    let menuDisplay = document.getElementById('TextHier');
    menuDisplay.innerHTML = '';

    for (let i = 0; i < menus.length; i++) {
        menuDisplay.innerHTML += `
            <div>
                ${menus[i]['name']} - ${menus[i]['price']} € - Anzahl: ${amounts[i]}
            </div>`;
    }
}
