const gallery = document.querySelector('.gallery')
const img = document.querySelectorAll('.imgGallery')
const cateContainer = document.getElementById('categories')
const btn = document.querySelectorAll('.textCategories')


fetch(`http://localhost:5678/api/works`)
    .then(res => {
        console.log(res);

        if(res.ok){
            res.json().then(data => {
                for ( let i=0; i < data.length; i++){
                gallery.innerHTML +="<figure data-attr-categorie="+data[i].category.id+">"+"<img src="+data[i].imageUrl+">"+"<figcaption>"+data[i].title+"</figcaption>"+"</figure>";
            }
            })
        } else {
            console.log("ERREUR");
        }
    });

    fetch(`http://localhost:5678/api/categories`)
    .then(res => {
        console.log(res);

        if(res.ok){
            res.json().then(data => {
                for ( let i=0; i < data.length; i++){
                cateContainer.innerHTML +="<button data-attr-categorie="+data[i].id+" class=\"textCategories\">"+data[i].name+"</button>"
            }
            })
        } else {
            console.log("ERREUR");
        }
    });

    for ( let i=0; i< btn[i].length; i++)
    btn[i].addEventListener('click', ()=>{
        if ( data-attr-categorie == 1){
            console.log('yes')
        }
    })



