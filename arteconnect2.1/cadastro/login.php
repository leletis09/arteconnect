<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "artconnect";

// Conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Falha na conexão com o banco de dados.']));
}

// Receber dados do formulário de login
$usuario = $_POST['usuario'];
$senha = $_POST['senha'];

// Procurar o usuário no banco de dados
$sql = "SELECT * FROM usuarios WHERE usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $usuario);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    // Verificar se a senha está correta
    if (password_verify($senha, $row['senha'])) {
        echo json_encode(['status' => 'success', 'message' => 'Login realizado com sucesso!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Senha incorreta.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Usuário não encontrado.']);
}

$stmt->close();
$conn->close();
?>
