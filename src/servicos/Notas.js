import { db } from "./SQLite";

export function createTable() {
  db.transaction((transaction) => {
    transaction.executeSql("CREAT TABLE IF NOT EXISTS Notas (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT);");
  });
}

export async function addNota(nota) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("INSERT INTO Notas (titulo, categoria, texto) VALUES (?,?,?);", [nota.titulo, nota.categoria, nota.texto], () => {
        // console.log("Nota adicionada com sucesso");
        resolve("Nota adicionada com sucesso");
      });
    });
  });
}

export async function fetchNotes() {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("SELECT * FROM Notas;", [], (transaction, resultado) => {
        resolve(resultado.rows._array);
      });
    });
  });
}
