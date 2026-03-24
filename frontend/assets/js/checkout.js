const config = window.APP_CONFIG;
if (!config) throw new Error('APP_CONFIG não encontrado. Crie assets/js/config.js');

const supabase = window.supabase.createClient(config.SUPABASE_URL, config.SUPABASE_KEY);
const params = new URLSearchParams(window.location.search);

const buyer = {
  name: params.get('name') || '',
  email: params.get('email') || '',
  phone: params.get('phone') || '',
  cpf: params.get('cpf') || '',
  amount: Number(params.get('amount') || '59')
};

const pixIntro = document.getElementById('pixIntro');
const pixGenerated = document.getElementById('pixGenerated');
const generatePixBtn = document.getElementById('generatePixBtn');
const qrBox = document.getElementById('qrBox');
const pixPayload = document.getElementById('pixPayload');
const copyBtn = document.getElementById('copyBtn');
const statusBox = document.getElementById('statusBox');
const expirationText = document.getElementById('expirationText');

const tabPix = document.getElementById('tabPix');
const tabCc = document.getElementById('tabCc');
const pixSection = document.getElementById('pixSection');
const ccSection = document.getElementById('ccSection');

const ccNumber = document.getElementById('ccNumber');
const ccName = document.getElementById('ccName');
const ccExpiry = document.getElementById('ccExpiry');
const ccCvv = document.getElementById('ccCvv');
const ccCpf = document.getElementById('ccCpf');
const ccCep = document.getElementById('ccCep');
const ccNumberAddr = document.getElementById('ccNumberAddr');
const payCcBtn = document.getElementById('payCcBtn');

document.getElementById('buyerName').textContent = buyer.name || '-';
document.getElementById('buyerEmail').textContent = buyer.email || '-';
document.getElementById('buyerPhone').textContent = buyer.phone || '-';

if (buyer.cpf) {
  let formattedCpf = buyer.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  if (ccCpf) ccCpf.value = formattedCpf;
}

document.getElementById('amountText').textContent = formatMoney(buyer.amount);
document.getElementById('orderTotal').textContent = formatMoney(buyer.amount);

copyBtn.addEventListener('click', async () => {
  if (!pixPayload.value) return;
  await navigator.clipboard.writeText(pixPayload.value);
  copyBtn.textContent = 'Copiado';
  setTimeout(() => { copyBtn.textContent = 'Copiar'; }, 1800);
});

tabPix.addEventListener('click', () => {
  tabPix.classList.add('active');
  tabCc.classList.remove('active');
  pixSection.classList.remove('hidden');
  ccSection.classList.add('hidden');
  if (pixPayload.value) {
    setStatus('Pagamento aguardando confirmação. Assim que cair, você será redirecionada.');
  } else {
    setStatus('Clique no botão para gerar o seu Pix.', false);
  }
  document.querySelector('.summary-row:nth-child(2) strong').textContent = 'Pix';
});

tabCc.addEventListener('click', () => {
  tabCc.classList.add('active');
  tabPix.classList.remove('active');
  ccSection.classList.remove('hidden');
  pixSection.classList.add('hidden');
  setStatus('Preencha os dados do cartão para finalizar.', false);
  document.querySelector('.summary-row:nth-child(2) strong').textContent = 'Cartão de Crédito';
});

ccNumber.addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '');
  v = v.replace(/(\d{4})/g, '$1 ').trim();
  e.target.value = v.substring(0, 19);
});
ccExpiry.addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '');
  if (v.length > 2) v = v.replace(/^(\d{2})(\d+)/, '$1/$2');
  e.target.value = v.substring(0, 7);
});
ccCpf.addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  e.target.value = v;
});
ccCep.addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '');
  v = v.replace(/^(\d{5})(\d)/, '$1-$2');
  e.target.value = v;
});

payCcBtn.addEventListener('click', async () => {
  const num = ccNumber.value.replace(/\D/g, '');
  const name = ccName.value.trim();
  const exp = ccExpiry.value.split('/');
  const cvv = ccCvv.value.trim();
  const cpf = ccCpf.value.replace(/\D/g, '');
  const cep = ccCep.value.replace(/\D/g, '');
  const addrNum = ccNumberAddr.value.trim();

  if (!num || !name || exp.length !== 2 || !cvv || !cpf || !cep || !addrNum) {
    setStatus('Preencha todos os campos do cartão e do titular.');
    return;
  }
  
  // Basic validation
  if (exp[0].length !== 2 || exp[1].length !== 4) {
    setStatus('A validade deve ser no formato MM/AAAA (ex: 12/2029).');
    return;
  }

  payCcBtn.disabled = true;
  payCcBtn.textContent = 'Processando...';
  setStatus('Processando pagamento via Cartão...');

  try {
    const payload = {
      ...buyer,
      paymentMethod: 'CREDIT_CARD',
      creditCard: {
        holderName: name,
        number: num,
        expiryMonth: exp[0],
        expiryYear: exp[1],
        ccv: cvv
      },
      creditCardHolderInfo: {
        name: name,
        email: buyer.email,
        cpfCnpj: cpf,
        postalCode: cep,
        addressNumber: addrNum,
        phone: buyer.phone,
        mobilePhone: buyer.phone
      }
    };

    const response = await fetch(`${config.FUNCTIONS_BASE_URL}/create-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': config.SUPABASE_KEY,
        'Authorization': `Bearer ${config.SUPABASE_KEY}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Falha ao processar pagamento');
    }

    if (data.status === 'CONFIRMED' || data.status === 'RECEIVED') {
      setStatus('Pagamento confirmado! Aguarde o redirecionamento...', true);
      showSuccessAndRedirect();
    } else {
      setStatus('Pagamento em análise ou concluído pendente de retorno. Aguarde um momento.', true);
      startPolling(data.orderToken);
    }
  } catch (err) {
    console.error(err);
    setStatus(err.message || 'Erro ao processar pagamento. Tente novamente.');
  } finally {
    payCcBtn.disabled = false;
    payCcBtn.textContent = 'Finalizar Pagamento';
  }
});

generatePixBtn.addEventListener('click', () => {
  init().catch((error) => {
    console.error(error);
    setStatus(error.message || 'Não foi possível iniciar seu pagamento. Verifique os dados e tente novamente.');
    generatePixBtn.disabled = false;
    generatePixBtn.textContent = 'Gerar Código Pix';
  });
});

async function init() {
  if (!buyer.name || !buyer.email || !buyer.phone) {
    setStatus('Dados do comprador ausentes. Volte para a página anterior.');
    return;
  }

  generatePixBtn.disabled = true;
  generatePixBtn.textContent = 'Gerando...';
  setStatus('Criando sua cobrança Pix...');

  const response = await fetch(`${config.FUNCTIONS_BASE_URL}/create-payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': config.SUPABASE_KEY,
      'Authorization': `Bearer ${config.SUPABASE_KEY}`
    },
    body: JSON.stringify(buyer)
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Falha ao criar cobrança');
  }

  pixIntro.classList.add('hidden');
  pixGenerated.classList.remove('hidden');
  renderQr(data);
  startPolling(data.orderToken);
}

function renderQr(data) {
  qrBox.innerHTML = '';
  const img = document.createElement('img');
  img.alt = 'QR Code Pix';
  img.src = `data:image/png;base64,${data.qrCodeBase64}`;
  qrBox.appendChild(img);

  pixPayload.value = data.pixPayload || '';
  if (data.expirationDate) {
    updateExpirationText(data.expirationDate);
    setInterval(() => updateExpirationText(data.expirationDate), 1000);
  }
  setStatus('Pagamento aguardando confirmação. Assim que cair, você será redirecionada.');
}

function startPolling(orderToken) {
  let checking = false;

  const interval = setInterval(async () => {
    if (checking) return;
    checking = true;
    try {
      const response = await fetch(`${config.FUNCTIONS_BASE_URL}/payment-status?order=${encodeURIComponent(orderToken)}`, {
        headers: {
          'apikey': config.SUPABASE_KEY,
          'Authorization': `Bearer ${config.SUPABASE_KEY}`
        }
      });
      const data = await response.json();

      if (data.status === 'paid') {
        clearInterval(interval);
        setStatus('Pagamento confirmado! Aguarde o redirecionamento...', true);
        showSuccessAndRedirect();
      } else if (data.status === 'expired' || data.status === 'deleted') {
        clearInterval(interval);
        setStatus('Sua cobrança não está mais disponível. Gere uma nova cobrança.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      checking = false;
    }
  }, 3000);
}

function setStatus(message, ok = false) {
  statusBox.textContent = message;
  statusBox.classList.toggle('ok', ok);
}

function formatMoney(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function updateExpirationText(expirationDate) {
  const diff = new Date(expirationDate).getTime() - Date.now();
  if (Number.isNaN(diff) || diff <= 0) {
    expirationText.textContent = 'QR Code expirado.';
    return;
  }
  const totalSeconds = Math.floor(diff / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  expirationText.textContent = `Expira em ${hours}:${minutes}:${seconds}`;
}

function buildTypebotUrl() {
  const url = new URL('https://atendimento.juliamaranutricionista.com.br/');
  url.searchParams.set('nome_completo', buyer.name);
  url.searchParams.set('email', buyer.email);
  url.searchParams.set('telefone', buyer.phone.replace(/\D/g, ''));
  return url.toString();
}

function showSuccessAndRedirect() {
  const COUNTDOWN_SECONDS = 4;
  const overlay = document.getElementById('successOverlay');
  const bar = document.getElementById('countdownBar');
  const numEl = document.getElementById('countdownNum');
  const nameEl = document.getElementById('successBuyerName');

  // Show buyer's first name
  const firstName = buyer.name.split(' ')[0];
  nameEl.textContent = firstName || buyer.name;

  // Reveal overlay
  overlay.classList.add('visible');
  spawnConfetti();

  // Haptic feedback (mobile)
  if (navigator.vibrate) navigator.vibrate([100, 50, 100]);

  // Countdown
  let remaining = COUNTDOWN_SECONDS;
  numEl.textContent = remaining;

  const start = performance.now();
  const totalMs = COUNTDOWN_SECONDS * 1000;

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / totalMs, 1);
    bar.style.transform = `scaleX(${1 - progress})`;

    const secs = Math.ceil((totalMs - elapsed) / 1000);
    if (secs !== remaining && secs >= 0) {
      remaining = secs;
      numEl.textContent = remaining;
    }

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      window.location.href = buildTypebotUrl();
    }
  }
  requestAnimationFrame(tick);
}

function spawnConfetti() {
  const container = document.getElementById('confettiContainer');
  const colors = ['#e94e88', '#ff7aa7', '#34d399', '#fbbf24', '#60a5fa', '#a78bfa', '#fb923c'];
  const count = 60;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'confetti';
    el.style.left = `${Math.random() * 100}%`;
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.width = `${6 + Math.random() * 6}px`;
    el.style.height = `${10 + Math.random() * 8}px`;
    el.style.animationDuration = `${1.5 + Math.random() * 2}s`;
    el.style.animationDelay = `${Math.random() * 0.6}s`;
    el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    container.appendChild(el);
  }

  // Clean up after animations finish
  setTimeout(() => { container.innerHTML = ''; }, 4500);
}
