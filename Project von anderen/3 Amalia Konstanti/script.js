function initDishes() {
    renderDishes('menuFavorites', 'favorites');
    renderDishes('menuStarters', 'starters');
    renderDishes('menuSalads', 'salads');
    renderDishes('menuMainDishes', 'mainDishes');
    renderDishes('menuDesserts', 'desserts');
    renderDishes('menuDrinks', 'drinks');
}

function renderDishes(id, objKey) {
    let menuContainer = document.getElementById(id);
    menuContainer.innerHTML = ``;
    for (let i = 0; i < allDishes.length; i++) {
        for (let index = 0; index < allDishes[i][objKey].length; index++) {
            const dish = allDishes[i][objKey][index];
            menuContainer.innerHTML += menuTemplate(dish, index, objKey, i);
        }
    }
}

window.onscroll = function() {
    let shoppingBagContainer = document.getElementById('shopping-bag-container');
    if (window.scrollY > 0) {
        shoppingBagContainer.style = 'top: 0';
    } else {
        shoppingBagContainer.style = 'top: 100px';
    }
}

function putToShoppingBag(i, objKey, index) {
    const dish = allDishes[i][objKey][index];
    const dishName = dish.name;
    const isInside = shoppingBagArray.filter(item => item.name === dishName).length > 0;

    if (!isInside) {
        shoppingBagArray.push(dish);
    } else {
        chooseOneMore(dish);
    }
    save();
    renderShoppingBag();
}

function renderShoppingBag() {
    if (shoppingBagArray.length <= 0) {
        emptyBag();
    } else {
        fullBag();
    }
}

function emptyBag() {
    let emptyBag = document.getElementById('shoppingBag');
    let sumContainer = document.getElementById('sum-container');
    emptyBag.innerHTML = '';
    sumContainer.innerHTML = '';
    emptyBag.innerHTML = emptyBagTemplate();
}

function fullBag() {
    load();
    let shoppingBagArea = document.getElementById('shoppingBag');
    shoppingBagArea.innerHTML = ``;
    for (let i = 0; i < shoppingBagArray.length; i++) {
        let element = shoppingBagArray[i];
        let name = element.name;
        let amount = element.amount;
        let newPriceFixed = (element.totalPrice).toFixed(2).replace('.', ',');
        shoppingBagArea.innerHTML += shoppingBagContainerTemplate(name, amount, newPriceFixed, i);
    }
    sumTotalPrices();
    save();
}

function sumTotalPrices() {
    let sumContainer = document.getElementById('sum-container');
    let buttonMainMenu = document.getElementById('btn-main-menu');
    let totalSum = 0;
    for (let i = 0; i < shoppingBagArray.length; i++) {
        totalSum += shoppingBagArray[i].totalPrice;
    }
    let total = (totalSum + 2.00).toFixed(2).replace('.', ',');
    let minOrder = (20 - totalSum).toFixed(2).replace('.', ',');

    sumContainer.innerHTML = sumContainerTemplate(totalSum, total, minOrder);

    if (totalSum >= 20) {
        let element = document.getElementById('min-order-value-container');
        element.classList.add('d-none');
    }
    if (shoppingBagArray.length > 0) {
        buttonMainMenu.innerHTML = `<button class="sum-btn-main opacity" onclick="showBagMain()">Bezahlen ${total}€</button>`;
    }
}

function chooseOneMore(i) {
    if (typeof i === 'number') {
        chooseProduct(i);
    } else {
        let z = shoppingBagArray.findIndex(item => item.name === i.name);
        chooseProduct(z);
    }
    save();
    renderShoppingBag();
}

function chooseProduct(i) {
    let element = shoppingBagArray[i];
    let name = element.name;
    let description = element.description;
    let price = element.price;
    let amount = element.amount;
    let newAmount = amount + 1;
    let newPrice = (price * newAmount);
    let newElement = {
        name: name,
        description: description,
        totalPrice: newPrice,
        amount: newAmount,
        price: price
    }
    let index = shoppingBagArray.findIndex(item => item.name === name);
    shoppingBagArray.splice(index, 1, newElement);
}

function chooseOneLess(i) {
    let element = shoppingBagArray[i];
    let name = element.name;
    let description = element.description;
    let amount = element.amount;
    let price = element.price;

    if (element.amount <= 0) {
        renderShoppingBag();
    }
    if (amount === 1) {
        shoppingBagArray.splice(i, 1);
    } else {
        let newAmount = amount - 1;
        let newPrice = price * newAmount;
        let newElement = {
            name: name,
            description: description,
            totalPrice: newPrice,
            amount: newAmount,
            price: price
        }
        shoppingBagArray.splice(i, 1, newElement);
    }
    save();
    renderShoppingBag();
}

function sendOrder(total) {
    if (total >= 22) {
        let completed = document.getElementById('orderCompleted');
        let opacities = document.getElementsByClassName('opacity');
        let left = document.getElementById('left');

        completed.classList.remove('visibility');
        left.classList.remove('d-none');

        for (let i = 0; i < opacities.length; i++) {
            opacities[i].classList.add('blur');
        }
    } else {
        alert('Bitte Mindestbestellwert beachten!');
    }
}

function orderCompleted() {
    shoppingBagArray.splice(0, shoppingBagArray.length);
    save();
    let completed = document.getElementById('orderCompleted');
    let opacities = document.getElementsByClassName('opacity');
    let left = document.getElementById('left');
    completed.classList.add('visibility');
    left.classList.add('d-none');

    for (let i = 0; i < opacities.length; i++) {
        opacities[i].classList.remove('blur');
    }
    closeBagMain();
    location.reload();
}

function showBagMain() {
    let none = document.getElementById('left');
    let right = document.getElementById('right');
    let cancel = document.getElementById('img-cancel');

    none.classList.add('d-none');
    right.classList.add('show-right');
    cancel.classList.remove('d-none');
}

function closeBagMain() {
    let none = document.getElementById('left');
    let right = document.getElementById('right');
    let cancel = document.getElementById('img-cancel');

    none.classList.remove('d-none');
    right.classList.remove('show-right');
    cancel.classList.add('d-none');
}

function save() {
    let ArraysAsText = JSON.stringify(shoppingBagArray);
    localStorage.setItem('key-ArraysAsText', ArraysAsText);
}

function load() {
    let ArraysAsText = localStorage.getItem('key-ArraysAsText');
    shoppingBagArray = JSON.parse(ArraysAsText);
}