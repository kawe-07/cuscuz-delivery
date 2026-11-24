import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CheckoutScreen() {

  const [nome, setNome] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');
  const [endereco, setEndereco] = useState<string>('');
  const [bairro, setBairro] = useState<string>('');
  const [complemento , setComplemento] = useState<string>('');
  const [formadePagamento , setFormadePagamento] = useState<string>('');
  const [precisaTroco, setPrecisaTroco] = useState<string>('');
  const [valorTroco, setValorTroco] = useState<string>('');
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background p-5">

      <Pressable
        onPress={() => router.replace('/')}
          accessibilityRole="button"
          accessibilityLabel="Voltar para a tela inicial"
        className="mb-4 self-start rounded-full p-2"
      >
        <Feather name="arrow-left" size={26} color="#333333" />
      </Pressable>

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <Text className="text-2xl font-bold text-text">
          Finalizar pedido
        </Text>

        <Text className="mt-2 text-secondary">
          Preencha seus dados para realizar o pedido.
        </Text>

        <Text className="mt-6 text-lg font-bold text-text">
          Dados do cliente
        </Text>   

        <TextInput className="mt-5 rounded-xl border border-gray-300 bg-white p-4"
          value={nome}
          onChangeText={setNome}
          placeholderTextColor="#9CA3AF"
          placeholder="Digite seu nome"
        />

        <TextInput className="mt-3 rounded-xl border border-gray-300 bg-white p-4"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
          placeholderTextColor="#9CA3AF"
          placeholder="Digite seu numero de telefone"
        />

        <Text className="mt-6 text-lg font-bold text-text">
          Endereço da entrega
        </Text>   
        
        <TextInput className="mt-5 rounded-xl border border-gray-300 bg-white p-4"
          value={endereco}
          onChangeText={setEndereco}
          placeholderTextColor="#9CA3AF"
          placeholder="Ex.: Rua das Flores, 123"
        />      
        
        <TextInput className="mt-5 rounded-xl border border-gray-300 bg-white p-4"
          value={bairro}
          onChangeText={setBairro}
          placeholderTextColor="#9CA3AF"
          placeholder="Digite seu Bairro"
        />      
        
        <TextInput className="mt-5 rounded-xl border border-gray-300 bg-white p-4"
          value={complemento}
          onChangeText={setComplemento}
          placeholderTextColor="#9CA3AF"
          placeholder="Ex.: Casa, apartamento, referência..."
        />

        <Text className="mt-6 text-lg font-bold text-text" >
          Forma de pagamento
        </Text>   
        
        <Pressable className={`rounded-xl border p-4 ${
          formadePagamento === 'Pix'
            ? 'border-primary bg-orange-50'
            : 'border-gray-300 bg-white'}`}
          onPress={() => {setFormadePagamento('Pix');
          setPrecisaTroco('');
          setValorTroco('');
        }}
        >
          <Text>Pix</Text>
        </Pressable>

        <Pressable className={`rounded-xl border p-4 ${
          formadePagamento === 'Cartao'
            ? 'border-primary bg-orange-50'
            : 'border-gray-300 bg-white'}`}
          onPress={() => {setFormadePagamento('Cartao');
          setPrecisaTroco('');
          setValorTroco('');
        }}
         >

          <Text>cartão de credito ou debito</Text>
        </Pressable>

        <Pressable className={`rounded-xl border p-4 ${
          formadePagamento === 'Dinheiro'
            ? 'border-primary bg-orange-50'
            : 'border-gray-300 bg-white'}`}
        onPress={() => setFormadePagamento('Dinheiro')}
        >
          <Text>Dinheiro em especie</Text>

        </Pressable>
       
       {formadePagamento === 'Dinheiro' && (
        <View className="mt-4 rounded-xl bg-white p-4">

          <Text className="text-lg font-bold text-text">
            Você precisa de troco?
          </Text>

          <Text className="mt-1 text-secondary">
            Selecione uma opção abaixo.
          </Text>

          <View className="mt-3 flex-row gap-3">

            <Pressable
              className={`flex-1 rounded-xl border p-4 items-center ${
                precisaTroco === 'Sim'
                  ? 'border-primary bg-orange-50'
                  : 'border-gray-300'
              }`}
              onPress={() => setPrecisaTroco('Sim')}
            >
              <Text>Sim</Text>
            </Pressable>

            <Pressable
              className={`flex-1 rounded-xl border p-4 items-center ${
                precisaTroco === 'Não'
                  ? 'border-primary bg-orange-50'
                  : 'border-gray-300'
              }`}
              onPress={() => {setPrecisaTroco('Não');
                  setValorTroco('');
              }}
            >
              <Text>Não</Text>
            </Pressable>
            {formadePagamento === 'Dinheiro' && precisaTroco === 'Sim' && (
              <View className="mt-3 rounded-xl bg-white p-4">

                <Text className="mb-3 text-lg font-bold text-text">
                  Troco para quanto?
                </Text>

                <TextInput
                  className="rounded-xl border border-gray-300 bg-white p-4"
                  value={valorTroco}
                  onChangeText={setValorTroco}
                  keyboardType="decimal-pad"
                  placeholder="Ex.: 50,00"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            )}
            </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}