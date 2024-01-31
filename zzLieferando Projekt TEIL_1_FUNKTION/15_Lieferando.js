let menuArray = [
    {
        'name': 'Hamburger',
        'recepte': ['Tomatensoße', 'Salami', 'Käse', 'Peperoni'],
        'price': 10,
    },

    {
        'name': 'Carbonara',
        'recepte': ['Tomatensoße', 'Apfel'],
        'price': 15,
    },

    {
        'name': 'Pizza',
        'recepte': ['Kartoffel', 'Curry', 'Ketchup'],
        'price': 20,
    },
]

let orderMenuArray = [];
let orderPriceArrayTotal = [];
let orderPriceArraySolo = []; // Neues Array für Einzelpreis (für Berechnung nötig)
let orderAmountArray = [];

function render() {
    let menuID = document.getElementById('menuID');
    menuID.innerHTML = '';

    for (let i = 0; i < menuArray.length; i++) {
        menuLoad(i);
    }
}

function menuLoad(i) {
    let menuID = document.getElementById('menuID');
    const element = menuArray[i]

    menuID.innerHTML += /*html*/`
    <div>
        Name: ${element['name']} <br>
        Zutaten: ${element['recepte']} <br>
        Preis: ${element['price']} €  <br> 
        Bestellung: <input id="amountID${i}" type="number" min="1" max ="10" value="1"><br> <!-- im Project 15_lieferando.js entferne Input (veränderung am Value findet statt) -->
        <button onclick="addToBasket(${i})"> Kaufen </button> 
    <br> <br> <br>   
    </div> 
`
}


function addToBasket(index) {
    let amount = getAmountFromInput(index);
    let IndexOfNameArray = getMenuIndex(menuArray[index]['name']);

    if (IndexOfNameArray == -1) {
        orderAmountArray.push(amount);
        orderMenuArray.push(menuArray[index]['name']);
        const price = amount * menuArray[index]['price'];
        orderPriceArrayTotal.push(price);
        orderPriceArraySolo.push(menuArray[index]['price']); // Neues Array wird hier definiert

    } else {
        orderAmountArray[IndexOfNameArray] += amount;
        orderPriceArrayTotal[IndexOfNameArray] = orderAmountArray[IndexOfNameArray] * menuArray[index]['price'];

    }
    renderBasket();
}

function getMenuIndex(menu) {
    let indexOf = orderMenuArray.indexOf(menu);
    return indexOf;
}

function getAmountFromInput(input) {
    let amountValue = +document.getElementById("amountID" + input).value;
    return amountValue;
}

function renderBasket() {
    let basket = document.getElementById('basket');
    basket.innerHTML = '';

    for (let indexBasket = 0; indexBasket < orderMenuArray.length; indexBasket++) {

        basket.innerHTML += /*html*/ `
       <div class="border"> 
            Gericht: ${orderMenuArray[indexBasket]}  <br>
        
            Einzelpreis Fix: ${orderPriceArraySolo[indexBasket]}€ <br> <!-- Neues Array nun erscheint korrekter Einzelpreis-->
            <br>
            Gesamtpreis_1: ${orderPriceArraySolo[indexBasket] * orderAmountArray[indexBasket]}€ <br>   <!-- A.) Einzelpreis + Gesamt Amount = Total Preis -->
            Gesamtpreis_2: ${orderPriceArrayTotal[indexBasket]}€ <br>  <br> <!-- B.)  anderer weg um Total Preis zu berechnen -->

            Lieferkosten: +5€ <br> //
                   
            <br>            
            Gesamtanzahl: ${orderAmountArray[indexBasket]} <br>                                   

            <div class="basketStyle">
                <div class="button"> 
                    <img src="./img/down.png" onclick="downNewAmount(${indexBasket})"> <!--"decrease" Funktion-->
                </div>
            
                <div id="amountBasket${indexBasket}"> 
                    ${orderAmountArray[indexBasket]} 
                </div>

                <div class="button">
                    <img src="./img/up.png" onclick="upNewAmount(${indexBasket})"> <!--"increase" Funktion-->
                </div>
            </div>
        </div>
        <br> <br> <br>
        `;
    }
}

// Für up + downNewAmount Funktion gibt es zwei wege wie du es definieren kannst (führt zum gleichen Ziel)

function upNewAmount(index) {
    let IndexOfNameArray = getMenuIndex(orderMenuArray[index]); 
    orderAmountArray[IndexOfNameArray] += 1; //A.) Für Gesamtpreis_1 Berechnung das ist ein möglicher Weg 
    orderPriceArrayTotal[IndexOfNameArray] =  orderPriceArraySolo[IndexOfNameArray] * orderAmountArray[IndexOfNameArray];  //B.) Für Gesamtpreis_2 Berechnung, das ist zweiter möglicher Weg zu berechnen
    renderBasket();
}

function downNewAmount(index) {
    let IndexOfNameArray = getMenuIndex(orderMenuArray[index]);
    if (orderAmountArray[IndexOfNameArray] > 1) { 
        orderAmountArray[IndexOfNameArray] -= 1; //A.) Für Gesamtpreis_1 Berechnung
        orderPriceArrayTotal[IndexOfNameArray] =  orderPriceArraySolo[IndexOfNameArray] * orderAmountArray[IndexOfNameArray]; // B.) Für Gesamtpreis_2 Berechnung
        renderBasket();
    }
}

// Aufgaben: Funktion Close / Lieferkosten / Hinweis Mindest Bestellwert ist noch nicht erreicht
