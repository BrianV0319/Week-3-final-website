// Plans: payment modal
const modal = document.getElementById('paymentModal');
if (modal) {
  document.querySelectorAll('.plan-btn').forEach(btn =>
    btn.addEventListener('click', () => {
      try { localStorage.setItem('bt_plan', btn.parentElement.querySelector('h3').textContent); } catch (err) {}
      modal.classList.remove('hidden');
    }));
  document.getElementById('closePayment').addEventListener('click', () => modal.classList.add('hidden'));
  document.getElementById('gcashBtn').addEventListener('click', () =>
    document.getElementById('gcashBox').classList.toggle('hidden'));
}

// Contact: no backend, saves to localStorage
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
      time: new Date().toISOString()
    };
    try {
      const stored = JSON.parse(localStorage.getItem('bt_contacts') || '[]');
      stored.push(data);
      localStorage.setItem('bt_contacts', JSON.stringify(stored));
    } catch (err) {}
    alert('Thanks! Your message was saved locally.');
    form.reset();
  });
}

// Videos: unlocked once a plan has been chosen
document.querySelectorAll('.video-wrap').forEach(wrap => {
  let plan = null;
  try { plan = localStorage.getItem('bt_plan'); } catch (err) {}
  if (!plan) return;
  const frame = wrap.querySelector('.video-frame');
  frame.src = frame.dataset.src;
  frame.classList.remove('hidden');
  wrap.querySelector('.video-thumb').classList.add('hidden');
  wrap.querySelector('.video-lock').classList.add('hidden');
});
