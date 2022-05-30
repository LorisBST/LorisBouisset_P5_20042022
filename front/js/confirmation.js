
//Fonction pour récuperer le numéro de commande dans l'URL
function commande () {
    let lien = new URL(window.location.href); // l'url sera généré avec le numéro de commande
    let orderId = lien.searchParams.get("orderId"); //
    let commandeId = document.getElementById("orderId"); // on sélectionne l'élément orderId via le DOM
    commandeId.innerText = localStorage.getItem("orderId"); // on lui affiche le numéro de commande généré avec l'URL
    // localStorage.clear(); // clear du local storage afin de ne pas gêner en cas de nouvelle commande et aucune donnée n'est stocké comme spécifié.
}
commande();