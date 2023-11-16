import { SafeAreaView, StatusBar, StyleSheet, FlatList, View } from "react-native";
import NotaEditor from "./src/componentes/NotaEditor";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Nota } from "./src/componentes/Nota";
import { createTable, fetchNotes, filterCategoria } from "./src/servicos/Notas";
import { Picker } from "@react-native-picker/picker";

export default function App() {
  useEffect(() => {
    createTable();
    mostraNotas(); // Carrega as notas ao inicializar o componente
  }, []);

  const [notas, setNotas] = useState([]);
  const [notaSelecionada, setNotaSelecionada] = useState({});
  const [categoria, setCategoria] = useState("Todos");

  async function mostraNotas() {
    const todasNotas = await fetchNotes();
    setNotas(todasNotas);
  }

  async function selectCategoria(categoriaSelecionada) {
    setCategoria(categoriaSelecionada);
    if (categoriaSelecionada == "Todos") {
      mostraNotas();
    } else {
      setNotas(await filterCategoria(categoriaSelecionada));
    }
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={notas}
        renderItem={(nota) => <Nota {...nota} setNotaSelecionada={setNotaSelecionada} />}
        keyExtractor={(nota) => nota.id}
        ListHeaderComponent={() => {
          return (
            <View style={estilos.picker}>
              <Picker selectedValue={categoria} onValueChange={(categoriaSelecionada) => selectCategoria(categoriaSelecionada)}>
                <Picker.Item label="Todos" value="Todos" />
                <Picker.Item label="Pessoal" value="Pessoal" />
                <Picker.Item label="Trabalho" value="Trabalho" />
                <Picker.Item label="Outros" value="Outros" />
              </Picker>
            </View>
          );
        }}
      />
      <NotaEditor mostraNotas={mostraNotas} notaSelecionada={notaSelecionada} setNotaSelecionada={setNotaSelecionada} />
      <StatusBar />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  picker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#EEEEEE",
    margin: 16,
  },
});
