import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";

export default function App() {
  // Guarda o que está sendo digitado
  const [produto, setProduto] = useState("");

  // Guarda todos os produtos
  const [produtos, setProdutos] = useState([]);

  // Adiciona um produto à lista
  function adicionarProduto() {
    // Impede produtos vazios
    if (produto.trim() === "") {
      return;
    }

    // Impede produtos duplicados
    const produtoJaExiste = produtos.some(
      (item) => item.nome.toLowerCase() === produto.trim().toLowerCase()
    );

    if (produtoJaExiste) {
      return;
    }

    // Cria o novo produto
    const novoProduto = {
      id: Date.now().toString(),
      nome: produto.trim(),
      comprado: false,
    };

    // Adiciona o produto ao array
    setProdutos([...produtos, novoProduto]);

    // Limpa o campo
    setProduto("");
  }

  // Remove um produto
  function removerProduto(id) {
    const novaLista = produtos.filter((item) => item.id !== id);

    setProdutos(novaLista);
  }

  // Marca/desmarca um produto como comprado
  function alternarComprado(id) {
    const novaLista = produtos.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          comprado: !item.comprado,
        };
      }

      return item;
    });

    setProdutos(novaLista);
  }

  // Limpa toda a lista
  function limparLista() {
    setProdutos([]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minha Lista de Compras</Text>

      <Text style={styles.contador}>
        Produtos: {produtos.length}
      </Text>

      <View style={styles.areaInput}>
        <TextInput
          style={styles.input}
          placeholder="Digite um produto..."
          value={produto}
          onChangeText={setProduto}
        />

        <Pressable
          style={styles.botaoAdicionar}
          onPress={adicionarProduto}
        >
          <Text style={styles.textoBotao}>ADICIONAR</Text>
        </Pressable>
      </View>

      <View style={styles.lista}>
        {produtos.map((item) => (
          <View style={styles.produto} key={item.id}>
            <Pressable
              style={styles.nomeProdutoArea}
              onPress={() => alternarComprado(item.id)}
            >
              <Text
                style={[
                  styles.nomeProduto,
                  item.comprado && styles.produtoComprado,
                ]}
              >
                {item.comprado ? "✅ " : "🛒 "}
                {item.nome}
              </Text>
            </Pressable>

            <Pressable
              style={styles.botaoRemover}
              onPress={() => removerProduto(item.id)}
            >
              <Text style={styles.textoRemover}>✕</Text>
            </Pressable>
          </View>
        ))}
      </View>

      {produtos.length > 0 && (
        <Pressable
          style={styles.botaoLimpar}
          onPress={limparLista}
        >
          <Text style={styles.textoBotao}>LIMPAR LISTA</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 25,
    paddingTop: 70,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },

  contador: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginBottom: 25,
  },

  areaInput: {
    gap: 10,
  },

  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },

  botaoAdicionar: {
    backgroundColor: "#222222",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  textoBotao: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 15,
  },

  lista: {
    marginTop: 25,
    gap: 10,
  },

  produto: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  nomeProdutoArea: {
    flex: 1,
  },

  nomeProduto: {
    fontSize: 18,
  },

  produtoComprado: {
    textDecorationLine: "line-through",
    color: "#888888",
  },

  botaoRemover: {
    backgroundColor: "#eeeeee",
    width: 35,
    height: 35,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  textoRemover: {
    color: "#cc0000",
    fontWeight: "bold",
    fontSize: 18,
  },

  botaoLimpar: {
    backgroundColor: "#cc0000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 25,
  },
});