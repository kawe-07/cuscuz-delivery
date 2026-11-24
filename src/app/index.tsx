import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useState } from 'react';
import { categorias } from '../constants/categorias';
import { produtos } from '../constants/produtos';
import FoodCard from '../components/foodcard';

export default function HomeScreen() {

  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');

  const produtosFiltrados = produtos.filter((produto) => {
    return categoriaSelecionada === 'Todos' || produto.categoria === categoriaSelecionada;
  });

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
          Cuscuz + Café
        </Text>

        <Text className="mt-2 text-base text-surface">
          Uma combinação perfeita para seu pedido.
        </Text>

        <TouchableOpacity className="mt-5 self-start rounded-xl bg-surface px-5 py-3">
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

    </View>
  );
}