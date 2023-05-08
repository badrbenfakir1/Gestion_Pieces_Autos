// Récupération des pièces depuis le fichier JSON


const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

function genererPieces(pieces){
for(let i=0 ; i<pieces.length; i++){

    const sectionFiches = document.querySelector(".fiches");

    const piecesElement = document.createElement("article");

    const imageElement = document.createElement("img");
    imageElement.src = pieces[i].image;

    const nomElement = document.createElement("h2");
    nomElement.innerText = pieces[i].nom;

    const prixElement = document.createElement("p");
    prixElement.innerText = "prix : " + pieces[i].prix + "$";

    const categorieElement = document.createElement("p");
    categorieElement.innerText = pieces[i].categorie ?? "aucune catégorie!";

    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = pieces[i].description ?? "pas de description pour le moment";

    const stockElement = document.createElement("p");
    stockElement.innerText = pieces[i].disponibilite ? "En stock" : "Rupture de stock";

    sectionFiches.appendChild(piecesElement);
    piecesElement.appendChild(imageElement);
    piecesElement.appendChild(nomElement);
    piecesElement.appendChild(prixElement);
    piecesElement.appendChild(categorieElement);
    piecesElement.appendChild(descriptionElement);
    piecesElement.appendChild(stockElement);
}
}

genererPieces(pieces);

//trier les elements par ordre croissant de prix
const boutonTrier = document.querySelector(".btn-trier");

boutonTrier.addEventListener("click" , function() {
    const piecesOrdonnes = Array.from(pieces);
    piecesOrdonnes.sort(function(a,b){
        return a.prix - b.prix;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnes);

});

//filtrer les pieces non abordables (<= 35) 
const boutonFilter = document.querySelector(".btn-filter");

boutonFilter.addEventListener("click" , function() {
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= 35;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
    
});


//trier les elements par ordre croissant de prix
const boutonTrierDecroissant = document.querySelector(".btn-decroissant");
boutonTrierDecroissant.addEventListener("click",function(){
    const piecesOrdonnes = Array.from(pieces);
    piecesOrdonnes.sort(function(a,b){
        return b.prix - a.prix;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnes);
    
    
});


//filtrer les pieces sans description
const boutonFilterNoDesc = document.querySelector(".btn-filterNoDesc");

boutonFilterNoDesc.addEventListener("click", function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.description == null;
        });
        document.querySelector(".fiches").innerHTML = "";
        genererPieces(piecesFiltrees);
});



//generer les noms a partir de la liste du fichier json
const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length-1 ; i>=0; i--){
    if(pieces[i].prix > 35)
    noms.splice(i,1);
}


//creation de la liste 
const abordableElements = document.createElement("ul");

//ajout de chaque nom abordable à la liste
for(let i=0; i < noms.length; i++){
    const nomElement = document.createElement("li");
    nomElement.innerText = noms[i];
    abordableElements.appendChild(nomElement);
}
document.querySelector(".abordables").appendChild(abordableElements);

//ajout de chaque nom disponible avec son prix à la liste
const nomsDisponibes = pieces.map(piece => piece.nom);
const prixDisponibles = pieces.map(piece => piece.prix);

for(let i = pieces.length -1; i>=0; i--){
    if(pieces[i].disponibilite === false){
        nomsDisponibes.splice(i,1);
        prixDisponibles.splice(i,1);
    }
}

const disponiblesElements = document.createElement("ul");

for(let i=0; i<nomsDisponibes.length; i++){
    const nomElement = document.createElement("li");
    nomElement.innerText = `${nomsDisponibes[i]} - ${prixDisponibles[i]} $`;
    disponiblesElements.appendChild(nomElement);
}

document.querySelector(".disponibles").appendChild(disponiblesElements);



const inputPrixMax = document.querySelector("#prix-max");
inputPrixMax.addEventListener('input', function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= inputPrixMax.value;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});


//effacer le contenu de la balise body et donc l'écran








































