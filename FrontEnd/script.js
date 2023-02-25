const gallery = document.querySelector('.gallery')
const cateContainer = document.getElementById('categories')


function galleryFetch(){
    fetch(`http://localhost:5678/api/works`)
    .then(res => {
        console.log(res);

        if(res.ok){
            res.json().then(data => {
                for ( let i=0; i < data.length; i++){
                gallery.innerHTML +="<figure data-attr-categorie="+data[i].category.id+" class=\"imgGallery\">"+"<img src="+data[i].imageUrl+">"+"<figcaption>"+data[i].title+"</figcaption>"+"</figure>";
                }
                getImg()
            })
        } else {
            console.log("ERREUR");
        }
    });
}
galleryFetch()

function buttonFetch(){
    fetch(`http://localhost:5678/api/categories`)
    .then(res => {
        console.log(res);

        if(res.ok){
            res.json().then(data => {
                for ( let i=0; i < data.length; i++){
                cateContainer.innerHTML +="<button data-attr-categorie="+data[i].id+" class=\"textCategory\">"+data[i].name+"</button>"
            }
            getIdBtn()

            })
        } else {
            console.log("ERREUR");
        }
    });
}
buttonFetch()


function getIdBtn(){
    const btnCategory = document.querySelectorAll('.textCategory')
    for ( let i=0 ; i < btnCategory.length; i++)
    btnCategory[i].addEventListener('click', (e) => {
        let value = e.target.dataset.attrCategorie
        console.log(value)
        
        if (value == 0){
            console.log('a')
        }

        if (value == 1){
            gallery.innerHTML="";
           
        }

        if (value == 2){
            console.log('c')
        }

        if (value == 3){
            console.log('d')
        }
        
    } ) 
}

function getImg(){
    const img = document.querySelectorAll('.imgGallery')
    console.log(img)
}

