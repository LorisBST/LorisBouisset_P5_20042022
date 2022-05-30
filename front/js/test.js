

//Récupération du local storage
let ajoutProduitStorage = JSON.parse(localStorage.getItem("articles"));
const affichagePanier = document.querySelector("#cart__items");

function affichageProduits() {
//Si le panier est vide
    if(ajoutProduitStorage === null || ajoutProduitStorage == 0) {
        const panierVide = `<p> Le panier est vide </p>`;
        affichagePanier.innerHTML = panierVide;
    }
//Boucle pour parcourir les élements dans le local storage
    else {
        for(let i = 0; i < ajoutProduitStorage.length; i++) {
            let prixArticle = ajoutProduitStorage[i].prix * ajoutProduitStorage[i].quantité;
            let affichageProduit =
                `<article class="cart__item" data-id="${ajoutProduitStorage[i].id}">
            <div class="cart__item__img">
              <img src="${ajoutProduitStorage[i].img}" alt="${ajoutProduitStorage[i].altTxt}">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                  <h2>${ajoutProduitStorage[i].nom}</h2>
                  <p>${ajoutProduitStorage[i].couleur}</p>
                  <p>${prixArticle}€</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${ajoutProduitStorage[i].quantité}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                  </div>
                </div>
               </div>
          </article> `;
            document.getElementById("cart__items").innerHTML += affichageProduit;
        }
    }
}
affichageProduits();

function totalPanier() {
//Total des articles
    let articleQuantite = document.getElementsByClassName("itemQuantity");
    let length = articleQuantite.length;
    let articleTotal = 0;

    for(let i = 0; i < length; i++) {
        articleTotal += articleQuantite[i].valueAsNumber;
    }
    let articleTotalQuantite = document.getElementById("totalQuantity");
    articleTotalQuantite.innerHTML = articleTotal;

//Total des prix
    let prixTotal = 0;

    for(let i = 0; i < length; i++) {
        prixTotal += articleQuantite[i].valueAsNumber * ajoutProduitStorage[i].prix;
    }
    let prixTotalArticles = document.getElementById("totalPrice");
    prixTotalArticles.innerHTML = prixTotal;
}
totalPanier();

//Fonction pour supprimer un produit
function supprimerProduit() {
    const suppressionArticle = document.querySelectorAll(".deleteItem");
    for (let i = 0; i < suppressionArticle.length; i++) {
        suppressionArticle[i].addEventListener("click", (event) => {
            event.preventDefault();
            ajoutProduitStorage.splice(i, 1);
            localStorage.setItem("articles", JSON.stringify(ajoutProduitStorage));
            alert("Votre produit a été supprimé");
            location.reload();
        });
    }
}
supprimerProduit();

//Fonction pour vider entierement le panier
function supprimerPanier() {
    const viderPanier = document.getElementById("cart__delete");
    viderPanier.addEventListener("click", (event) => {
        event.preventDefault();
        localStorage.clear();
        alert("Le panier a été supprimé");
        location.href = "index.html";
    });
}
supprimerPanier();

//Fonction pour changer la quantité d'un article
function changerQuantite() {
    let selectionQuantite = document.querySelectorAll(".itemQuantity");
    for(let i = 0; i < selectionQuantite.length; i ++) {
        selectionQuantite[i].addEventListener("change", (event) => {
            event.preventDefault();
            let articleQuantite = event.target.value;
            let nouveauPanier = {
                id: ajoutProduitStorage[i].id,
                quantité: articleQuantite,
                couleur: ajoutProduitStorage[i].couleur,
                img: ajoutProduitStorage[i].img,
                alt: ajoutProduitStorage[i].alt,
                nom: ajoutProduitStorage[i].nom,
                prix: ajoutProduitStorage[i].prix
            };
            ajoutProduitStorage[i] = nouveauPanier;
            localStorage.clear();
            localStorage.setItem("articles", JSON.stringify(ajoutProduitStorage));
            location.reload();
        });
    }
}
changerQuantite();

//*************Formulaire***********************

let formulaire = document.querySelector(".cart__order__form");

//Vérification des données saisies par l'utilisateur

//Ecoute de la modification du prénom
formulaire.firstName.addEventListener("input", function () {
    prenomValide(this);
});

const prenomValide = function (inputPrenom) {
//Création de la regex pour valider le prénom
    let prenomRegex = new RegExp("^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{2,}$", "g");
//Test de la regex prénom
    let testPrenom = prenomRegex.test(inputPrenom.value);
    if(testPrenom) {
        inputPrenom.nextElementSibling.innerHTML = "";
        return true;
    }
    else {
        inputPrenom.nextElementSibling.innerHTML = "Prénom non valide";
        return false;
    }
};

//Ecoute de la modification du nom
formulaire.lastName.addEventListener("input", function () {
    nomValide(this);
});

const nomValide = function (inputNom) {
    let nomRegex = new RegExp("^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s_ ]{2,}$", "g");
    let testNom = nomRegex.test(inputNom.value);
    if(testNom) {
        inputNom.nextElementSibling.innerHTML = "";
        return true;
    }
    else {
        inputNom.nextElementSibling.innerHTML = "Nom non valide";
        return false;
    }
};

//Ecoute de la modification de l'adresse
formulaire.address.addEventListener("input", function () {
    adresseValide(this);
});

const adresseValide = function (inputAdresse) {
    let adresseRegex = new RegExp("^[-'a-zA-Z0-9À-ÖØ-öø-ÿ\s_ ]{3,}$", "g");
    let testAdresse = adresseRegex.test(inputAdresse.value);
    if(testAdresse) {
        inputAdresse.nextElementSibling.innerHTML = "";
        return true;
    }
    else {
        inputAdresse.nextElementSibling.innerHTML = "Adresse non valide";
        return false;
    }
};

//Ecoute de la modification de la ville
formulaire.city.addEventListener("input", function () {
    villeValide(this);
});

const villeValide = function (inputVille) {
    let villeRegex = new RegExp("^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s_ ]{3,}$", "g");
    let testVille = villeRegex.test(inputVille.value);
    if(testVille) {
        inputVille.nextElementSibling.innerHTML = "";
        return true;
    }
    else {
        inputVille.nextElementSibling.innerHTML = "Ville non valide";
        return false;
    }
};

//Ecoute de la modification de l'email
formulaire.email.addEventListener("input", function() {
    emailValide(this);
});

const emailValide = function (inputEmail) {
    let emailRegex = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g" );
    let testEmail = emailRegex.test(inputEmail.value);
    if(testEmail) {
        inputEmail.nextElementSibling.innerHTML ="";
        return true;
    }
    else {
        inputEmail.nextElementSibling.innerHTML = "Adresse email non valide";
    }
};

//Fonction pour finaliser la commande
function validerCommande () {
    const boutonCommande = document.getElementById("order");
    boutonCommande.addEventListener("click", (event) => {
        event.preventDefault();
//Si le formulaire ne comporte aucune erreur
        if(
            prenomValide(formulaire.firstName) &&
            nomValide(formulaire.lastName) &&
            adresseValide(formulaire.address) &&
            villeValide(formulaire.city) &&
            emailValide(formulaire.email)
        ) {
//Création d'un tableau de produits
            const produits = [];
            for(let i = 0; i < ajoutProduitStorage.length; i++) {
                produits.push(ajoutProduitStorage[i].id);
            }
//Création d'un objet contact à partir des données du formulaire
            const objetContact = {
                contact: {
                    firstName :formulaire.firstName.value,
                    lastName :formulaire.lastName.value,
                    address :formulaire.address.value,
                    city :formulaire.city.value,
                    email :formulaire.email.value
                },
                products: produits
            };
//Requete POST pour envoyer les données à l'API et récupérer l'identifiant de commande
            const post = {
                method: "POST",
                body: JSON.stringify(objetContact),
                headers : {
                    "Content-Type": "application/json"
                },
            };
            fetch("http://localhost:3000/api/products/order", post)
                .then(response => response.json())
                .then(data => {
                    localStorage.clear();
                    localStorage.setItem("orderId", data.orderId);
                    document.location.href = "./confirmation.html?id=" + data.orderId;
                })
                .catch(erreur => alert("Une erreur est survenue"));
        }
        else {
            alert("Le formulaire comporte des erreurs");
        }
    });
}
validerCommande();
