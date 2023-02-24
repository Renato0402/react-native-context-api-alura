import {
  Text,
  View,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import { estilos } from "./estilos";
import { TemaContext } from "../../contexts/TemaContext";
import { useContext, useEffect, useState } from "react";
import { AutenticacaoContext } from "../../contexts/AutenticacaoContext";
import { ProdutosContext } from "../../contexts/ProdutosContext";
import { deletarProdutos } from "../../services/requisicoes/Produtos";

export default function Finalizar({ navigation }) {
  const { temaEscolhido } = useContext(TemaContext);

  const estilo = estilos(temaEscolhido);

  const { usuario } = useContext(AutenticacaoContext);

  const { quantidade, carrinho, setQuantidade, setCarrinho } =
    useContext(ProdutosContext);

  const [precoTotal, setPrecoTotal] = useState(0);

  const [prices,setPrices] = useState([])

  useEffect(() => {
    precoFinal();
  }, []);

  function precoFinal() {
    let arr = [];
    carrinho.forEach( (item) => {
      arr.push(item)
    });
    setPrices([...arr])
    console.log(arr);
    console.log(prices);
  }

  async function finalizarCompra() {
    try {
      carrinho.forEach(async (item) => {
        await deletarProdutos(item);
      });
      setQuantidade(0);
      setPrecoTotal(0)
      setCarrinho([]);
      Alert.alert("Compra finalizada com sucesso");
      navigation.navigate("Principal");
    } catch (erro) {
      Alert.alert("Ocorreu um erro ao finalizar a compra, tente novamente");
    }
  }

  return (
    <View style={estilo.container}>
      <StatusBar />
      <View style={estilo.enderecoArea}>
        <Text style={estilo.titulo}>Informações da entrega</Text>
        <Text style={estilo.texto}>Nome: {usuario.nome}</Text>
        <Text style={estilo.texto}>Endereço: {usuario.endereco}</Text>
        <Text style={estilo.texto}>Email: {usuario.email}</Text>
        <Text style={estilo.texto}>Telefone: {usuario.telefone}</Text>
      </View>

      <View style={estilo.resumoArea}>
        <Text style={estilo.texto}>Quantidade: {quantidade}</Text>
        <Text style={estilo.texto}>Preço Total: R${precoTotal}</Text>
      </View>

      <TouchableOpacity style={estilo.botao} onPress={() => finalizarCompra()}>
        <Text style={estilo.botaoTexto}>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
}
