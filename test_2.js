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
let orderPriceArraySolo = [];
let orderPriceArrayTotal = [];
let deliverPrice = 5;

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

        const priceTotal = (price + deliverPrice)

    } else {
        orderAmountArray[getMenuIndexOf] += amount;
        orderPriceArrayTotal[getMenuIndexOf] = orderAmountArray[getMenuIndexOf] * menuArray[index]['price'];

    }

    document.getElementById("amountID" + index).value = 1;
    renderBasket();
    showBasketBill();
}

function calculateBasketNotice(index) {
    if (totalOrderAndDeliverPrice >= 40) {
        document.getElementById('payOrderID').innerHTML = /*html*/ `
        <div> BEZAHLEN </div>`;
        document.getElementById('checklistOrder_1').innerHTML = /*html*/ `
        <img src="./img/correct.png"> `;
    }

    if (totalOrderAndDeliverPrice >= 70) {
        document.getElementById('checklistFreeDeliver_2').innerHTML = /*html*/ `
        <img src="./img/correct.png"> `;
    }

    if (totalOrderAndDeliverPrice >= 100) {
        document.getElementById('checklistVineForFree_1').innerHTML = /*html*/ `
        <img src="./img/correct.png"> `;
    }
}

function showBasketBill() {

    let = totalOrderSum = 0;
    for (let prices = 0; prices < orderPriceArrayTotal.length; prices++) {
        totalOrderSum += orderPriceArrayTotal[prices];
    }
    totalOrderAndDeliverPrice = totalOrderSum + deliverPrice;

    let bill = document.getElementById('basketBillID');
    bill.innerHTML = /*html*/ `
    <div> 
        <h2>Zwsichen Preis aller Gerichte: ${totalOrderSum}€ </h2> 
        <h2>Lieferkosten: + ${deliverPrice}€ </h2>
        <h1>Gesamtpreis: ${totalOrderAndDeliverPrice}€</h1> 
    </div>
    `;
    showBasketNotice();
}


function showBasketNotice() {

    let bill = document.getElementById('basketNoticeID');
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
    calculateBasketNotice();
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
                 Gericht: ${orderMenuArray[indexBasket]}  <img onclick="removeFromBasket(${indexBasket})" src="./img/close.png" class="cursor" ><br><br>
                 Zwischenpreis: ${orderPriceArrayTotal[indexBasket]} € <br>  <br>                    
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
            </div> <br> <br> <br>
        `;
    }
}

function upNewAmount(index) {
    let getMenuIndexOf = getMenuIndex(orderMenuArray[index]);
    orderAmountArray[getMenuIndexOf] += 1;
    orderPriceArrayTotal[getMenuIndexOf] = orderPriceArraySolo[getMenuIndexOf] * orderAmountArray[getMenuIndexOf];
    renderBasket();
    showBasketBill();
    showBasketNotice();
}

function downNewAmount(index) {
    let getMenuIndexOf = getMenuIndex(orderMenuArray[index]);
    if (orderAmountArray[getMenuIndexOf] > 1) {
        orderAmountArray[getMenuIndexOf] -= 1;
        orderPriceArrayTotal[getMenuIndexOf] = orderPriceArraySolo[getMenuIndexOf] * orderAmountArray[getMenuIndexOf];
    } else {
        removeFromBasket(index) // du musst (index), rein tippen sonst funktioniert das nicht, Folge: Pfeil unten verschwindet nicht wenn auf 0 und Close Button geht nicht
    }                           // Siehe Debugger removeFromBasket wird nicht ausgefèhrt
    renderBasket();
    showBasketBill();
    showBasketNotice();
}

function removeFromBasket(index) {
    let getMenuIndexOf = getMenuIndex(orderMenuArray[index]);

    if (getMenuIndexOf !== -1) { // ist es gleich nicht Leer ? (Gegenteil von nicht leer = Voll) somit ist es Voll = true : Führe code aus 
        orderAmountArray.splice(getMenuIndexOf, 1);
        orderMenuArray.splice(getMenuIndexOf, 1);
        orderPriceArrayTotal.splice(getMenuIndexOf, 1);
        orderPriceArraySolo.splice(getMenuIndexOf, 1);

        renderBasket();
        showBasketBill();
    }


}

// Gelöst:
// In diesen Abschnitt hast du FUnktion "showBasketBill" gesplitet mit "showBasketNotice"
// Dabei musstest du neue ID vergeben, und Zeile 190 musst du (index) einfègen damit Funktion korrekt ausgeführt wird


// Problem:
// wenn ich "showBasketBill" komplett wieder entferne dann soll "showBasketNotice" auch verschwinden

//zeile 115 schau