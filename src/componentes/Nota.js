import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function Nota({ item }) {
  const categorias = { Pessoal: "#FF924F", Outros: "#00911F", Trabalho: "#2F71EB" };
  const estilos = styleFunction(categorias[item.categoria]);

  return (
    <View style={estilos.cartao}>
      <Text style={estilos.titulo}>item.titulo</Text>
      <Text style={estilos.categoria}>item.categoria</Text>
      <Text style={estilos.texto} numberOfLines={5}>
        {item.texto}
      </Text>
    </View>
  );
}

const styleFunction = (cor) =>
  StyleSheet.create({
    cartao: {
      borderRadius: 8,
      backgroundColor: "#ffffff",
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginHorizontal: 16,
      marginBottom: 8,
      borderTopWidth: 5,
      borderColor: cor,
      boxShadow: "0px 2px 2.62px rgba(0, 0, 0, 0.23)",
      elevation: 4,
    },
    titulo: {
      fontSize: 24,
      fontWeight: "700",
      marginBottom: 4,
    },
    categoria: {
      borderRadius: 4,
      backgroundColor: cor,
      padding: 4,
      color: "#FAFAFA",
      alignSelf: "flex-start",
    },
    texto: {
      lineHeight: 28,
    },
  });
