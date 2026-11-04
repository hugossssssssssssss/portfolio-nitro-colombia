/**
 * Nitro Colombia 2026 - Portfolio Web Application
 * Handles scroll reveal animations, real-time scroll progress bar,
 * sticky header state, and interactive crop/dosage table explorer.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initHeaderScroll();
  initScrollReveal();
  initDosesTable();
  initSmoothScrollLinks();
});

/* ==========================================================================
   1. Real-time Scroll Progress Bar
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/* ==========================================================================
   2. Sticky Header Scrolled State
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleHeader = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeader, { passive: true });
  handleHeader();
}

/* ==========================================================================
   3. IntersectionObserver Scroll Reveal
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Once visible, keep it visible
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   4. Interactive Crop & Dosage Explorer
   ========================================================================== */

// Embedded full dataset for guaranteed instant availability across protocols (file:// or https://)
const colombiaProductsData = [
  {
    product: "MIDAS",
    line: "Nutrición de Suelo",
    crop: "Café",
    cropCategory: "cafe",
    dose: "20 a 60 kg/ha",
    timing: "Aplicación al suelo en post-floración o llenado de grano. Liberación gradual de azufre (90%)."
  },
  {
    product: "MIDAS",
    line: "Nutrición de Suelo",
    crop: "Caña de Azúcar",
    cropCategory: "cana",
    dose: "20 a 60 kg/ha",
    timing: "Aplicación al momento de la siembra o en soca. Corrige y construye perfil de azufre."
  },
  {
    product: "MIDAS",
    line: "Nutrición de Suelo",
    crop: "Soya y Maíz",
    cropCategory: "soya",
    dose: "20 a 60 kg/ha",
    timing: "En surco de siembra o al voleo en pre-siembra. Aumenta la asimilación del nitrógeno."
  },
  {
    product: "MIDAS",
    line: "Nutrición de Suelo",
    crop: "Frutales y Hortalizas",
    cropCategory: "frutales",
    dose: "20 a 60 kg/ha",
    timing: "En inicio de lluvias o según la demanda del ciclo. Gránulos homogéneos sin segregación."
  },
  {
    product: "MIDAS+",
    line: "Nutrición de Suelo",
    crop: "Café y Frutales",
    cropCategory: "cafe",
    dose: "20 a 60 kg/ha",
    timing: "Aplicación al inicio de ciclo vegetativo. Aporte conjunto de S (80%), Boro (1%), Zinc (2%) y Cobre (0,5%)."
  },
  {
    product: "MIDAS+",
    line: "Nutrición de Suelo",
    crop: "Caña de Azúcar",
    cropCategory: "cana",
    dose: "20 a 60 kg/ha",
    timing: "En aporque o junto al abonado de cobertura. Sin pérdidas por lixiviación."
  },
  {
    product: "MIDAS+",
    line: "Nutrición de Suelo",
    crop: "Soya y Maíz",
    cropCategory: "soya",
    dose: "20 a 60 kg/ha",
    timing: "Al voleo o en surco junto al fertilizante NPK. Micronutrientes y azufre en el mismo gránulo."
  },
  {
    product: "NITRO SUPPORT",
    line: "Fisiología Vegetal",
    crop: "Soya y Leguminosas",
    cropCategory: "soya",
    dose: "100 a 150 mL / 100 kg semilla",
    timing: "Tratamiento de semillas. Máxima fijación biológica de N con Cobalto (1,5%) y Molibdeno (10%)."
  },
  {
    product: "NITRO SUPPORT",
    line: "Fisiología Vegetal",
    crop: "Maíz y Sorgo",
    cropCategory: "soya",
    dose: "150 a 200 mL / 100 kg semilla",
    timing: "Tratamiento de semillas on-farm o industrial. Rápido enraizamiento y emergencia uniforme."
  },
  {
    product: "NITRO SUPPORT",
    line: "Fisiología Vegetal",
    crop: "Aplicación en Surco",
    cropCategory: "all",
    dose: "200 a 400 mL/ha",
    timing: "Aplicación en el surco de siembra para favorecer la colonización radicular profunda."
  },
  {
    product: "SUSTENT",
    line: "Fisiología Vegetal",
    crop: "Café",
    cropCategory: "cafe",
    dose: "0,3 a 0,4 kg/ha",
    timing: "2 a 3 aplicaciones foliares en post-floración, crecimiento del fruto y cuajado."
  },
  {
    product: "SUSTENT",
    line: "Fisiología Vegetal",
    crop: "Caña de Azúcar",
    cropCategory: "cana",
    dose: "0,4 a 0,5 kg/ha",
    timing: "1 a 2 aplicaciones foliares en pleno crecimiento vegetativo. Prolonga el área foliar activa."
  },
  {
    product: "SUSTENT",
    line: "Fisiología Vegetal",
    crop: "Soya y Maíz",
    cropCategory: "soya",
    dose: "0,2 a 0,3 kg/ha",
    timing: "Aplicación foliar en etapas V3-V5 en soya y 30 DAE en maíz. Alta solubilidad (450 g/L)."
  },
  {
    product: "SUSTENT",
    line: "Fisiología Vegetal",
    crop: "Frutales y Hortalizas",
    cropCategory: "frutales",
    dose: "0,2 a 0,5 kg/ha",
    timing: "2 a 3 aplicaciones foliares en pre y post-floración. Potencia la tasa fotosintética."
  },
  {
    product: "COMPAT Manganeso",
    line: "Quelatos EDTA",
    crop: "Café y Granos",
    cropCategory: "cafe",
    dose: "0,5 a 1,0 kg/ha",
    timing: "1 a 2 aplicaciones a partir del desarrollo vegetativo activo. Síntesis de clorofila y resistencia."
  },
  {
    product: "COMPAT Cobre",
    line: "Quelatos EDTA",
    crop: "Frutales y Café",
    cropCategory: "frutales",
    dose: "100 a 500 g/ha",
    timing: "1 a 3 aplicaciones desde botón floral y brotaciones. Fortalecimiento de pared celular."
  },
  {
    product: "COMPAT Zinc",
    line: "Quelatos EDTA",
    crop: "Maíz, Café y Frutales",
    cropCategory: "soya",
    dose: "0,5 a 1,5 kg/ha",
    timing: "Pre-floración y vegetativo temprano. Precursor de auxinas para elongación de entrenudos."
  },
  {
    product: "COMPAT Hierro",
    line: "Quelatos EDTA",
    crop: "Hortalizas y Frutales",
    cropCategory: "hortalizas",
    dose: "100 a 500 g/ha",
    timing: "Corrección foliar inmediata de clorosis férrica y reactivación del transporte de electrones."
  },
  {
    product: "SPEED Base",
    line: "Nutrición Foliar",
    crop: "Soya, Maíz y Café",
    cropCategory: "cafe",
    dose: "1,0 a 2,0 kg/ha",
    timing: "Aportes equilibrados de K₂O (10%), Mn (14%), Zn (5%) y Azufre (12,4%) en floración y cuajado."
  },
  {
    product: "SPEED Caña",
    line: "Nutrición Foliar",
    crop: "Caña de Azúcar",
    cropCategory: "cana",
    dose: "1,0 a 3,0 kg/ha",
    timing: "Pulverización sobre trozas de siembra y 1 a 3 aplicaciones durante el ciclo vegetativo."
  },
  {
    product: "SPEED Citros",
    line: "Nutrición Foliar",
    crop: "Cítricos y Frutales",
    cropCategory: "frutales",
    dose: "2,0 a 3,0 kg/ha",
    timing: "Desde brotación vegetativa hasta el llenado del fruto. Estimula vigor y calidad de cáscara."
  },
  {
    product: "PROPON",
    line: "Adyuvante Antideriva",
    crop: "Todos los Cultivos (Terrestre)",
    cropCategory: "all",
    dose: "30 a 50 mL / 100 L",
    timing: "En todas las aplicaciones foliares terrestres con fungicidas, herbicidas o bioestimulantes."
  },
  {
    product: "PROPON",
    line: "Adyuvante Antideriva",
    crop: "Todos los Cultivos (Aéreo)",
    cropCategory: "all",
    dose: "50 a 100 mL/ha",
    timing: "Calibración estricta para bajo y ultrabaixo volumen. Control de deriva y emulsión homogénea."
  }
];

function initDosesTable() {
  const tbody = document.getElementById('doses-tbody');
  const buttons = document.querySelectorAll('.filter-btn');
  if (!tbody || !buttons.length) return;

  function renderRows(filteredList) {
    tbody.innerHTML = '';
    filteredList.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="product-cell">${escapeHtml(item.product)}</td>
        <td><span class="crop-tag">${escapeHtml(item.line)}</span></td>
        <td><strong>${escapeHtml(item.crop)}</strong></td>
        <td><span class="dose-chip">${escapeHtml(item.dose)}</span></td>
        <td>${escapeHtml(item.timing)}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Initial full render
  renderRows(colombiaProductsData);

  // Button filtering logic
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const crop = btn.dataset.crop;
      if (crop === 'all') {
        renderRows(colombiaProductsData);
      } else {
        const filtered = colombiaProductsData.filter(d => 
          d.cropCategory === crop || d.cropCategory === 'all' || d.crop.toLowerCase().includes(crop)
        );
        renderRows(filtered);
      }
    });
  });

  // Connect "Ver Tabla de Dosis" card buttons
  document.querySelectorAll('.btn-card-dose').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetName = link.dataset.target;
      if (!targetName) return;

      const matchedRows = colombiaProductsData.filter(item => 
        item.product.toLowerCase().includes(targetName.replace('-', ' '))
      );

      if (matchedRows.length > 0) {
        buttons.forEach(b => b.classList.remove('active'));
        renderRows(matchedRows);
      }
    });
  });
}

/* ==========================================================================
   5. Smooth Scroll Navigation
   ========================================================================== */
function initSmoothScrollLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}
