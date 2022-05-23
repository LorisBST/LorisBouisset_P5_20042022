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


// Mise à jour du panier en temps réel
const champsInput = document.querySelectorAll(".itemQuantity")
for (let input of champsInput) {
  input.addEventListener("change", (e) => {
    if (e.target.value < 1 || e.target.value > 100) {
      alert("Quantité invalide");
      return
    }

    let dataPanier = e.path[4].dataset
    let objetPanier = JSON.parse(localStorage.getItem("panier"))
    let panierFiltre = objetPanier.filter((produit) => produit.id === dataPanier.id && produit.color === dataPanier.color)
    if (panierFiltre.length !== 0) {
      panierFiltre[0].quantity = e.target.value;
      objetPanier = objetPanier.filter((produit) => !(produit.id === dataPanier.id && produit.color === dataPanier.color))
      objetPanier.push(panierFiltre[0])
      localStorage.setItem("panier", JSON.stringify(objetPanier));
      window.location.reload();
    }

  })
}






// champInput.forEach(input => input.value)
// console.log(champInput)
// const quantiteInput = document.querySelector(".itemQuantity").value;
// champInput.forEach(() => {
//   document.querySelector(".itemQuantity").value;
// })
// let quantiteInput = document.querySelector('.itemQuantity').value // 