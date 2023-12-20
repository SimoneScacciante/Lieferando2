let menusArray = [
    {
        'name': 'Hamburger',
        'recepte': ['Tomatensoße', 'Salami', 'Käse', 'Peperoni'],
        'price': 10,
    },

    {
        'name': 'Pasta Carbonara',
        'recepte': ['Tomatensoße', 'Apfel'],
        'price': 7.5,
    },

    {
        'name': 'Pizza Salami',
        'recepte': ['Kartoffel', 'Curry', 'Ketchup'],
        'price': 15,
    },
]

let orderMenuArray = []
let orderPriceArray = []
let orderAmountArray = []

function render() {
    let menuID = document.getElementById('menuID');
    menuID.innerHTML = '';

    for (let i = 0; i < menusArray.length; i++) {
        menuLoad(i);
    }
}

function menuLoad(i) {
    let menuID = document.getElementById('menuID');
    const element = menusArray[i]

    menuID.innerHTML += /*html*/`
    <div>
        Name: ${element['name']} <br>
        Zutaten: ${element['recepte']} <br>
        Preis: ${element['price']} €  <br> 
        Anzahl: ${orderAmountArray[i]} <br>
        Bestellung: 
        <input id="amountID${i}" type="number" min="1" max ="10" value="1"><br> 
        <button onclick="addToBasket(${i})"> Kaufen </button> 
    <br> <br> <br>   
    </div> 
`
}


function addToBasket(index) {
<<<<<<< HEAD
    /* let amount = getAmountFromInput(index);*/
    const menuArrayIndex = menusArray[index]; // nun bekommt "menusArray" jedes einzelene Gericht (Json-String Abschnitt inner {}-Klammer) eine Index-Position
    let OrderName = getMenuIndex(menuArrayIndex['name']);
=======
    let amount = getAmountFromInput(index);
    const menu = menusArray[index]; // nun bekommt "menusArray" jedes einzelene Gericht (Json-String Abschnitt inner {}-Klammer) eine Index-Position
    let orderBasket = getMenuIndex(orderMenuArray['name']);

    if (orderMenuArray == -1) {
        orderMenuArray.push(orderBasket)
    } else {
        
    }
>>>>>>> 26061b22c72ffdb267424416c00968004576145f

    if (OrderName === -1) {
        orderMenuArray.push(menuArrayIndex['name']);
        orderPriceArray.push(menuArrayIndex['price']);
    } else {
        document.getElementById('TestID').innerHTML += `Name bereits vorhanden!`
    }
    renderBasket();
}

<<<<<<< HEAD
function getMenuIndex(menu) {
    let indexOf = orderMenuArray.indexOf(menu);
    return indexOf;
}

function renderBasket() {
    let basket = document.getElementById('basket');
    basket.innerHTML = '';

    for (let k = 0; k < orderMenuArray.length; k++) {

        basket.innerHTML = /*html*/ `
       <div> 
            ${orderMenuArray[k]}  <br>
           Preis: ${orderPriceArray[k]} <br>  
           Anzahl: ${orderAmountArray[k]} <br>
       </div>
        `;
    }
}


/*
=======
function getMenuIndex (menu) {
    let indexOf = orderMenuArray.IndexOf(menu);
    return indexOf;
}


>>>>>>> 26061b22c72ffdb267424416c00968004576145f
function getAmountFromInput(input) {
    let amountValue = +document.getElementById('amountID', input).value; //hier greift auf "amountID" und verknüpfung mit  Index-Wert
    return amountValue;
}
<<<<<<< HEAD
*/
=======

>>>>>>> 26061b22c72ffdb267424416c00968004576145f
