let menuArray = [
    {
        'name': 'Classic',
        'recepte': ['mit Vollmilch Schokoladenglasur'],
        'price': 1.50,
        'picture': ['./img/donut/donut_1.png'],
    },

    {
        'name': 'Glitter Glam',
        'recepte': ['Glitzernde Glasur, funkelnde Zuckerperlen'],
        'price': 3.50,
        'picture': ['./img/donut/donut_2.png'],

    },

    {
        'name': 'Rainbow Delight',
        'recepte': ['Fruchtige Füllungen und einer Explosion von Regenbogenfarben'],
        'price': 3.50,
        'picture': ['./img/donut/donut_3.png'],

    },

    {
        'name': 'Caramel Dream',
        'recepte': ['Karamellfüllung und eine zarte Karamellglasur'],
        'price': 2.50,
        'picture': './img/donut/donut_4.png',
    },

    {
        'name': 'Berry Blast',
        'recepte': ['Fruchtige Beerenfüllung mit einem Hauch von Zitrus'],
        'price': 2.00,
        'picture': './img/donut/donut_5.png',
    },

    {
        "name": "Peanut Butter",
        "recepte": ["Erdnussbutterfüllung mit einer Schicht Fruchtgelee oben drauf"],
        "price": 3.00,
        "picture": "./img/donut/donut_6.png"
    },
    {
        "name": "Tropical Paradise",
        "recepte": ["Mango- und Passionsfruchtfüllung, garniert mit Kokosraspeln"],
        "price": 2.50,
        "picture": "./img/donut/donut_7.png"
    },
]

let orderMenuArray = [];
let orderAmountArray = [];
let orderPriceArraySolo = [];
let orderPriceArrayTotal = [];
let deliverPrice = 3.50;
let minimumOrderValue = 15;

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
    <div class="menuStyle"> 
        <div class="menuStyleSub">
           <h3> ${element['name']} </h3> 
            <p>${element['recepte']}<p>
            <b> ${element['price'].toFixed(2)} € </b> <!-- .toFixed(2) lässt zwei hintere Dezimalzahl erscheinen! -->  
            <input class="inputStyle" id="amountID${i}" type="number" min="1" max ="99" value="1">                      
        </div> 
        <div class="dishInteract"> 
            <img class="cursor dishInteractButtonFromMenu" src="./img/minus.png" onclick="reduceAmount(${i})">
            
            <img class="productImgStyle" src="${element['picture']}" alt="${element['name']}">     

            <img class="cursor dishInteractButtonFromMenu" src="./img/plus.png" onclick="addToBasket(${i})"> 
        </div>
    </div>
    `;

    showBasketContainer();
}


function showBasketContainer() {
    document.getElementById('donutBasketContainerID').innerHTML = /*html*/`
    <div class="firstBasket" id="basketID" >
        <h2 class="headbasket"> Warenkorb </h2>
            <img src="./img/basketBigImg.png" class="basketBigStyleImg">
        <h2> Fülle deinen Warenkorb</h2>
             <span> Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</span>
    </div>
    <div class="secondBasket" id="secondBasketWithDeleteID">
        <div id="basketNoticeID"> </div>
        <div id="payButtonID"> </div>
    </div>
    `;
}


function reduceAmount(i) {
    let index = orderMenuArray.indexOf(menuArray[i].name);
    downNewAmount(index);
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


function getAmountFromInput(input) {
    let amountValue = +document.getElementById("amountID" + input).value;
    return amountValue;
}

function getMenuIndex(menu) {
    let indexOf = orderMenuArray.indexOf(menu);
    return indexOf;
}

function renderBasket() {
    let basket = document.getElementById('basketID');
    basket.innerHTML = '';
    for (let indexBasket = 0; indexBasket < orderMenuArray.length; indexBasket++) {
        basket.innerHTML += /*html*/ `
        <div class="dishInBasketContainer">
            <div class="disnInBasketContainer_2">
                <div class="dishInBasketHead">  
                    <div>
                        <span class="dishAmount"> ${orderAmountArray[indexBasket]} </span> <!--Gesamtanzahl-->
                        <span class="dishName"> ${orderMenuArray[indexBasket]}  </span> <!--Gericht--> 
                    </div>

                    <div>
                        ${orderPriceArrayTotal[indexBasket].toFixed(2)} € <!--Zwischenpreis-->   
                    </div>  
                </div>  

                <div class="dishInBasketAmount">   
                    <div class="dishInBasketAmountValue">
                        <img class="cursor dishInteractButtonFromBasket" src="./img/minus.png" onclick="downNewAmount(${indexBasket})"> 
                        <span> ${orderAmountArray[indexBasket]} </span>
                        <img class="cursor dishInteractButtonFromBasket" src="./img/plus.png" onclick="upNewAmount(${indexBasket})"> 
                    </div>
                    <div class="closeImg">
                        <img onclick="closeBasket(${indexBasket})" src="./img/close.png" class="cursor closeImg" >   
                    </div>
                </div>
            </div>
        </div> 
    `;
    }
}

function showBasketBill() {
    let = totalOrderSum = 0;
    for (let prices = 0; prices < orderPriceArrayTotal.length; prices++) {
        totalOrderSum += orderPriceArrayTotal[prices];
    }
    totalOrderAndDeliverPrice = totalOrderSum + deliverPrice;
    let bill = document.getElementById('payButtonID');
    bill.innerHTML = /*html*/ `
    <div class="basketBillContainer"> 
        <div class="basketBillContainerSubtotal">
            <span> Zwischensumme </span> 
            <span> ${totalOrderSum.toFixed(2)}€ </span> 
        </div>

        <div class="basketBillContainerDeliver">
            <span> Lieferkosten </span>
            <span> ${deliverPrice.toFixed(2)}€ </span>
        </div>

        <div class="basketBillContainerTotal">
            <span> Gesamtpreis </span>
            <span>  ${totalOrderAndDeliverPrice.toFixed(2)}€ </span>
        </div> 
    </div>
    `;
    showTotalMobileAmount();
    showTotalMobileSum();
}

function showTotalMobileAmount() {
    let = totalOrderAmount = 0
    for (let amounts = 0; amounts < orderAmountArray.length; amounts++) {
        totalOrderAmount += orderAmountArray[amounts]
    }
    let mobileTotalAmountID = document.getElementById('mobileTotalAmountID');
    mobileTotalAmountID.innerHTML = /*html*/ `
    <span class="mobileSumAmount"> ${totalOrderAmount}  </span>
   `
}

function showTotalMobileSum() {
    let = totalOrderSum = 0;
    for (let prices = 0; prices < orderPriceArrayTotal.length; prices++) {
        totalOrderSum += orderPriceArrayTotal[prices];
    }

    if (totalOrderSum > 1) { /* ohne diese If/Else Abfrage würde immer 3.50€ aufgrund von deliverPriceim TotalordeAnd... bleiben*/
        totalOrderAndDeliverPrice = totalOrderSum + deliverPrice;
        let mobileTotalSumID = document.getElementById('mobileTotalSumID');
        mobileTotalSumID.innerHTML = /*html*/ ` 
    <span>Warenkorb ${totalOrderAndDeliverPrice.toFixed(2)}€</span>
    `
    } else {
        let mobileTotalSumID = document.getElementById('mobileTotalSumID');
        mobileTotalSumID.innerHTML = /*html*/ ` 
        <span>Warenkorb </span>
        `
    }
}


function showBasketNotice(i) {
    let bill = document.getElementById('basketNoticeID');
    let stillToPay = 0;
    stillToPay = minimumOrderValue - totalOrderAndDeliverPrice;

    bill.innerHTML = /*html*/ `
    <div class="basketNoticeContainer"> 
        <div class="payOrderStyleNotice">  
            <div class="payOrderSpan"><span > 1. Der Mindestbestellwert liegt bei ${minimumOrderValue}€ <span id="checklistOrder_1"> </span> </span></div>
            <div class="payOrderSpan"><span> 2. Kostenloser Versand ab 25€ <span id="checklistFreeDeliver_2"> </span> </span></div>
            <div> 3. Gratis Donut Express T-Shirt ab 40€ </span> <span id="checklistForFree_1"> </span> </span></div>
        </div>
    </div>
    </div>
    <div class="payOrderStyle_1" id="payOrderID"> 
        <div> 
            <span> Benötigter Betrag, um dem Mindestbestellwert zu erreichen</span>
        </div>
        <div> 
            <b class="payOrderStillToPay"> ${stillToPay.toFixed(2)}€</b>
        </div>
    </div>
    `;
    calculateBasketNotice();
}

function calculateBasketNotice(index) {
    if (totalOrderAndDeliverPrice >= 15) {
        document.getElementById('payOrderID').innerHTML = /*html*/ `
        <div onclick="payment()" class="payOrderStyle_2"> BEZAHLEN </div>`;
        document.getElementById('checklistOrder_1').innerHTML = /*html*/ `
        <img class="correctImg" src="./img/correct.png"> `;
        var payOrderIDElement = document.getElementById('payOrderID');
        payOrderIDElement.setAttribute('style', 'background-color: white; margin-bottom: 0px; margin-top: 0px;'); /* Background Style von Bezahlen !!!! */
    }

    if (totalOrderAndDeliverPrice >= 25) {
        document.getElementById('checklistFreeDeliver_2').innerHTML = /*html*/ `
        <img class="correctImg" src="./img/correct.png"> `;
    }

    if (totalOrderAndDeliverPrice >= 40) {
        document.getElementById('checklistForFree_1').innerHTML = /*html*/ `
        <img class="correctImg" src="./img/correct.png"> `;
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
        renderBasket();
        showBasketBill();
        showBasketNotice();
    } else {
        closeBasket(index)
    }
}


function closeBasket(index) {
    let getMenuIndexOf = getMenuIndex(orderMenuArray[index]);

    if (getMenuIndexOf !== -1) {
        orderAmountArray.splice(getMenuIndexOf, 1);
        orderMenuArray.splice(getMenuIndexOf, 1);
        orderPriceArrayTotal.splice(getMenuIndexOf, 1);
        orderPriceArraySolo.splice(getMenuIndexOf, 1);
        renderBasket();
        showBasketBill();
    }

    if (window.innerWidth >= 1150 && orderAmountArray.length === 0) { /* Desktop Ansicht */
        let secondBasketWithDeleteID = document.getElementById('secondBasketWithDeleteID');
        secondBasketWithDeleteID.innerHTML = /*html*/`
        <div id="payButtonID"> </div>
        <div id="basketNoticeID"> </div>
        `;
        showBasketContainer();
    }

    if (window.innerWidth <= 1150 && orderAmountArray.length === 0) { /* Mobile Ansicht */
        document.getElementById('secondBasketWithDeleteID').innerHTML = '';
        closeMobileBasket();
        render();
    }
}

function showMobileBasket() {
    let hiddenMainContainer = document.getElementById("hiddenMainContainerID");
    let donutBasketContainer = document.getElementById("donutBasketContainerID");
    let backToPageButton = document.getElementById("backToPageID");
    let mobileOrderContainer = document.getElementById("mobileOrderContainerID");

    hiddenMainContainer.classList.add("d-none");  // Hauptseite verstecken 
    donutBasketContainer.classList.remove("donutBasketContainer"); // Warenkorb anzeigen
    backToPageButton.classList.add("visible"); // Zurück-Button anzeigen
    mobileOrderContainerID.classList.add("hidden"); // mobileOrderContainer verstecken

    backToPageButton.innerHTML = /*html*/ `
    <button onclick="showMobileBackToPage()" class="backToPageStyle">Zurück zur Hauptseite</button>
    `;
}

function showMobileBackToPage() {
    let hiddenMainContainer = document.getElementById("hiddenMainContainerID"); // Hauptseite anzeigen 
    let donutBasketContainer = document.getElementById("donutBasketContainerID"); // Warenkorb verstekcen
    let backToPageButton = document.getElementById("backToPageID"); // Zurück-Button verstecken
    let mobileOrderContainer = document.getElementById("mobileOrderContainerID"); // mobileOrderContainer anzeigen

    hiddenMainContainer.classList.remove("d-none");
    donutBasketContainer.classList.add("donutBasketContainer");
    backToPageButton.classList.remove("visible");
    backToPageButton.innerHTML = ''; // wichtig, damit Zeile geleert wird, da du in Zeile 354 niedergeschrieben hast
    mobileOrderContainerID.classList.remove("hidden"); // mobileOrderContainer anzeigen
}

function closeMobileBasket() {
    document.getElementById("hiddenMainContainerID").classList.remove("d-none"); /* lässt MainPage wieder anzeigen, da d-none entfernt wird */
    document.getElementById("donutBasketContainerID").classList.add("donutBasketContainer"); /* füge die Klasse mit enthaltene d-none wieder ein, d-none wie aktiviert = donutBasketContainer wird wieder ausgeblendet */
}



function payment() {

    alert("Donutastico dankt dir für deine Bestellung!");

    orderMenuArray = [];
    orderAmountArray = [];
    orderPriceArraySolo = [];
    orderPriceArrayTotal = [];
    deliverPrice = 3.50; /* System überträgt diesen Wert auf render (quasi Neustart von deliverPrice) ACHTUNG! Du darfst nicht schreiben wie bei den anderen "deliverPrice = []" du hast in Zeile  57 den deliverPrice als "FloatingNumber definiert und nicht als Array" */

    totalOrderSum = [];
    totalOrderAndDeliverPrice = [];
    totalOrderAmount = [];

    if (window.innerWidth >= 1150) {

    } else {
    showMobileBackToPage();
    }
    showTotalMobileSum();
    showTotalMobileAmount();
    render();

}
