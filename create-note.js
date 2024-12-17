document.getElementById("create-note-form").addEventListener("submit", function(event) {
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
                image: e.target.result // Guardar la imagen como una URL de base64
            };
            const notes = JSON.parse(localStorage.getItem("notes")) || [];
            notes.push(newNote);
            localStorage.setItem("notes", JSON.stringify(notes));
            window.location.href = "notes.html"; // Redirigir a la página principal de notas
        };
        if (imageFile) {
            reader.readAsDataURL(imageFile); // Cargar la imagen como una URL base64
        } else {
            const newNote = { title, content, image: "" };
            const notes = JSON.parse(localStorage.getItem("notes")) || [];
            notes.push(newNote);
            localStorage.setItem("notes", JSON.stringify(notes));
            window.location.href = "notes.html"; // Redirigir a la página principal de notas
        }
    }
});