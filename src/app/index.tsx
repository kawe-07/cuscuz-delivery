import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-background px-5">
      <View className="mb-6 mt-12">
        <Text className="text-base text-secondary">Olá! 👋</Text>

        <Text className="mt-1 text-3xl font-bold text-text">
          O que deseja comer hoje?
        </Text>
      </View>

      <View className="rounded-3xl bg-primary p-6">
        <Text className="text-sm font-bold text-surface">
          OFERTA ESPECIAL
        </Text>

        <Text className="mt-2 text-2xl font-bold text-surface">
          Cuscuz + Bebida
        </Text>

        <Text className="mt-2 text-base text-surface">
          Uma combinação perfeita para seu pedido.
        </Text>

        <TouchableOpacity className="mt-5 self-start rounded-xl bg-surface px-5 py-3">
          <Text className="font-bold text-secondary">Peça agora</Text>
        </TouchableOpacity>
      </View>

      <Text className="mb-4 mt-8 text-2xl font-bold text-text">
        Categorias
      </Text>

      <View className="flex-row justify-between">
        <TouchableOpacity className="w-[30%] items-center rounded-2xl bg-surface p-4">
          <Text className="mb-1 text-3xl">🌽</Text>
          <Text className="text-text">Cuscuz</Text>
        </TouchableOpacity>

        <TouchableOpacity className="w-[30%] items-center rounded-2xl bg-surface p-4">
          <Text className="mb-1 text-3xl">🥩</Text>
          <Text className="text-text">Carnes</Text>
        </TouchableOpacity>

        <TouchableOpacity className="w-[30%] items-center rounded-2xl bg-surface p-4">
          <Text className="mb-1 text-3xl">🥤</Text>
          <Text className="text-text">Bebidas</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}