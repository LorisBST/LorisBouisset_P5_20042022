// on récupère le local storage
let objetPanier = JSON.parse(localStorage.getItem("panier"));
let affichage = "";
let quantiteTotale = 0
let prixTotal = 0

// on récupère les informations de l'API
for (const produit of objetPanier) {
    //Fetch en fonction de l'id du produit
    fetch(`http://localhost:3000/api/products/${produit.id}`)
        .then(function (canap) {
            return canap.json();
        })
        .then(function (data) {
            function exec() {
                //differents affichages de la page
                quantiteTotale += produit.quantity;
                prixTotal += data.price * produit.quantity;
                affichage += `<article class="cart__item" data-id="${produit.id}" data-color="${produit.color}">
                    <div class="cart__item__img">
                    <img src="${produit.imageUrl}" alt="Photographie d'un canapé">
                    </div>
                    <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${produit.name}</h2>
                        <p>Couleur : ${produit.color}</p>
                        <p>Prix : ${data.price * produit.quantity} €</p>
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

                // suppression d'un produit du panier
                function supprimerProduit() {
                    const boutonSupprimer = document.querySelectorAll(".deleteItem");
                    for (let i = 0; i < boutonSupprimer.length; i++) {
                        boutonSupprimer[i].addEventListener("click", (event) => {
                            objetPanier.splice(i, 1);
                            localStorage.setItem("panier", JSON.stringify(objetPanier));
                            console.log(localStorage.setItem("panier", JSON.stringify(objetPanier)))
                            alert("Le produit a été supprimé du panier");
                            location.reload();
                        });
                    }
                }


                // on incrémente l'affichage
                document.getElementById("cart__items").innerHTML = affichage;
                document.getElementById("totalQuantity").innerHTML = quantiteTotale;
                document.getElementById("totalPrice").innerHTML = prixTotal;

                // Mise à jour du panier en temps réel
                const champsInput = document.querySelectorAll(".itemQuantity");
                for (let input of champsInput) {
                    input.addEventListener("change", (e) => {
                        // si le panier est inférieur a 1 ou supérieur a 100, retourne une erreur
                        if (e.target.value < 1 || e.target.value > 100) {
                            alert("Quantité invalide");
                            return
                        }

                        let dataPanier = e.path[4].dataset;
                        let panierFiltre = objetPanier.filter((produit) => produit.id === dataPanier.id && produit.color === dataPanier.color);
                        if (panierFiltre.length !== 0) {
                            panierFiltre[0].quantity = e.target.value;
                            panierFiltre[0].quantity = parseInt(e.target.value, 10);
                            objetPanier = objetPanier.filter((produit) => !(produit.id === dataPanier.id && produit.color === dataPanier.color));
                            objetPanier.push(panierFiltre[0]);
                            localStorage.setItem("panier", JSON.stringify(objetPanier));
                            window.location.reload();
                        }
                    })
                }
                supprimerProduit();
            }

            exec();
        })

}

