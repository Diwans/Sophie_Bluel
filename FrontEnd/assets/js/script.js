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



function galleryModalFetch(){
    const galleryModal = document.getElementById('galleryModal')
    galleryModal.innerHTML =""
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


function btnAddModal(){
    const btnAddModal = document.querySelector('.btnAdd')
    
    btnAddModal.addEventListener('click', ()=>{
    addModal()
})
}
btnAddModal()



function addModal(){
    const modalContent = document.getElementById('modalContent')
    const modalNav = document.getElementById('modalNav')
    
    modalContent.innerHTML =""
    modalNav.innerHTML +="<button class=\"backModal\"><i class=\"fa-solid fa-arrow-left backModal\"></i></button>"

    modalContent.innerHTML ="<h2 class=\"titleModal\">Ajout photo</h2>"+"<div id=\"addPhoto\">"+"<div id=\"photoContainer\"><i class=\"fa-regular fa-image fa-6x\"></i></div>"+"<input id =\"file\" type=\"file\" class =\"display\" accept=\"image/png, image/jpeg\">"+"<label class=\"btnAddModal display\" for=\"file\">+ Ajouter photo</label>"+"<p class =\"display\">jpg, png : 4mo max</p>"
    
    modalContent.innerHTML +="<form id=\"divInputAdd\">"+"<label for=\"titre\" id=\"titreAddModalLabel\">Titre</label>"+"<br>"+"<input type=\"texte\" name=\"titre\" id=\"titreAddModalInput\">"+ "<br>"+"<label for=\"cateAddModalInput\" id=\"cateAddModalLabel\">Catégorie</label>"+"<br>"+"<select type=\"texte\" name=\"cateAddModalInput\" id=\"cateAddModalInput\">"+"<option value=\"\"></option>"+"</select>"+"<div id=\"trait\"></div>" +"<input type=\"button\" for=\"divInputAdd\" id=\"validate\" value=\"Valider\">"+"</form>"


    const modalTriggers = document.querySelectorAll('.trigger');
    modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal ))

    addFilesModal ()
    addCatToSelect()
    afficherImg()
    
}


function addFilesModal (){
    const backModal = document.querySelector('.backModal')
    backModal.addEventListener('click', ()=>{
        modalContent.innerHTML =""
        modalNav.innerHTML ="<button class=\"closeModal trigger\" id=\"closeModal\">X</button>"

        modalContent.innerHTML="<h2 class=\"titleModal\">Galerie photo</h2>"+"<div id=\"galleryModal\"></div>"+"<button class=\"btnAdd\">Ajouter une photo</button>"+"<p class=\"suppr\">supprimer la galerie</p>"
        
        const modalTriggers = document.querySelectorAll('.trigger');
        modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal ))

        galleryModalFetch()
        btnAddModal()
    })
}


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

function afficherImg(){
    const divDisplayNone = document.querySelectorAll('.display')
    const photoContainer = document.querySelector('#photoContainer')
    const inputFile = document.getElementById('file')
    inputFile.addEventListener('change', (e)=>{
        if (e.target.files[0].type ==='image/png' || e.target.files[0].type ==='image/jpeg') {

            photoContainer.innerHTML = "<img id=\"imgUploaded\" class=\"imgSize\"></img>"

            const imgUploaded = document.getElementById('imgUploaded')
            imgUploaded.src = URL.createObjectURL(e.target.files[0]);

            for ( let i= 0; i < divDisplayNone.length; i++)
            divDisplayNone[i].classList.add('displayNone')
            postSomething()
        }
    })
    
}

function postSomething(){
    const imgUploaded = document.querySelector('#file')
    const imgTitre = document.querySelector('#titreAddModalInput')
    const imgCat = document.querySelector('#cateAddModalInput')
    const validate = document.querySelector('#validate')


    validate.addEventListener('click', ()=>{
    const formData = new FormData();
        formData.append("image", imgUploaded.files[0]);
        formData.append("title", imgTitre.value);
        formData.append("category", imgCat.value);
        
        fetch('http://localhost:5678/api/works', {
            method:"POST",
            headers: {"Authorization": `Bearer ${sessionStorage.getItem("token")}`},
            body: formData,
        })
    
        .then( res => {
            if (res.ok){
                gallery.innerHTML +="<figure class=\"imgGallery\">"+"<img src="+res.imageUrl+">"+"<figcaption>"+res.title+"</figcaption>"+"</figure>";
            }
        })
        .catch(error=>{
            console.log(error.message)
        })
    })
}


