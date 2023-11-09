import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Modal, View, Text, TextInput, Pressable, StyleSheet, ScrollView } from "react-native";
import { addNota } from "../servicos/Notas";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NotaEditor({ mostraNotas }) {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("Pessoal");
  const [texto, setTexto] = useState("");
  const [modalVisivel, setModalVisivel] = useState(false);

  async function salvaNota() {
    // const novoId = await geraId();
    const umaNota = {
      // id: novoId.toString(),
      titulo: titulo,
      categoria: categoria,
      texto: texto,
    };

    const resposta = await addNota(umaNota);
    console.log("resposta :" + resposta);
    // // await AsyncStorage.setItem(umaNota.id, umaNota.texto);
    mostraNotas();
  }

  // async function geraId() {
  //   const todasChaves = await AsyncStorage.getAllKeys();
  //   if (todasChaves <= 0) {
  //     return 1;
  //   }
  //   return todasChaves.length + 1;
  // }

  // Função para limpar a lista no AsyncStorage
  // const limparListaNoAsyncStorage = async () => {
  //   try {
  //     // await AsyncStorage.clear();
  //     console.log("Lista no AsyncStorage foi limpa com sucesso.");
  //     mostraNotas();
  //   } catch (error) {
  //     console.error("Erro ao limpar a lista no AsyncStorage:", error);
  //   }
  // };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => {
          setModalVisivel(false);
        }}>
        <View style={estilos.centralizaModal}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={estilos.modal}>
              <Text style={estilos.modalTitulo}>Criar nota</Text>
              <Text style={estilos.modalSubTitulo}>Título da Nota</Text>
              <TextInput style={estilos.modalInput} onChangeText={(novoTitulo) => setTitulo(novoTitulo)} placeholder="Digite um titulo" value={titulo} />
              <Text style={estilos.modalSubTitulo}>Categoria</Text>
              <View style={estilos.modalPicker}>
                <Picker selectedValue={categoria} onValueChange={(novaCategoria) => setCategoria(novaCategoria)}>
                  <Picker.Item label="Pessoal" value="Pessoal" />
                  <Picker.Item label="Trabalho" value="Trabalho" />
                  <Picker.Item label="Outros" value="Outros" />
                </Picker>
              </View>
              <TextInput style={estilos.modalInput} multiline={true} rows={3} onChangeText={(novoTexto) => setTexto(novoTexto)} placeholder="Digite aqui seu lembrete" value={texto} />
              <View style={estilos.modalBotoes}>
                <Pressable
                  style={estilos.modalBotaoSalvar}
                  onPress={() => {
                    salvaNota();
                  }}>
                  <Text style={estilos.modalBotaoTexto}>Salvar</Text>
                </Pressable>
                <Pressable
                  style={estilos.modalBotaoCancelar}
                  onPress={() => {
                    setModalVisivel(false);
                  }}>
                  <Text style={estilos.modalBotaoTexto}>Cancelar</Text>
                </Pressable>
                {/* <Pressable
                  style={estilos.modalBotaoDeletar}
                  onPress={() => {
                    limparListaNoAsyncStorage();
                  }}>
                  <Text style={estilos.modalBotaoTexto}>Limpar Lista</Text>
                </Pressable> */}
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <Pressable
        style={estilos.adicionarMemo}
        onPress={() => {
          setModalVisivel(true);
        }}>
        <Text style={estilos.adicionarMemoTexto}>+</Text>
      </Pressable>
    </>
  );
}

const estilos = StyleSheet.create({
  centralizaModal: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  modal: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    marginTop: 8,
    marginHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    boxShadow: "0px 5px 6.27px rgba(0, 0, 0, 0.34)",
    elevation: 10,
  },
  modalTitulo: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 18,
  },
  modalInput: {
    fontSize: 18,
    marginBottom: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#FF9A94",
  },
  modalPicker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#EEEEEE",
    marginBottom: 12,
  },
  modalSubTitulo: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "600",
  },
  modalBotoes: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalBotaoSalvar: {
    backgroundColor: "#2ea805",
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: "center",
  },
  modalBotaoDeletar: {
    backgroundColor: "#d62a18",
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: "center",
  },
  modalBotaoCancelar: {
    backgroundColor: "#057fa8",
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: "center",
  },
  modalBotaoTexto: {
    color: "#FFFFFF",
  },
  adicionarMemo: {
    backgroundColor: "#54ba32",
    justifyContent: "center",
    height: 64,
    width: 64,
    margin: 16,
    alignItems: "center",
    borderRadius: 9999,
    position: "absolute",
    bottom: 0,
    right: 0,
    boxShadow: "0px 2px 2.62px rgba(0, 0, 0, 0.23)",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,
    elevation: 4,
  },
  adicionarMemoTexto: {
    fontSize: 32,
    lineHeight: 40,
    color: "#FFFFFF",
  },
});
