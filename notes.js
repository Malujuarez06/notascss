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
    // Redirigir a la página de editar con los detalles de la nota
    localStorage.setItem("noteToEdit", JSON.stringify(note));
    window.location.href = "edit-note.html"; // Redirige a la página de edición
}

// Función para eliminar una nota
function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes)); // Guardar cambios en localStorage
    renderNotes(); // Volver a mostrar las notas
}

// Función para generar un PDF de una nota
function generatePdf(index) {
    const note = notes[index];
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Añadir un marco al PDF
    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const usablePageWidth = pageWidth - 2 * margin;
    const usablePageHeight = pageHeight - 2 * margin;

    // Dibujar el marco
    doc.setDrawColor(0);
    doc.setLineWidth(1);
    doc.rect(margin, margin, usablePageWidth, usablePageHeight);

    // Centrar el título
    const titleX = pageWidth / 2;
    const titleY = margin + 20;
    doc.setFontSize(16);
    doc.text(note.title, titleX, titleY, { align: 'center' });

    // Añadir contenido
    doc.setFontSize(12);
    doc.text(note.content, margin + 10, titleY + 20);

    // Añadir imagen
    if (note.image) {
        const img = new Image();
        img.src = note.image;
        img.onload = function () {
            const imgWidth = usablePageWidth / 2; // Reducir el ancho de la imagen
            const imgHeight = (img.height / img.width) * imgWidth; // Mantener la relación de aspecto
            doc.addImage(img, 'JPEG', margin + 10, titleY + 40, imgWidth, imgHeight); // Ajusta el tamaño de la imagen
            doc.save(`${note.title}.pdf`); // Guardar el PDF con el título de la nota
        };
    } else {
        doc.save(`${note.title}.pdf`); // Si no tiene imagen, solo guarda el contenido de texto
    }
}

// Función para buscar las notas
function searchNotes() {
    const searchQuery = document.getElementById("search").value.toLowerCase();
    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(searchQuery));
    renderFilteredNotes(filteredNotes);
}

// Función para renderizar notas filtradas
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
    localStorage.removeItem('loggedIn'); // Eliminar la sesión almacenada
    window.location.href = 'login.html'; // Redirigir al login
}

// Iniciar la carga de notas al cargar la página
window.onload = renderNotes;
