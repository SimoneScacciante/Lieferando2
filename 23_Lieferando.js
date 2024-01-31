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

function getMenuIndex(menu) {
    let indexOf = orderMenuArray.indexOf(menu);
    return indexOf;
}

function getAmountFromInput(input) {
    let amountValue = +document.getElementById("amountID" + input).value;
    return amountValue;
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
    showBasketNotice();

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

    if(orderAmountArray < 1) { // Sobald du "removeFrom..." ausführst wird "basketNoticeDeleteID" mit "Siehe unten" ersetzt, das führt dazu das Neuer DIV Container erscheint (= Anzeige Leer) 
                                //UND es enhält wieder die entsprechende ID was wichtig ist für erneutigen Kauf, würdest du stattdessen (...inner.html = ' ') schreiben dann würde es dir die ID löschen! Siehe "Aufgabe 23 ID ersetzen"
        let basketNoticeDeleteID = document.getElementById('basketNoticeDeleteID');
        basketNoticeDeleteID.innerHTML = `
        <div id="basketBillID"> </div>
        <div id="basketNoticeID"> </div>
        `
        ;}
}

// @Gelöst:
// Funktion Splitten:
// In diesen Abschnitt hast du Funktion "showBasketBill" gesplitet mit "showBasketNotice"
// Dabei musstest du neue ID vergeben, und Zeile 190 musst du (index) einfügen damit Funktion korrekt ausgeführt wird

// removeFromBasket korrekt Schliessen:
// durch selbe ID vergabe in Zeile 213 und 214 wie in 23_Lieferando.html, führt es dazu das Anzeige nach ausführung
// geleert wird (=Anzeige Leer) und bei erneutigen ausführen eines Kaufens bleibt in Elements die ID bestehen da erneut hinzugefügt


// Problem:
// ich möchte das durch die "downNewAmount" also Pfeil unten FUnktion wenn diese auf 0 geht auch gleich alles verschwindet wie ich es in "removeFromBasket" hingekriegt habe

// Problem / Lösung:
// Wenn du Debugger nutzt dann siehst du das er Zeile 209 Korrekt ausführt und beide ID Elemente "basketBillID" "basketNoticeID" verschwinden lässt
// aber dann springt er in Zeile 191 hoch und Rendert wieder showBasketBill und showBasketNotice, das heißt hier liegt der Fehler
// du hast diese Funktionen in der  allgemeinen "downNewAmount" gepackt, diese müssen aber NUR in die IF abfrage und nicht auch in die ELSE rein! 
// gelöst in Aufgabe 24_Lieferando