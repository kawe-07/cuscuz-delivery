from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.lib.pagesizes import landscape
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph
from reportlab.lib.colors import HexColor
import os


ROOT = r"C:\Users\kawe\Documents\GitHub\cuscuz-delivery"
OUT = os.path.join(ROOT, "output", "apresentacao_cuscuz_delivery.pdf")
ASSETS = os.path.join(ROOT, "assets", "images")

W, H = 960, 540
BLUE = HexColor("#D49A00")
NAVY = HexColor("#3B2A05")
ORANGE = HexColor("#C77A00")
CREAM = HexColor("#FFF6D6")
MUTED = HexColor("#705F3B")
LIGHT = HexColor("#FFF9E8")
GREEN = HexColor("#6B7D1F")

pdfmetrics.registerFont(TTFont("Segoe", r"C:\Windows\Fonts\segoeui.ttf"))
pdfmetrics.registerFont(TTFont("SegoeBold", r"C:\Windows\Fonts\segoeuib.ttf"))
pdfmetrics.registerFont(TTFont("Consolas", r"C:\Windows\Fonts\consola.ttf"))


def para(c, text, x, y, width, height, size=18, color=NAVY, leading=None, bold=False, align=TA_LEFT):
    style = ParagraphStyle(
        name="p",
        fontName="SegoeBold" if bold else "Segoe",
        fontSize=size,
        leading=leading or size * 1.25,
        textColor=color,
        alignment=align,
        spaceAfter=0,
    )
    p = Paragraph(text, style)
    p.wrapOn(c, width, height)
    p.drawOn(c, x, y - p.height)
    return p.height


def title(c, kicker, heading, number):
    c.setFillColor(BLUE)
    c.rect(0, H - 16, W, 16, fill=1, stroke=0)
    para(c, kicker.upper(), 56, H - 44, W - 112, 20, size=10, color=BLUE, bold=True)
    para(c, heading, 56, H - 66, W - 112, 52, size=30, color=NAVY, bold=True, leading=34)
    c.setFillColor(HexColor("#F1D98A"))
    c.rect(56, H - 104, W - 112, 1, fill=1, stroke=0)
    para(c, f"{number:02d}", W - 90, H - 48, 34, 24, size=14, color=MUTED, bold=True, align=TA_CENTER)


def footer(c):
    para(c, "Cuscuz Delivery  |  Projeto acadêmico", 56, 26, 360, 16, size=9, color=MUTED)


def bullet(c, text, x, y, width, size=17, color=NAVY):
    c.setFillColor(ORANGE)
    c.circle(x + 4, y - 6, 3, fill=1, stroke=0)
    para(c, text, x + 18, y, width - 18, 50, size=size, color=color, leading=size * 1.25)


def code_box(c, code, x, y, width, height, label=None):
    c.setFillColor(HexColor("#3F2B06"))
    c.roundRect(x, y - height, width, height, 12, fill=1, stroke=0)
    if label:
        para(c, label.upper(), x + 18, y - 16, width - 36, 20, size=9, color=HexColor("#F4D87A"), bold=True)
    lines = code.strip("\n").splitlines()
    yy = y - 42 if label else y - 24
    for line in lines:
        c.setFont("Consolas", 11)
        c.setFillColor(HexColor("#FFF3C7"))
        c.drawString(x + 18, yy, line)
        yy -= 16


def tech_logo(c, path, x, y, size):
    c.drawImage(ImageReader(path), x, y, width=size, height=size, preserveAspectRatio=True, mask="auto")


def build():
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    c = canvas.Canvas(OUT, pagesize=(W, H))

    # 1. Cover
    c.setFillColor(BLUE)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(HexColor("#F4D166"))
    c.circle(850, 450, 180, fill=1, stroke=0)
    c.setFillColor(HexColor("#B67800"))
    c.circle(780, 50, 240, fill=1, stroke=0)
    c.drawImage(ImageReader(os.path.join(ASSETS, "icon.png")), 630, 90, width=230, height=230, preserveAspectRatio=True, mask="auto")
    para(c, "PROJETO MOBILE", 66, 86, 360, 24, size=13, color=HexColor("#FFF4C7"), bold=True)
    para(c, "Cuscuz\nDelivery", 66, 210, 500, 160, size=54, color=colors.white, bold=True, leading=58)
    para(c, "Aplicativo para escolha de produtos, carrinho e finalização de pedidos", 70, 330, 440, 70, size=20, color=HexColor("#FFF8DD"), leading=25)
    para(c, "Expo + React Native + TypeScript", 70, 458, 390, 24, size=13, color=colors.white, bold=True)
    para(c, "Apresentação do projeto", 70, 493, 300, 20, size=11, color=HexColor("#FFF4C7"))
    c.showPage()

    # 2. Problem and solution
    title(c, "Contexto", "Problema e solução", 2)
    para(c, "O projeto organiza o pedido de comida em um fluxo simples para quem está escolhendo produtos pelo celular.", 56, 172, 480, 72, size=22, color=NAVY, leading=28)
    c.setFillColor(CREAM)
    c.roundRect(56, 235, 382, 130, 16, fill=1, stroke=0)
    para(c, "NECESSIDADE", 80, 343, 300, 20, size=10, color=ORANGE, bold=True)
    para(c, "Encontrar produtos, entender preços e montar o pedido sem perder o controle do carrinho.", 80, 318, 320, 70, size=18, color=NAVY, leading=23)
    c.setFillColor(HexColor("#FFF0B8"))
    c.roundRect(500, 235, 404, 130, 16, fill=1, stroke=0)
    para(c, "PROPOSTA", 524, 343, 300, 20, size=10, color=BLUE, bold=True)
    para(c, "Catálogo por categorias, FoodCard para cada produto, carrinho com quantidades e tela de checkout.", 524, 318, 340, 70, size=18, color=NAVY, leading=23)
    para(c, "A apresentação mostra a solução como um produto funcionando, não apenas como uma coleção de telas.", 56, 430, 810, 40, size=16, color=MUTED)
    footer(c)
    c.showPage()

    # 3. Interface
    title(c, "Produto", "Interface e experiência", 3)
    para(c, "A tela inicial prioriza a decisão do usuário: oferta, categorias, produtos e acesso ao carrinho.", 56, 160, 470, 70, size=22, color=NAVY, leading=28)
    # simple editable wireframe-like view
    c.setFillColor(HexColor("#F7E4A2")); c.roundRect(570, 82, 300, 340, 28, fill=1, stroke=0)
    c.setFillColor(colors.white); c.roundRect(590, 103, 260, 298, 20, fill=1, stroke=0)
    para(c, "Olá! 👋", 610, 140, 180, 18, size=11, color=MUTED)
    para(c, "O que deseja\ncomer hoje?", 610, 180, 220, 52, size=18, color=NAVY, bold=True, leading=21)
    c.setFillColor(BLUE); c.roundRect(610, 248, 220, 54, 12, fill=1, stroke=0)
    para(c, "Cuscuz + Café", 628, 275, 180, 20, size=14, color=colors.white, bold=True)
    for i, txt in enumerate(["🍽️ Todos", "🌽 Cuscuz", "🥩 Carnes"]):
        c.setFillColor(HexColor("#FFF7DD") if i else HexColor("#FFE38A"))
        c.roundRect(610 + i * 70, 317, 64, 24, 8, fill=1, stroke=0)
        para(c, txt, 614 + i * 70, 334, 58, 16, size=7.5, color=NAVY, align=TA_CENTER)
    for i, txt in enumerate(["Cuscuz Nordestino   R$ 12,00", "Carne de Sol   R$ 18,00"]):
        c.setFillColor(HexColor("#FFFAEA")); c.roundRect(610, 345 - i * 42, 220, 32, 9, fill=1, stroke=0)
        para(c, txt, 622, 366 - i * 42, 200, 20, size=9, color=NAVY)
    bullet(c, "Identidade visual simples e legível", 76, 264, 420, size=17)
    bullet(c, "Categorias filtram o catálogo", 76, 302, 420, size=17)
    bullet(c, "Botão de carrinho aparece quando há itens", 76, 340, 420, size=17)
    footer(c)
    c.showPage()

    # 4. Features
    title(c, "Funcionamento", "Principais funcionalidades", 4)
    para(c, "O fluxo principal pode ser demonstrado em uma situação real de uso:", 56, 410, 720, 30, size=16, color=MUTED)
    steps = [("01", "Escolher", "O usuário navega pelas categorias e encontra um produto."), ("02", "Adicionar", "O FoodCard envia o produto para o carrinho."), ("03", "Ajustar", "O usuário aumenta ou diminui a quantidade."), ("04", "Conferir", "O sistema calcula quantidade e valor total."), ("05", "Finalizar", "O checkout coleta dados de entrega e pagamento.")]
    y = 342
    for num, head, body in steps:
        c.setFillColor(BLUE); c.circle(90, y, 22, fill=1, stroke=0)
        para(c, num, 76, y + 7, 28, 20, size=10, color=colors.white, bold=True, align=TA_CENTER)
        para(c, head, 132, y + 13, 110, 22, size=18, color=NAVY, bold=True)
        para(c, body, 250, y + 12, 620, 34, size=15, color=MUTED)
        if y > 95:
            c.setStrokeColor(HexColor("#E0B94F")); c.setLineWidth(1); c.line(90, y - 23, 90, y - 47)
        y -= 60
    footer(c)
    c.showPage()

    # 5. Technologies
    title(c, "Stack", "Tecnologias utilizadas", 5)
    para(c, "As escolhas do projeto apoiam uma aplicação mobile simples, organizada e multiplataforma.", 56, 160, 760, 32, size=21, color=NAVY)
    react = os.path.join(ASSETS, "react-logo.png")
    cuscuz = os.path.join(ASSETS, "cuscuz-photo.jpg")
    tech_logo(c, react, 70, 238, 72); para(c, "React Native", 70, 232, 150, 22, size=18, color=NAVY, bold=True); para(c, "Interface mobile", 70, 256, 150, 18, size=12, color=MUTED)
    tech_logo(c, cuscuz, 300, 238, 72); para(c, "Cuscuz", 300, 232, 150, 22, size=18, color=NAVY, bold=True); para(c, "Produto do projeto", 300, 256, 160, 18, size=12, color=MUTED)
    c.setFillColor(HexColor("#FFF0B8")); c.roundRect(530, 218, 330, 120, 18, fill=1, stroke=0)
    para(c, "NO CÓDIGO", 556, 314, 250, 18, size=10, color=BLUE, bold=True)
    para(c, "TypeScript  |  Expo Router\nNativeWind  |  Git / GitHub", 556, 292, 270, 58, size=18, color=NAVY, leading=25)
    para(c, "O projeto usa rotas em src/app e separa componentes, hooks e constantes para facilitar a manutenção.", 56, 420, 820, 36, size=16, color=MUTED)
    footer(c)
    c.showPage()

    # 6. Architecture and code
    title(c, "Código", "Estrutura e lógica principal", 6)
    para(c, "Telas e componentes ficam separados dos dados do catálogo.", 56, 410, 390, 30, size=15, color=MUTED)
    code_box(c, "src/\n  app/\n    index.tsx\n    checkout.tsx\n  components/\n    foodcard.tsx\n    carrinho/Carrinho.tsx\n  constants/\n    produtos.ts", 56, 340, 350, 185, "estrutura")
    para(c, "O filtro liga a categoria escolhida à lista exibida.", 470, 410, 410, 30, size=15, color=MUTED)
    code_box(c, "const [categoria, setCategoria] =\n  useState('Todos');\n\nconst filtrados = produtos.filter((produto) =>\n  categoria === 'Todos' ||\n  produto.categoria === categoria\n);", 470, 340, 430, 155, "filtro por categoria")
    footer(c)
    c.showPage()

    # 7. Cart code
    title(c, "Código", "Estado compartilhado do carrinho", 7)
    para(c, "O CarrinhoProvider centraliza os itens. Ao tocar em adicionar, o estado muda e o carrinho é atualizado.", 56, 410, 820, 30, size=15, color=MUTED)
    code_box(c, "setCarrinho((atual) => {\n  const existe = atual.some(\n    (item) => item.produto.id === produto.id\n  );\n\n  if (existe) return atual.map((item) =>\n    item.produto.id === produto.id\n      ? { ...item, quantidade: item.quantidade + 1 }\n      : item\n  );\n\n  return [...atual, { produto, quantidade: 1 }];\n});", 56, 350, 540, 235, "adicionar ao carrinho")
    c.setFillColor(CREAM); c.roundRect(640, 188, 240, 150, 16, fill=1, stroke=0)
    para(c, "O que esse trecho resolve", 662, 316, 200, 24, size=15, color=ORANGE, bold=True)
    bullet(c, "Evita duplicar produtos", 662, 282, 188, size=13)
    bullet(c, "Atualiza a quantidade", 662, 250, 188, size=13)
    bullet(c, "Mantém o estado em um só lugar", 662, 218, 188, size=13)
    footer(c)
    c.showPage()

    # 8. Git
    title(c, "Processo", "Git e evolução do projeto", 8)
    para(c, "Os commits mostram a aplicação crescendo por partes, em vez de concentrar todo o trabalho em um único registro.", 56, 410, 820, 30, size=15, color=MUTED)
    commits = [
        ("a619039", "criando as categorias e os produtos iniciais"),
        ("d17c6b6", "configurando o FoodCard e implementando o carrinho"),
        ("e534427", "criando o arquivo do carrinho e removendo arquivos desnecessários"),
    ]
    y = 330
    for sha, msg in commits:
        c.setFillColor(BLUE); c.roundRect(72, y - 6, 90, 26, 8, fill=1, stroke=0)
        para(c, sha, 80, y + 12, 74, 16, size=10, color=colors.white, bold=True, align=TA_CENTER)
        para(c, msg, 190, y + 12, 600, 24, size=17, color=NAVY)
        y -= 58
    c.setFillColor(HexColor("#FFF0B8")); c.roundRect(56, 90, 820, 62, 16, fill=1, stroke=0)
    para(c, "Também acompanham o projeto: README.md, estrutura de pastas e histórico do GitHub.", 80, 128, 770, 28, size=16, color=MUTED)
    footer(c)
    c.showPage()

    # 9. Result
    title(c, "Entrega", "Resultado e próximos passos", 9)
    para(c, "Resultado entregue", 56, 405, 300, 26, size=22, color=NAVY, bold=True)
    bullet(c, "Catálogo de produtos com categorias", 76, 372, 390, size=17)
    bullet(c, "FoodCard com preço e ação de adicionar", 76, 332, 390, size=17)
    bullet(c, "Carrinho com quantidade, remoção e total", 76, 292, 390, size=17)
    bullet(c, "Checkout com dados de entrega e pagamento", 76, 252, 390, size=17)
    c.setFillColor(CREAM); c.roundRect(520, 174, 350, 190, 18, fill=1, stroke=0)
    para(c, "Próximas melhorias", 548, 336, 280, 26, size=20, color=ORANGE, bold=True)
    para(c, "Persistir o carrinho<br/>Integrar um backend<br/>Confirmar e acompanhar pedidos", 548, 310, 270, 100, size=17, color=NAVY, leading=28)
    footer(c)
    c.save()
    print(OUT)


if __name__ == "__main__":
    build()
