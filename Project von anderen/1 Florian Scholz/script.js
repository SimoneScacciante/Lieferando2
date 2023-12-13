let menu = [{
        dish: "Donut - Classic",
        description: "mit Vollmilch Schokoladenglasur",
        price: 2.0,
        image: "img/classic.png",
    },
    {
        dish: "Donut - Party Time",
        description: "mit weißer Zuckerglasur und bunten Zuckerstreuseln",
        price: 2.5,
        image: "img/party_time.png",
    },
    {
        dish: "Donut - Flower Power",
        description: "mit Minzglasur und bunten Zuckerblümchen",
        price: 2.5,
        image: "img/flower_power.png",
    },
    {
        dish: "Donut - Taste the Stars",
        description: "mit blauer Zuckerglasur und bnten Zuckersternen",
        price: 2.5,
        image: "img/taste_the_stars.png",
    },
    {
        dish: "Donut - Barbie",
        description: "mit Vanillefüllung, Himberglasur und glitzer Zuckerperlen",
        price: 3.2,
        image: "img/barbie.png",
    },
    {
        dish: "Donut - Strawberry Kiss",
        description: "mit Erdbeerfüllung und Erdbeerglasur",
        price: 3.2,
        image: "img/strawberry_kiss.png",
    },
    {
        dish: "Donut - Orange Adventure",
        description: "mit Orangenfüllung, Orangenglasur und bunten Zuckerstreuseln",
        price: 3.5,
        image: "img/orange_adventure.png",
    },
    {
        dish: "Homemade Lemonade",
        description: "500ml hausgemachte Limonade aus Bio-Zitronen ohne Zusatz von Zucker ",
        price: 3.9,
        image: "img/homemade_lemonade.png",
    },
];

let basketDishes = [];
let basketPrices = [];
let basketAmount = [];
let deliverFee = 1.5;
let minOrder = Number(15.0).toFixed(2);

if ("basketDishes" in localStorage) {
    basketDishes = loadArrayLocal("basketDishes");
} else {
    saveArrayLocal("basketDishes", basketDishes);
}

if ("basketPrices" in localStorage) {
    basketPrices = loadArrayLocal("basketPrices");
} else {
    saveArrayLocal("basketPrices", basketPrices);
}

if ("basketAmount" in localStorage) {
    basketAmount = loadArrayLocal("basketAmount");
} else {
    saveArrayLocal("basketAmount", basketAmount);
}

function render() {
    let content = document.getElementById("content");
    content.innerHTML = "";

    for (let i = 0; i < menu.length; i++) {
        let dish = menu[i];
        let price = Number(dish["price"]).toFixed(2);

        if (basketDishes.includes(dish["dish"])) {
            let index = basketDishes.indexOf(dish["dish"]);
            let countClass = "countClass";
            let count = basketAmount[index];

            content.innerHTML += renderIfBasketFull(
                dish,
                price,
                i,
                countClass,
                count
            );
        } else {
            content.innerHTML += renderIfBasketEmpty(dish, price, i);
        }
        renderBasket();
    }
}

function renderBasket() {
    if (basketDishes.length != 0) {
        let basketContent = document.getElementById("basketContent");
        basketContent.innerHTML = "";

        sumPrice = sumUPPrices();
        sumAmount = sumUPAmount();
        totalPrice = Number(sumPrice + deliverFee).toFixed(2);
        missingSumToOrder = Number(minOrder - sumPrice).toFixed(2);

        for (let i = 0; i < basketDishes.length; i++) {
            let dish = basketDishes[i];
            let price = Number(basketPrices[i]).toFixed(2);
            let amount = basketAmount[i];

            basketContent.innerHTML += renderBasketDefaul(amount, dish, price, i);
        }

        if (sumPrice < minOrder) {
            basketContent.innerHTML += renderBasketNotMinPrice(
                missingSumToOrder,
                minOrder,
                sumPrice,
                totalPrice
            );
        } else {
            basketContent.innerHTML += renderBaskteMinPrice(
                sumPrice,
                deliverFee,
                totalPrice
            );
        }
        basketContent.innerHTML += renderBasketBuyButton(sumAmount, totalPrice);
    } else {
        basketContent.innerHTML = renderBasketEmpty();
    }

    saveArrayLocal("basketDishes", basketDishes);
    saveArrayLocal("basketPrices", basketPrices);
    saveArrayLocal("basketAmount", basketAmount);
}

function addToBasket(i) {
    let dish = menu[i]["dish"];
    let price = menu[i]["price"];
    let index = getDishIndex(dish);

    if (index === -1) {
        basketDishes.push(dish);
        basketPrices.push(price);
        basketAmount.push(1);
    } else {
        basketPrices[index] = basketPrices[index] + price;
        basketAmount[index] = basketAmount[index] + 1;
    }
    render();
}

function getDishIndex(dish) {
    return basketDishes.indexOf(dish);
}

function reduceAmount(i) {
    let price = basketPrices[i];
    let amount = basketAmount[i];

    singlePrice = price / amount;
    price = price - singlePrice;
    amount = amount - 1;

    if (amount != 0) {
        basketPrices[i] = price;
        basketAmount[i] = amount;

        render();
    } else {
        basketDishes.splice(i, 1);
        basketPrices.splice(i, 1);
        basketAmount.splice(i, 1);

        render();
    }
}

function addAmount(i) {
    let price = basketPrices[i];
    let amount = basketAmount[i];

    singlePrice = price / amount;
    price = price + singlePrice;
    amount = amount + 1;

    basketPrices[i] = price;
    basketAmount[i] = amount;

    render();
}

function sumUPPrices() {
    let sum = basketPrices.reduce(function(a, b) {
        return a + b;
    });
    Number(sum).toFixed(2);
    return sum;
}

function sumUPAmount() {
    let sumAmount = basketAmount.reduce(function(a, b) {
        return a + b;
    });
    Number(sumAmount).toFixed(0);
    return sumAmount;
}

function showBasket() {
    document.getElementById("basket").classList.add("visible");
    document.getElementById("head").classList.add("d-none");
    document.getElementById("storeInfo").classList.add("d-none");
    document.getElementById("contentContainer").classList.add("d-none");
}

function orderSent() {
    basketDishes = [];
    basketPrices = [];
    basketAmount = [];

    alert("Vielen Dank für deine Testestellung!");
    render();
}

function closeMobileBasket() {
    document.getElementById("basket").classList.remove("visible");
    document.getElementById("head").classList.remove("d-none");
    document.getElementById("storeInfo").classList.remove("d-none");
    document.getElementById("contentContainer").classList.remove("d-none");
}

function viewForm() {
    //when Basket is opend and resize Window from under 1100 above 1100 show the Main Content again
    if (window.innerWidth > 1100) {
        document.getElementById("basket").classList.remove("visible");
        document.getElementById("head").classList.remove("d-none");
        document.getElementById("storeInfo").classList.remove("d-none");
        document.getElementById("contentContainer").classList.remove("d-none");
    }
}

window.addEventListener("resize", viewForm);

function saveArrayLocal(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

function loadArrayLocal(key) {
    return JSON.parse(localStorage.getItem(key));
}