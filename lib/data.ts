const bp = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const ARTIST = {
  name: "Hammes",
  handle: "@hmms.tat",
  instagram: "https://www.instagram.com/hmms.tat",
  whatsapp: "WHATSAPP_DO_ARTISTA", // ex: "5548999999999"
  location: "CIDADE — ESTADO",
  city: "CIDADE · ESTADO",
  portrait: `${bp}/artist/hammes.jpg`,
  hours: [
    { day: "Seg — Sex", time: "00h — 00h" },
    { day: "Sábado", time: "00h — 00h" },
    { day: "Domingo", time: "Fechado" },
  ],
};

// Trust / credibility numbers
export const stats = [
  { value: "+000", label: "Peças realizadas" },
  { value: "0", label: "Anos de carreira" },
  { value: "60d", label: "Retoque garantido" },
  { value: "100%", label: "Material descartável" },
];

// How it works — the client journey, builds trust and sets expectations
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

// Social proof
export const testimonials = [
  {
    name: "NOME DO CLIENTE",
    work: "Peça · Local",
    quote: "DEPOIMENTO DO CLIENTE.",
  },
];

// FAQ — reduces friction before booking (deposit, pain, healing, pricing)
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

export const portfolioItems: {
  id: number;
  src: string;
  alt: string;
  style: string;
  placement: string;
  size: "large" | "medium" | "small";
  label: string;
}[] = [
  // Adicione as fotos do portfólio aqui.
  // Exemplo:
  // {
  //   id: 1,
  //   src: `${bp}/portfolio/nome-da-foto.jpg`,
  //   alt: "Descrição da tatuagem",
  //   style: "Neo-Clássico",
  //   placement: "Antebraço",
  //   size: "large",
  //   label: "TÍTULO",
  // },
];

export const flashItems: {
  id: string;
  name: string;
  style: string;
  description: string;
  src: string;
  simSrc: string;
  placeholder: string;
}[] = [
  // Adicione os flashes disponíveis aqui.
  // Exemplo:
  // {
  //   id: "flash-01",
  //   name: "Nome do Flash",
  //   style: "Neo-Clássico",
  //   description: "Descrição do flash.",
  //   src: `${bp}/flashes/nome-do-flash.jpg`,
  //   simSrc: `${bp}/flashes/sim/nome-do-flash.png`,
  //   placeholder: "🖤",
  // },
];
