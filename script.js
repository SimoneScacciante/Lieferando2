let menuArray = [
    {
        'name': '<h3>Donut - Classic</h3>',
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
            ${element['name']} 
             ${element['recepte']} 
             ${element['price']} €  <br> 
            Bestellung: <input id="amountID${i}" type="number" min="1" max ="10" value="1"><br>
                                         
         </div> 

        <div> 
            <img class="cursor" src="./img/minus.png" onclick="reduceAmount(${i})">
            <img src="./img/donutSoloImg.png" class="donutSoloImgStyle">
             <img class="cursor" src="./img/plus.png" onclick="addToBasket(${i})"> 
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
            <div> 
                <div class="basketContainerStyle"> 
                    ${orderAmountArray[indexBasket]} <!--Gesamtanzahl-->${orderMenuArray[indexBasket]}  <!--Gericht--> ${orderPriceArrayTotal[indexBasket]} € <!--Zwischenpreis-->     <img onclick="closeBasket(${indexBasket})" src="./img/close.png" class="cursor" >
                            <br>         
                    <img class="cursor" src="./img/minus.png" onclick="downNewAmount(${indexBasket})"> 
                         ${orderAmountArray[indexBasket]} 
                    <img class="cursor" src="./img/plus.png" onclick="upNewAmount(${indexBasket})"> 
                </div>
            </div> <br>
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
        <h2>Zwischensumme ${totalOrderSum}€ </h2> 
        <h2>Lieferkosten ${deliverPrice}€ </h2>
        <h1>Gesamtpreis ${totalOrderAndDeliverPrice}€</h1> 

    </div>
    `;
}

function showBasketNotice(i) {
    let bill = document.getElementById('basketNoticeID');
    bill.innerHTML = /*html*/ `
    <div class="basketNoticeContainer"> 
        <div class="payOrderStyle" id="payOrderID"> 
        <span> Mindest-Bestellwert ist noch nicht erreicht</span>
        </div> 

        <div class="payOrderStyleNotice">  
             1. Der Mindestbestellwert liegt bei 10 € <div id="checklistOrder_1"> </div> <br>
             2. Bei einem Bestellwert ab 25€ ist die Lieferung frei Haus <div id="checklistFreeDeliver_2"> </div> <br>
             3. Bei einem Bestellwert ab 40€ bekommen Sie eine Flasche erlesenen Qualitätswein gratis dazu <div id="checklistVineForFree_1"> </div> <br>
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
        let basketNoticeDeleteID = document.getElementById('basketNoticeDeleteID');
        basketNoticeDeleteID.innerHTML = `
        <div id="basketBillID"> </div>
        <div id="basketNoticeID"> </div>
        `;
    }
}
