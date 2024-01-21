// DATA BASE
const partnerInfos = {
    partner: "La Sphagettata",
    logo: "./img/svg/logo_lasphagettata.svg",
    lieferkosten: 2.0,
    mindestbestellwert: "30",
    stars: 2.6,
    ratingPeople: 825,
    description: "Hol dir mit unseren leckeren Pasta-Gerichten die Erinnerung des letzen Italien-Urlaubes nach Hause. <br>Nach alter Tradition hausgemacht - Schmeckt wie bei unserer Mama.",

    categoryPoints: [{
            catName: "Pasta",
            moodIMG: "./img/pasta.jpg",
            dish: [{
                    dishID: 1,
                    dishName: "Spagetti Napoli",
                    description: "mit Tomaten und Parmesan",
                    ingredient: "Spagetti No.5 aus Hartweizengrieß, italienischer Hartkäse, frische Tomaten, Zugo, Basilikum, Zwiebeln, Knoblauch",
                    allergenic: "Gluten, Kuhmilch, Nüsse",
                    additive: "",
                    unitPrice: 10,
                    popular: true,
                    foto: "",
                },
                {
                    dishID: 2,
                    dishName: "Penne Arrabiata",
                    description: "mit Tomaten,Chili und Knoblauch",
                    ingredient: "Penne aus Hartweizengrieß, frische Tomaten, Zugo,Knoblauch,Peperoni,Chili-Öl",
                    allergenic: "Gluten",
                    additive: "Sscharf",
                    unitPrice: 11,
                    popular: false,
                    foto: "",
                },
                {
                    dishID: 3,
                    dishName: "Parpadelle Primavera",
                    description: "mit Zucchini,Erbsen und Schinken",
                    ingredient: "Parpadelle aus Hartweizengrieß, Schinken, Zuccini,Erbsen, Zugo, Knoblauch",
                    allergenic: "Gluten, E209",
                    additive: "Schweinefleisch",
                    unitPrice: 10.5,
                    popular: false,
                    foto: "",
                },
            ],
        },
        {
            catName: "Antipasti",
            moodIMG: "./img/minestrone.jpg",
            dish: [{
                    dishID: 4,
                    dishName: "Antipasti dela Casa",
                    description: "verschiedene hausgemachte Vorspeisen und Brot",
                    ingredient: "gebratene Zucchini- und Auberginen-Scheiben, gefüllte Pilze, eingelegte Paprika, italienisches Weißbrot",
                    allergenic: "Gluten, E209",
                    additive: "Kuhmilch, Ei",
                    unitPrice: 8,
                    popular: false,
                    foto: "",
                },
                {
                    dishID: 5,
                    dishName: "Minestrone",
                    description: "italienische Gemüse-Suppe mit Brot",
                    ingredient: "Gemüse der Saison, Knoblauch,Rosmarin,Estragon, italienisches Weißbrot",
                    allergenic: "Gluten",
                    additive: "",
                    unitPrice: 6,
                    popular: false,
                    foto: "",
                },
            ],
        },
        {
            catName: "Dolce",
            moodIMG: "./img/tiramisu.jpg",
            dish: [{
                    dishID: 6,
                    dishName: "Tiramisu",
                    description: "traditionelle italienische Nachspeise",
                    ingredient: "Maskarpone, Espresso, Bisquit, Schokoflocken",
                    allergenic: "Kuhmilch",
                    additive: "",
                    unitPrice: 5.5,
                    popular: true,
                    foto: "",
                },
                {
                    dishID: 7,
                    dishName: "Panna Cotta",
                    description: "italienische Creme",
                    ingredient: "",
                    additive: "",
                    unitPrice: 4,
                    popular: false,
                    foto: "",
                },
            ],
        },
    ],
};

/*let d = 0; // index dish
let i = 0;*/

const partnernames = partnerInfos.partner;
const infos = partnerInfos.description;
const categorys = partnerInfos.categoryPoints;
const logo = partnerInfos.logo;
let lieferkosten = partnerInfos.lieferkosten;
const mindestbestellwert = partnerInfos.mindestbestellwert;
const rate = partnerInfos.stars;
const ratingPeople = partnerInfos.ratingPeople;

// RESTAURANT Informationen werden gerendert
function loadPartnerInfos() {
    let top = document.getElementById("partnerInfo");

    top.innerHTML = `
     <div id="partnerLogo"><img src="${logo}" class="partnerLogoIMG"></div>  
     <h2>${partnernames}</h2>
     <div id="relative">
        <div id="yello" class="absolut"></div>
        <div id="stars" class="absolut"></div>
      </div>
     <p>${infos}</p>  
     `;
    //addCosts();
    loadNav();
    loadMenu();
    loadStars();
    updateSize();
    window.addEventListener("resize", updateSize);
}

// NAVIGATION überhalb der Gerichte wird gerendert
function loadNav() {
    let nav = document.getElementById("nav");
    nav.innerHTML = filterPopular();

    for (let c = 0; c < categorys.length; c++) {
        let catNav = categorys[c].catName;
        nav.innerHTML += ` 
        <a href="#cat${c}"><div class="navItems"><strong>${catNav}</strong></div></a>
        `;
    }
}

function loadStars() {
    let bewertung = document.getElementById("stars");

    for (let i = 0; i < 5; i++) {
        bewertung.innerHTML += `
     <img src="./img/star_empty_inside.png" class="star">
     `;
    }
    loadYelloBar();
    bewertung.innerHTML += `
  <div class="rate">
  ${rate}&nbsp;(${ratingPeople})</div>
  `;
}

function loadYelloBar() {
    let percentageRate = (rate * 100) / 5;
    let percentageWidth = (percentageRate * 80) / 100;
    let yelloBar = document.getElementById("yello");
    yelloBar.style.width = percentageWidth + "px";
}

function filterPopular() {
    return /*html*/ ` 
        <a href="#catPopular"><div class="navItems"><strong>Popolare</strong></div></a>
        `;
}

// ALLE GERICHTE & die KATEGORIEN werden gerendert
function loadMenu() {
    let menuPoints = document.getElementById("menuSection");

    for (let c = 0; c < categorys.length; c++) {
        let categoryName = categorys[c].catName;
        let mood = categorys[c].moodIMG;
        menuPoints.innerHTML += returnMenuPoints(`${categoryName}`, `${c}`);

        document.getElementById(`mood${c}`).style.backgroundImage = `url(${mood})`;

        for (let d = 0; d < categorys[c].dish.length; d++) {
            let dishes = categorys[c].dish[d].dishName;
            let descriptions = categorys[c].dish[d].description;
            let id = categorys[c].dish[d].dishID;
            let unitPrices = categorys[c].dish[d].unitPrice;
            let dishDIV = document.getElementById(`cat${c}`);

            dishDIV.innerHTML += returnDISH(
                `${dishes}`,
                `${unitPrices}`,
                `${id}`,
                `${descriptions}`
            );
        }
    }
}

function returnMenuPoints(categoryName, c) {
    return /*html*/ `
    <div id="cat${c}">
        <div id="mood${c}" class="dishItem mood"></div>
        <strong><h3>${categoryName}</h3></strong>
    </div>
    `;
}

function returnDISH(dishes, unitPrices, id, descriptions) {
    return /*html*/ `
    <div id="dish${id}" class="dishItem dishHover" onclick="onAddDish('${dishes}','${id}','${unitPrices}')">
        <h4>${dishes}</h4>
        <p class="dishDescription">${descriptions}</p>
        <h4>${unitPrices}&nbsp;&euro;</h4>
        <div class="addICON"></div>
    </div>
    `;
}
let addDish = [];
let addDishId = [];
let addAmount = [];
let sumPrices = [];
let addUnitPrices = [];
let popular = [];

function onAddDish(dishes, id, unitPrices) {
    let index = getDishIndex(`${dishes}`);
    let unitPrice = addUnitPrices[index];
    console.log(index);

    if (index >= 0) {

        oneMoreDish(`${unitPrice}`, index);
        renderDishesOnCart(`${unitPrice}`);
    } else {

        onlyOneDish(`${dishes}`, `${unitPrices}`, `${id}`);
        renderDishesOnCart(`${unitPrices}`);
    }

    getSubTotal();
}

function onDeleteDish(dishes, id) {
    let index = getDishIndex(`${dishes}`);
    let unitPrice = addUnitPrices[index];
    console.log(index);

    if (index >= 0) {
        oneLessDish(`${unitPrice}`, index);
        renderDishesOnCart(`${unitPrice}`);
    } else {

        deleteLastDish(`${dishes}`, id);

    }

    getSubTotal();
}

function oneMoreDish(unitPrice, index) {
    addAmount[index]++;
    let countPrices = getPriceFromMenu(`${unitPrice}`, `${addAmount[index]}`);

    sumPrices.fill(countPrices, index, index + 1);
    console.log(addDish, addDishId, addAmount, sumPrices);
}

function oneLessDish(unitPrice, index) {
    addAmount[index]--;
    let countPrices = getPriceFromMenu(`${unitPrice}`, `${addAmount[index]}`);

    sumPrices.fill(countPrices, index, index + 1);
    console.log(addDish, addDishId, addAmount, sumPrices);
}

function onlyOneDish(dishes, unitPrice, id) {
    addDishId.push(`${id}`);
    addDish.push(`${dishes}`);
    addAmount.push(1);
    sumPrices.push(`${unitPrice}`);
    addUnitPrices.push(`${unitPrice}`);
    console.log(addDish, addDishId, addAmount, sumPrices);
    renderDishesOnCart();
}

function deleteLastDish(dishes) {
    let index = getDishIndex(`${dishes}`);


    if (index > -1) {

        addDishId.splice(index, 1);
        addDish.splice(index, 1);
        addAmount.splice(index, 1);
        sumPrices.splice(index, 1);
        addUnitPrices.splice(index, 1);
        let totalcost = document.getElementById("totalCosts");
        let discount = document.getElementById("discountDescription");
        totalcost.innerHTML = "";
        discount.innerHTML = "";

    } else {
        currentValue = 0;

    }
    getSubTotal();
    renderDishesOnCart();

    console.log(addDish, addDishId, addAmount, sumPrices);
}

function getPriceFromMenu(unitPrice, addAmount) {
    let price = parseFloat(unitPrice) * parseFloat(addAmount);
    //let priceNum = parseFloat(price);

    return price;
}

function getDishIndex(dishes) {
    return addDish.indexOf(`${dishes}`);
}

function renderDishesOnCart() {
    let cart = document.getElementById("orderList");
    cart.innerHTML = "";

    for (i = 0; i < addDish.length; i++) {

        let dishes = addDish[i];
        let id = addDishId[i];
        let Prices = +`${sumPrices[i]}`;
        let dishCount = addAmount[i];
        let linePrices = +`${Prices}`;

        let oneDecimalPlace = linePrices.toFixed(1);
        let roundedPrice = oneDecimalPlace.replace(".", ",");
        let existingDish = document.getElementById(id);
        if (dishCount === 0) {
            deleteLastDish(`${dishes}`);
        } else {
            if (dishCount !== 0 || existingDish === 0) {
                cart.innerHTML += `
                    <div id="${id}" class="billline"></div>
                `;
                returnBillline(`${dishes}`, id, dishCount, `${roundedPrice}`);
            } else {
                returnBillline(`${dishes}`, id, dishCount, `${roundedPrice}`);
            }
        }
    }
}

function returnBillline(dishes, id, dishCount, roundedPrice) {
    document.getElementById(`${id}`).innerHTML = `   

<div id="moreless"><img src="./img/svg/minus.png" class="moreless" onclick="onDeleteDish('${dishes}',${id},${dishCount})"><img src="./img/svg/plus.png" class="moreless" onclick="onAddDish('${dishes}',${id})"></div>
  <div class="dishAmount">${dishCount}</div><div class="dishNameOnCart">${dishes} </div><div class="dishPriceOnCart">${roundedPrice} €</div><img src="./img/svg/close.png" class="icon" onclick="deleteBillline(${id},'${dishes}')"></img>

      `;
}

function deleteBillline(id, dishes) {
    let billline = document.getElementById(`${id}`);
    billline.remove();
    deleteLastDish(`${dishes}`);
}

function getSubTotal() {
    let subtotal = document.getElementById("totalCosts");
    let numberSumPrices = sumPrices.map(parseFloat);

    const sumSubTotal = numberSumPrices.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    );

    let payButton = document.getElementById("total");

    if (sumSubTotal !== 0) {
        let payButton = document.getElementById("total");
        let oneDecimalPlace = sumSubTotal.toFixed(1);
        let roundedPrice = oneDecimalPlace.replace(".", ",");

        subtotal.innerHTML = renderSubtotal(`${roundedPrice}`, sumSubTotal);

        let billLFH = document.getElementById("billLFH");
        billLFH.classList.remove("displayNone");

        if (sumSubTotal < 30) {
            let payButton = document.getElementById("total");
            payButton.classList.add("inactiveButton");
            payButton.innerHTML = "Mindest-Bestellwert ist noch nicht erreicht";
        } else if (sumSubTotal > 29.99 && sumSubTotal < 50) {
            payButton.classList.remove("inactiveButton");
            MBW30();
        } else if (sumSubTotal > 49.99 && sumSubTotal < 80) {
            payButton.classList.remove("inactiveButton");
            MBW30();
            LFH50();
        } else if (sumSubTotal > 79.99) {
            payButton.classList.remove("inactiveButton");
            MBW30();
            LFH50();
            ONT80();
        }
    } else {
        subtotal.innerHTML = "";
        payButton.classList.add("displayNone");
    }
}

function MBW30() {
    // Mindest-BESTELLWERT 30 Euro erreicht
    let MBW = document.getElementById("MBW");
    MBW.classList.remove("inactive");
    MBW.innerHTML = `Mindest-Bestellwert ist erreicht. <img class="correct" src="./img/svg/correct.png">
  `;
}

function LFH50() {
    // LIEFERUNG Frei Haus ab 50 Euro

    let LFH = document.getElementById("LFH");
    LFH.classList.remove("inactive");
    LFH.innerHTML = `Bestellwert von 50 € für die Lieferung "frei Haus" ist erreicht <img class="correct" src="./img/svg/correct.svg">
`;
}

function ONT80() {
    // WEIN ON TOP & Keine Lieferkosten ab 80
    roundedLieferkosten = lieferkosten - lieferkosten;
    let billONT = document.getElementById("billONT");
    billONT.classList.remove("displayNone");
    let ONT = document.getElementById("ONT");
    ONT.classList.remove("inactive");
    ONT.innerHTML = `Eine Flasche unseres hervorragenden Weins wird dem Warenkorb kostenlos hinzugefügt <img class="correct" src="./img/svg/correct.svg">
  `;
}

function renderSubtotal(roundedPrice, sumSubTotal) {
    let oneDecimalLieferkosten = lieferkosten.toFixed(1);
    let roundedLieferkosten = oneDecimalLieferkosten.replace(".", ",");
    if (sumSubTotal > 49.99) {
        oneDecimalLieferkosten = 0.0;
        roundedLieferkosten = "0,0";
    }
    let total = parseFloat(sumSubTotal) + parseFloat(oneDecimalLieferkosten);
    let oneDecimalPlace = total.toFixed(1);
    let roundedTotal = oneDecimalPlace.replace(".", ",");

    renderButton(`${roundedTotal}`);
    renderDiscountDescription();

    return /*html*/ `
  <div id="discountNumbers">
  <div id="subtotal" class="billline"><h4>Subtotal</h4><h4>${roundedPrice}&nbsp;€</h4></div>
  <div id="billLFH" class="discountline"><div>Lieferkosten</div><div id="lieferkosten">${roundedLieferkosten}&nbsp;€</div></div>
  <div id="billONT" class="discountline displayNone"><div>1 Flasche Wein gratis</div><div>0,0&nbsp€</div></div>
</div>
  `;
}

function renderButton(roundedTotal) {
    let button = document.getElementById("button");

    button.innerHTML = `
    <button id="total" class="payButton">Bezahlen: <span id="payTotal">${roundedTotal}&nbsp;€</span></button> 
  `;
}

function renderDiscountDescription() {
    let discount = document.getElementById("discountDescription");

    discount.innerHTML = `

  <div id="discount" class="discount">
  <ul>
        <li id="MBW" class="inactive">Der Mindestbestellwert liegt bei ${mindestbestellwert}&nbsp;€.</li>
        <li id="LFH" class="inactive">Bei einem Bestellwert ab 50 € ist die Lieferung frei Haus</li> 
        <li id="ONT" class="inactive">Bei einem Bestellwert ab 80 € bekommen Sie eine Flasche erlesenen Qualitätswein gratis dazu</li>
</ul>
  </div>
  `;
}

function updateSize() {
    let theWidth = window.innerWidth;
    showArrows(`${theWidth}`);
}

function showArrows(theWidth) {
    const divVisible = document.getElementById("arrowBox");
    if (`${theWidth}` < 600) {
        divVisible.classList.remove("displayNone");
    } else {
        divVisible.classList.add("displayNone");
        document.getElementById("collapsible").classList.remove("displayNone");
        document.getElementById("totalCosts").classList.remove("displayNone");
        document
            .getElementById("discountDescription")
            .classList.remove("displayNone");
    }
}

function toggleArrows() {
    let imgChange = document.getElementById("arrowIMG").classList;
    const toggled = imgChange.toggle("rotateArrowUp");
    let dishLines = document.getElementById("collapsible").classList;
    let toggledDishLines = dishLines.toggle("displayNone");
    let DiscountLines = document.getElementById("totalCosts").classList;
    let toggledDiscountLines = DiscountLines.toggle("displayNone");
    let Discount = document.getElementById("discountDescription").classList;
    let toggledDiscount = Discount.toggle("displayNone");
    return toggled && toggledDishLines && toggledDiscountLines && toggledDiscount;
}