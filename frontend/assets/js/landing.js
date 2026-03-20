const CHECKOUT_PATH = './checkout.html';
const PRODUCT_AMOUNT = 59;

const deliverables = [
  { icon: 'solar:clipboard-list-linear', title: 'Plano alimentar', text: 'Organize sua alimentação com clareza e direção. Sem dietas malucas, apenas comida de verdade.' },
  { icon: 'solar:target-linear', title: 'Metas e Desafios', text: 'Saiba exatamente o que fazer a cada dia para manter a constância e o foco no objetivo.' },
  { icon: 'solar:book-linear', title: 'Orientações Práticas', text: 'Aprenda a fazer escolhas melhores no dia a dia sem complicar a sua rotina corrida.' },
  { icon: 'solar:document-text-linear', title: 'Guias de Apoio', text: 'Tenha materiais de apoio simples e diretos para facilitar sua execução durante as semanas.' },
  { icon: 'solar:chat-round-dots-linear', title: 'Suporte 24h', text: 'Tire dúvidas, receba incentivo no grupo exclusivo e não caminhe sozinha em nenhum momento.' },
  { icon: 'solar:chart-linear', title: 'Acompanhamento', text: 'Mantenha o foco, direção e comprometimento monitorando sua evolução até o final dos 21 dias.' },
];

const detailBlocks = [
  {
    title: 'Como funciona na prática?',
    description: 'Durante 21 dias, você vai participar de um processo guiado com começo, meio e fim. Não é uma experiência para assistir. É para viver de verdade.',
    image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/935b1208-72e7-4c91-91f8-b7c896870e3a_1600w.jpg',
    alt: 'Como Funciona',
    items: [
      { icon: 'solar:users-group-rounded-linear', text: 'Acompanhamento em grupo' },
      { icon: 'solar:calendar-linear', text: 'Metas diárias e desafios semanais' },
      { icon: 'solar:chat-round-like-linear', text: 'Incentivo constante e suporte a dúvidas' },
    ]
  },
  {
    title: 'Para quem é (e não é)?',
    description: 'Avalie se a Operação Seca 21 é o momento certo para você.',
    image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/1add0662-fa35-4cb2-b899-2e0e5115fb8d_1600w.jpg',
    alt: 'Para Quem É',
    reverse: true,
    items: [
      { icon: 'solar:check-circle-linear', text: 'Quer desinchar e perder medidas.', color: 'green', bg: 'slate' },
      { icon: 'solar:check-circle-linear', text: 'Precisa de estrutura para voltar ao eixo.', color: 'green', bg: 'slate' },
      { icon: 'solar:check-circle-linear', text: 'Quer melhorar sem dietas radicais.', color: 'green', bg: 'slate' },
      { icon: 'solar:close-circle-linear', text: 'Procura solução milagrosa sem esforço.', color: 'red', bg: 'slate' },
      { icon: 'solar:close-circle-linear', text: 'Espera resultado mantendo velhos hábitos.', color: 'red', bg: 'slate' },
    ]
  },
  {
    title: 'O que esperar em 21 dias',
    description: 'Talvez você não alcance o resultado final, mas conquistará o mais importante: o começo certo.',
    image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8d8d0bd4-007d-4e69-9cf3-7892364a6d6e_1600w.png',
    alt: 'O que Esperar',
    items: [
      { icon: 'solar:leaf-linear', text: 'Menos inchaço e mais leveza no corpo.', bg: 'slate' },
      { icon: 'solar:bolt-linear', text: 'Melhora na disposição diária.', bg: 'slate' },
      { icon: 'solar:eye-linear', text: 'Mais clareza sobre o que e como comer.', bg: 'slate' },
      { icon: 'solar:shield-check-linear', text: 'Menos exageros e descontrole.', bg: 'slate' },
      { icon: 'solar:chart-up-linear', text: 'Sensação real de evolução.', bg: 'slate' },
    ]
  },
  {
    title: 'Engaje e concorra a prêmios',
    description: 'A ideia não é só premiar quem chega ao final, mas premiar quem se compromete com o processo.',
    image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/3a049bc2-bbf2-4666-8df5-a0752a36cbcf_1600w.jpg',
    alt: 'Premiação',
    reverse: true,
    items: [
      { icon: 'solar:cup-star-bold', text: '1º Lugar: R$ 200,00', color: 'yellow', bg: 'slate' },
      { icon: 'solar:medal-ribbons-star-bold', text: '2º Lugar: R$ 100,00', color: 'gray', bg: 'slate' },
      { icon: 'solar:chat-round-like-linear', text: 'Ganhe pontos interagindo no grupo.', bg: 'slate' },
      { icon: 'solar:camera-linear', text: 'Pontue compartilhando sua evolução.', bg: 'slate' },
    ]
  },
  {
    title: 'Dúvidas Comuns',
    description: 'Respostas rápidas para você tomar sua decisão com segurança.',
    image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/02ecae54-4ef3-4c50-a95a-afb63418f5a4_1600w.jpg',
    alt: 'Dúvidas Comuns',
    items: [
      { icon: 'solar:question-circle-linear', text: '<strong>Vou passar fome?</strong> Não. A ideia é organizar a alimentação com estratégia, não radicalizar.', align: 'start', bg: 'slate', leading: 'leading-relaxed' },
      { icon: 'solar:question-circle-linear', text: '<strong>Minha rotina é corrida.</strong> O desafio foi pensado exatamente para funcionar na vida real.', align: 'start', bg: 'slate', leading: 'leading-relaxed' },
      { icon: 'solar:question-circle-linear', text: '<strong>Nunca sigo até o fim.</strong> Por isso criamos a gamificação, metas e suporte diário para te manter focada.', align: 'start', bg: 'slate', leading: 'leading-relaxed' },
    ]
  }
];

const proofCards = [
  { image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/95c080a4-3b96-4764-bd98-383eaa7acc2f_800w.jpg', alt: 'Print de Resultado 1', label: 'Mensagem de Aluna' },
  { image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/86b58e90-93fb-4912-a547-762f61ee01e9_800w.jpg', alt: 'Print de Resultado 2', label: 'Evolução Semanal' },
  { image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/d4c138a2-5ae4-4c53-80db-302a4cddff5b_800w.jpg', alt: 'Print de Resultado 3', label: 'Mensagem de Aluna' },
  { image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/52b0760f-284f-4bc1-9539-80c2d8f7ab34_800w.jpg', alt: 'Print de Resultado 4', label: 'Feedback Final' },
];

const testimonials = [
  {
    text: '"Hurruu que alegria, mais do que vencer foi a experiência maravilhosa que tive e que vou levar pra sempre e o apoio que agente tem de Júlia mais o incentivo de cada um do grupo torna o desafio mais leve mesmo com tanta correria do dia a dia me sentia na obrigação de mostrar que to conseguindo. Nutri, não deixo de participar de nenhum mais que tiver, meu nome já tá no próximo 😊 obrigada a todos pelo carinho."',
    initials: 'ML',
    name: 'Maria L.'
  },
  {
    text: '"Estou imensamente feliz em participar. Porque provou que participar de um grupo ajuda e muito. É muito incentivo e amor. Obrigada Júlia pelos ensinamentos. Se possível gostaria de ficar mais um tempo, porque agora realmente irei provar o que aprendi aqui com todos."',
    initials: 'F',
    name: 'Flavia F.'
  }
];

const app = document.getElementById('app');

app.innerHTML = `
  <nav class="fixed w-full z-50 transition-all duration-300 glass-panel border-b border-pink-100/50">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <a href="./index.html" class="inline-flex items-center">
          <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/86f6e393-961f-40dd-8a9a-889aa45fab64_320w.png" alt="Júlia Mara" class="h-12 w-auto object-contain">
        </a>

        <div class="hidden md:flex items-center space-x-10">
          <a href="#sobre-desafio" class="text-sm font-medium text-slate-600 hover:text-pink-600 transition-colors">O Desafio</a>
          <a href="#entregaveis" class="text-sm font-medium text-slate-600 hover:text-pink-600 transition-colors">O que você recebe</a>
          <a href="#sobre-nutri" class="text-sm font-medium text-slate-600 hover:text-pink-600 transition-colors">A Nutri</a>
          <a href="#detalhes" class="hover:text-pink-600 transition-colors text-sm font-medium text-slate-600">Detalhes & FAQ</a>
        </div>

        <div class="flex items-center gap-4">
          <button data-open-checkout class="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 bg-[#E94E88] border border-transparent rounded-full shadow-lg hover:bg-pink-600 hover:shadow-pink-300/50 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
            Garantir Vaga
          </button>
          <button id="mobileMenuButton" class="md:hidden p-2 text-slate-600 hover:text-pink-600 transition-colors" aria-label="Abrir menu">
            <iconify-icon icon="solar:hamburger-menu-linear" width="24"></iconify-icon>
          </button>
        </div>
      </div>
      <div id="mobileMenuPanel" class="mobile-menu-panel md:hidden">
        <div class="flex flex-col gap-3 pt-2 pb-4">
          <a href="#sobre-desafio" class="text-sm font-medium text-slate-600 hover:text-pink-600 transition-colors">O Desafio</a>
          <a href="#entregaveis" class="text-sm font-medium text-slate-600 hover:text-pink-600 transition-colors">O que você recebe</a>
          <a href="#sobre-nutri" class="text-sm font-medium text-slate-600 hover:text-pink-600 transition-colors">A Nutri</a>
          <a href="#detalhes" class="text-sm font-medium text-slate-600 hover:text-pink-600 transition-colors">Detalhes & FAQ</a>
          <button data-open-checkout class="mt-2 inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white transition-all duration-200 bg-[#E94E88] rounded-full shadow-lg hover:bg-pink-600">
            Garantir Vaga
          </button>
        </div>
      </div>
    </div>
  </nav>

  <section class="lg:pt-48 lg:pb-32 overflow-hidden bg-[#FFF5F8] pt-32 pb-20 relative">
    <div class="-translate-y-1/4 bg-pink-200/30 w-[800px] h-[800px] rounded-full absolute top-0 right-0 blur-3xl translate-x-1/4"></div>
    <div class="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-pink-100/50 rounded-full blur-3xl"></div>

    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16 items-center">
        <div class="fade-in-up space-y-8">
          <div class="inline-flex gap-2 uppercase text-xs font-medium text-pink-700 tracking-wide bg-pink-100/50 border-pink-200 border rounded-full pt-1 pr-3 pb-1 pl-3 items-center">
            <span class="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
            Inscrições abertas até dia 05
          </div>

          <h1 class="text-5xl lg:text-7xl text-slate-900 tracking-tight leading-[1.1]">
            Operação <br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#E94E88] to-pink-400">Seca 21</span>
          </h1>

          <p class="text-lg lg:text-xl text-slate-500 max-w-lg leading-relaxed font-light">
            O desafio de 21 dias da Nutri Júlia Mara para mulheres que querem desinchar, perder medidas e voltar ao controle da alimentação.
          </p>

          <ul class="space-y-3 text-slate-600 text-base font-light">
            <li class="flex items-center gap-3"><iconify-icon icon="solar:check-circle-linear" class="text-pink-500" width="20"></iconify-icon> Plano alimentar prático</li>
            <li class="flex items-center gap-3"><iconify-icon icon="solar:check-circle-linear" class="text-pink-500" width="20"></iconify-icon> Metas diárias e semanais</li>
            <li class="flex items-center gap-3"><iconify-icon icon="solar:check-circle-linear" class="text-pink-500" width="20"></iconify-icon> Suporte 24 horas no grupo</li>
          </ul>

          <div class="flex flex-col sm:flex-row gap-4 pt-4 items-center">
            <button data-open-checkout class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white transition-all duration-200 bg-[#E94E88] rounded-full shadow-xl hover:shadow-pink-500/30 hover:bg-pink-600 hover:-translate-y-1">
              Quero entrar na Operação
            </button>
            <span class="text-2xl font-serif text-slate-900">R$ 59,00</span>
            <span class="text-sm text-slate-500">Pagamento via Pix ou Cartão de Crédito</span>
          </div>
          <p class="text-xs text-slate-400">Vagas limitadas para garantir qualidade no acompanhamento.</p>
        </div>

        <div class="relative lg:h-[700px] w-full flex items-center justify-center fade-in-up delay-200">
          <div class="relative w-full max-w-md lg:max-w-lg aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-pink-900/10">
            <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/19d2f158-e042-45f0-8357-fba6640603c7_1600w.jpg" alt="Nutricionista Júlia Mara" class="object-center hover:scale-105 transition-transform duration-700 w-full h-full object-cover">
            <div class="absolute bottom-8 left-8 right-8 glass-panel p-6 rounded-2xl border border-white/40 shadow-xl backdrop-blur-md">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-slate-900">Nutri Júlia Mara</p>
                  <p class="text-xs text-slate-500 mt-1">Especialista em Saúde Feminina</p>
                </div>
                <div class="h-10 w-10 bg-pink-500 rounded-full flex items-center justify-center text-white">
                  <iconify-icon icon="solar:medal-star-linear" width="20"></iconify-icon>
                </div>
              </div>
            </div>
          </div>
          <div class="absolute -z-10 top-1/2 right-0 w-64 h-64 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full blur-[80px] opacity-60"></div>
        </div>
      </div>
    </div>
  </section>

  <section id="sobre-desafio" class="py-24 bg-white relative">
    <div class="max-w-4xl mx-auto px-6 lg:px-8 text-center">
      <h2 class="text-3xl md:text-4xl font-serif text-slate-900 mb-8 tracking-tight">Você sente que perdeu o controle da sua alimentação?</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-16">
        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4"><iconify-icon icon="solar:sad-circle-linear" class="text-pink-400 shrink-0 mt-1" width="24"></iconify-icon><p class="text-slate-600 text-sm">Acorda já se sentindo inchada e pesada.</p></div>
        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4"><iconify-icon icon="solar:graph-down-linear" class="text-pink-400 shrink-0 mt-1" width="24"></iconify-icon><p class="text-slate-600 text-sm">Tenta comer melhor, mas não consegue manter constância.</p></div>
        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4"><iconify-icon icon="solar:danger-circle-linear" class="text-pink-400 shrink-0 mt-1" width="24"></iconify-icon><p class="text-slate-600 text-sm">Belisca ao longo do dia e sente que saiu totalmente do eixo.</p></div>
        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4"><iconify-icon icon="solar:close-circle-linear" class="text-pink-400 shrink-0 mt-1" width="24"></iconify-icon><p class="text-slate-600 text-sm">Quer emagrecer, mas não aguenta mais dieta restritiva.</p></div>
      </div>
      <div class="max-w-3xl mx-auto space-y-6 text-lg text-slate-600 font-light mb-10">
        <p>Se você se identificou, a <strong class="font-medium text-pink-600">Operação Seca 21</strong> foi feita para você. Esse desafio foi criado para mulheres reais, com rotina corrida, altos e baixos e dificuldade de manter disciplina sozinhas.</p>
        <p>É um desafio nutricional guiado para te ajudar a desinchar, reorganizar sua alimentação e voltar ao eixo em 21 dias. Aqui, o foco não é perfeição. <strong>É resultado possível na vida real.</strong></p>
      </div>
      <button data-open-checkout class="inline-flex items-center text-base font-medium text-pink-600 hover:text-pink-700 underline decoration-pink-300 underline-offset-4">
        Sim, é isso que eu preciso <iconify-icon icon="solar:arrow-right-linear" class="ml-2" width="20"></iconify-icon>
      </button>
    </div>
  </section>

  <section class="bg-slate-50 border-slate-100 border-t pt-24 pb-24 relative" id="entregaveis">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2 class="text-4xl font-serif text-slate-900 mb-4 tracking-tight">O que você recebe</h2>
        <p class="text-slate-500 text-lg font-light">Tudo o que você precisa para garantir seu resultado nos próximos 21 dias.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${deliverables.map((item) => `
          <div class="group relative p-8 bg-white rounded-3xl border border-slate-100 hover:border-pink-200 transition-all duration-300 hover:shadow-xl hover:shadow-pink-100/50 hover:-translate-y-1 overflow-hidden">
            <div class="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 mb-6 group-hover:bg-pink-500 group-hover:text-white transition-colors duration-300">
              <iconify-icon icon="${item.icon}" width="28"></iconify-icon>
            </div>
            <h3 class="text-xl font-medium text-slate-900 mb-3 font-serif">${item.title}</h3>
            <p class="text-slate-500 text-sm leading-relaxed">${item.text}</p>
          </div>
        `).join('')}
      </div>

      <div class="text-center mt-12">
        <button data-open-checkout class="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-slate-700 transition-all duration-200 bg-white border border-slate-200 rounded-full hover:bg-pink-50 hover:border-pink-200 hover:text-pink-600 shadow-sm">
          Quero garantir tudo isso
        </button>
      </div>
    </div>
  </section>

  <section class="overflow-hidden bg-[#FFF5F8] pt-24 pb-24" id="sobre-nutri">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row items-center gap-16">
        <div class="lg:w-1/2 relative">
          <div class="grid grid-cols-2 gap-4">
            <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/6cc25521-c975-47c0-8433-660bacfd4bee_800w.jpg" class="w-full h-64 object-cover rounded-2xl shadow-lg translate-y-8" alt="Atendimento nutricional">
            <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/02ecae54-4ef3-4c50-a95a-afb63418f5a4_800w.jpg" class="rounded-2xl shadow-lg w-full h-64 object-cover" alt="Alimentação saudável">
          </div>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-xl">
            <div class="w-24 h-24 rounded-full border border-dashed border-pink-400 flex flex-col items-center justify-center text-center p-2">
              <iconify-icon icon="solar:diploma-verified-linear" class="text-pink-500 mb-1" width="24"></iconify-icon>
              <span class="text-[10px] font-semibold uppercase tracking-wider text-pink-600 leading-tight">Nutri<br>Especialista</span>
            </div>
          </div>
        </div>
        <div class="lg:w-1/2">
          <h2 class="text-4xl font-serif text-slate-900 mb-6 tracking-tight">Quem vai te guiar nessa jornada</h2>
          <div class="space-y-6 text-lg text-slate-600 font-light">
            <p>A Operação Seca 21 foi criada por <strong>Júlia Mara</strong>, nutricionista, com uma abordagem focada em estratégia, individualização e acompanhamento próximo.</p>
            <p>A proposta aqui não é te entregar mais uma dieta genérica de gaveta. É te conduzir por um processo com direção, critério e apoio.</p>
            <blockquote class="border-l-2 border-pink-400 pl-4 italic text-slate-700 font-serif">"Porque resultado sustentável não nasce de improviso. Nasce de método."</blockquote>
          </div>
          <div class="mt-10">
            <button data-open-checkout class="inline-flex items-center text-sm font-medium text-pink-600 hover:text-pink-700 underline decoration-pink-300 underline-offset-4">
              Quero ser acompanhada pela Nutri Júlia <iconify-icon icon="solar:arrow-right-linear" class="ml-2" width="16"></iconify-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="detalhes" class="py-24 bg-white relative">
    <div class="lg:px-8 max-w-7xl mr-auto ml-auto pr-6 pl-6">
      <div class="max-w-2xl mx-auto text-center mb-16">
        <h2 class="text-4xl font-serif text-slate-900 mb-4 tracking-tight">Detalhes da Operação</h2>
        <p class="text-slate-500 text-lg font-light">Explore como o desafio funciona, para quem é e as premiações.</p>
      </div>
      <div class="space-y-12">
        ${detailBlocks.map(renderDetailBlock).join('')}
      </div>
    </div>
  </section>

  <section class="py-24 bg-[#1a1a1a] text-white">
    <div class="lg:px-8 max-w-7xl mr-auto ml-auto pr-6 pl-6">
      <div class="flex flex-col md:flex-row justify-between items-end mb-16">
        <div>
          <h2 class="text-4xl font-serif mb-4 tracking-tight">Resultados Reais</h2>
          <p class="text-gray-400 text-lg font-light max-w-xl">Mulheres reais. Resultados reais. Veja os relatos de quem viveu esse processo e conseguiu voltar ao eixo.</p>
        </div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
        ${proofCards.map((card) => `
          <div class="relative aspect-[9/16] overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 shadow-xl group">
            <img src="${card.image}" alt="${card.alt}" class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100">
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80 pointer-events-none"></div>
            <div class="absolute bottom-4 left-4 right-4 flex items-center gap-2">
              <iconify-icon icon="solar:chat-round-line-bold" class="text-pink-400" width="20"></iconify-icon>
              <span class="text-xs font-medium text-white shadow-sm">${card.label}</span>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        ${testimonials.map((item) => `
          <div class="bg-gray-800/50 p-8 rounded-3xl border border-gray-700">
            <div class="flex text-pink-400 mb-4">${'<iconify-icon icon="solar:star-bold" width="16"></iconify-icon>'.repeat(5)}</div>
            <p class="leading-relaxed italic text-gray-300 mb-6">${item.text}</p>
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 font-bold text-xs">${item.initials}</div>
              <div>
                <p class="font-medium text-white text-sm">${item.name}</p>
                <p class="text-gray-500 text-xs">Participante da Turma Anterior</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="text-center mt-12">
        <p class="text-pink-400 font-serif text-xl">Você pode ser a próxima a olhar para trás e perceber que conseguiu voltar ao eixo.</p>
      </div>
    </div>
  </section>

  <section id="oferta" class="py-24 relative overflow-hidden bg-[#E94E88]">
    <div class="absolute inset-0 opacity-10 bg-[url(default)] bg-cover bg-center"></div>
    <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
      <span class="inline-block py-1 px-3 rounded-full bg-white/20 text-white text-xs font-medium tracking-wider mb-6 border border-white/30 backdrop-blur-sm">O PONTO DE VIRADA</span>
      <h2 class="text-4xl md:text-5xl font-serif text-white mb-6 tracking-tight">Garanta sua vaga na Operação Seca 21</h2>
      <p class="text-pink-100 text-lg mb-10 font-light max-w-2xl mx-auto">Você pode continuar se sentindo inchada e frustrada, ou pode decidir que os próximos 21 dias serão diferentes. Menos inchaço. Mais leveza. Mais controle.</p>
      <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 mb-10 max-w-2xl mx-auto text-left">
        <h3 class="text-2xl font-serif text-white mb-6 text-center border-b border-white/20 pb-4">O que está incluído:</h3>
        <ul class="space-y-4 text-pink-50 text-sm md:text-base mb-8">
          <li class="flex items-center gap-3"><iconify-icon icon="solar:check-circle-bold" class="text-pink-300 shrink-0" width="20"></iconify-icon> Acesso completo ao desafio de 21 dias</li>
          <li class="flex items-center gap-3"><iconify-icon icon="solar:check-circle-bold" class="text-pink-300 shrink-0" width="20"></iconify-icon> Plano alimentar e orientações práticas</li>
          <li class="flex items-center gap-3"><iconify-icon icon="solar:check-circle-bold" class="text-pink-300 shrink-0" width="20"></iconify-icon> Metas diárias, semanais e guias de apoio</li>
          <li class="flex items-center gap-3"><iconify-icon icon="solar:check-circle-bold" class="text-pink-300 shrink-0" width="20"></iconify-icon> Suporte no grupo exclusivo</li>
        </ul>
        <div class="text-center">
          <p class="text-pink-200 text-sm mb-1">Investimento único:</p>
          <p class="text-5xl font-serif text-white font-bold mb-2">R$ 59,00</p>
          <span class="text-pink-200 text-sm">Pagamento via Pix ou Cartão de Crédito</span>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center gap-4">
        <button data-open-checkout class="w-full sm:w-auto px-10 py-5 bg-white text-[#E94E88] text-lg font-bold rounded-full hover:bg-pink-50 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:-translate-y-1 inline-flex items-center justify-center">
          EU QUERO ENTRAR AGORA
        </button>
        <p class="text-sm text-pink-100 mt-2">Próxima turma começa dia 06. Inscrições encerram dia 05.</p>
      </div>
    </div>
  </section>

  <footer class="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div class="lg:col-span-2">
          <a href="./index.html" class="inline-flex items-center">
            <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/86f6e393-961f-40dd-8a9a-889aa45fab64_320w.png" alt="Júlia Mara" class="h-10 w-auto object-cover">
          </a>
          <p class="text-sm leading-relaxed mb-6 max-w-sm">Nutricionista especialista em ajudar mulheres a retomarem o controle da alimentação, desincharem e viverem com mais leveza.</p>
        </div>
        <div>
          <h4 class="text-white font-medium mb-6">Links Rápidos</h4>
          <ul class="space-y-3 text-sm">
            <li><a href="#sobre-desafio" class="hover:text-pink-500 transition-colors">O Desafio</a></li>
            <li><a href="#entregaveis" class="hover:text-pink-500 transition-colors">O que recebe</a></li>
            <li><a href="#sobre-nutri" class="hover:text-pink-500 transition-colors">Sobre a Júlia</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-slate-800 mt-16 pt-8 text-center text-xs space-y-4">
        <p class="text-slate-500 max-w-4xl mx-auto leading-relaxed">Aviso Legal: Este desafio não substitui consulta individual quando necessária. Os resultados podem variar de acordo com o organismo, a rotina e o comprometimento de cada participante. As informações contidas aqui têm caráter informativo e educacional.</p>
        <p>© 2026 Nutri Júlia Mara. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>

  <div id="checkoutModal" class="checkout-modal" aria-hidden="true">
    <div class="checkout-dialog p-5 sm:p-8 md:p-10">
      <div class="flex items-start justify-between gap-4 mb-4 sm:mb-8">
        <div>
          <span class="inline-flex items-center gap-2 uppercase text-[10px] sm:text-xs font-medium text-pink-700 tracking-wide bg-pink-100/50 border-pink-200 border rounded-full pt-1 pr-3 pb-1 pl-3">
            <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-pink-500"></span>
            Etapa 1 de 2
          </span>
          <h3 class="text-xl sm:text-3xl text-slate-900 mt-2 sm:mt-4 leading-tight">Preencha seus dados para continuar</h3>
          <p class="text-slate-500 text-xs sm:text-sm mt-1 sm:mt-3 leading-snug">Você será levada para o checkout próprio da Operação Seca 21 para gerar seu pagamento com segurança.</p>
        </div>
        <button id="closeCheckoutModal" class="text-slate-400 hover:text-slate-700" aria-label="Fechar modal">
          <iconify-icon icon="solar:close-circle-linear" width="28"></iconify-icon>
        </button>
      </div>

      <form id="checkoutForm" class="space-y-3 sm:space-y-4 pt-1 sm:pt-0">
        <input class="checkout-input" type="text" name="name" placeholder="Seu nome completo" required>
        <input class="checkout-input" type="email" name="email" placeholder="Seu melhor e-mail" required>
        <input class="checkout-input" type="tel" name="phone" placeholder="Seu WhatsApp com DDD" required>
        <input class="checkout-input" type="text" name="cpf" placeholder="Seu CPF (apenas números)" maxlength="14" required>
        <input type="hidden" name="amount" value="${PRODUCT_AMOUNT}">

        <p id="formError" class="form-error text-xs sm:text-sm text-red-500 font-medium"></p>

        <div class="pt-1 sm:pt-2 flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button type="submit" class="flex-1 inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-4 text-sm sm:text-base font-medium text-white transition-all duration-200 bg-[#E94E88] rounded-full shadow-xl hover:shadow-pink-500/30 hover:bg-pink-600 hover:-translate-y-1">
            Ir para o checkout
          </button>
          <button type="button" id="cancelCheckout" class="flex-1 inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-4 text-sm sm:text-base font-medium text-slate-700 transition-all duration-200 bg-slate-100 rounded-full hover:bg-slate-200">
            Agora não
          </button>
        </div>
      </form>
    </div>
  </div>
`;

const modal = document.getElementById('checkoutModal');
const openButtons = [...document.querySelectorAll('[data-open-checkout]')];
const closeModalButton = document.getElementById('closeCheckoutModal');
const cancelCheckoutButton = document.getElementById('cancelCheckout');
const checkoutForm = document.getElementById('checkoutForm');
const formError = document.getElementById('formError');
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenuPanel = document.getElementById('mobileMenuPanel');
const landingPhone = document.querySelector('input[name="phone"]');
const landingCpf = document.querySelector('input[name="cpf"]');

landingPhone.addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '');
  if (v.length > 11) v = v.substring(0, 11);
  if (v.length <= 2) {
    e.target.value = v;
  } else if (v.length <= 6) {
    e.target.value = `(${v.substring(0, 2)}) ${v.substring(2)}`;
  } else if (v.length <= 10) {
    e.target.value = `(${v.substring(0, 2)}) ${v.substring(2, 6)}-${v.substring(6)}`;
  } else {
    e.target.value = `(${v.substring(0, 2)}) ${v.substring(2, 7)}-${v.substring(7)}`;
  }
});

landingCpf.addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '');
  if (v.length > 11) v = v.substring(0, 11);
  if (v.length <= 3) {
    e.target.value = v;
  } else if (v.length <= 6) {
    e.target.value = `${v.substring(0, 3)}.${v.substring(3)}`;
  } else if (v.length <= 9) {
    e.target.value = `${v.substring(0, 3)}.${v.substring(3, 6)}.${v.substring(6)}`;
  } else {
    e.target.value = `${v.substring(0, 3)}.${v.substring(3, 6)}.${v.substring(6, 9)}-${v.substring(9)}`;
  }
});

openButtons.forEach((button) => button.addEventListener('click', openModal));
closeModalButton.addEventListener('click', closeModal);
cancelCheckoutButton.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(checkoutForm);
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const phone = String(formData.get('phone') || '').trim().replace(/\D/g, '');
  const cpf = String(formData.get('cpf') || '').trim().replace(/\D/g, '');
  const amount = String(formData.get('amount') || PRODUCT_AMOUNT);

  formError.classList.remove('is-visible');

  // Validação: Nome com no mínimo duas palavras
  if (name.split(' ').length < 2) {
    formError.textContent = 'Por favor, insira pelo menos nome e sobrenome.';
    formError.classList.add('is-visible');
    return;
  }

  // Validação: E-mail com formato válido mínimo
  if (!email.includes('@') || !email.includes('.')) {
    formError.textContent = 'Por favor, insira um e-mail válido (ex: seu@email.com).';
    formError.classList.add('is-visible');
    return;
  }

  // Validação: WhatsApp com DDD (10 a 11 números)
  if (phone.length < 10) {
    formError.textContent = 'O WhatsApp deve ter de 10 a 11 números com o DDD.';
    formError.classList.add('is-visible');
    return;
  }

  // Validação: CPF completo de 11 números
  if (cpf.length !== 11) {
    formError.textContent = 'Por favor, insira um CPF válido com 11 números.';
    formError.classList.add('is-visible');
    return;
  }

  const checkoutUrl = new URL(CHECKOUT_PATH, window.location.href);
  checkoutUrl.searchParams.set('name', name);
  checkoutUrl.searchParams.set('email', email);
  checkoutUrl.searchParams.set('phone', phone);
  checkoutUrl.searchParams.set('cpf', cpf);
  checkoutUrl.searchParams.set('amount', amount);
  window.location.href = checkoutUrl.toString();
});

mobileMenuButton.addEventListener('click', () => {
  mobileMenuPanel.classList.toggle('is-open');
});

document.querySelectorAll('#mobileMenuPanel a').forEach((link) => {
  link.addEventListener('click', () => mobileMenuPanel.classList.remove('is-open'));
});

function openModal() {
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-hidden');
  formError.classList.remove('is-visible');
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-hidden');
}

function renderDetailBlock(block) {
  const isReverse = block.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row';
  return `
    <div class="bg-gradient-to-br from-slate-50 to-pink-50/30 rounded-3xl overflow-hidden border border-slate-100 shadow-xl flex flex-col ${isReverse}">
      <div class="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
        <h3 class="text-3xl font-serif text-slate-900 mb-6">${block.title}</h3>
        <p class="text-slate-600 mb-8 font-light">${block.description}</p>
        <div class="space-y-4">
          ${block.items.map((item) => `
            <div class="flex items-${item.align || 'center'} gap-4 bg-white p-3 rounded-xl shadow-sm border border-slate-50">
              <div class="p-2 bg-${item.bg || 'pink'}-50 rounded-lg text-${item.color || 'pink'}-500 shrink-0"><iconify-icon icon="${item.icon}" width="20"></iconify-icon></div>
              <p class="font-medium text-slate-700 text-sm${item.leading ? ` ${item.leading}` : ''}">${item.text}</p>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="lg:w-1/2 h-64 lg:h-auto bg-slate-200 relative overflow-hidden group">
        <img src="${block.image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="${block.alt}">
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
    </div>
  `;
}

