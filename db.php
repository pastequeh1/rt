<?php
$host = 'localhost';
$dbname = 'chat_app';  // Assurez-vous que c'est le même nom que la base de données que vous avez créée
$username = 'root';    // Par défaut, l'utilisateur MySQL sur XAMPP est 'root'
$password = '';        // Par défaut, le mot de passe est vide

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion à la base de données : " . $e->getMessage());
}
?>
