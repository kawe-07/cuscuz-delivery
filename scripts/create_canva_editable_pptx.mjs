import fs from "node:fs/promises";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const root = "C:/Users/kawe/Documents/GitHub/cuscuz-delivery";
const out = `${root}/output/apresentacao_cuscuz_delivery_canva.pptx`;
const assets = `${root}/assets/images`;
const W = 1280, H = 720;
const GOLD = "#D49A00", DARK = "#3B2A05", MUTED = "#705F3B", CREAM = "#FFF6D6", PALE = "#FFF0B8", BROWN = "#3F2B06";

async function bytes(path) {
  const b = await fs.readFile(path);
  return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
}

function shape(slide, geometry, x, y, w, h, fill = "none", lineFill = "none") {
  return slide.shapes.add({
    geometry,
    position: { left: x, top: y, width: w, height: h },
    fill,
    line: { style: "solid", fill: lineFill, width: lineFill === "none" ? 0 : 1 },
  });
}

function text(slide, value, x, y, w, h, size = 18, color = DARK, bold = false, family = "Segoe UI") {
  const s = shape(slide, "textbox", x, y, w, h);
  s.text = value;
  s.text.style = { fontSize: `${size}pt`, color, bold, fontFamily: family };
  return s;
}

function header(slide, kicker, heading, num) {
  slide.background.fill = "#FFFFFF";
  shape(slide, "rect", 0, 0, W, 20, GOLD);
  text(slide, kicker.toUpperCase(), 72, 44, 250, 22, 12, GOLD, true);
  text(slide, heading, 72, 68, 1000, 56, 32, DARK, true);
  shape(slide, "rect", 72, 132, 1136, 2, "#F1D98A");
  text(slide, String(num).padStart(2, "0"), 1140, 48, 60, 24, 14, MUTED, true);
}

function footer(slide) {
  text(slide, "Cuscuz Delivery  |  Projeto acadêmico", 72, 680, 360, 18, 10, MUTED);
}

function code(slide, value, x, y, w, h, label) {
  shape(slide, "roundRect", x, y, w, h, BROWN);
  text(slide, label.toUpperCase(), x + 22, y + 16, w - 44, 20, 10, "#F4D87A", true);
  text(slide, value, x + 22, y + 46, w - 44, h - 56, 12, "#FFF8DD", false, "Consolas");
}

async function main() {
  const presentation = Presentation.create({ slideSize: { width: W, height: H } });
  const icon = await bytes(`${assets}/icon.png`);
  const react = await bytes(`${assets}/react-logo.png`);
  const cuscuz = await bytes(`${assets}/cuscuz-photo.jpg`);

  // 1 cover
  let s = presentation.slides.add();
  s.background.fill = GOLD;
  shape(s, "ellipse", 930, -110, 420, 420, "#F4D166");
  shape(s, "ellipse", 720, 490, 520, 420, "#B67800");
  s.images.add({ blob: icon, contentType: "image/png", alt: "Ícone do aplicativo", fit: "cover", position: { left: 820, top: 190, width: 270, height: 270 } });
  text(s, "APRESENTAÇÃO DO PROJETO", 72, 62, 400, 24, 13, "#FFF4C7", true);
  text(s, "Cuscuz Delivery", 72, 210, 650, 70, 52, "#FFFFFF", true);
  text(s, "Aplicativo para escolha de produtos, carrinho e finalização de pedidos", 76, 302, 580, 64, 21, "#FFF8DD");
  text(s, "Expo + React Native + TypeScript", 76, 415, 420, 24, 14, "#FFFFFF", true);
  text(s, "PROJETO MOBILE", 76, 620, 220, 22, 13, "#FFF4C7", true);

  // 2
  s = presentation.slides.add(); header(s, "Contexto", "Problema e solução", 2);
  text(s, "A apresentação mostra a solução como um produto funcionando, não apenas como uma coleção de telas.", 72, 154, 1040, 34, 17, MUTED);
  shape(s, "roundRect", 72, 230, 500, 150, CREAM);
  text(s, "NECESSIDADE", 104, 258, 240, 20, 12, GOLD, true);
  text(s, "Encontrar produtos, entender preços e montar o pedido sem perder o controle do carrinho.", 104, 292, 420, 68, 20, DARK);
  shape(s, "roundRect", 640, 230, 568, 150, PALE);
  text(s, "PROPOSTA", 672, 258, 240, 20, 12, GOLD, true);
  text(s, "Catálogo por categorias, FoodCard para cada produto, carrinho com quantidades e tela de checkout.", 672, 292, 490, 68, 20, DARK);
  text(s, "O projeto organiza o pedido de comida em um fluxo simples para quem está escolhendo produtos pelo celular.", 72, 470, 760, 82, 25, DARK);
  footer(s);

  // 3
  s = presentation.slides.add(); header(s, "Produto", "Interface e experiência", 3);
  text(s, "A tela inicial prioriza a decisão do usuário: oferta, categorias, produtos e acesso ao carrinho.", 72, 190, 530, 84, 23, DARK);
  text(s, "• Botão de carrinho aparece quando há itens\n• Categorias filtram o catálogo\n• Identidade visual simples e legível", 92, 330, 480, 120, 18, DARK);
  shape(s, "roundRect", 850, 170, 300, 410, "#F7E4A2");
  shape(s, "roundRect", 875, 195, 250, 360, "#FFFFFF");
  text(s, "Cuscuz Nordestino  R$ 12,00", 900, 230, 200, 24, 11, DARK);
  text(s, "Carne de Sol  R$ 18,00", 900, 275, 200, 24, 11, DARK);
  shape(s, "roundRect", 900, 330, 200, 62, GOLD);
  text(s, "Cuscuz + Café", 920, 350, 170, 25, 15, "#FFFFFF", true);
  text(s, "O que deseja comer hoje?", 900, 440, 210, 30, 17, DARK, true);
  footer(s);

  // 4
  s = presentation.slides.add(); header(s, "Funcionamento", "Principais funcionalidades", 4);
  text(s, "O fluxo principal pode ser demonstrado em uma situação real de uso:", 72, 154, 820, 28, 16, MUTED);
  const steps = [["01", "Escolher", "O usuário navega pelas categorias e encontra um produto."], ["02", "Adicionar", "O FoodCard envia o produto para o carrinho."], ["03", "Ajustar", "O usuário aumenta ou diminui a quantidade."], ["04", "Conferir", "O sistema calcula quantidade e valor total."], ["05", "Finalizar", "O checkout coleta dados de entrega e pagamento."]];
  steps.forEach((row, i) => {
    const y = 220 + i * 78;
    shape(s, "ellipse", 92, y, 48, 48, GOLD);
    text(s, row[0], 103, y + 14, 28, 18, 11, "#FFFFFF", true);
    text(s, row[1], 170, y + 8, 160, 26, 20, DARK, true);
    text(s, row[2], 360, y + 10, 700, 30, 17, MUTED);
  });
  footer(s);

  // 5
  s = presentation.slides.add(); header(s, "Stack", "Tecnologias utilizadas", 5);
  text(s, "O projeto usa rotas em src/app e separa componentes, hooks e constantes para facilitar a manutenção.", 72, 154, 1040, 30, 17, MUTED);
  s.images.add({ blob: react, contentType: "image/png", alt: "Logo React", fit: "contain", position: { left: 96, top: 280, width: 82, height: 82 } });
  text(s, "React Native", 92, 380, 180, 28, 18, DARK, true);
  text(s, "Interface mobile", 92, 410, 180, 20, 12, MUTED);
  s.images.add({ blob: cuscuz, contentType: "image/jpeg", alt: "Cuscuz nordestino", fit: "cover", position: { left: 420, top: 280, width: 130, height: 82 } });
  text(s, "Cuscuz", 420, 380, 160, 28, 18, DARK, true);
  text(s, "Produto do projeto", 420, 410, 180, 20, 12, MUTED);
  shape(s, "roundRect", 680, 250, 480, 160, PALE);
  text(s, "NO CÓDIGO", 720, 282, 160, 20, 12, GOLD, true);
  text(s, "TypeScript  |  Expo Router\nNativeWind  |  Git / GitHub", 720, 320, 360, 72, 21, DARK);
  text(s, "As escolhas apoiam uma aplicação mobile simples, organizada e multiplataforma.", 72, 540, 820, 46, 21, DARK);
  footer(s);

  // 6
  s = presentation.slides.add(); header(s, "Código", "Estrutura e lógica principal", 6);
  text(s, "Telas e componentes ficam separados dos dados do catálogo.", 72, 170, 460, 32, 16, MUTED);
  text(s, "O filtro liga a categoria escolhida à lista exibida.", 680, 170, 450, 32, 16, MUTED);
  code(s, "src/\n  app/\n    index.tsx\n    checkout.tsx\n  components/\n    foodcard.tsx\n    carrinho/Carrinho.tsx\n  constants/\n    produtos.ts", 72, 220, 500, 330, "estrutura");
  code(s, "const [categoria, setCategoria] =\n  useState('Todos');\n\nconst filtrados = produtos.filter((produto) =>\n  categoria === 'Todos' ||\n  produto.categoria === categoria\n);", 650, 220, 558, 240, "filtro por categoria");
  footer(s);

  // 7
  s = presentation.slides.add(); header(s, "Código", "Estado compartilhado do carrinho", 7);
  text(s, "O CarrinhoProvider centraliza os itens. Ao tocar em adicionar, o estado muda e o carrinho é atualizado.", 72, 160, 1120, 32, 16, MUTED);
  code(s, "setCarrinho((atual) => {\n  const existe = atual.some(\n    (item) => item.produto.id === produto.id\n  );\n\n  if (existe) return atual.map((item) =>\n    item.produto.id === produto.id\n      ? { ...item, quantidade: item.quantidade + 1 }\n      : item\n  );\n\n  return [...atual, { produto, quantidade: 1 }];\n});", 72, 220, 700, 380, "adicionar ao carrinho");
  shape(s, "roundRect", 850, 270, 330, 210, CREAM);
  text(s, "O que esse trecho resolve", 880, 300, 270, 28, 18, GOLD, true);
  text(s, "• Evita duplicar produtos\n• Atualiza a quantidade\n• Mantém o estado em um só lugar", 880, 350, 260, 100, 17, DARK);
  footer(s);

  // 8
  s = presentation.slides.add(); header(s, "Processo", "Git e evolução do projeto", 8);
  text(s, "Os commits mostram a aplicação crescendo por partes, em vez de concentrar todo o trabalho em um único registro.", 72, 160, 1120, 30, 16, MUTED);
  const commits = [["a619039", "criando as categorias e os produtos iniciais"], ["d17c6b6", "configurando o FoodCard e implementando o carrinho"], ["e534427", "criando o arquivo do carrinho e removendo arquivos desnecessários"]];
  commits.forEach((row, i) => { const y = 250 + i * 86; shape(s, "roundRect", 92, y, 120, 34, GOLD); text(s, row[0], 102, y + 8, 100, 18, 11, "#FFFFFF", true); text(s, row[1], 250, y + 4, 850, 26, 18, DARK); });
  shape(s, "roundRect", 72, 560, 1136, 62, PALE); text(s, "Também acompanham o projeto: README.md, estrutura de pastas e histórico do GitHub.", 104, 582, 1050, 24, 16, MUTED);
  footer(s);

  // 9
  s = presentation.slides.add(); header(s, "Entrega", "Resultado e próximos passos", 9);
  text(s, "Resultado entregue", 72, 180, 320, 32, 22, DARK, true);
  text(s, "• Catálogo de produtos com categorias\n• FoodCard com preço e ação de adicionar\n• Carrinho com quantidade, remoção e total\n• Checkout com dados de entrega e pagamento", 92, 240, 600, 160, 18, DARK);
  shape(s, "roundRect", 760, 220, 420, 220, CREAM);
  text(s, "Próximas melhorias", 800, 255, 300, 30, 20, GOLD, true);
  text(s, "Persistir o carrinho\nIntegrar um backend\nConfirmar e acompanhar pedidos", 800, 305, 330, 90, 18, DARK);
  footer(s);

  await fs.mkdir(`${root}/output`, { recursive: true });
  for (const [index, slide] of presentation.slides.items.entries()) {
    const png = await presentation.export({ slide, format: "png", scale: 1 });
    await fs.writeFile(`${root}/tmp/canva-slide-${index + 1}.png`, new Uint8Array(await png.arrayBuffer()));
  }
  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(out);
  console.log(out);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
