/* =============================================================================
   CONFIGURAÇÃO DO SITE — LAP PERFORMANCE
   Edite os valores abaixo para atualizar produtos, o evento em destaque
   e o número de WhatsApp. Não é necessário tocar nos outros arquivos.
   ============================================================================= */

const LAP_CONFIG = {

  // Número de WhatsApp para receber pedidos e inscrições.
  // Formato: código do país + DDD + número, SOMENTE NÚMEROS.
  // Exemplo Brasil: "5567999999999"
  whatsappNumber: "5500000000000", // <-- TROQUE PELO NÚMERO REAL DA LAP PERFORMANCE

  // Redes sociais / contato exibidos no rodapé
  social: {
    instagram: "https://instagram.com/lap.performance",
    instagramHandle: "@lap.performance",
    email: "contato@lapperformance.com.br", // opcional, troque se quiser
    city: "Nova Andradina, MS"
  },

  // Próximo evento / treino em destaque na seção "Dia de Treino"
  event: {
    tag: "Próximo treino",
    title: "Dia de Treino — LAP Performance",
    date: "21/08",
    weekday: "Sexta-feira",
    arrival: "7h00",
    start: "7h15",
    location: "R. São José, 275 — Academia FFORTE FIT",
    photo: "images/evento-dia-de-treino.jpg",
    whatsappMessage: "Olá! Quero confirmar minha presença no Dia de Treino LAP Performance (21/08)."
  },

  // Catálogo de produtos. Para cadastrar um novo produto, copie um bloco
  // entre { } e ajuste os campos. "soon: true" deixa o produto como
  // "Em breve" (sem botão de compra, com botão de "avise-me").
  products: [
    {
      id: "garrafa-termica",
      tag: "Equipamento",
      name: "Garrafa Térmica LAP Performance",
      description: "Aço inoxidável, mantém a temperatura e leva a identidade LAP para o treino, a rua ou a academia.",
      price: "Consulte no WhatsApp",
      photo: "images/garrafa-termica.jpg",
      soon: false,
      whatsappMessage: "Olá! Quero comprar a Garrafa Térmica LAP Performance."
    },
    {
      id: "camisa-ovini",
      tag: "Vestuário — Coleção Ovini",
      name: "Camisa OVINI LAP Performance",
      description: "Feita para quem vive a corrida. Lançamento da nova coleção LAP, inspirada em quem sai na frente.",
      price: "Em breve",
      photo: "images/camisa-ovini.jpg",
      soon: true,
      whatsappMessage: "Olá! Quero ser avisado quando a Camisa OVINI da LAP Performance estiver disponível."
    }
  ]
};
