function menuTemplate(dish, index, objKey, i) {
    const price = dish.price.toFixed(2).replace('.', ',');
    return `
    <div class="dish-price-add-container dish-container"> 
            <div class="name-description-price">
                <div class="name-of-dish">${dish['name']}</div>
                <div class="description-of-dish">${dish['description']}</div>
                <div class="price-of-dish">${price}€</div>
            </div>
            <div class="img-plus-icon">
                <img onclick="putToShoppingBag(${i},'${objKey}', ${index})" class="plusicon" src="../img/icons/plus-icon.png" alt="Plus Zeichen zum hinzufügen von Produkten">
            </div>
    </div>
    `;
}

function emptyBagTemplate() {
    return `
    <div class="right"><!--right side-start-->
        <aside id="shopping-bag-container" class="shopping-bag">
                <div id="shoppingBag" class="empty-basket-container">
                    <img class="shopping-bag-icon" src="../img/icons/shopping-bag.png" alt="Shopping Bag Icon">
                    <span><b>Fülle deinen Warenkorb</b><br>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</span>
                </div>
                <div id="sum-container"></div>
        </aside>
    </div>
    `;
}

function shoppingBagContainerTemplate(name, amount, price, i) {
    return `
    <div class="one-product-container">
        <div class="shopping-bag-products">
            <div class="amount-of-dish-bag">${amount}</div>
            <div class="name-of-dish-bag">${name}</div>
            <div class="price-of-dish-bag">${price}€</div>
        </div>
        <div class="more-less-icons-container">
            <div><img onclick="chooseOneMore(${i})" class="choose-more-icon" src=../img/icons/plus-icon.png></div>
            <div><img onclick="chooseOneLess(${i})" class="choose-less-icon" src=../img/icons/minus-sign.png></div>
        </div>   
    </div>     
    `;
}

function sumContainerTemplate(totalSum, total, minOrder) {
    let totalSumBefore = (totalSum).toFixed(2).replace('.', ',');
    return `
    <div class="main-sum-container">
        <div class="left-sum-container">
            <div>Zwischensumme</div>
            <div>Lieferkosten</div>
            <div><b>Gesamt</b></div>
        </div>
        <div class="right-sum-container">
            <div>${totalSumBefore}€</div>
            <div>2,00€</div>
            <div><b>${total}€</b></div>
        </div>
    </div>
    <div id="min-order-value-container" class="min-order-value">
        Leider kannst du noch nicht bei Amalthea bestellen.<br>
        Der Mindestbestellwert liegt bei 20,00€ (exkl. Lieferkosten).<br>
        <b>Benötigter Betrag um den Mindestbestellwert zu erreichen: ${minOrder}€</b>
    </div>
    <button onclick="sendOrder(${total})" class="sum-btn">Bezahlen ${total}€</button>
    `;
}