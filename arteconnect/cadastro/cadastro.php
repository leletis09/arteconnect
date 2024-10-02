<?php
$servername = "localhost"; 
$username = "root";
$password = "";
$dbname = "artconnect";

// Conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

$usuario = $_POST['usuario'];
$senha = password_hash($_POST['senha'], PASSWORD_BCRYPT); // Senha criptografada
$tipo_usuario = $_POST['tipo_usuario']; // 'artista', 'empresa', ou 'comum'

// Verificar se o usuário já existe
$sql = "SELECT * FROM usuarios WHERE usuario = '$usuario'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Usuário já cadastrado']);
} else {
    $stmt = $conn->prepare("INSERT INTO usuarios (usuario, senha, tipo_usuario) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $usuario, $senha, $tipo_usuario);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Usuário cadastrado com sucesso']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Erro ao cadastrar usuário']);
    }

    $stmt->close();
}

$conn->close();
?>
