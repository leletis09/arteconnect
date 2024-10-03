<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "artconnect";

// Conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Falha na conexão com o banco de dados.']));
}

// Receber os dados do formulário
$usuario = $_POST['usuario'];
$senha = password_hash($_POST['senha'], PASSWORD_BCRYPT); // Criptografar a senha
$area = $_POST['area'];
$estilo = $_POST['estilo'];
$tipo_usuario = $_POST['tipo_usuario'];

// Verificar se o usuário já existe
$sql = "SELECT * FROM usuarios WHERE usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $usuario);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Usuário já cadastrado.']);
} else {
    // Inserir novo usuário
    $sql = "INSERT INTO usuarios (usuario, senha, area, estilo, tipo_usuario) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $usuario, $senha, $area, $estilo, $tipo_usuario);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Usuário cadastrado com sucesso!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Erro ao cadastrar usuário.']);
    }
}

$stmt->close();
$conn->close();
?>
