// REGISTRO DE USUARIO
document.getElementById('registerForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe normalmente
    
    // Obtener los valores de los campos
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    // Validación básica (puedes agregar más validaciones aquí)
    if (email && password) {
        // Guardar la información en el localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(user => user.email === email)) {
            alert('Este correo ya está registrado.');
        } else {
            users.push({ email, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registro exitoso. Ahora inicia sesión.');
            window.location.href = 'login.html';
        }
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

// LOGIN DE USUARIO
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe normalmente
    
    // Obtener los valores de los campos
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar si el usuario existe
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        // Guardar sesión iniciada
        localStorage.setItem('loggedIn', email);
        window.location.href = 'notes.html'; // Redirige a la página de notas
    } else {
        alert('Correo o contraseña incorrectos.');
    }
});
