<?php
$servername = "localhost";
$username = "root"; // Substitua pelo nome de usuário do seu banco de dados
$password = "123456"; // Substitua pela sua senha do banco de dados
$dbname = "galeria_arte";

// Conectar ao banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Verifica se há um arquivo sendo enviado
if (isset($_FILES['image'])) {
    $username = $_POST['username'];
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["image"]["name"]);
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Verifica se o arquivo é uma imagem
    $check = getimagesize($_FILES["image"]["tmp_name"]);
    if ($check === false) {
        echo "Arquivo não é uma imagem.";
        exit;
    }

    // Verifica se o arquivo já existe
    if (file_exists($target_file)) {
        echo "Desculpe, o arquivo já existe.";
        exit;
    }

    // Limita o tipo de arquivo
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
        echo "Apenas arquivos JPG, JPEG e PNG são permitidos.";
        exit;
    }

    // Move o arquivo para a pasta de uploads
    if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
        // Insere o post no banco de dados
        $sql = "INSERT INTO posts (username, image_url) VALUES ('$username', '$target_file')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode([
                "id" => $conn->insert_id,
                "username" => $username,
                "image_url" => $target_file,
                "likes" => 0
            ]);
        } else {
            echo "Erro: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "Desculpe, houve um erro ao enviar o arquivo.";
    }
}

$conn->close();
?>
