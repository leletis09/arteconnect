<?php
$servername = "localhost";
$username = "root";
$password = "123456";
$dbname = "galeria_arte";

// Conectar ao banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

if (isset($_POST['post_id'])) {
    $post_id = $_POST['post_id'];

    // Atualiza o número de likes
    $sql = "UPDATE posts SET likes = likes + 1 WHERE id = $post_id";
    
    if ($conn->query($sql) === TRUE) {
        $result = $conn->query("SELECT likes FROM posts WHERE id = $post_id");
        $row = $result->fetch_assoc();
        echo json_encode(["likes" => $row['likes']]);
    } else {
        echo "Erro: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
