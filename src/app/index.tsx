import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { CarrinhoContext } from '../components/carrinho/Carrinho';
import FoodCard from '../components/foodcard';
import { categorias } from '../constants/categorias';
import { produtos } from '../constants/produtos';

export default function HomeScreen() {

  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');

  const produtosFiltrados = produtos.filter((produto) => {
    return categoriaSelecionada === 'Todos' || produto.categoria === categoriaSelecionada;
  });

  const carrinhoContexto = useContext(CarrinhoContext);

  if (!carrinhoContexto) {
  throw new Error('Home precisa estar dentro do CarrinhoProvider');
  }
  const { totalQuantidade, abrirCarrinho, adicionarCombo } = carrinhoContexto;

  return (

  <View className="flex-1 bg-background">
    <ScrollView
    className="flex-1 px-5"
    contentContainerStyle={{ paddingBottom: 120 }}>

      <View className="mb-6 mt-12">
        <Text className="text-base text-secondary">Olá! 👋</Text>
        <Text className="mt-1 text-3xl font-bold text-text">
          O que deseja comer hoje?
        </Text>
      </View>

      <View className="mb-6 rounded-3xl bg-primary p-6">
        <Text className="text-sm font-bold text-surface">
          OFERTA ESPECIAL
        </Text>

        <Text className="mt-2 text-2xl font-bold text-surface">
          Cuscuz com Carne de Sol e Queijo + Café
        </Text>

        <Text className="mt-2 text-base text-surface">
          Uma combinação perfeita para seu pedido.
        </Text>

        <View className="mt-3 flex-row items-center gap-3">
          <Text className="text-lg text-surface line-through">
            R$ 23,00
          </Text>
          <Text className="text-3xl font-bold text-surface">
            R$ 18,00
          </Text>
          <View className="rounded-lg bg-surface px-2 py-1">
            <Text className="text-xs font-bold text-primary">
              ECONOMIZE R$ 5
            </Text>
          </View>
        </View>

        <TouchableOpacity 
        onPress={adicionarCombo}
        className="mt-5 self-start rounded-xl bg-surface px-5 py-3"
        >
          <Text className="font-bold text-secondary">Peça agora</Text>
        </TouchableOpacity>

      </View>

    <ScrollView horizontal 
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingRight: 10 }}
    >

      <View className="flex-row gap-3">
        {categorias.map((categoria) => {
          return(
            <TouchableOpacity 
            key={categoria.name}
            className={`rounded-xl p-4 ${
              categoria.name === categoriaSelecionada ? 'bg-primary' : 'bg-white'
            }`}
            onPress={() => setCategoriaSelecionada(categoria.name)}
            >
              <Text>
                {categoria.icon} {categoria.name}
              </Text>
            </TouchableOpacity>
          ); 
        })}
      </View>

      </ScrollView>

      <View className="mt-5 gap-3">
          {produtosFiltrados.map((produto) => (
            <FoodCard 
            key={produto.id} 
            produto={produto}
            />
          ))}
        </View>
      </ScrollView>

    {totalQuantidade > 0 && (
  <Pressable
    onPress={abrirCarrinho}
    className="absolute bottom-6 left-5 right-5 flex-row items-center justify-between rounded-2xl bg-primary px-5 py-4"
    >
    <View className="flex-row items-center gap-3">
      <Feather name="shopping-cart" size={22} color="#FFFFFF" />

      <Text className="font-bold text-surface">
        Ver carrinho
      </Text>
    </View>

    <View className="rounded-full bg-surface px-3 py-1">
      <Text className="font-bold text-primary">
        {totalQuantidade}
      </Text>
    </View>
  </Pressable>
)}

    </View>
  );
}