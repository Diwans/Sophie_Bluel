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

