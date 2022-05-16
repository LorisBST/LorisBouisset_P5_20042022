fetch("http://localhost:3000/api/products")
.then(function(reponse){
return reponse.json();
})
.then(function(reponseFormate){
// affichage des produits via le DOM
let affichage = "";
for(var produit of reponseFormate){
    affichage += `<a href="./product.html?id=${produit._id}">
    <article>
     <img src="${produit.imageUrl}" alt="${produit.altTxt}">     
     <h3 class="productName">${produit.name}</h3>
     <p class="productDescription">${produit.description}</p>
    </article>
   </a>\n`; 
}
document.getElementById("items").innerHTML = affichage;
})


// En cas de serveur éteint
.catch(function (erreur){
    alert("Serveur inaccessible.");
} )














//  for(var i = 0; i < reponseFormate.length; i++) {
//      console.log(reponseFormate[i]);
//  }

    // var i = 0;
    // while(i < reponseFormate.length) {
    //     console.log(reponseFormate[i]);
    //     i++;
    // }


