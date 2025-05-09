document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for internal links
  const links = document.querySelectorAll('.navbar a');
  links.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Update year in footer if element is present
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
const API_KEY = '6114b43f4d4844d088768d7353454172';
fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=10`)
  .then(res => res.json())
  .then(data => {
    const gamesDiv = document.getElementById('games');
    data.results.forEach(game => {
      // Obtener la descripción del juego
      fetch(`https://api.rawg.io/api/games/${game.id}?key=${API_KEY}`)
        .then(res => res.json())
        .then(gameDetails => {
          const description = gameDetails.description_raw || 'No hay descripción disponible';
          const shortDescription = description.length > 200 ? description.substring(0, 200) + '...' : description;
          
          gamesDiv.innerHTML += `
            <div class="card game-card">
              <div class="game-header">
                <div class="game-image-container">
                  <img src="${game.background_image}" alt="${game.name}" class="game-image">
                </div>
                <div class="game-info">
                  <h3 class="game-title">${game.name}</h3>
                  <p class="game-rating">⭐ Calificación: ${game.rating}/5</p>
                </div>
              </div>
              <p class="game-description">${shortDescription}</p>
            </div>`;
        });
    });
  });
 // Función para obtener la imagen del juego usando la API de RAWG
 async function getGameImage(gameTitle) {
  const API_KEY = '6114b43f4d4844d088768d7353454172';
  try {
    const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(gameTitle)}&page_size=1`);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].background_image;
    }
    return 'https://via.placeholder.com/200x150?text=No+Image';
  } catch (error) {
    console.error('Error fetching game image:', error);
    return 'https://via.placeholder.com/200x150?text=No+Image';
  }
}

// Función para calcular el descuento
function calculateDiscount(normalPrice, salePrice) {
  const discount = ((normalPrice - salePrice) / normalPrice) * 100;
  return Math.round(discount);
}

// Cargar las ofertas
fetch('https://www.cheapshark.com/api/1.0/deals?upperPrice=15')
  .then(res => res.json())
  .then(async data => {
    const dealsDiv = document.getElementById('deals');
    const deals = data.slice(0, 10);
    
    for (const deal of deals) {
      const gameImage = await getGameImage(deal.title);
      const discount = calculateDiscount(deal.normalPrice, deal.salePrice);
      
      dealsDiv.innerHTML += `
        <div class="deal-card">
          <div class="deal-header">
            <div class="game-image-container">
              <img src="${gameImage}" alt="${deal.title}" class="game-image">
            </div>
            <div class="deal-info">
              <h3 class="deal-title">${deal.title}</h3>
              <div class="deal-price">
                <span class="original-price">$${deal.normalPrice}</span>
                <span class="sale-price">$${deal.salePrice}</span>
                <span class="discount">-${discount}%</span>
              </div>
              <a href="https://www.cheapshark.com/redirect?dealID=${deal.dealID}" target="_blank" class="btn-comprar">Comprar Ahora</a>
            </div>
          </div>
        </div>`;
    }
  });

  const videos = [
    {
      id: 'oYlsmbxTVM4',
      title: 'God of War Ragnarök - Gameplay',
      description: 'Explora los reinos nórdicos en esta épica aventura de Kratos y Atreus. Descubre nuevos poderes, enfrenta dioses y resuelve misterios en este gameplay completo.',
      views: '2.5M',
      date: '2023-11-15',
      tags: ['God of War', 'PS5', 'Aventura']
    },
    {
      id: 'AT5PlpAKo0I',
      title: 'Elden Ring - Boss Fight',
      description: 'Enfrenta a los jefes más desafiantes de Elden Ring en este gameplay intenso. Aprende estrategias y técnicas para vencer a los enemigos más difíciles.',
      views: '1.8M',
      date: '2023-10-20',
      tags: ['Elden Ring', 'Souls-like', 'Boss Fight']
    },
    {
      id: '4T6_NvTOElg',
      title: 'Cyberpunk 2077 - Misión Principal',
      description: 'Sumérgete en Night City y sigue la historia principal de V en este gameplay inmersivo. Explora la ciudad, completa misiones y toma decisiones que afectarán tu historia.',
      views: '3.2M',
      date: '2023-12-01',
      tags: ['Cyberpunk 2077', 'RPG', 'Open World']
    }
  ];

  // Función para formatear la fecha
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  }

  // Cargar los videos
  function loadVideos() {
    const videosDiv = document.getElementById('videos');
    videosDiv.innerHTML = ''; // Limpiar el loading

    videos.forEach(video => {
      videosDiv.innerHTML += `
        <div class="video-card">
          <div class="video-container">
            <iframe 
              src="https://www.youtube.com/embed/${video.id}?si=r3_SwasKwqx4XGeR" 
              allowfullscreen>
            </iframe>
          </div>
          <div class="video-info">
            <h3 class="video-title">${video.title}</h3>
            <p class="video-description">${video.description}</p>
            <div class="video-meta">
              <span class="video-views">👁️ ${video.views} vistas</span>
              <span class="video-date">📅 ${formatDate(video.date)}</span>
            </div>
            <div class="video-tags">
              ${video.tags.map(tag => `<span class="video-tag">#${tag}</span>`).join('')}
            </div>
          </div>
        </div>
      `;
    });
  }

  // Cargar los videos cuando la página esté lista
  document.addEventListener('DOMContentLoaded', loadVideos);

  // Menú hamburguesa
  const hamburger = document.querySelector('.hamburger');
  const navbar = document.querySelector('.navbar');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbar.classList.toggle('active');
  });

  // Cerrar el menú al hacer clic en un enlace
  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navbar.classList.remove('active');
    });
  });