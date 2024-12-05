let username = '';
let currentUser = document.getElementById('currentUser');
let messagesContainer = document.getElementById('messages');
let messageInput = document.getElementById('messageInput');

// Comptes prédéfinis
const predefinedUsers = {
    "admin": { role: "admin", password: "adminpass" },
    "user1": { role: "user", password: "user1pass" },
    "user2": { role: "user", password: "user2pass" }
};

// Se connecter
function login() {
    username = document.getElementById('username').value;

    // Vérification si l'utilisateur existe dans les comptes prédéfinis
    if (username.trim() === "" || !predefinedUsers[username]) {
        alert('Utilisateur invalide ou non existant');
        return;
    }

    // Simuler une authentification avec un mot de passe pour plus de sécurité (optionnel)
    const password = prompt('Entrez votre mot de passe :');
    if (predefinedUsers[username].password !== password) {
        alert('Mot de passe incorrect');
        return;
    }

    // Sauvegarder l'utilisateur et son rôle dans la session
    localStorage.setItem('username', username);
    localStorage.setItem('role', predefinedUsers[username].role);

    document.getElementById('login').style.display = 'none';
    document.getElementById('chat').style.display = 'block';
    currentUser.textContent = username;

    loadMessages();
    setInterval(loadMessages, 2000); // Charger les nouveaux messages toutes les 2 secondes
}

// Déconnexion
function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('role');

    document.getElementById('login').style.display = 'block';
    document.getElementById('chat').style.display = 'none';
    username = '';
}

// Charger les messages
function loadMessages() {
    fetch('chat.php')
        .then(response => response.json())
        .then(messages => {
            messagesContainer.innerHTML = '';
            messages.reverse().forEach(message => {
                let messageElement = document.createElement('div');
                messageElement.classList.add('message');
                messageElement.innerHTML = `<strong>${message.username}:</strong> ${message.message}`;
                messagesContainer.appendChild(messageElement);
            });
        });
}

// Envoyer un message
function sendMessage() {
    let message = messageInput.value.trim();
    if (message === "") return;

    fetch('chat.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${username}&message=${message}`
    }).then(() => {
        messageInput.value = '';
        loadMessages(); // Recharger les messages après envoi
    });
}
