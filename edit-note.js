// Cargar los datos de la nota a editar
function loadNoteToEdit() {
    const note = JSON.parse(localStorage.getItem("noteToEdit")) || {};
    document.getElementById("note-title").value = note.title || '';
    document.getElementById("note-content").value = note.content || '';

    // Mostrar la imagen si existe
    const noteImagePreview = document.getElementById("note-image-preview");
    if (note.image) {
        noteImagePreview.src = note.image;
        noteImagePreview.style.display = "block"; // Mostrar la imagen
    } else {
        noteImagePreview.style.display = "none"; // Ocultar si no hay imagen
    }
}

// Guardar los cambios de la nota
document.getElementById("edit-note-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const noteToEdit = JSON.parse(localStorage.getItem("noteToEdit")) || {};
    const index = notes.findIndex(note => note.id === noteToEdit.id);

    const updatedNote = {
        id: noteToEdit.id, // Mantenemos el mismo ID
        title: document.getElementById("note-title").value,
        content: document.getElementById("note-content").value,
        image: noteToEdit.image // Mantenemos la misma imagen para simplicidad
    };

    if (document.getElementById("note-image").files.length > 0) {
        const file = document.getElementById("note-image").files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
            updatedNote.image = event.target.result;
            notes[index] = updatedNote;
            localStorage.setItem("notes", JSON.stringify(notes)); // Guardar cambios en localStorage
            window.location.href = "notes.html"; // Redirigir a la página de notas
        };
        reader.readAsDataURL(file);
    } else {
        notes[index] = updatedNote;
        localStorage.setItem("notes", JSON.stringify(notes)); // Guardar cambios en localStorage
        window.location.href = "notes.html"; // Redirigir a la página de notas
    }
});

// Cargar los datos al inicio
window.onload = loadNoteToEdit;


