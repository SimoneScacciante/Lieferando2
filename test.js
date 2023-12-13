let menus = ['Salat', 'Suppe', 'Hamburger'];
let prices = [20, 7.5, 9];
let amounts = [1, 1, 1];

function getValueFromInput(id) {
    return document.getElementById(id).value;
}
function getMenuFromInput(id) {
    return getValueFromInput('menu').trim();
}
function getPriceFromInput(id) {
    let price = getValueFromInput('price');
    var x = Number(price)
    return x;
}
function onAddMenu(id) {
    let newMenu = getMenuFromInput();
    let newPrice = getPriceFromInput();
    let i = getMenuIndex(menu);
    if (i === -1) {
        menus.push(newMenu);
        prices.push(newPrice)
        amounts.push(1);
    } else {
        amounts[i] = amounts[i] + 1;
    }
}
function getMenuIndex(menu) {
    let index = menus.indexOf(menu)
    return index;
}