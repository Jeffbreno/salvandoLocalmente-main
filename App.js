import { SafeAreaView, StatusBar, StyleSheet, FlatList } from "react-native";
import NotaEditor from "./src/componentes/NotaEditor";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Nota } from "./src/componentes/Nota";
import { createTable, fetchNotes } from "./src/servicos/Notas";

export default function App() {
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    createTable();
    mostraNotas(); // Carrega as notas ao inicializar o componente
  }, []);

  async function mostraNotas() {
    const todasNotas = await fetchNotes();
    // const todasChaves = await AsyncStorage.getAllKeys();
    // const todasNotas = await AsyncStorage.multiGet(todasChaves);

    // // Filtra a constante "EXPO_CONSTANTS_INSTALLATION_ID"
    // const notasFiltradas = todasNotas.filter(([chave, valor]) => chave !== "EXPO_CONSTANTS_INSTALLATION_ID");
    setNotas(todasNotas);
    console.log(todasNotas);
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList data={notas} renderItem={(nota) => <Nota {...nota} />} keyExtractor={(nota) => nota.id} />
      <NotaEditor mostraNotas={mostraNotas} />
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
});
