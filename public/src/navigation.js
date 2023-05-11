let formulario = document.querySelector("#Formulario-libros")
let nombre = document.querySelector("#Nombre")
let cedula = document.querySelector("#Cedula")
let libro = document.querySelector("#libro")
let submitLibro = document.querySelector("#Submit-libro")
let botonFormulario = document.querySelector("#Boton-formulario")
let containerFormulario = document.querySelector("#Container-formulario")
let mostrarPersona = document.querySelector("#personaGenerada")
let cambiarReporte = document.querySelector("#cambiarReporte")
let btnNombreCedula = document.querySelector("#verificarNombreCedula")
let personaGenerada = document.querySelector("#personaGenerada")
let containerPersonaGenerada = document.querySelector("#containerPersonaGenerada")
let busqueda 
let nombreGuardado
let cedulaGuardada
let libroGuardado

cambiarReporte.addEventListener("click",()=>{
    window.location.href = `quitarReporte/${cedula.value}`
})
btnNombreCedula.addEventListener("click",()=>{
    window.location.href= `verificar/${cedula.value}`
})
    
formulario.addEventListener("submit",(e)=>{
    e.preventDefault()
    nombreGuardado = nombre.value
    cedulaGuardada = cedula.value
    libroGuardado = libro.value
    busqueda = libro.value
    cargarLibros(busqueda)
    let dataInfo = {
        nombre : nombre.value,
        cedula : cedula.value,
        reportado: false
    }
    formulario.classList.add("inActive")
    generarPersona(nombreGuardado,cedulaGuardada)
    personaGenerada.style.display = "flex"
    personaGenerada.classList.remove("inActive")
    containerPersonaGenerada.classList.add("")
})

class Persona{
    constructor(nombre,Cedula){
        this.Persona = nombre;
        this.Cedula  = Cedula;
    }
}

function generarPersona(nombreGuardado,cedulaGuardada) {
    let persona = new Persona(nombreGuardado,cedulaGuardada)
    mostrarPersona.innerHTML = `<p>Nombre: ${persona.Persona}</p>
                                <p>Cedula: ${persona.Cedula}</p>`
}
