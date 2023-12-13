let menus = ['Salat', 'Suppe', 'Hamburger'];
let prices = [20, 7.5, 9];
let amounts = [1, 1, 1];

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
        menus.push(newMenu);
        prices.push(newPrice);
        amounts.push(1);
    } else {
        amounts[i] = amounts[i] + 1;
        prices[i] = prices[i] + newPrice;
    }

    updateMenuDisplay(); // Call a function to update the display after adding a menu
}

function getMenuIndex(menu) {
    return menus.indexOf(menu);
}

function updateMenuDisplay() {
    let menuDisplay = document.getElementById('TextHier');
    menuDisplay.innerHTML = ''; 

    for (let i = 0; i < menus.length; i++) {
        menuDisplay.innerHTML += `
            <div>
                ${menus[i]} - ${prices[i]} € - Anzahl: ${amounts[i]}
            </div>`;
    }
}
