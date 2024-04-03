//Función que muestra el overlay al presionar el botón "Comenta Aquí"
function mostrarOverlay() {
    var overlay = document.getElementById("overlay");
    overlay.classList.toggle("mostrando");
}

//Función que crea los comentarios nuevos que se van añadiendo
function MostrarComentario() {
    let nombres = document.getElementById('name').value;
    let mensaje = document.getElementById('msg').value;
    let correo = document.getElementById('mail').value;

    if (nombres === '' || mensaje === '' || correo === '') {
        alert("No has rellenado el formulario entero");
        return;
    }

    if (!comprobarCorreo(correo)) {
        alert("El correo electrónico no es válido");
        return; 
    }

    let comentario = document.createElement("div");
    comentario.id = "comentario";
    let autor = document.createElement("div");
    let fechaHora = document.createElement("div");
    let texto = document.createElement("div");
    let fechHora = new Date();

    autor.textContent = "Autor: " + nombres;
    fechaHora.textContent = "Fecha y hora: " + fechHora.toLocaleDateString() + " " + fechHora.toLocaleTimeString();
    texto.textContent = "Comentario: " + mensaje;
    
    comentario.appendChild(autor);
    comentario.appendChild(fechaHora);
    comentario.appendChild(texto);

    let contenedorComentario = document.getElementById('comentarios');
    
    contenedorComentario.appendChild(comentario);

    document.getElementById('name').value = '';
    document.getElementById('msg').value = '';
    document.getElementById('mail').value = '';
}

//Función para controlar si el correo está bien escrito
function comprobarCorreo(correo) {
    // Expresión regular sacada de internet
    let expRegCorreo = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
    return expRegCorreo.test(correo);
}

//Estas son las 10 palabras prohibidas en el apartado de comentarios
const prohibidas = ['puta', 'imbecil', 'tractor', 'feo', 'muerto', 'tonto', 'horrible', 'estupido', 'idiota', 'asqueroso']; 

// Función para reemplazar caracteres de las palabras prohibidas por asteriscos
function comprobarPalabras(texto) {
    for (let pal of prohibidas) {
        //Esta expresión regular tiene las banderas g que es global e i que es insensible a mayusculas y minisculas
        let expReg = new RegExp(pal, 'gi'); 
        texto = texto.replace(expReg, '*'.repeat(pal.length)); 
    }
    return texto;
}

// Función que se va actualizando cada vez que se escribe un caracter en comentario
document.getElementById('msg').addEventListener('input', function() {
    let comentario = this.value;
    let comentarioFiltrado = comprobarPalabras(comentario);
    this.value = comentarioFiltrado;
});
