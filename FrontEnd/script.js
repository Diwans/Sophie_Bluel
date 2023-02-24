const gallery = document.querySelector('.gallery')
const img = document.querySelectorAll('.imgGallery')
const cateContainer = document.getElementById('categories')



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
            eventButton()

            })
        } else {
            console.log("ERREUR");
        }
    });


function eventButton (){
    const btnCategory = document.querySelectorAll('.textCategories')
    for ( let i= 0 ; i< btnCategory.length; i++)
    btnCategory[i].addEventListener('click', (e) => {
        console.log(e.target.dataset.attrCategorie)
    } )    
}



