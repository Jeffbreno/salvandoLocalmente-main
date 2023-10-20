import React, { useState } from "react";
import { Modal, View, Text, TextInput, Pressable, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NotaEditor() {
  const [texto, setTexto] = useState("");
  const [modalVisivel, setModalVisivel] = useState(false);

  async function salvaNota() {
    const umaNota = {
      id: "1",
      texto: texto,
    };
    await AsyncStorage.setItem(umaNota.id, umaNota.texto);
    mostraNota();
  }

  async function mostraNota() {
    console.log(await AsyncStorage.getItem("1"));
  }

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
              <Text style={estilos.modalSubTitulo}>Conteúdo da nota</Text>
              <TextInput style={estilos.modalInput} multiline={true} rows={3} onChangeText={(novoTexto) => setTexto(novoTexto)} placeholder="Digite aqui seu lembrete" value={texto} />
              <View style={estilos.modalBotoes}>
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#2ea805" : "#2ea805",
                    },
                    estilos.modalBotaoSalvar,
                  ]}
                  onPress={() => {
                    salvaNota();
                  }}>
                  <Text style={estilos.modalBotaoTexto}>Salvar</Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#057fa8" : "#d62a18",
                    },
                    estilos.modalBotaoCancelar,
                  ]}
                  onPress={() => {
                    setModalVisivel(false);
                  }}>
                  <Text style={estilos.modalBotaoTexto}>Cancelar</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <Pressable
        onPress={() => {
          setModalVisivel(true);
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#57ca3a" : "#54ba32",
          },
          estilos.adicionarMemo,
        ]}>
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
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.34,
    // shadowRadius: 6.27,
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
