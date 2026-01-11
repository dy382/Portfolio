const buttons = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.item');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;

    items.forEach(item => {
      if (filter === 'all' || item.classList.contains(filter)) {
        item.style.display = 'block';
        item.classList.remove('hidden');
      } else {
        item.style.display = 'none';
      }
    });
  });
});

const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const img = entry.target;
      img.src = img.dataset.src;

      img.onload = () => {
        img.classList.add('loaded');
      };

      observer.unobserve(img);
    });
  },
  {
    rootMargin: '100px', // preload slightly before visible
    threshold: 0.1
  }
);

lazyImages.forEach(img => imageObserver.observe(img));

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

document.querySelectorAll('.item img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src || img.dataset.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent =
      img.closest('figure')?.querySelector('figcaption')?.textContent || '';
    lightbox.classList.add('active');
  });
});

// Close on click outside image
lightbox.addEventListener('click', (e) => {
  if (e.target !== lightboxImg) {
    lightbox.classList.remove('active');
  }
});

// Close on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    lightbox.classList.remove('active');
  }
});
