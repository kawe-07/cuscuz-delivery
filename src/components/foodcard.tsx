import { Pressable,View,Text } from "react-native";
import { Feather } from '@expo/vector-icons';
type Produto = {
    id: number;
    nome: string;
    categoria: string;
    preco: number;
    descricao: string;
}
type Props = {
    produto: Produto;
    onAdd: (produto: Produto)=> void;
}

export  default function FoodCard(props: Props) {

    return(

    <View className="rounded-2xl border border-gray-200 bg-white p-4">

        <Text className="text-lg font-bold text-gray-900">
            {props.produto.nome}
        </Text>

        <Text className="mt-1 text-sm text-gray-500">
            {props.produto.descricao}
        </Text>

        <Text className="mt-3 text-lg font-bold text-green-700">
            {props.produto.preco.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
            })}
        </Text>

        <Pressable
            onPress={() => props.onAdd(props.produto)}
            className="mt-3 self-end h-16 w-16 items-center justify-center rounded-2xl bg-primary"
        >
            <View className="flex-row items-center">
                <Feather
                    name="plus"
                    size={16}
                    color="#FFFFFF"
                />

                <Feather
                    name="shopping-cart"
                    size={23}
                    color="#FFFFFF"
                />
            </View>
        </Pressable>
    </View>
    );
}