import { createContext, useState } from 'react';
import { produtos } from '../../constants/produtos';
import { View, Text, Pressable, Modal } from 'react-native';

type ItemCarrinho = {
  produto: typeof produtos[number];
  quantidade: number;
}; 
//Em vez de guardar o mesmo produto duas vezes, guardaremos o produto e sua quantidade

type CarrinhoContextType = {
  carrinho: ItemCarrinho[];
  adicionarAoCarrinho: (produto: typeof produtos[number]) => void; 
  //Aqui estamos definindo quais informações e funções poderão ser compartilhadas pelo contexto, ela recebe um produto e é responsável por adicioná-lo ao carrinho.
};

export const CarrinhoContext = createContext<CarrinhoContextType | null>(null);

//Com o Context, os componentes que estiverem conectados a ele poderão acessar os dados diretamente, sem precisar atravessar toda a hierarquia.

export function CarrinhoProvider({ children }: { children: React.ReactNode }) {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);

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

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        adicionarAoCarrinho,
      }}
      >
      {children}
    </CarrinhoContext.Provider>
    //disponibilizando os dados do carrinho tanto para o home quanto para o foodcard.
  );
}