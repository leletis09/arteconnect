document.addEventListener('DOMContentLoaded', () => {
    const likeBtn = document.querySelector('.like-btn');
    const likeCount = document.querySelector('.like-count');
    const submitComment = document.getElementById('submit-comment');
    const commentInput = document.getElementById('comment-input');
    const commentsList = document.querySelector('.comments-list');

    let isLiked = false;
    let likeCounter = 500; // Número inicial de curtidas

    // Função para curtir e descurtir a postagem
    likeBtn.addEventListener('click', () => {
        if (isLiked) {document.addEventListener('DOMContentLoaded', () => {
            const fileInput = document.getElementById('file-input');
            const uploadBtn = document.getElementById('upload-btn');
            const gallery = document.getElementById('gallery');
        
            // Função para lidar com upload de imagem
            uploadBtn.addEventListener('click', () => {
                const file = fileInput.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const imageUrl = event.target.result;
                        addPostToGallery(imageUrl);
                        fileInput.value = ''; // Limpar campo de arquivo após upload
                    };
                    reader.readAsDataURL(file);
                } else {
                    alert("Por favor, selecione uma imagem.");
                }
            });
        
            // Função para adicionar post na galeria
            function addPostToGallery(imageUrl) {
                const post = document.createElement('div');
                post.classList.add('post');
        
                // Estrutura do post
                post.innerHTML = `
                    <img src="${imageUrl}" alt="Postagem de Arte">
                    <button class="like-btn" aria-label="Curtir postagem">❤️</button>
                    <span class="like-count">0 curtidas</span>
                `;
        
                // Adicionar funcionalidade de curtir
                const likeBtn = post.querySelector('.like-btn');
                const likeCount = post.querySelector('.like-count');
                let likeCounter = 0;
                let isLiked = false;
        
                likeBtn.addEventListener('click', () => {
                    if (!isLiked) {
                        likeCounter++;
                        likeBtn.classList.add('liked');
                        likeBtn.textContent = '💔';
                    } else {
                        likeCounter--;
                        likeBtn.classList.remove('liked');
                        likeBtn.textContent = '❤️';
                    }
                    isLiked = !isLiked;
                    likeCount.textContent = `${likeCounter} curtidas`;
                });
        
                // Inserir o post na galeria
                gallery.appendChild(post);
            }
        });
        
            likeCounter--;
            likeBtn.textContent = '❤️';
        } else {
            likeCounter++;
            likeBtn.textContent = '💔';
        }
        isLiked = !isLiked;
        likeCount.textContent = `${likeCounter} curtidas`;
    });

    // Função para adicionar comentário
    submitComment.addEventListener('click', () => {
        const commentText = commentInput.value;
        if (commentText.trim() !== '') {
            const newComment = document.createElement('p');
            newComment.textContent = commentText;
            commentsList.appendChild(newComment);
            commentInput.value = ''; // Limpa o campo de texto após adicionar o comentário
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const uploadBtn = document.getElementById('upload-btn');
    const gallery = document.getElementById('gallery');

    // Função para carregar as postagens ao iniciar a página
    async function loadPosts() {
        const response = await fetch('get_posts.php');
        const posts = await response.json();
        gallery.innerHTML = '';
        posts.forEach(post => {
            addPostToGallery(post);
        });
    }

    // Função para adicionar post à galeria
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

    // Função para curtir uma postagem
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

    // Função para lidar com o upload de imagem
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
        fileInput.value = ''; // Limpar o campo de arquivo após o upload
    });

    // Carregar os posts ao iniciar
    loadPosts();
});
