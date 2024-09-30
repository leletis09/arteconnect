// "https://cdn.jsdelivr.net/npm/sweetalert2@11.14.1/dist/sweetalert2.all.min.js"

function LoginNormal() {
  window.location.href = "cadastro.html";
  }

  function LoginArtista() {
    window.location.href = "artista.html";
 }


function LoginEmpresa() {
  window.location.href = "empresa.html";
  }


function Login() {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    if (usuario === "josue" || senha === "111") {
        window.location.href = "cadastro.html";
        return true;
    }
    else {
    alert("Por favor, preencha todos os campos.");
    return false; // Retorna false para evitar o redirecionamento}
}
}