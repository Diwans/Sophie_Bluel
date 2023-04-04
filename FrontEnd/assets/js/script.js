const gallery = document.querySelector('.gallery')
const cateContainer = document.getElementById('categories')

//fonction pour afficher les differents travaux de l'API dans la galerie a l'aide du fetch
function galleryFetch(){
    gallery.innerHTML =""
    fetch(`http://localhost:5678/api/works`)
    .then(res => {

        if(res.ok){
            res.json().then(data => {
                for ( let i=0; i < data.length; i++){
                gallery.innerHTML +="<figure data-id="+data[i].id+" class=\"imgGallery\">"+"<img src="+data[i].imageUrl+">"+"<figcaption>"+data[i].title+"</figcaption>"+"</figure>";
                }
                })
        } 
    });
}
galleryFetch()
//fonction pour generer les bouttons filtres des categories a partir de l'API
function buttonFetch(){
    fetch(`http://localhost:5678/api/categories`)
    .then(res => {

        if(res.ok){
            res.json().then(data => {
                for ( let i=0; i < data.length; i++){
                cateContainer.innerHTML +="<button data-attr-categorie="+data[i].id+" class=\"textCategory\">"+data[i].name+"</button>"
            }
            btnEvent()
            })
        } 
    });
}
buttonFetch()

//fonction pour filtrer les travaux a partir des bouttons et forEach pour gerer la class active des bouttons
function btnEvent(){
    const btnCategory = document.querySelectorAll('.textCategory')
    for ( let i=0 ; i < btnCategory.length; i++){
        btnCategory[i].addEventListener('click', (e) => {
            let value = e.target.dataset.attrCategorie
            if (value == 0){
                galleryFetch()
            }
                else {
                    getFigure(value)
                }
            
        } )
    
            btnCategory.forEach(button => {
                button.addEventListener('click', ()=>{
                    document.querySelector('.activebtn')?.classList.remove('activebtn');
                    button.classList.add('activebtn')
                })
            })
    }
}
//fonction qu'on appelle dans la fonction pour filtrer les travaux pour afficher seulement ceux demandés
function getFigure(idCategorie){
    gallery.innerHTML =""
    fetch(`http://localhost:5678/api/works`)
    .then(res => {
        if(res.ok){
            res.json().then(data => {
                for ( let i=0; i < data.length; i++){
                    if (data[i].category.id == idCategorie){
                        gallery.innerHTML +="<figure class=\"imgGallery\">"+"<img src="+data[i].imageUrl+">"+"<figcaption>"+data[i].title+"</figcaption>"+"</figure>";
                    }
                    }
               })
        } 
    });
    
}
//fonction pour modifier la home page une fois connecter 
function connected(){
    const connected = document.getElementById('connect')
    const head = document.querySelector('header')
    const pdp = document.getElementById('pdp')
    const projetModif = document.getElementById('projetModif')
    const divProjetTitle = document.querySelector('.align')
    const newDiv = document.getElementById('newDiv')

    if (sessionStorage.getItem("token") ){
        head.classList.add('headerMargin')
        connected.innerHTML = "<div class=\"connectContainer\">"+"<i class=\"fa-regular fa-pen-to-square iconColor\"></i>" +"<span class=\"modeEdit\">Mode édition</span>"+"<button class=\"btnPublish\">publier les changements</button>"+"</div>";
        pdp.innerHTML += "<i class=\"fa-regular fa-pen-to-square cursorP marginIconPdp\"></i>"+ "<span class=\"btnModif cursorP\">modifier</span>"
        projetModif.innerHTML = "<i class=\"fa-regular fa-pen-to-square marginIconProjet trigger cursorP\"></i>"+"<span class=\"btnModif trigger cursorP\">modifier</span>"
        newDiv.innerHTML = "<i class=\"fa-regular fa-pen-to-square marginIconProjet trigger cursorP\"></i>"+"<span class=\"btnModif trigger cursorP\">modifier</span>"
        cateContainer.style.display = 'none'
        divProjetTitle.style.marginBottom = '100px'
    }
}
connected()

const modalContainer = document.querySelector('.modalContainer');
const modalTriggers = document.querySelectorAll('.trigger');

//forEach et fonction pour afficher/fermer la modal au click
modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal ))
function toggleModal(){
    modalContainer.classList.toggle('active')
}


//fonction pour afficher les travaux dans la modal a l'aide de l'API
function galleryModalFetch(){
    const galleryModal = document.getElementById('galleryModal')
    galleryModal.innerHTML =""
    fetch(`http://localhost:5678/api/works`)
    .then(res => {

        if(res.ok){
            res.json().then(data => {
                for ( let i=0; i < data.length; i++){
                galleryModal.innerHTML +="<figure class=\"figureModal\">"+"<img src="+data[i].imageUrl+">"+"<button type=\"button\" data-id="+data[i].id+" class=\"cube\"><i data-id="+data[i].id+" class=\"fa-solid fa-trash fa-xs\"></i></button>"+"<p>éditer</p>"+"</figure>";
                }
                deleteWork()
                })
                
        } 
    })
}
galleryModalFetch()

//fonction pour "changer de page" dans la modal quand on click sur le boutton ajouter une photo
function btnAddModal(){
    const btnAddModal = document.querySelector('.btnAdd')
    
    btnAddModal.addEventListener('click', ()=>{
    addModal()
})
}
btnAddModal()


//fonction pour "creer" la deuxieme page de la modal en innerHTM
function addModal(){
    const modalContent = document.getElementById('modalContent')
    const modalNav = document.getElementById('modalNav')
    
    modalContent.innerHTML =""
    modalNav.innerHTML +="<button class=\"backModal\"><i class=\"fa-solid fa-arrow-left backModal\"></i></button>"

    modalContent.innerHTML ="<h2 class=\"titleModal\">Ajout photo</h2>"+"<div id=\"addPhoto\">"+"<div id=\"photoContainer\"><i class=\"fa-regular fa-image fa-6x\"></i></div>"+"<input id =\"file\" type=\"file\" class =\"display\" accept=\"image/png, image/jpeg\">"+"<label class=\"btnAddModal display\" for=\"file\">+ Ajouter photo</label>"+"<p class =\"display\">jpg, png : 4mo max</p>"
    
    modalContent.innerHTML +="<form id=\"divInputAdd\">"+"<label for=\"titre\" id=\"titreAddModalLabel\">Titre</label>"+"<div id=\"titleRequiredField\" class=\"errorMsg\"></div>"+"<br>"+"<input type=\"texte\" name=\"titre\" id=\"titreAddModalInput\">"+"<br>"+"<label for=\"cateAddModalInput\" id=\"cateAddModalLabel\">Catégorie</label>"+"<div id=\"cateRequiredField\" class=\"errorMsg\"></div>"+"<br>"+"<select type=\"texte\" name=\"cateAddModalInput\" id=\"cateAddModalInput\">"+"<option value=\"\"></option>"+"</select>"+"<div id=\"trait\"></div>" +"<button type=\"button\" for=\"divInputAdd\" id=\"validate\">Valider</button>"+"</form>"


    const modalTriggers = document.querySelectorAll('.trigger');
    modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal ))

    addFilesModal ()
    addCatToSelect()
    afficherImg()
}

//fonction pour revenir sur la première page depuis la deuxieme page
function addFilesModal (){
    const backModal = document.querySelector('.backModal')
    backModal.addEventListener('click', ()=>{
        modalContent.innerHTML =""
        modalNav.innerHTML ="<button class=\"closeModal trigger\" id=\"closeModal\">X</button>"

        modalContent.innerHTML="<h2 class=\"titleModal\">Galerie photo</h2>"+"<div id=\"galleryModal\"></div>"+"<div id=\"greenLine\"></div>"+"<button class=\"btnAdd\">Ajouter une photo</button>"+"<p class=\"suppr\">supprimer la galerie</p>"
        
        const modalTriggers = document.querySelectorAll('.trigger');
        modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal ))

        galleryModalFetch()
        btnAddModal()
    }) 
}

//fonction pour creer les options du select a partir de l'API
function addCatToSelect(){
    const select = document.getElementById('cateAddModalInput')
    fetch(`http://localhost:5678/api/categories`)
    .then(res => {

        if(res.ok){
            res.json().then(data => {
                for ( let i=0; i < data.length; i++){
                select.innerHTML +="<option value="+data[i].id+">"+data[i].name+"</option>"
            }
            })
        } 
    });
}

//fonction pour afficher l'image du input file dans la modal
function afficherImg(){
    const divDisplayNone = document.querySelectorAll('.display')
    const photoContainer = document.querySelector('#photoContainer')
    const inputFile = document.getElementById('file')

    inputFile.addEventListener('change', (e)=>{
            
            if (e.target.files[0].type ==='image/png' || e.target.files[0].type ==='image/jpeg') {
            
            photoContainer.innerHTML = "<img id=\"imgUploaded\" class=\"imgSize\"></img>"

            const imgUploaded = document.getElementById('imgUploaded')
            imgUploaded.src = URL.createObjectURL(e.target.files[0]);

            for ( let i= 0; i < divDisplayNone.length; i++){
                divDisplayNone[i].classList.add('displayNone')
            }
            postSomething()

        }
        
        
    })
    
}

//fonction pour upload une image dans l'API
function postSomething(){
    const imgUpL = document.querySelector('#file')
    const imgTitre = document.querySelector('#titreAddModalInput')
    const imgCat = document.querySelector('#cateAddModalInput')
    const validate = document.querySelector('#validate')


    validate.addEventListener('click', (e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", imgUpL.files[0]);
        formData.append("title", imgTitre.value);
        formData.append("category", imgCat.value);

        if (imgTitre.value == ""){
            const titleRequiredField = document.getElementById('titleRequiredField');
            titleRequiredField.innerText="*champs requis*";
        }
        
        if(imgCat.value == ""){
            const cateRequiredField = document.getElementById('cateRequiredField');
            cateRequiredField.innerText="*champs requis*";
        }
        else{
            fetch('http://localhost:5678/api/works', {
                method:"POST",
                headers: {"Authorization": `Bearer ${sessionStorage.getItem("token")}`},
                body: formData,
            })
        
            .then( res => {
                if (res.ok){
                    
                    gallery.innerHTML +="<figure data-attr-id=\"newImg\" class=\"imgGallery\">"+"<img id=\"newImg\">"+"<figcaption>"+imgTitre.value+"</figcaption>"+"</figure>";
    
                    const newImg = document.getElementById('newImg')
                    newImg.src = URL.createObjectURL(imgUpL.files[0])
    
                    alert('photo ajoutée avec succès!')
    
                    const imgUploaded = document.getElementById('imgUploaded')
                    imgUploaded.remove()
    
                    const divAddPhoto = document.getElementById('addPhoto')
                    divAddPhoto.innerHTML ="<i class=\"fa-regular fa-image fa-6x\"></i></div>"+"<input id =\"file\" type=\"file\" class =\"display\" accept=\"image/png, image/jpeg\">"+"<label class=\"btnAddModal display\" for=\"file\">+ Ajouter photo</label>"+"<p class =\"display\">jpg, png : 4mo max</p>"    
                }
            })
            .catch(error=>{
                console.log(error.message)
            })
        }
        
    })
}


//fonction pour supprimer une image
function deleteWork(){
    const trashbtn = document.querySelectorAll('.cube')

    for (let i=0; i<trashbtn.length; i++)
    trashbtn[i].addEventListener('click',(e)=>{
        e.preventDefault();

        let idValue = e.target.dataset.id
        let result = confirm('etes vous sur de vouloir supprimer cette image ?')
    
        if (result == true){
            fetch('http://localhost:5678/api/works/'+ idValue, {
        method:"DELETE",
        headers: {"Authorization": `Bearer ${sessionStorage.getItem("token")}`},
    })
    .then((res) =>{
        if(res.ok){
            e.target.closest('figure').remove()
            const figure = document.querySelectorAll('.imgGallery')
            for(let i=0; i<figure.length; i++){
                if( figure[i].dataset.id == idValue){
                    figure[i].remove()
                }
                if(figure[i].dataset.attrId == "newImg"){
                    figure[i].remove()
                }
            }
        }
    })
    .catch((error) => {console.log(error)}); 
        }
        else{}
    })
}
