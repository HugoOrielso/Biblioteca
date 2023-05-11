let containerBooks = document.querySelector("#Container-books")
let prestar

async function cargarLibros(params) {
   const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${busqueda}`)
   const data = await(res.json()); 
   mostrarLibros(data.items)
}

function mostrarLibros(data){
    containerBooks.innerHTML = ''
    console.log(data);
    data.forEach(element => {
        let elemento = document.createElement("div")
        elemento.classList.add("Visualizacion-imagenes")
        if (element.volumeInfo.imageLinks==null) {
            elemento=`<div class="Image-title-dails">
            <p>Elemento no escontrado</p>
                <div>
                    Image not found
                </div>
                <button id="noEncontrado">No encontrado</button>
            </div>
            `
        }else{
            elemento = ` <div class="Image-title-dails">
                <p>${element.volumeInfo.title}</p>
                <img src="${element.volumeInfo.imageLinks.smallThumbnail}" alt="Imagen-libro">
                <a href="${element.volumeInfo.infoLink}" target="_blank">Información del libro</a>
                    <button class="prestar">Prestar</button>
                </div>
                `
        }
            containerBooks.innerHTML += elemento
            // elemento.addEventListener("click",)
            prestar = document.querySelectorAll(".prestar")
            console.log(prestar);
            agregarListeners(prestar)
    });
    botonFormulario.classList.remove("inActive")
}

function agregarListeners(prestar) {
    prestar.forEach(element => {
        element.addEventListener("click",(e)=>{
            window.location.href = `agregar/${nombreGuardado}/${cedulaGuardada}/${libroGuardado}`
        }) 
    })
}



