// on récupère le local storage
let objetPanier = JSON.parse(localStorage.getItem("panier"));
let affichage = "";
let quantiteTotale = 0
let prixTotal = 0

// affichage si le panier est vide

function panierVideCommande() {
    if (window.localStorage.length === 0) {
        document.getElementsByTagName("h1")[0].innerHTML = "Votre panier est vide."
        document.getElementsByClassName("cart__price")[0].innerHTML = ""
        document.getElementsByClassName("cart__order")[0].innerHTML = ""
        return
    }
}
panierVideCommande()

function panierVide() {
    if (objetPanier == 0){
        document.getElementsByTagName("h1")[0].innerHTML = "Votre panier est vide."
        document.getElementsByClassName("cart__price")[0].innerHTML = ""
        document.getElementsByClassName("cart__order")[0].innerHTML = ""
    }
}
panierVide();



// } else if (window.localStorage.length > 0){
//     document.getElementsByTagName("h1")[0].innerHTML = "Votre panier est vide."
//     document.getElementsByClassName("cart__price")[0].innerHTML = ""
//     document.getElementsByClassName("cart__order")[0].innerHTML = ""

// on récupère les informations de l'API
for (const produit of objetPanier) {
    //Fetch en fonction de l'id du produit
    fetch(`http://localhost:3000/api/products/${produit.id}`)
        .then(function (canap) {
            return canap.json();
        })
        .then(function (data) {
            function exec() {
                //différents affichages de la page
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
                function supprimerObjet() {
                    const boutonSupprimer = document.querySelectorAll(".deleteItem");
                    for (let i = 0; i < boutonSupprimer.length; i++) {
                        boutonSupprimer[i].addEventListener("click", (event) => {
                            objetPanier.splice(i, 1);
                            localStorage.setItem("panier", JSON.stringify(objetPanier));
                            console.log(localStorage.setItem("panier", JSON.stringify(objetPanier)))
                            alert("Le produit a été supprimé du panier");
                            window.location.reload();
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

                        let dataPanier = e.path[4].dataset; // on récupère la valeur dans l'input
                        let panierFiltre = objetPanier.filter((produit) => produit.id === dataPanier.id && produit.color === dataPanier.color);
                        if (panierFiltre.length !== 0) {
                            panierFiltre[0].quantity = e.target.value; // mise a jour de la valeur dans le panier
                            panierFiltre[0].quantity = parseInt(e.target.value, 10); // transformation de la valeur en nombre
                            objetPanier = objetPanier.filter((produit) => !(produit.id === dataPanier.id && produit.color === dataPanier.color));
                            objetPanier.push(panierFiltre[0]);
                            localStorage.setItem("panier", JSON.stringify(objetPanier)); // écrase le panier avec la nouvelle valeur
                            window.location.reload(); // rafraichit la page
                        }
                    })
                }
                supprimerObjet();
            }
            exec();
        })

}

////////////////////
// Partie formulaire + Regex //
////////////////////

let form = document.querySelector(".cart__order__form");


// PRENOM
form.firstName.addEventListener("input", function () {    //eventListener prénom
    prenomValide(this);
});

const prenomValide = function (prenomInput) {   // regex prénom (ne peut pas contenir d'espace, tirets autorisés)
    let rgxPrenom = new RegExp("^[a-zA-Z]+(([',.-][a-zA-Z ])?[a-zA-Z]*)*$", "g");
    let prenomTest = rgxPrenom.test(prenomInput.value);
    if(prenomTest) {
        prenomInput.nextElementSibling.innerHTML = "";
        return true;
    }
    else {
        prenomInput.nextElementSibling.innerHTML = "Ce format de prénom n'est pas valide";
        return false;
    }
};



// NOM DE FAMILLE
form.lastName.addEventListener("input", function () { //eventListener nom de famille
    nomValide(this);
});

const nomValide = function (nomInput) { // regex nom de famille (ne peut pas contenir d'espace, tirets autorisés)
    let rgxNom = new RegExp("^[a-zA-Z]+(([',.-][a-zA-Z ])?[a-zA-Z]*)*$", "g");
    let testNom = rgxNom.test(nomInput.value);
    if(testNom) {
        nomInput.nextElementSibling.innerHTML = "";
        return true;
    }
    else {
        nomInput.nextElementSibling.innerHTML = "Ce format de nom n'est pas valide";
        return false;
    }
};



// ADRESSE
form.address.addEventListener("input", function () { //eventListener adresse
    adresseValide(this);
});

const adresseValide = function (adresseInput) { // regex adresse
    let rgxAdresse = new RegExp("^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\\s-]{1,60}$", "i");
    let adresseTest = rgxAdresse.test(adresseInput.value);
    if(adresseTest) {
        adresseInput.nextElementSibling.innerHTML = "";
        return true;
    }
    else {
        adresseInput.nextElementSibling.innerHTML = "Cette adresse n'est pas valide";
        return false;
    }
};



// VILLE
form.city.addEventListener("input", function () { //eventListener ville
    villeValide(this);
});

const villeValide = function (villeInput) { // regex ville
    let rgxVille = new RegExp("^[a-zA-ZÀ-ÿ-. ]*$", "g");
    let villeTest = rgxVille.test(villeInput.value);
    if(villeTest) {
        villeInput.nextElementSibling.innerHTML = "";
        return true;
    }
    else {
        villeInput.nextElementSibling.innerHTML = "Ville invalide";
        return false;
    }
};



// ADRESSE EMAIL
form.email.addEventListener("input", function() { // eventListener email
    emailValide(this);
});

const emailValide = function (emailInput) { // regex email (ne peut pas contenir de chiffres après le @)
    let rgxEmail = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g" );
    let emailTest = rgxEmail.test(emailInput.value);
    if(emailTest) {
        emailInput.nextElementSibling.innerHTML ="";
        return true;
    }
    else {
        emailInput.nextElementSibling.innerHTML = "Cette adresse Email n'est pas valide";
    }
};

// FIN REGEX
///////
// Partie envoi du formulaire
///////

// Envoie de la commande au back
function validationCommande () {
    const submit = document.querySelectorAll("input[type=submit]")[0];
    submit.addEventListener("click", (event) => {
        event.preventDefault();
        //Si le formulaire ne comporte aucune erreur
        if(
            prenomValide(form.firstName) && nomValide(form.lastName) &&
            adresseValide(form.address) && villeValide(form.city) && emailValide(form.email)
        ) {
            const commande = []; //Création d'un array produits
            for(let i = 0; i < objetPanier.length; i++) { // boucle sur les éléments de la commande
                commande.push(objetPanier[i].id); // ajoute les éléments dans l'array vide crée sur la const commande
            }
            const formClient = { //Création d'un objet contenant les données saisies par le client
                contact: {
                    firstName :form.firstName.value, lastName :form.lastName.value, address :form.address.value,
                    city :form.city.value, email :form.email.value
                },
                products: commande
            };

            //envoie les données à l'API et récupère la commande via une requête post
            const post = {
                method: "POST", // post pour envoyer des données
                body: JSON.stringify(formClient), // les données sont envoyées sous forme de string comme demandé dans le cahier des charges
                headers : {
                    "Content-Type": "application/json"
                },
            };
            fetch("http://localhost:3000/api/products/order", post) // on fetch l'endroit ou l'on va envoyer les données, celles ci seront envoyés dans un array vide situé dans l'api
                .then(response => response.json())
                .then(data => {
                    localStorage.clear(); // les données du local storage sont supprimées
                    document.location.href = "./confirmation.html?id=" + data.orderId; // l'utilisateur est envoyé sur la page confirmation
                })
                .catch(erreur => alert("Une erreur est survenue"));
        }
        else {
            alert("Le formulaire comporte des erreurs"); // else si le formulaire ne correspond pas aux regex et n'envoie pas la commande
        }
    });
}
validationCommande();

