// Registro de usuario
function register() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    if (email && password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.find(user => user.email === email);

        if (userExists) {
            alert('Este correo ya está registrado.');
        } else {
            // Guardamos al nuevo usuario
            users.push({ email, password });
            localStorage.setItem('users', JSON.stringify(users));

            alert('Registro exitoso. Ahora inicia sesión.');

            // Redirigir al login después del registro exitoso
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
    
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        localStorage.setItem('loggedIn', email);
        window.location.href = 'notes.html'; // Redirigir a la página de notas
    } else {
        alert('Correo o contraseña incorrectos.');
    }
});