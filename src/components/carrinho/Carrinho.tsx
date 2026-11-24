import { createContext, useState } from 'react';
import { produtos } from '../../constants/produtos';
import { View, Text, Pressable, Modal, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

type ItemCarrinho = {
  produto: typeof produtos[number];
  quantidade: number;
}; 
//Em vez de guardar o mesmo produto duas vezes, guardaremos o produto e sua quantidade

type CarrinhoContextType = {
  carrinho: ItemCarrinho[];
  totalQuantidade: number;
  valorTotal: number;
  adicionarAoCarrinho: (produto: typeof produtos[number]) => void; 
  aumentarQuantidade: (id: number) => void;
  diminuirQuantidade: (id: number) => void;
  carrinhoAberto: boolean;
  abrirCarrinho: () => void;
  fecharCarrinho: () => void;
  adicionarCombo: () => void;

  //Aqui estamos definindo quais informações e funções poderão ser compartilhadas pelo contexto, ela recebe um produto e é responsável por adicioná-lo ao carrinho.
};

export const CarrinhoContext = createContext<CarrinhoContextType | null>(null);

//Com o Context, os componentes que estiverem conectados a ele poderão acessar os dados diretamente, sem precisar atravessar toda a hierarquia.

export function CarrinhoProvider({ children }: { children: React.ReactNode }) {
  // Guarda os produtos escolhidos pelo usuário.
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  // Controla se a janela do carrinho está aberta.
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  function abrirCarrinho() {
  setCarrinhoAberto(true);
  }

  function fecharCarrinho() {
  setCarrinhoAberto(false);
  }

  const totalQuantidade = carrinho.reduce(
    (total, item) => total + item.quantidade, 0
  );
  // Soma a quantidade de todos os produtos.

  const quantidadeCuscuz = carrinho.find(
    (item) => item.produto.id === 1
  )?.quantidade ?? 0;

  const quantidadeCafe = carrinho.find(
    (item) => item.produto.id === 4
  )?.quantidade ?? 0;

  const quantidadeCombos = Math.min(
    quantidadeCuscuz,
    quantidadeCafe
  );

  const descontoCombo = quantidadeCombos * 5;

  const valorTotal = carrinho.reduce(
    (total, item) => total + item.produto.preco * item.quantidade,
    0
  ) - descontoCombo;
  // Calcula o total e desconta o valor do combo.

  function adicionarAoCarrinho(produto: typeof produtos[number]) { //uma função que recebe um produto do nosso catálogo.
    
    setCarrinho((carrinhoAtual) => { //atualizando o carrinho usando o valor anterior do estado.
      const jaExiste = carrinhoAtual.some(
        (item) => item.produto.id === produto.id
      ); //se adicionar novamante um elemento ja existente no corrinho retorna true.

      if (jaExiste) {
        return carrinhoAtual.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      //verifique se ja existe o mesmo item no carrinho utilizando o id, se sim soma 1.
      return [...carrinhoAtual, { produto, quantidade: 1 }];
    });
  }// se nao existir o produto entra com quantidade 1

  function adicionarCombo() {
    // Adiciona cuscuz e café juntos no carrinho.
    const cuscuz = produtos.find((produto) => produto.id === 1);
    const cafe = produtos.find((produto) => produto.id === 4);

    if (!cuscuz || !cafe) {
      return;
    }

    adicionarAoCarrinho(cuscuz);
    adicionarAoCarrinho(cafe);
    abrirCarrinho();
  }

  function aumentarQuantidade(id: number) {
  setCarrinho((carrinhoAtual) =>
    carrinhoAtual.map((item) =>
      item.produto.id === id
        ? { ...item, quantidade: item.quantidade + 1 }
        : item
      )
    );
  }

  function diminuirQuantidade(id: number) {
  // Diminui uma unidade ou remove o produto quando chega a zero.
  setCarrinho((carrinhoAtual) => {
    const item = carrinhoAtual.find(
      (item) => item.produto.id === id
    );

    if (item && item.quantidade > 1) {
      return carrinhoAtual.map((item) =>
        item.produto.id === id
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      );
    }

    return carrinhoAtual.filter(
      (item) => item.produto.id !== id
      );
    });
  }

  function finalizarPedido() {
  // Só continua se o carrinho tiver algum produto.
  if (carrinho.length === 0) {
    return;
  }

  fecharCarrinho();
  router.push('/checkout');
 }

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        totalQuantidade,
        valorTotal,
        adicionarAoCarrinho,
        adicionarCombo,
        diminuirQuantidade,
        aumentarQuantidade,
        carrinhoAberto,
        abrirCarrinho,
        fecharCarrinho,}}
      >
        {children}

    <Modal
      visible={carrinhoAberto}
      transparent
      animationType="slide"
      onRequestClose={fecharCarrinho}
    >
      {/* Janela que mostra os itens e o total do carrinho. */}
      <View className="flex-1 justify-end bg-black/50">
        <View className="rounded-t-3xl bg-white p-6">

          <View className="mb-5 flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-text">
              Meu carrinho
            </Text>

            <Pressable
              onPress={fecharCarrinho}
              className="rounded-full bg-gray-100 p-3"
            >
              <Feather name="x" size={22} color="#333333" />
            </Pressable>
          </View>

        <ScrollView className="max-h-80">
          {carrinho.length === 0 ? (
            <View className="items-center py-10">
              <Feather name="shopping-cart" size={50} color="#9CA3AF" />

              <Text className="mt-4 text-lg font-bold text-text">
                Seu carrinho está vazio
              </Text>

              <Text className="mt-2 text-center text-secondary">
                Adicione alguns produtos para continuar.
              </Text>
            </View>
          ) : (
            carrinho.map((item) => (
              <View
                key={item.produto.id}
                className="mb-3 rounded-2xl bg-gray-100 p-4"
              >
                <Text className="text-lg font-bold text-text">
                  {item.produto.nome}
                </Text>

                <View className="mt-3 flex-row items-center gap-3">
                  {/* Diminuir quantidade */}
                  <Pressable
                    onPress={() => diminuirQuantidade(item.produto.id)}
                    className="h-9 w-9 items-center justify-center rounded-full bg-white"
                  >
                    <Feather name="minus" size={18} color="#333333" />
                  </Pressable>

                  {/* Quantidade atual */}
                  <Text className="font-bold text-text">
                    {item.quantidade}
                  </Text>

                  {/* Aumentar quantidade */}
                  <Pressable
                    onPress={() => aumentarQuantidade(item.produto.id)}
                    className="h-9 w-9 items-center justify-center rounded-full bg-primary"
                  >
                    <Feather name="plus" size={18} color="#FFFFFF" />
                  </Pressable>
                </View>

                <Text className="mt-1 font-bold text-primary">
                  Subtotal:{' '}
                  {(item.produto.preco * item.quantidade).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </Text>
              </View>
            ))
          )}
        </ScrollView>

          <View className="mt-5 border-t border-gray-200 pt-4">
            {descontoCombo > 0 && (
              <View className="mb-3 flex-row justify-between">
                <Text className="text-green-700">
                  Desconto do combo
                </Text>

                <Text className="font-bold text-green-700">
                  - {descontoCombo.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </Text>
              </View>
            )}
            
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-bold text-text">
              Total do pedido
            </Text>

            <Text className="text-xl font-bold text-primary">
              {valorTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </Text>

          </View>
        </View>

        <Pressable
          onPress={finalizarPedido}
          disabled={carrinho.length === 0}
          className={`mt-5 items-center rounded-2xl p-4 ${
            carrinho.length === 0 ? 'bg-gray-300' : 'bg-primary'
          }`}
        >
          <Text className="font-bold text-white">
            Finalizar pedido
          </Text>
        </Pressable>

        </View>
      </View>
    </Modal>
    </CarrinhoContext.Provider>
    //disponibilizando os dados do carrinho tanto para o home quanto para o foodcard.
  );


}
