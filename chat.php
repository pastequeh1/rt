<?php
include 'db.php';

// Récupérer tous les messages depuis la base de données
function getMessages() {
    global $pdo;
    $stmt = $pdo->query("SELECT * FROM messages ORDER BY created_at DESC");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Ajouter un message
if (isset($_POST['username']) && isset($_POST['message'])) {
    $username = $_POST['username'];
    $message = $_POST['message'];

    $stmt = $pdo->prepare("INSERT INTO messages (username, message) VALUES (?, ?)");
    $stmt->execute([$username, $message]);
}

// Récupérer les messages
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    echo json_encode(getMessages());
}
?>
