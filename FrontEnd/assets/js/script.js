const gallery = document.querySelector('.gallery')
const cateContainer = document.getElementById('categories')


function galleryFetch(){
    gallery.innerHTML =""
    fetch(`http://localhost:5678/api/works`)
    .then(res => {

        if(res.ok){
            res.json().then(data => {
                for ( let i=0; i < data.length; i++){
                gallery.innerHTML +="<figure class=\"imgGallery\">"+"<img src="+data[i].imageUrl+">"+"<figcaption>"+data[i].title+"</figcaption>"+"</figure>";
                }
                })
        } 
    });
}
galleryFetch()

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


function btnEvent(){
    const btnCategory = document.querySelectorAll('.textCategory')
    for ( let i=0 ; i < btnCategory.length; i++)
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

function connected(){
    const connected = document.getElementById('connect')
    const head = document.querySelector('header')
    const pdp = document.getElementById('pdp')
    const projetModif = document.getElementById('projetModif')
    const divProjetTitle = document.querySelector('.align')

    if (sessionStorage.getItem("token") ){
        head.classList.add('headerMargin')
        connected.innerHTML = "<div class=\"connectContainer\">"+"<i class=\"fa-regular fa-pen-to-square iconColor\"></i>" +"<span class=\"modeEdit\">Mode édition</span>"+"<button class=\"btnPublish\">publier les changements</button>"+"</div>";
        pdp.innerHTML += "<i class=\"fa-regular fa-pen-to-square cursorP marginIconPdp\"></i>"+ "<span class=\"btnModif cursorP\">modifier</span>"
        projetModif.innerHTML = "<i class=\"fa-regular fa-pen-to-square marginIconProjet trigger cursorP\"></i>"+"<span class=\"btnModif trigger cursorP\">modifier</span>"
        cateContainer.style.display = 'none'
        divProjetTitle.style.marginBottom = '100px'
    }
}
connected()

const modalContainer = document.querySelector('.modalContainer');
const modalTriggers = document.querySelectorAll('.trigger');

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal ))

function toggleModal(){
    modalContainer.classList.toggle('active')
}

const galleryModal = document.getElementById('galleryModal')

function galleryModalFetch(){
    gallery.innerHTML =""
    fetch(`http://localhost:5678/api/works`)
    .then(res => {

        if(res.ok){
            res.json().then(data => {
                for ( let i=0; i < data.length; i++){
                galleryModal.innerHTML +="<figure class=\"figureModal\">"+"<img src="+data[i].imageUrl+">"+"<p>éditer</p>"+"</figure>"
                }
                })
        } 
    });
}
galleryModalFetch()

const btnAddModal = document.querySelector('.btnAdd')
const modal = document.querySelector('.modal')

btnAddModal.addEventListener('click', ()=>{
    addModal()
})

function addModal(){
    modal.innerHTML=""
    
    modal.innerHTML="<button class=\"backModal trigger\"><i class=\"fa-solid fa-arrow-left backModal\"></i></button>"+"<button class=\"closeModal trigger\">X</button>"+"<h2 class=\"titleModal\">Ajout photo</h2>"+"<div id=\"addPhoto\">"+"<i class=\"fa-regular fa-image fa-6x\"></i>"+"<button class=\"btnAddModal\">+ Ajouter photo</button>"+"<p>jpg, png : 4mo max</p>"
    
    modal.innerHTML +="<form id=\"divInputAdd\">"+"<label for=\"titre\" id=\"titreAddModalLabel\">Titre</label>"+"<br>"+"<input type=\"texte\" name=\"titre\" id=\"titreAddModalInput\">"+ "<br>"+"<label for=\"categorie\" id=\"cateAddModalLabel\">Catégorie</label>"+"<br>"+"<input type=\"texte\" name=\"titre\" id=\"cateAddModalInput\">"+"</form>"
    
    modal.innerHTML += "<button id=\"validate\">Valider</button>"
}