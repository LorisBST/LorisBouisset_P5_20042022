
//Fonction pour récuperer le numéro de commande dans l'URL
function commandeId () {
    let lien = new URL(window.location.href); // l'url sera généré avec le numéro de commande
    let orderId = lien.searchParams.get("id"); // on récupère le numéro de commande qui se situe après "id" dans l'url
    let commandeId = document.getElementById("orderId"); // on sélectionne l'élément orderId via le DOM
    commandeId.innerText = orderId // on lui affiche le numéro de commande généré avec l'URL
}
commandeId();