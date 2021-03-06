const lien = new URL(window.location.href);
const RequeteId = lien.searchParams.get("id"); //Récupération de l'id produit via l'URL.


// Fetch en fonction de l'ID produit 
fetch(`http://localhost:3000/api/products/${RequeteId}`)
    .then(function (reponse) {
        return reponse.json();
    })
    // Ajout des informations des pages individuelles de canapés de façon automatisé via l'api.
    .then(function (data) {
        function produitIndiv() {
            const image = document.querySelector(".item__img").innerHTML = `<img  id="image" src="${data.imageUrl}" alt="${data.altTxt}">`;
            const titre = document.getElementById("title").innerHTML = `<h1 id="title">${data.name}</h1>`;
            const prix = document.getElementById("price").innerHTML = `<span id="price">${data.price}</span>`;
            const description = document.getElementById("description").innerHTML = `<p id="description">${data.description}</p>`;
            const CouleursProduit = data.colors;
            // Selection des couleurs pour le client.
            function CouleursCanap() {
                for (let SelectionCouleurs of CouleursProduit) {
                    document.getElementById("colors").innerHTML += `<option value="${SelectionCouleurs}">${SelectionCouleurs}</option>`;
                }
            }
            CouleursCanap();
        }
        produitIndiv();

        // PARTIE PANIER
        const bouton = document.querySelector("#addToCart"); // On sélectionne l'id du bouton
        bouton.addEventListener("click", (e) => { // création d'une fonction qui va réaliser une action lorsqu'un clic est réalisé.
            const color = document.querySelector("#colors").value
            const quantity = document.querySelector("#quantity").value
            // si aucune quantité ou aucune couleur n'est choisie / aucune des deux / quantité supérieure à 100 => retourne un message d'erreur. 
            if (color == null || color === "" || quantity == null || quantity == 0 || quantity > 100) {
                alert("Veuillez choisir une couleur et une quantité entre 1 et 100.");
                return
            }

            let produitPanier = { name: data.name, imageUrl: data.imageUrl, id: data._id, color: color, quantity: Number(quantity)} //  produitPanier va contenir les informations du ou des produits
            let objetPanier = JSON.parse(localStorage.getItem("panier")); // récupère l'objet panier afin de stocker les informations dans le local storage
            if (objetPanier === null) { // si objetPanier est vide 
                objetPanier = [] // => crée un tableau vide 
            } else {
                let panierFiltre = objetPanier.filter((produit) => produit.id === data._id && produit.color === color)
                if (panierFiltre.length !== 0) { //  Si panier n'est pas vide, la fonction va filtrer les informations produit afin de voir s'il n'y a pas de doublons
                    objetPanier = objetPanier.filter((produit) => !(produit.id === data._id && produit.color === color))
                    produitPanier = panierFiltre[0]
                    produitPanier.quantity += Number(quantity) // Permet d'additionner la quantité que l'on choisit a la quantité qui était déjà présente dans le panier
                }
            }            
            objetPanier.push(produitPanier) // ajoute l'objet au panier
            // stocke la commande dans un tableau dans le local storage en fonction de la couleur/modèle du canapé (nécessite un stringify pour être lu)
            localStorage.setItem("panier", JSON.stringify(objetPanier));
        })
    });




