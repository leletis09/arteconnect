document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const uploadBtn = document.getElementById('upload-btn');
    const gallery = document.getElementById('gallery');

    // Carregar posts ao iniciar a página
    async function loadPosts() {
        const response = await fetch('get_posts.php');
        const posts = await response.json();
        gallery.innerHTML = '';
        posts.forEach(post => {
            addPostToGallery(post);
        });
    }

    // Adicionar um post à galeria
    function addPostToGallery(post) {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <img src="${post.image_url}" alt="Postagem de Arte">
            <button class="like-btn" data-id="${post.id}" aria-label="Curtir postagem">❤️</button>
            <span class="like-count">${post.likes} curtidas</span>
        `;
        gallery.appendChild(postDiv);

        // Evento de curtir postagem
        const likeBtn = postDiv.querySelector('.like-btn');
        likeBtn.addEventListener('click', () => {
            likePost(post.id, postDiv);
        });
    }

    // Curtir uma postagem
    async function likePost(id, postDiv) {
        const formData = new FormData();
        formData.append('post_id', id);

        const response = await fetch('like.php', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        const likeCount = postDiv.querySelector('.like-count');
        likeCount.textContent = `${data.likes} curtidas`;
    }

    // Lidar com o upload de imagem
    uploadBtn.addEventListener('click', async () => {
        const file = fileInput.files[0];
        const username = prompt('Digite seu nome de usuário:');
        if (!file || !username) {
            alert('Por favor, selecione uma imagem e insira seu nome de usuário.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);
        formData.append('username', username);

        const response = await fetch('upload.php', {
            method: 'POST',
            body: formData
        });

        const newPost = await response.json();
        addPostToGallery(newPost);
        fileInput.value = ''; // Limpar campo de arquivo após o upload
    });

    // Carregar posts ao iniciar
    loadPosts();
});
