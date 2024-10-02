<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "artconnect";

// Conectar ao banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Receber dados do formulário de login
$usuario = $_POST['usuario'];
$senha = $_POST['senha'];

// Verificar se o usuário existe
$sql = "SELECT * FROM usuarios WHERE usuario = '$usuario'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    // Verificar se a senha está correta
    if (password_verify($senha, $row['senha'])) {
        echo json_encode(['status' => 'success', 'message' => 'Login realizado com sucesso']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Senha incorreta']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Usuário não encontrado']);
}

$conn->close();
?>
