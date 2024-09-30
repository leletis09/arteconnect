document.addEventListener("DOMContentLoaded", () => {
    const searchIcon = document.querySelector(".search-icon");
    const searchForm = document.querySelector(".search-form");
    const menuIcon = document.querySelector(".menu-icon");
    const navbar = document.querySelector(".navbar");
  
    if (searchIcon) {
        searchIcon.addEventListener("click", () => {
            searchForm.classList.add("active");
            navbar.classList.remove("active");
        });
    } else {
        console.error("searchIcon não encontrado");
    }
  
    if (menuIcon) {
        menuIcon.addEventListener("click", () => {
            navbar.classList.add("active");
            searchForm.classList.remove("active");
        });
    } else {
        console.error("menuIcon não encontrado");
    }
  
    window.onscroll = () => {
        searchForm.classList.remove("active");
        navbar.classList.remove("active");
    };
  });
  
  
  document.addEventListener('DOMContentLoaded', () => {
      const registerScreen = document.getElementById('register-screen');
      const mainScreen = document.getElementById('main-screen');
      const registerForm = document.getElementById('register-form');
      const goToLogin = document.getElementById('go-to-login');
      const logoutButton = document.getElementById('logout');
  
      registerForm.addEventListener('submit', (event) => {
          event.preventDefault();
          // Aqui você pode adicionar a lógica de cadastro (por exemplo, salvar dados no localStorage)
          registerScreen.style.display = 'none';
          mainScreen.style.display = 'block';
      });
  
      goToLogin.addEventListener('click', (event) => {
          event.preventDefault();
          // Aqui você pode adicionar a lógica de navegação para a tela de login, se desejar
      });
  
      logoutButton.addEventListener('click', () => {
          // Aqui você pode adicionar a lógica de logout (por exemplo, limpar dados do localStorage)
          mainScreen.style.display = 'none';
          registerScreen.style.display = 'block';
      });
  });
  function togglemenu() {
    let submenu = document.getElementById("sub-menu-wrap"); // Correção: getElementById em vez de getElementsById
    submenu.classList.toggle("open-menu");
}