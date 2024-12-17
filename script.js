// Cargar las notas almacenadas en localStorage
const notes = JSON.parse(localStorage.getItem("notes")) || [];

// Función para mostrar las notas
function renderNotes() {
    const notesContainer = document.getElementById("notes-container");
    notesContainer.innerHTML = ''; // Limpiar las notas previas

    notes.forEach((note, index) => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");

        // Mostrar la imagen, título y contenido de la nota
        noteElement.innerHTML = `
            <img src="${note.image}" class="note-image" alt="Nota imagen">
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <button onclick="editNote(${index})">Editar</button>
            <button onclick="deleteNote(${index})">Eliminar</button>
            <button onclick="generatePdf(${index})">Generar PDF</button>
        `;
        notesContainer.appendChild(noteElement);
    });
}

// Función para editar una nota
function editNote(index) {
    const note = notes[index];
    localStorage.setItem("noteToEdit", JSON.stringify(note));
    window.location.href = "edit-note.html"; // Redirige a la página de edición
}

// Función para eliminar una nota
function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
}

// Función para generar un PDF de una nota
function generatePdf(index) {
    const note = notes[index];
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const usablePageWidth = pageWidth - 2 * margin;

    doc.setDrawColor(0);
    doc.setLineWidth(1);
    doc.rect(margin, margin, usablePageWidth, pageHeight - 2 * margin);

    const titleX = pageWidth / 2;
    const titleY = margin + 20;
    doc.setFontSize(16);
    doc.text(note.title, titleX, titleY, { align: 'center' });

    doc.setFontSize(12);
    doc.text(note.content, margin + 10, titleY + 20);

    if (note.image) {
        const img = new Image();
        img.src = note.image;
        img.onload = function () {
            const imgWidth = usablePageWidth / 2;
            const imgHeight = (img.height / img.width) * imgWidth;
            doc.addImage(img, 'JPEG', margin + 10, titleY + 40, imgWidth, imgHeight);
            doc.save($note.title.pdf);
        };
    } else {
        doc.save($note.title.pdf);
    }
}

// Función para buscar notas
function searchNotes() {
    const searchQuery = document.getElementById("search").value.toLowerCase();
    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(searchQuery));
    renderFilteredNotes(filteredNotes);
}

function renderFilteredNotes(filteredNotes) {
    const notesContainer = document.getElementById("notes-container");
    notesContainer.innerHTML = '';
    filteredNotes.forEach((note, index) => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.innerHTML = `
            <img src="${note.image}" class="note-image" alt="Nota imagen">
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <button onclick="editNote(${index})">Editar</button>
            <button onclick="deleteNote(${index})">Eliminar</button>
            <button onclick="generatePdf(${index})">Generar PDF</button>
        `;
        notesContainer.appendChild(noteElement);
    });
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('loggedIn');
    window.location.href = 'index.html';
}

// Función para cargar una nota para editar
function loadNoteToEdit() {
    const note = JSON.parse(localStorage.getItem("noteToEdit")) || {};
    document.getElementById("note-title").value = note.title || '';
    document.getElementById("note-content").value = note.content || '';

    const noteImagePreview = document.getElementById("note-image-preview");
    if (note.image) {
        noteImagePreview.src = note.image;
        noteImagePreview.style.display = "block";
    } else {
        noteImagePreview.style.display = "none";
    }
}

// Guardar cambios de una nota editada
document.getElementById("edit-note-form")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const noteToEdit = JSON.parse(localStorage.getItem("noteToEdit")) || {};
    const index = notes.findIndex(note => note.title === noteToEdit.title);

    const updatedNote = {
        title: document.getElementById("note-title").value,
        content: document.getElementById("note-content").value,
        image: noteToEdit.image
    };

    if (document.getElementById("note-image").files.length > 0) {
        const file = document.getElementById("note-image").files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
            updatedNote.image = event.target.result;
            notes[index] = updatedNote;
            localStorage.setItem("notes", JSON.stringify(notes));
            window.location.href = "notes.html";
        };
        reader.readAsDataURL(file);
    } else {
        notes[index] = updatedNote;
        localStorage.setItem("notes", JSON.stringify(notes));
        window.location.href = "notes.html";
    }
});

// Crear una nueva nota
document.getElementById("create-note-form")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("note-title").value;
    const content = document.getElementById("note-content").value;
    const imageFile = document.getElementById("note-image").files[0];

    if (title && content) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const newNote = {
                title,
                content,
                image: e.target.result
            };
            const notes = JSON.parse(localStorage.getItem("notes")) || [];
            notes.push(newNote);
            localStorage.setItem("notes", JSON.stringify(notes));
            window.location.href = "notes.html";
        };
        if (imageFile) {
            reader.readAsDataURL(imageFile);
        } else {
            const newNote = { title, content, image: "" };
            notes.push(newNote);
            localStorage.setItem("notes", JSON.stringify(notes));
            window.location.href = "notes.html";
        }
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

// Registro de usuario
function register() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    if (email && password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(user => user.email === email)) {
            alert('Este correo ya está registrado.');
        } else {
            users.push({ email, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registro exitoso. Ahora inicia sesión.');
            window.location.href = 'index.html';
        }
    } else {
        alert('Por favor, completa todos los campos.');
    }
}

// Login de usuario
document.getElementById('loginform')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(user => user.email === email && user.password === password)) {
        localStorage.setItem('loggedIn', email);
        window.location.href = 'notes.html';
    } else {
        alert('Correo o contraseña incorrectos.');
    }
});

// Inicializar
window.onload = () => {
    if (document.getElementById("notes-container")) {
        renderNotes();
    }
    if (document.getElementById("edit-note-form")) {
        loadNoteToEdit();
    }
};