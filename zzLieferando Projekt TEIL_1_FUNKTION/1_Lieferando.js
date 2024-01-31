let names = ['cheeseburger', 'pommes', 'carbonara']
let prices = [10, 5, 30]

let shoppingCartNames = [];
let shoppingCartPrices = [];


function food(itemIndexFood) {
    shoppingCartNames.push(names[itemIndexFood]);
    shoppingCartPrices.push(prices[itemIndexFood]);

    let basket = document.getElementById('warenkorbID');
    basket.innerHTML = "";

    for (let i = 0; i < shoppingCartNames.length; i++) {
        basket.innerHTML += `
    ${shoppingCartNames[i]} + ${shoppingCartPrices[i]}

    
    `;

    }
}