const url = new URL(window.location.href);
//Récupération de l'id produit via l'API.
const RequeteId = url.searchParams.get("id");
// Fetch en fonction de l'ID produit 
fetch(`http://localhost:3000/api/products/${RequeteId}`)
.then(function(reponse){
return reponse.json();
})
// Ajout des informations des pages individuelles de canapés de façon automatisé via l'apî.
.then(function(data){
    function ProduitIndiv() {
        const image = document.querySelector(".item__img").innerHTML = `<img  id="image" src="${data.imageUrl}" alt="${data.altTxt}">`;
        const titre =  document.getElementById("title").innerHTML = `<h1 id="title">${data.name}</h1>`;
        const prix = document.getElementById("price").innerHTML = `<span id="price">${data.price}</span>`;
        const description = document.getElementById("description").innerHTML = `<p id="description">${data.description}</p>`; 
        const CouleursProduit = data.colors; 
// Selection des couleurs pour le client.
function Couleurs(){
for (let SelectionCouleurs of CouleursProduit){
    document.getElementById("colors").innerHTML += `<option value="${SelectionCouleurs}">${SelectionCouleurs}</option>`;
    }
} 
Couleurs();
}
ProduitIndiv();
});




