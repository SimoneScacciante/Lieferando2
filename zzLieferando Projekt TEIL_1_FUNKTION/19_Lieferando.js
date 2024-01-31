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
let orderAmountArray = [];
let deliverPrice = 5;

let orderPriceArraySolo = [];
let orderPriceArrayTotal = [];
let orderPriceArrayTotalDeliver = []; // Neues Array enthält nun Gesamtpreis inkl. 5€ Versandkosten 


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
        Bestellung: <input id="amountID${i}" type="number" min="1" max ="10" value="1"><br>
        <button onclick="addToBasket(${i})"> Kaufen </button> 
        <br> <br> <br>   
    </div> 
`
}

function addToBasket(index) {
    let amount = getAmountFromInput(index);
    let getMenuIndexOf = getMenuIndex(menuArray[index]['name']);

    if (getMenuIndexOf == -1) {
        orderAmountArray.push(amount);
        orderMenuArray.push(menuArray[index]['name']);
        const price = amount * menuArray[index]['price'];
        orderPriceArrayTotal.push(price);
        orderPriceArraySolo.push(menuArray[index]['price']);

        const priceTotal = (price + deliverPrice)       // Hier definiere ich den Gesamtpreis inkl. 5€ Versandkosten
        orderPriceArrayTotalDeliver.push(priceTotal)    // Gesamtpreis inkl. Versandkosten in Array rein pushen

    } else {
        orderAmountArray[getMenuIndexOf] += amount;
        orderPriceArrayTotal[getMenuIndexOf] = orderAmountArray[getMenuIndexOf] * menuArray[index]['price'];

        orderPriceArrayTotalDeliver[getMenuIndexOf] = (orderPriceArrayTotal[getMenuIndexOf] + deliverPrice) // Else Funktion wird nun auch Funktion definiert für Gesamtpreis inkl. Versand
    }

    document.getElementById("amountID" + index).value = 1;
    renderBasket();
    showBasketBill();
    showBasketNotice();
}

function showBasketNotice(index) {

    if (orderPriceArrayTotalDeliver >= 40) {
        document.getElementById('payOrderID').innerHTML = /*html*/ `
        <div> BEZAHLEN </div>`;

        document.getElementById('checklistOrder_1').innerHTML = /*html*/ `
        <img src="./img/correct.png"> `;
    }

    if (orderPriceArrayTotalDeliver >= 70) {
        document.getElementById('checklistFreeDeliver_2').innerHTML = /*html*/ `
        <img src="./img/correct.png"> `;
    }

    if (orderPriceArrayTotalDeliver >= 100) {
        document.getElementById('checklistVineForFree_1').innerHTML = /*html*/ `
        <img src="./img/correct.png"> `;
    }
}

function showBasketBill() {
    let bill = document.getElementById('basketBillID');

    bill.innerHTML = /*html*/ `
    <div class="basketNoticeContainer"> 

        <div class="payOrderStyle" id="payOrderID"> 
             Mindest-Bestellwert ist noch nicht erreicht 
        </div> <br>

        <div class="payOrderStyleNotice">  
             1. Der Mindestbestellwert liegt bei 40 € <div id="checklistOrder_1"> </div> <br>
             2. Bei einem Bestellwert ab 70€ ist die Lieferung frei Haus <div id="checklistFreeDeliver_2"> </div> <br>
             3. Bei einem Bestellwert ab 100€ bekommen Sie eine Flasche erlesenen Qualitätswein gratis dazu <div id="checklistVineForFree_1"> </div> <br>
        </div>

    </div>
    `;
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
            <div> 
                <div class="basketContainerStyle"> 
                 Gericht: ${orderMenuArray[indexBasket]}  <img onclick="removeFromBasket(${indexBasket})" src="./img/close.png" class="cursor" >
                 <br><br>

                 Einzelpreis Fix: ${orderPriceArraySolo[indexBasket]} € <br><br>

                 Zwischenpreis_1: ${orderPriceArraySolo[indexBasket] * orderAmountArray[indexBasket]} € <br>  
                 Zwischenpreis_2: ${orderPriceArrayTotal[indexBasket]} € <br>  <br> 

                 Lieferkosten: ${deliverPrice} € <br><br> 

                 Gesamtpreis_1: ${deliverPrice + orderPriceArrayTotal[indexBasket]} € 
                 Gesamtpreis_2: ${orderPriceArrayTotalDeliver[indexBasket]} € <br> <br>
                                                  
                 Gesamtanzahl: ${orderAmountArray[indexBasket]} <br> <br>                                 

                    <div class="basketStyle">
                        <div class="button"> 
                            <img class="cursor" src="./img/down.png" onclick="downNewAmount(${indexBasket})">
                        </div>
            
                        <div id="amountBasket${indexBasket}"> 
                            ${orderAmountArray[indexBasket]} 
                        </div>

                        <div class="button">
                             <img class="cursor" src="./img/up.png" onclick="upNewAmount(${indexBasket})"> 
                        </div> <br>
                    </div>
                </div>

                <div> 
                     <h3>Gesamtpreis aller Gerichte: ${orderPriceArrayTotalDeliver}€ </h1> 
                </div>
            </div>

        <br> <br> <br>
        `;
    }
}

function upNewAmount(index) {
    let getMenuIndexOf = getMenuIndex(orderMenuArray[index]);
    orderAmountArray[getMenuIndexOf] += 1;
    orderPriceArrayTotal[getMenuIndexOf] = orderPriceArraySolo[getMenuIndexOf] * orderAmountArray[getMenuIndexOf];

    orderPriceArrayTotalDeliver[getMenuIndexOf] += orderPriceArraySolo[getMenuIndexOf]; // bei jeder erhöhung "Pfeil"  erscheint nun korrekte Preis Gesamtanzahl + Lieferpreis im entsprechenden Array

    renderBasket();
    showBasketNotice();
}

function downNewAmount(index) {
    let getMenuIndexOf = getMenuIndex(orderMenuArray[index]);
    if (orderAmountArray[getMenuIndexOf] > 1) {
        orderAmountArray[getMenuIndexOf] -= 1;
        orderPriceArrayTotal[getMenuIndexOf] = orderPriceArraySolo[getMenuIndexOf] * orderAmountArray[getMenuIndexOf];

        orderPriceArrayTotalDeliver[getMenuIndexOf] -= orderPriceArraySolo[getMenuIndexOf]; // beim reduzieren "Pfeil" erscheint nun korrektes Endergebnis

        renderBasket();
        showBasketNotice();
    } else {
        removeFromBasket()
    }
}

function removeFromBasket(index) {
    orderAmountArray.splice(index, 1);
    orderMenuArray.splice(index, 1);
    orderPriceArrayTotal.splice(index, 1);
    orderPriceArraySolo.splice(index, 1);
    orderPriceArrayTotalDeliver.splice(index, 1); // wenn du diese Zeile nicht drin hast dann belibt in Console Wert gespeichert
    renderBasket();
}
