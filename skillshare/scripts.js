

//botao PgUp
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

document.getElementById("acessibilidade").addEventListener("click", function() {
  var menuOptions = document.getElementById("menuOptions");
  
  if (menuOptions.style.opacity === "0" || menuOptions.style.opacity === "") {
    menuOptions.style.display = "block";
    setTimeout(function() {
      menuOptions.style.opacity = "1";
    }, 10);
  } else {
    menuOptions.style.opacity = "0";
    setTimeout(function() {
      menuOptions.style.display = "none";
    }, 300);
  }
});

// Função para alternar o modo escuro
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Selecionar o botão de acessibilidade do modo escuro
document.querySelector(".option2").addEventListener("click", toggleDarkMode);

// Variáveis para armazenar o estado atual e a ordem dos modos
const modes = ['normal-mode', 'protanopia-mode', 'deuteranopia-mode', 'tritanopia-mode'];
const modeNames = ['Normal', 'Protanopia', 'Deuteranopia', 'Tritanopia'];
let currentModeIndex = 0;

// Função para alternar entre os modos de daltonismo
function toggleDaltonismo() {
  const content = document.querySelector('.conteudo-principal');
  
  // Remove a classe do modo atual
  content.classList.remove(modes[currentModeIndex]);

  // Atualiza o índice para o próximo modo
  currentModeIndex = (currentModeIndex + 1) % modes.length;

  // Adiciona a classe do próximo modo
  content.classList.add(modes[currentModeIndex]);

  // Exibe a notificação com o nome do modo atual
  showNotification(modeNames[currentModeIndex]);
}

// Função para exibir a notificação
function showNotification(modeName) {
    const notification = document.getElementById('notification');
    notification.textContent = `Modo Daltonismo: ${modeName}`;
    
    // Adiciona a classe para mostrar o pop-up
    notification.classList.add('show');

    // Oculta a notificação após 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// Adiciona um listener de evento ao botão para alternar os modos
document.getElementById('toggle-daltonismo').addEventListener('click', toggleDaltonismo);