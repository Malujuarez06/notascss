// Manejo del formulario de registro
document.getElementById('registerForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe normalmente
    
    // Obtener los valores de los campos
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    
    // Validación básica (puedes agregar más validaciones aquí)
    if (username && password) {
        // Guardar la información en el localStorage (simulando un registro)
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        
        // Redirigir a la página de notas
        window.location.href = 'notes.html';
    } else {
        alert('Por favor complete todos los campos');
    }
});

// Manejo del formulario de login
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe normalmente
    
    // Obtener los valores de los campos
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    
    // Verificar si el usuario existe (usando localStorage en este caso)
    let storedUsername = localStorage.getItem('username');
    let storedPassword = localStorage.getItem('password');
    
    if (username === storedUsername && password === storedPassword) {
        // Redirigir a la página de notas
        window.location.href = 'notes.html';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

// Función para filtrar las notas conforme el usuario escribe
function searchNotes() {
    // Obtener el valor de la barra de búsqueda
    let input = document.getElementById('searchInput');
    let filter = input.value.toLowerCase();
    
    // Obtener todas las notas
    let notes = document.querySelectorAll('.note');
    
    // Iteramos por cada nota para verificar si el título contiene el texto de búsqueda
    notes.forEach(function(note) {
        let title = note.getAttribute('data-title').toLowerCase();
        
        // Si el título de la nota contiene el texto de búsqueda, la mostramos
        if (title.indexOf(filter) > -1) {
            note.style.display = ''; // Muestra la nota
        } else {
            note.style.display = 'none'; // Oculta la nota
        }
    });
}

// Función para generar un PDF con el contenido de la nota
document.querySelectorAll('.btn-pdf').forEach(button => {
    button.addEventListener('click', function() {
        // Obtener el contenido de la nota
        const noteContent = this.closest('.note').querySelector('p').innerText;
        
        // Crear un objeto jsPDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        
        // Añadir el contenido de la nota al PDF
        pdf.text(noteContent, 10, 10);
        
        // Guardar el PDF con el nombre 'nota.pdf'
        pdf.save('nota.pdf');
    });
});

// Función para eliminar una nota
document.querySelectorAll('.btn-delete').forEach(button => {
    button.addEventListener('click', function() {
        // Confirmar si el usuario realmente desea eliminar la nota
        if (confirm('¿Estás seguro de que deseas eliminar esta nota?')) {
            // Eliminar el contenedor de la nota
            this.closest('.note').remove();
        }
    });
})