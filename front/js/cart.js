let objetPanier = JSON.parse(localStorage.getItem("panier"));
let affichage = "";
let quantiteTotale = 0
let prixTotal = 0

for (var produit of objetPanier) {
    quantiteTotale += produit.quantity
    prixTotal += produit.price * produit.quantity
    affichage += `<article class="cart__item" data-id="${produit.id}" data-color="${produit.color}">
<div class="cart__item__img">
  <img src="${produit.imageUrl}" alt="Photographie d'un canapé">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>${produit.name}</h2>
    <p>Couleur : ${produit.color}</p>
    <p>Prix : ${produit.price * produit.quantity} €</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Quantité :  </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produit.quantity}">
    </div>
    <div class="cart__item__content__settings__delete">
      <br><p class="deleteItem">Supprimer</p></br>
    </div>
  </div>
</div>
</article>`;
}

document.getElementById("cart__items").innerHTML = affichage;
document.getElementById("totalQuantity").innerHTML = quantiteTotale
document.getElementById("totalPrice").innerHTML = prixTotal