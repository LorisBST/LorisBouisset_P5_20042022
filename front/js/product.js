const url = new URL(window.location.href);
//Récupération de l'id produit via l'API.
const RequeteId = url.searchParams.get("id");

// Fetch en fonction de l'ID produit 
fetch(`http://localhost:3000/api/products/${RequeteId}`)
    .then(function (reponse) {
        return reponse.json();
    })
    // Ajout des informations des pages individuelles de canapés de façon automatisé via l'api.
    .then(function (data) {
        console.log(data)
        function ProduitIndiv() {
            const image = document.querySelector(".item__img").innerHTML = `<img  id="image" src="${data.imageUrl}" alt="${data.altTxt}">`;
            const titre = document.getElementById("title").innerHTML = `<h1 id="title">${data.name}</h1>`;
            const prix = document.getElementById("price").innerHTML = `<span id="price">${data.price}</span>`;
            const description = document.getElementById("description").innerHTML = `<p id="description">${data.description}</p>`;
            const CouleursProduit = data.colors;
            // Selection des couleurs pour le client.
            function Couleurs() {
                for (let SelectionCouleurs of CouleursProduit) {
                    document.getElementById("colors").innerHTML += `<option value="${SelectionCouleurs}">${SelectionCouleurs}</option>`;
                }
            }
            Couleurs();
        }
        ProduitIndiv();

        // PARTIE PANIER 
        // On sélectionne l'id du bouton
        const bouton = document.querySelector("#addToCart");
        // création d'une fonction qui va réaliser une action lorsqu'un clic est réalisé. 
        bouton.addEventListener("click", (e) => {
            const color = document.querySelector("#colors").value
            const quantity = document.querySelector("#quantity").value
            // si aucune quantité ou aucune couleur n'est choisie / aucune des deux => retourne un message d'erreur. 
            if (color == null || color === "" || quantity == null || quantity == 0) {
                alert("Veuillez choisir une couleur et une quantité.");
                return
            }
            let produitPanier = {name: data.name, imageUrl : data.imageUrl, id: data._id, color: color, quantity: Number(quantity), price: data.price }
            // récupère l'objet panier 
            let objetPanier = JSON.parse(localStorage.getItem("panier"));
            if (objetPanier === null) {
                objetPanier = []
            } else {
                let panierFiltre = objetPanier.filter((produit) => produit.id === data._id && produit.color === color)
                if (panierFiltre.length !== 0) {
                    objetPanier = objetPanier.filter((produit) => !(produit.id === data._id && produit.color === color))
                    produitPanier = panierFiltre[0]
                    produitPanier.quantity += Number(quantity)
                }
            }
            objetPanier.push(produitPanier)
            // stocke la commande sous forme d'array dans le local storage avec une clé différente en fonction de la couleur/modèle du canapé 
            localStorage.setItem("panier", JSON.stringify(objetPanier));
        })
    });




    // price: quantity * data.price



