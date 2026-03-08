const IG_HANDLE = 'lianjj.chiu';
  const IG_DM_URL = `https://ig.me/m/${IG_HANDLE}`;

  // ── TOAST helper ──
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.style.opacity = '1';
    t.style.transform = 'translateX(-50%) translateY(0)';
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateX(-50%) translateY(20px)';
    }, 2200);
  }

  // ── DM TO BUY buttons ──
  document.querySelectorAll('.dm-btn:not(.sold-btn)').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.dataset.item;
      const msg = encodeURIComponent(`Hi! I'd like to pre-order the ${item} 🤍`);
      window.open(`${IG_DM_URL}?text=${msg}`, '_blank');
      showToast(`opening pre-order for ${item}...`);
    });
  });

  // ── CUSTOMS button ──
  document.getElementById('customs-btn').addEventListener('click', () => {
    const msg = encodeURIComponent("Hi! I'd like to place a custom pre-order 🪡");
    window.open(`${IG_DM_URL}?text=${msg}`, '_blank');
    showToast('opening pre-order for custom order...');
  });

  // ── NAV FILTERS (available / all / sold) ──
  document.querySelectorAll('.nav-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.textContent.trim();
      const cards = document.querySelectorAll('.product-card');
      cards.forEach(card => {
        const status = card.dataset.status;
        if (filter === 'all') card.style.display = '';
        else if (filter === 'available') card.style.display = status === 'available' ? '' : 'none';
        else if (filter === 'sold') card.style.display = status === 'sold' ? '' : 'none';
      });
      updateStockCount();
      checkEmpty();
    });
  });

  // ── CATEGORY TABS ──
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // also reset nav filter to all when changing category
      document.querySelectorAll('.nav-filter').forEach(b => {
        b.classList.toggle('active', b.textContent.trim() === 'all');
      });

      const cat = tab.dataset.cat;
      const cards = document.querySelectorAll('.product-card');
      cards.forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
      });
      updateStockCount();
      checkEmpty();
    });
  });

  // ── UPDATE stock count badge ──
  function updateStockCount() {
    const visible = [...document.querySelectorAll('.product-card')]
      .filter(c => c.style.display !== 'none' && c.dataset.status === 'available');
    const notice = document.querySelector('.stock-notice span');
    notice.textContent = visible.length === 0
      ? 'no pieces available right now'
      : `${visible.length} piece${visible.length > 1 ? 's' : ''} available now`;
  }

  // ── EMPTY STATE ──
  function checkEmpty() {
    const anyVisible = [...document.querySelectorAll('.product-card')]
      .some(c => c.style.display !== 'none');
    document.getElementById('empty-note').style.display = anyVisible ? 'none' : 'block';
    document.getElementById('sold-note').style.display = anyVisible ? 'block' : 'none';
  }

  // ── CONTACT FORM ──
  document.getElementById('contact-submit').addEventListener('click', () => {
    const name = document.querySelector('.contact-field input[type=text]').value.trim();
    const email = document.querySelector('.contact-field input[type=email]').value.trim();
    const msg = document.querySelector('.contact-field textarea').value.trim();
    if (!name || !email || !msg) {
      showToast('please fill in all fields 🤍');
      return;
    }
    const subject = encodeURIComponent('inquiry — interlaced by jill');
    const body = encodeURIComponent(`hi! my name is ${name}.\n\n${msg}\n\n— ${name} (${email})`);
    window.open(`mailto:interlacedbyjill@gmail.com?subject=${subject}&body=${body}`, '_blank');
    showToast('opening your email app... 🤍');
  });