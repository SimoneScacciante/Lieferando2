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
let orderPriceArrayTotalDeliver = [];
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
        orderPriceArrayTotalDeliver.push(priceTotal)

    } else {
        orderAmountArray[getMenuIndexOf] += amount;
        orderPriceArrayTotal[getMenuIndexOf] = orderAmountArray[getMenuIndexOf] * menuArray[index]['price'];

        orderPriceArrayTotalDeliver[getMenuIndexOf] = (orderPriceArrayTotal[getMenuIndexOf] + deliverPrice)
    }

    document.getElementById("amountID" + index).value = 1;
    renderBasket();
    showBasketBill();
    showBasketNotice(); // Diese Funktion musst du LÖSCHEN, macht kein Sinn hier, die Funktion "showBasketBill();" soll im nächsten Schritt die FUnktion  "showBasketNotice();" aufrufen das macht mehr Sinn!
}                       // die ...bill FUnktion ist der ...notice Funktion vorgeschaltet (wird zuerst angezeigt)

function showBasketBill() {
    let bill = document.getElementById('basketBillID');
    
    totalOrderPrice = 0;     // setze den Wert dieser Variable auf 0
    for (let prices = 0; prices < orderPriceArrayTotal.length; prices++) {  // Bilde neue Forschleife dabei nehme alle Elemente aus dem Array im Fokus
        totalOrderPrice += orderPriceArrayTotal[prices]; // 0 wird addiert mit allen Werte (Preise) die sich im "orderPriceArrayTotal" befinden 
    }
    totalOrderAndDeliverPrice = totalOrderPrice + deliverPrice;

    bill.innerHTML = /*html*/ `
    <div> 
        <h2>Zwsichen Preis aller Gerichte: ${totalOrderPrice}€ </h2> 
        <h2>Lieferkosten: + ${deliverPrice}€ </h2>
        <h1>Gesamtpreis: ${totalOrderAndDeliverPrice}€</h1> 
    </div>

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
    // Wichtig: Hier musst du die Funktion "showBasketNotice()" einfügen damit die Werte hier sauber der nächste Funktion übergeben werden können, 
    // sonst funktioniert Pfeil hoch und Runter nicht hier (upNewAmount und downNewAmount) 
}

function showBasketNotice(index) {
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
    showBasketNotice(); // Siehe nächste Aufgabe diese Funktion kannst entfernen da später von (showBasketBill) übernommen
    showBasketBill(); // musst du einfügen sonst überträgt Wert bei Pfeil klick noch nicht an entsprechende hier definierten Arrays
}

function downNewAmount(index) {
    let getMenuIndexOf = getMenuIndex(orderMenuArray[index]);
    if (orderAmountArray[getMenuIndexOf] > 1) {
        orderAmountArray[getMenuIndexOf] -= 1;
        orderPriceArrayTotal[getMenuIndexOf] = orderPriceArraySolo[getMenuIndexOf] * orderAmountArray[getMenuIndexOf];
        orderPriceArrayTotalDeliver[getMenuIndexOf] -= orderPriceArraySolo[getMenuIndexOf];
        renderBasket(); //Diese Funktion A.)
        showBasketNotice(); // Siehe nächste Aufgabe diese Funktion kannst entfernen da später von (showBasketBill) übernommen
        showBasketBill(); // Diese Funktion C.) ... gehören alle *
    } else {
        removeFromBasket()
    }
    // hier hin * hier gehört Funktion A.) / B.) / und C.)
}

function removeFromBasket(index) {
    orderAmountArray.splice(index, 1);
    orderMenuArray.splice(index, 1);
    orderPriceArrayTotal.splice(index, 1);
    orderPriceArraySolo.splice(index, 1);
    orderPriceArrayTotalDeliver.splice(index, 1);
    renderBasket();
}

// Problem bei 20_Lieferando.js = Dein "upNewAmount" und "downNewAmount" funktioiniert nicht
// das liegt daran das du in Zeile 110 nicht die Funktion "showBasketNotice" geschrieben hast
// Clean Coding: Du hast mehere Funktionien geschrieben die gar nicht nötig sind, die kann man löschen