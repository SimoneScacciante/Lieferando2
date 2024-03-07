let menuArray = [
    {
        'name': 'Donut - Classic',
        'recepte': ['mit Vollmilch Schokoladenglasur'],
        'price': 2.00,
    },

    {
        'name': 'Donut Glitter Glam',
        'recepte': ['Glitzernde Glasur, funkelnde Zuckerperlen'],
        'price': 2.50,
    },

    {
        'name': 'Donut - Rainbow Delight',
        'recepte': ['Fruchtige Füllungen und einer Explosion von Regenbogenfarben'],
        'price': 3.50,
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
    <div class="menuStyle"> 
        <div>
           <h3> ${element['name']} </h3> 
             ${element['recepte']} 
            <!--ENTFERNE!!! --><input id="amountID${i}" type="number" min="1" max ="10" value="1"><br>
            <b> ${element['price']} € </b>                         
         </div> 

        <div class="dishInteract"> 
            <img class="cursor dishInteractButtonFromMenu" src="./img/minus.png" onclick="reduceAmount(${i})">
            <img src="./img/donut_1.png" class="productImgStyle">
             <img class="cursor dishInteractButtonFromMenu" src="./img/plus.png" onclick="addToBasket(${i})"> 
        </div>
    </div>
`}

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

                <div class="dishInBasketHead">  
                    <div>
                        <span class="dishAmount"> ${orderAmountArray[indexBasket]} </span> <!--Gesamtanzahl-->
                        <span class="dishName"> ${orderMenuArray[indexBasket]}  </span> <!--Gericht--> 
                    </div>

                    <div>
                        ${orderPriceArrayTotal[indexBasket]} € <!--Zwischenpreis-->   
                    </div>  
                </div> <br>   

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
            <br>


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
    <div class="basketBillContainer"> 

        <div class="test1">
            <span> Zwischensumme </span> 
            <span> ${totalOrderSum}€ </span> 
        </div>

        <div class="test2">
            <span> Lieferkosten </span>
            <span> ${deliverPrice}€ </span>
        </div>

        <div class="test3">
            <span> Gesamtpreis </span>
            <span>  ${totalOrderAndDeliverPrice}€ </span>
        </div> 

    </div>
    `;
}

function showBasketNotice(i) {
    let bill = document.getElementById('basketNoticeID');
    bill.innerHTML = /*html*/ `

    <div class="basketNoticeContainer"> 

        <div class="payOrderStyleNotice">  
                1. Der Mindestbestellwert liegt bei 10€  <div id="checklistOrder_1"> </div> <br>
                2. <span> Ab 25€ Bestellwert ist die Lieferung kostenlos </span> <div id="checklistFreeDeliver_2"> </div> <br>
                3. <span> Ab 40€ Bestellwert gibt's ein Donut Express T-Shirt gratis! </span> <div id="checklistForFree_1"> </div>
        </div>
    </div>

    </div>
        <div class="payOrderStyle" id="payOrderID"> 
            <div> 
                <span> Benötigter Betrag, um dem Mindestbestellwert zu erreichen</span>
            </div>
            <div> 
                <b class="test5"> 8.50€ </b>
            </div>
        </div> 
    </div>

    `;
    calculateBasketNotice();
}



function calculateBasketNotice(index) {
    if (totalOrderAndDeliverPrice >= 10) {
        document.getElementById('payOrderID').innerHTML = /*html*/ `
        <div> BEZAHLEN </div>`;
        document.getElementById('checklistOrder_1').innerHTML = /*html*/ `
        <img src="./img/correct.png"> `;
    }

    if (totalOrderAndDeliverPrice >= 25) {
        document.getElementById('checklistFreeDeliver_2').innerHTML = /*html*/ `
        <img src="./img/correct.png"> `;
    }

    if (totalOrderAndDeliverPrice >= 40) {
        document.getElementById('checklistForFree_1').innerHTML = /*html*/ `
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

    if (orderAmountArray.length === 0) {
        let secondBasketWithDeleteID = document.getElementById('secondBasketWithDeleteID');
        secondBasketWithDeleteID.innerHTML = `
        <div id="basketBillID"> </div>
        <div id="basketNoticeID"> </div>
        `;
    }
}

// Basket Style komplett machen
// jedes Product Donut bild Einzeln darstellen
// menu array entferne h3 aus Array
// Test
