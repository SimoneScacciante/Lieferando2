function renderIfBasketFull(dish, price, i, countClass, count) {
    return `
        <div class="singleDish">
            <div class="dishDiscription">
                <h3>${dish["dish"]}</h3>
                <span>${dish["description"]}</span>
                <h3>${price} €</h3>
            </div>
            <div class="dishInteract">
            <img class="productImage" src="${dish["image"]}" alt="Produktbild ${dish["dish"]}" />
            <button class="addDishButton" onclick="addToBasket(${i})">
            <span id="noCount" class="${countClass}">${count}</span>
     
            </button>
            </div>
        </div>
    `;
}

function renderIfBasketEmpty(dish, price, i) {
    return /*html*/ `
    <div class="singleDish">
        <div class="dishDiscription">
            <h3>${dish["dish"]}</h3>
            <span>${dish["description"]}</span>
            <h3>${price} €</h3>
        </div>
        <div class="dishInteract">
            <img class="productImage" src="${dish["image"]}" alt="Produktbild ${dish["dish"]}" />
            <button class="addDishButton" onclick="addToBasket(${i})">
            <span id="noCount" class="material-symbols-outlined">add</span>
            </button>
        </div>
    </div>
`;
}

function renderBasketDefaul(amount, dish, price, i) {
    return /*html*/ `
    <div class="dishInBasket">
        <div class="dishInBasketHead">
            <div>
                <span class="dishAmount">${amount}</span>
                <span class="dishName">${dish}</span>
            </div>
            <span>${price} €</span>
        </div> 
        <div class="editAmount">   
            <button onclick="reduceAmount(${i})">
                <span class="material-symbols-outlined">remove</span>
            </button>
            <span>${amount}</span>
            <button onclick="addAmount(${i})">
                <span class="material-symbols-outlined">add</span>
            </button>
        </div>
    </div>
`;
}

function renderBasketNotMinPrice(
    missingSumToOrder,
    minOrder,
    sumPrice,
    totalPrice
) {
    return /*html*/ `
    <div class="minOrder">
      <span>  
          Benötigter Betrag, um dem <br>
          Mindstbestellwert zu erreichen
      </span>
      <span> ${missingSumToOrder} € </span>
    </div>
  <span class="minOrderDiscription">
      Leider kannst du noch nicht bestellen. Donut Express <br>
      liefert erst ab einem Mindestbestellwert von ${minOrder} € <br>
      (exkl. Lieferkosten).
  </span>
  <div class="billSummary">
  <div class="sumBasket">
      <span>Zwischensumme</span>
      <span>${Number(sumPrice).toFixed(2)} €</span>
    </div>
    <div class="totalSumBasket">
      <span>Gesamt</span>
      <span>${totalPrice} €</span>

    </div>
<button class="disabledButton" disabled>Bezahlen (${totalPrice} €)</button>
<button onclick="closeMobileBasket()" class="buySmthButton">Weitere Produkte hinzufügen</button>
</div>
  `;
}

function renderBaskteMinPrice(sumPrice, deliverFee, totalPrice) {
    return /*html*/ `
    <div class="billSummary">
    <div class="sumBasket">
      <span>Zwischensumme</span>
      <span>${Number(sumPrice).toFixed(2)} €</span>
    </div>
    <div class="sumBasket">
      <span>Lieferkosten</span>
      <span>${Number(deliverFee).toFixed(2)} €</span>
    </div>
    <div class="totalSumBasket">
      <span>Gesamt</span>
      <span>${totalPrice} €</span>

    </div>

      <button class="buyButton" onclick="orderSent()">Bezahlen (${totalPrice} €)</button>
  </div>
  `;
}

function renderBasketBuyButton(sumAmount, totalPrice) {
    return /*html*/ `
<div class="hideMobileOrder hideWhenClicked" id="hideMobileOrder">
    <div class="mobileOrder">
        <button onclick="showBasket()" class="mobileOrderButton">
            <div class="amountInBasket">
            <span class="sumAmount">${sumAmount}</span>
            <span class="material-symbols-outlined">shopping_basket</span>
            </div>
            <span>Warenkorb (${totalPrice} €)</span>
        </button>
    </div>
    </div>
`;
}

function renderBasketEmpty() {
    return /*html*/ `
    <div id="emptyBasket">
    <img src="img/icons8-paper-bag-64.png" alt="Warenkorb Icon" />
    <h2>Füllen deinen Warenkorb</h2>
    <span>
      Füge einige leckere Gerichte aus der <br />
      Speisekarte hinzu und bestelle dein Essen.
    </span>
    <button class="emptyBasketButton" onclick="closeMobileBasket()">Füge Artikel hinzu</button>
  </div>
`;
}