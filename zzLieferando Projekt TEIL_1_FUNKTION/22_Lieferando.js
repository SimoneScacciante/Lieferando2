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

function showBasketBill() { 
    let bill = document.getElementById('basketBillID');
    
    let = totalOrderSum = 0;     
    for (let prices = 0; prices < orderPriceArrayTotal.length; prices++) {  
        totalOrderSum += orderPriceArrayTotal[prices];  
    }
    totalOrderAndDeliverPrice = totalOrderSum + deliverPrice;

    bill.innerHTML = /*html*/ `
    <div> 
        <h2>Zwsichen Preis aller Gerichte: ${totalOrderSum}€ </h2> 
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
    showBasketNotice();  
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
}

function downNewAmount(index) {
    let getMenuIndexOf = getMenuIndex(orderMenuArray[index]);
    if (orderAmountArray[getMenuIndexOf] > 1) {
        orderAmountArray[getMenuIndexOf] -= 1;
        orderPriceArrayTotal[getMenuIndexOf] = orderPriceArraySolo[getMenuIndexOf] * orderAmountArray[getMenuIndexOf];
    } else {
        removeFromBasket()
    }
    renderBasket();
    showBasketBill(); 
}

function removeFromBasket(index) {
    let getMenuIndexOf = getMenuIndex(orderMenuArray[index]);

    // Überprüfen, ob das Gericht im Warenkorb ist
    if (getMenuIndexOf !== -1) { // "!==" prüft ob getMenuIndexOf nicht gleich -1 // Falls -1 wahr ist dann führt es Code aus! (wenn du Button klicken kannst dann weil Gericht da ist! somit kannst Schliessen)
                                // Bsp. dein Gericht ist da nun die Frage: 1.)  Führe Code aus wenn "getMenuIndexOf == -1" führe COde aus wenn KEIN Gericht vorhanden ist, da die Frage lautet ist es gleich Leer, Antwort True = Führe aus // Antwort False = Führe nicht aus
                                // Bsp. dein Gericht ist da nun die Frage 2.)  Führe Code aus wenn "getMenuIndexOf !== -1" führe Code aus wenn Gericht vorhanden ist, da die Frage ist lautet ist NICHT gleich Leer, Antwort True = Führe aus da Gericht nicht gleich Leer ist (also Voll) // Antwort False = Führe nicht aus das Gericht gleich Leer ist (also Leer)

        // Das Gericht aus den Arrays entfernen
        orderAmountArray.splice(getMenuIndexOf, 1);
        orderMenuArray.splice(getMenuIndexOf, 1);
        orderPriceArrayTotal.splice(getMenuIndexOf, 1);
        orderPriceArraySolo.splice(getMenuIndexOf, 1);

        // Den Warenkorb neu rendern und die Rechnung aktualisieren
        renderBasket();
        showBasketBill();
    }
}

// Gelöst: 
// "removeFromBasket" Gerichte lassen sich entfernen
// Problem von "removeFromBasket" hier gelöst
// CLose Funktion "removeFromBasket" muss nach betätigen sich auf Preis auswirken
//  wenn du erst Gerichte auswählst und dann alle abwählst soll Gesamptreis: 0€ sein und nicht 5€ und "showBasketBill" soll verschwinden 
// Aufgaben: Input verbesseren das bei 0 Value nichts ausgeführt wird an Funktion //*css*/`
// Localstorage vergeben

// Problem:
// Bei entferen der Gerichte über Close Button "removeFromBasket" oder Pfeil Taste "upNewAmount" besteht weiterhin problem das Lieferpreis angezeigt bleibt