import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";

export default function App() {
  const [produto, setProduto] = useState("");
  const [lista, setLista] = useState([]);

  function adicionarProduto() {
    if (produto === "") {
      return;
    }

    setLista([...lista, produto]);
    setProduto("");
  }

  function removerProduto(index) {
    const novaLista = lista.filter((item, i) => i !== index);

    setLista(novaLista);
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Minha Lista de Compras
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite um produto..."
        value={produto}
        onChangeText={setProduto}
      />

      <Pressable
        style={styles.botao}
        onPress={adicionarProduto}
      >
        <Text style={styles.textoBotao}>
          ADICIONAR
        </Text>
      </Pressable>

      <Text style={styles.contador}>
        Produtos: {lista.length}
      </Text>

      {lista.map((item, index) => (
        <View style={styles.produto} key={index}>

          <Text style={styles.nome}>
            {item}
          </Text>

          <Pressable
            onPress={() => removerProduto(index)}
          >
            <Text style={styles.excluir}>
              ❌
            </Text>
          </Pressable>

        </View>
      ))}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#f2f2f2",
  },

  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },

  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },

  botao: {
    backgroundColor: "#333",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  textoBotao: {
    color: "white",
    fontWeight: "bold",
  },

  contador: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 10,
  },

  produto: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  nome: {
    fontSize: 18,
  },

  excluir: {
    fontSize: 18,
  },
});