const bp = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const ARTIST = {
  name: "Hammes",
  handle: "@hmms.tat",
  instagram: "https://www.instagram.com/hmms.tat",
  whatsapp: "5545998003775", // 55 (Brasil) + 45 (DDD) + número
  location: "CIDADE — ESTADO",
  city: "CIDADE · ESTADO",
  portrait: `${bp}/artist/hammes.jpg`,
  hours: [
    { day: "Seg — Sex", time: "00h — 00h" },
    { day: "Sábado", time: "00h — 00h" },
    { day: "Domingo", time: "Fechado" },
  ],
};

export const stats = [
  { value: "+500", label: "Peças realizadas" },
  { value: "8", label: "Anos de carreira" },
  { value: "60d", label: "Retoque garantido" },
  { value: "100%", label: "Material descartável" },
];

export const processSteps = [
  {
    n: "01",
    title: "Conversa",
    desc: "Você manda sua ideia pelo WhatsApp ou pelo formulário. Conversamos sobre conceito, referências, local do corpo e tamanho. Briefing sem compromisso.",
  },
  {
    n: "02",
    title: "Projeto",
    desc: "Desenvolvo um desenho autoral exclusivo para você. Ajustamos juntos até cada linha fazer sentido. O projeto é só seu — nunca se repete em outra pele.",
  },
  {
    n: "03",
    title: "Sessão",
    desc: "Estúdio privativo, material 100% descartável e ambiente tranquilo. Trabalho com calma e precisão, no seu ritmo, do começo ao fim.",
  },
  {
    n: "04",
    title: "Cuidado",
    desc: "Você sai com um guia completo de cicatrização. Acompanho a cura de perto e os retoques estão inclusos nos primeiros 60 dias. A relação não acaba na agulha.",
  },
];

export const testimonials = [
  {
    name: "NOME DO CLIENTE",
    work: "Peça · Local",
    quote: "DEPOIMENTO DO CLIENTE.",
  },
];

export const faqs = [
  {
    q: "Como funciona o orçamento?",
    a: "É gratuito e sem compromisso. Você descreve a ideia pelo formulário ou WhatsApp, e eu retorno com uma estimativa de valor e tempo de sessão. O preço varia conforme tamanho, complexidade e local do corpo.",
  },
  {
    q: "Preciso pagar sinal para agendar?",
    a: "Sim. Para reservar a data é necessário um sinal, que é descontado do valor final da tatuagem. Ele garante o horário e cobre o tempo dedicado ao desenvolvimento do seu projeto exclusivo.",
  },
  {
    q: "Dói muito? Como me preparo?",
    a: "A sensação varia por pessoa e região do corpo. Durma bem, hidrate-se, faça uma boa refeição antes e evite álcool nas 24h anteriores. No dia, vá com roupa confortável que dê acesso fácil ao local da tatuagem.",
  },
  {
    q: "Como é a cicatrização?",
    a: "Você sai com um guia completo de cuidados. Em geral a pele cicatriza entre 15 e 30 dias. Mantenha limpo, hidratado e longe de sol e mar nas primeiras semanas. Eu acompanho a cura de perto por mensagem.",
  },
  {
    q: "Os retoques são cobrados?",
    a: "Não nos primeiros 60 dias. Retoques de cicatrização dentro desse prazo estão inclusos. Depois disso, retoques são avaliados individualmente.",
  },
  {
    q: "Posso levar minha própria ideia ou referência?",
    a: "Com certeza — e é incentivado. Trabalho com projetos autorais, então uso suas referências como ponto de partida para criar algo único, nunca uma cópia. Cada flash é vendido uma única vez.",
  },
  {
    q: "Qual a idade mínima?",
    a: "É necessário ter 18 anos completos e apresentar documento com foto no dia da sessão. Não realizo tatuagens em menores de idade, mesmo com autorização.",
  },
  {
    q: "O material é seguro?",
    a: "Sempre. Trabalho com material 100% descartável, agulhas lacradas abertas na sua frente e biossegurança rigorosa. Sua saúde é inegociável.",
  },
];

export const portfolioItems = [
  {
    id: 1,
    src: `${bp}/portfolio/pieta.jpg`,
    alt: "Pietà — cena clássica com Maria e Cristo no antebraço",
    style: "Neo-Clássico",
    placement: "Antebraço",
    size: "large" as const,
    label: "PIETÀ",
  },
  {
    id: 2,
    src: `${bp}/portfolio/sabio.jpg`,
    alt: "O Sábio — filósofo com livro, geometria e chave no antebraço",
    style: "Collage",
    placement: "Antebraço",
    size: "large" as const,
    label: "O SÁBIO",
  },
  {
    id: 3,
    src: `${bp}/portfolio/flamingo.jpg`,
    alt: "Flamingo — ave com tulipa e geometria no antebraço",
    style: "Neo-Geométrico",
    placement: "Antebraço",
    size: "large" as const,
    label: "FLAMINGO",
  },
  {
    id: 4,
    src: `${bp}/portfolio/hierarquia.jpg`,
    alt: "Hierarquia — manga com anjo, figuras egípcias e escaravelho",
    style: "Collage",
    placement: "Manga",
    size: "large" as const,
    label: "HIERARQUIA",
  },
  {
    id: 5,
    src: `${bp}/portfolio/sao-pedro.jpg`,
    alt: "São Pedro — figura religiosa com chaves e halo no antebraço",
    style: "Neo-Clássico",
    placement: "Antebraço",
    size: "medium" as const,
    label: "SÃO PEDRO",
  },
  {
    id: 6,
    src: `${bp}/portfolio/fenrir.jpg`,
    alt: "Fenrir — lobo em collage com libélula e pássaros no antebraço",
    style: "Collage",
    placement: "Antebraço",
    size: "large" as const,
    label: "FENRIR",
  },
  {
    id: 7,
    src: `${bp}/portfolio/victoria.jpg`,
    alt: "Victoria — Vitória de Samotrácia com espada e andorinhas na perna",
    style: "Neo-Clássico",
    placement: "Perna",
    size: "large" as const,
    label: "VICTORIA",
  },
  {
    id: 8,
    src: `${bp}/portfolio/dante.jpg`,
    alt: "Dante — manga épica com figuras clássicas e demônio no ombro",
    style: "Neo-Clássico",
    placement: "Ombro & Braço",
    size: "large" as const,
    label: "DANTE",
  },
  {
    id: 9,
    src: `${bp}/portfolio/marcus.jpg`,
    alt: "Marcus — busto greco-romano com andorinhas e chave no antebraço",
    style: "Neo-Clássico",
    placement: "Antebraço",
    size: "medium" as const,
    label: "MARCUS",
  },
  {
    id: 10,
    src: `${bp}/portfolio/liberta.jpg`,
    alt: "Libertà — figura surrealista rodeada por pássaros no peito",
    style: "Collage",
    placement: "Peito",
    size: "medium" as const,
    label: "LIBERTÀ",
  },
];

export const flashItems = [
  {
    id: "flash-01",
    name: "Visão",
    style: "Neo-Geométrico",
    description: "Olho com asas, geometria sagrada e figura humana em contemplação. Mandala e símbolos esotéricos em composição vertical.",
    src: `${bp}/flashes/visao.png`,
    simSrc: `${bp}/flashes/sim/visao.png`,
    placeholder: "👁️",
  },
  {
    id: "flash-02",
    name: "Mind & Soul",
    style: "Collage",
    description: "Esqueleto anatômico com mapa corporal — MIND, SOUL, coração e sistema nervoso. Geometria e constelações que conectam o físico ao metafísico.",
    src: `${bp}/flashes/mind-soul.png`,
    simSrc: `${bp}/flashes/sim/mind-soul.png`,
    placeholder: "🦴",
  },
  {
    id: "flash-03",
    name: "A Ascensão",
    style: "Neo-Geométrico",
    description: "Mão e olho fragmentados com figura escalando uma escada — a busca pelo conhecimento e pela transcendência em traços precisos.",
    src: `${bp}/flashes/ascensao.png`,
    simSrc: `${bp}/flashes/sim/ascensao.png`,
    placeholder: "🪜",
  },
  {
    id: "flash-04",
    name: "As Above So Below",
    style: "Neo-Clássico",
    description: "Cena clássica com anjos, borboletas e texto latino — dualidade entre o celeste e o terrestre. Composição narrativa de alto impacto.",
    src: `${bp}/flashes/as-above.png`,
    simSrc: `${bp}/flashes/sim/as-above.png`,
    placeholder: "🦋",
  },
  {
    id: "flash-05",
    name: "Dionísio",
    style: "Neo-Clássico",
    description: "Escultura greco-romana do deus Dionísio com taça e uvas — geometria sagrada no cálice. Microrealismo e classicismo em equilíbrio.",
    src: `${bp}/flashes/dionisio.png`,
    simSrc: `${bp}/flashes/sim/dionisio.png`,
    placeholder: "🍇",
  },
  {
    id: "flash-06",
    name: "Anjo Guardião",
    style: "Neo-Clássico",
    description: "Anjo alado em mockup no peito com tridente e cruz — proteção e espiritualidade em traço fino. Ideal para peitoral ou ombro.",
    src: `${bp}/flashes/anjo.png`,
    simSrc: `${bp}/flashes/sim/anjo.png`,
    placeholder: "😇",
  },
  {
    id: "flash-07",
    name: "Leão de San Marco",
    style: "Neo-Clássico",
    description: "Leão alado em microrealismo com geometria estrutural — símbolo de força, sabedoria e soberania. Projeto disponível para antebraço ou braço.",
    src: `${bp}/flashes/leao.png`,
    simSrc: `${bp}/flashes/sim/leao.png`,
    placeholder: "🦁",
  },
  {
    id: "flash-08",
    name: "Última Ceia",
    style: "Collage",
    description: "Releitura da Última Ceia com caveira, anjos e geometria sagrada — fé, memória e mortalidade em composição densa e simbólica.",
    src: `${bp}/flashes/ultima-ceia.png`,
    simSrc: `${bp}/flashes/sim/ultima-ceia.png`,
    placeholder: "✝️",
  },
];
