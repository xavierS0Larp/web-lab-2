/**
 * เปรม นมสด - Prem Nomsod | Landing Page Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Hamburger Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  // 2. Navbar Scroll Effect & Scrollspy
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar style on scroll
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }

    // Scrollspy for navigation
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetLink.classList.add('active');
        } else {
          targetLink.classList.remove('active');
        }
      }
    });
  });

  // Back to top click event
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. Store Opening Hours Dynamic Status Check (17:00 - 22:00)
  function checkStoreStatus() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    const openTimeInMinutes = 17 * 60; // 17:00
    const closeTimeInMinutes = 22 * 60; // 22:00

    const isOpen = currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes;

    const navStatusBadge = document.getElementById('navStatusBadge');
    const infoStatusBadge = document.getElementById('infoStatusAlert');

    if (isOpen) {
      if (navStatusBadge) {
        navStatusBadge.className = 'status-badge open';
        navStatusBadge.innerHTML = `<span class="status-dot"></span> ขณะนี้ร้านเปิดบริการ (17:00 - 22:00)`;
      }
      if (infoStatusBadge) {
        infoStatusBadge.className = 'info-status-alert open';
        infoStatusBadge.innerHTML = `🟢 <strong>ขณะนี้ร้านเปิดให้บริการอยู่!</strong> แวะมาสัมผัสนมสดแท้และปังปิ้งร้อนๆ ได้เลยครับ`;
      }
    } else {
      if (navStatusBadge) {
        navStatusBadge.className = 'status-badge closed';
        navStatusBadge.innerHTML = `<span class="status-dot"></span> ปิดบริการชั่วคราว (เปิด 17:00 น.)`;
      }
      if (infoStatusBadge) {
        infoStatusBadge.className = 'info-status-alert closed';
        infoStatusBadge.innerHTML = `🔴 <strong>ขณะนี้ร้านปิดบริการ</strong> เปิดให้บริการเวลา 17:00 - 22:00 น. เจอกันตอนเย็นนะครับ!`;
      }
    }
  }

  checkStoreStatus();
  // Recheck status every 60 seconds
  setInterval(checkStoreStatus, 60000);

  // 4. Menu Filtering Tabs
  const menuTabBtns = document.querySelectorAll('.menu-tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  menuTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      menuTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      menuCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Lightbox Modal for Gallery Images
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightbox && lightboxImg && lightboxClose) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-overlay h4')?.innerText || '';
        const desc = item.querySelector('.gallery-overlay p')?.innerText || '';

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.innerHTML = `<strong>${title}</strong><br><small style="color: #cbd5e1;">${desc}</small>`;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent scrolling
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }
});

// Keyframe animation dynamically attached
const styleEl = document.createElement('style');
styleEl.innerHTML = `
  @keyframes fadeInCard {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleEl);
