function toggleOverlay() {
    var overlay = document.getElementById("overlay");
    overlay.classList.toggle("active"); // Cambia entre mostrar/ocultar el overlay
}

function MostrarComentario() {
    // Obtener los valores de los campos del formulario
    let nombres = document.getElementById('name').value;
    let mensaje = document.getElementById('msg').value;
    let correo = document.getElementById('mail').value;

    if (nombres === '' || mensaje === '' || correo === '') {
        alert("No has rellenado el formulario entero");
        return; // Salir de la función si algún campo está vacío
    }

    if (!validarCorreo(correo)) {
        alert("El correo electrónico no es válido");
        return; // Salir de la función si el correo no es válido
    }

    // Crear elementos para el comentario
    let comentario = document.createElement("div");
    comentario.id = "comentario";
    let autor = document.createElement("div");
    let fechaHora = document.createElement("div");
    let texto = document.createElement("div");
    let fechHora = new Date();

    // Configurar contenido y estilos para cada elemento
    autor.textContent = "Autor: " + nombres;
    fechaHora.textContent = "Fecha y hora: " + fechHora.toLocaleDateString() + " " + fechHora.toLocaleTimeString();
    texto.textContent = "Comentario: " + mensaje;
    
    // Agregar los elementos al comentario
    comentario.appendChild(autor);
    comentario.appendChild(fechaHora);
    comentario.appendChild(texto);

    // Obtener el contenedor de comentarios
    let contenedorComentario = document.getElementById('comentarios');
    // Agregar el nuevo comentario al contenedor
    contenedorComentario.appendChild(comentario);

    // Limpiar los campos del formulario después de agregar el comentario
    document.getElementById('name').value = '';
    document.getElementById('msg').value = '';
    document.getElementById('mail').value = '';
}

function validarCorreo(correo) {
    // Expresión regular para validar el formato del correo electrónico
    let regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreo.test(correo);
}

const palabrasProhibidas = ['puta', 'palabra2', 'palabra3']; // Añade aquí tus palabras prohibidas

// Función para reemplazar caracteres de palabras prohibidas con asteriscos
function filtrarPalabrasProhibidas(texto) {
    for (let palabra of palabrasProhibidas) {
        let regex = new RegExp(palabra, 'gi'); // Expresión regular global e insensible a mayúsculas/minúsculas
        texto = texto.replace(regex, '*'.repeat(palabra.length)); // Reemplazar la palabra con asteriscos
    }
    return texto;
}

// Función que se ejecuta cuando el usuario escribe en el campo de comentario
document.getElementById('msg').addEventListener('input', function() {
    let comentario = this.value; // Obtener el texto del comentario
    let comentarioFiltrado = filtrarPalabrasProhibidas(comentario); // Filtrar palabras prohibidas
    this.value = comentarioFiltrado; // Asignar el texto filtrado de vuelta al campo de comentario
});
