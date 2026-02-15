// Google Places Reviews Loader
// Place ID voor KAHU Dog Walk: ChIJsYG8nELhx0cR3jzAdO7_K3M

const PLACE_ID = 'ChIJsYG8nELhx0cR3jzAdO7_K3M';
const API_KEY = 'YOUR_GOOGLE_PLACES_API_KEY'; // Vervang met je eigen API key

async function loadGoogleReviews() {
  // Check if API key is set
  if (API_KEY === 'YOUR_GOOGLE_PLACES_API_KEY') {
    console.warn('Google Places API key not set - using fallback reviews');
    return;
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${API_KEY}`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.result.reviews) {
      renderReviews(data.result.reviews);
    }
  } catch (error) {
    console.error('Error loading Google reviews:', error);
  }
}

function renderReviews(reviews) {
  const container = document.querySelector('.testimonials-grid');
  if (!container) return;

  container.innerHTML = reviews.slice(0, 3).map(review => `
    <div class="testimonial-card reveal">
      <div class="testimonial-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
      <p>"${review.text}"</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${review.author_name.charAt(0)}</div>
        <div>
          <div class="testimonial-name">${review.author_name}</div>
          <div class="testimonial-date">${new Date(review.time * 1000).toLocaleDateString('nl-NL')}</div>
        </div>
      </div>
      <div class="testimonial-source">
        <img src="https://www.google.com/images/branding/product/1x/maps_32dp.png" alt="Google" style="width: 16px; height: 16px; margin-right: 4px;">
        Google Review
      </div>
    </div>
  `).join('');

  // Re-trigger reveal animations
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('active');
  });
}

// Load reviews when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadGoogleReviews);
} else {
  loadGoogleReviews();
}
