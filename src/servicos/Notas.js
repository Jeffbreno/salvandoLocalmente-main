import { SQLError } from "expo-sqlite";
import { db } from "./SQLite";

export function createTable() {
  db.transaction((transaction) => {
    transaction.executeSql("CREATE TABLE IF NOT EXISTS Notas (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT);"),
      (error) => {
        console.log("error call back : " + JSON.stringify(error));
        console.log(error);
      },
      () => {
        console.log("transaction complete call back ");
      };
  });
}

export async function addNota(nota) {
  return new Promise((resolve, reject) => {
    db.transaction(
      (transaction) => {
        transaction.executeSql("INSERT INTO Notas (titulo, categoria, texto) VALUES (?,?,?);", [nota.titulo, nota.categoria, nota.texto], (_, { insertId, rows }) => {
          console.log("Nota adicionada com sucesso"), resolve("Nota adicionada com sucesso");
        }),
          (SQLError) => {
            console.log(SQLError);
          };
      },
      (txError) => {
        console.log(txError);
      }
    );
  });
}

export async function updateNota(nota) {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql("UPDATE Notas SET titulo = ?, categoria = ?, texto = ? WHERE id = ?;", [nota.titulo, nota.categoria, nota.texto, nota.id], console.log("Nota atualizada com sucesso"), resolve("Nota atualizada com sucesso"), (_, error) =>
        reject(error)
      );
    });
  });
}

export async function deleteNota(nota) {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql("DELETE FROM Notas WHERE id = ?;", [nota.id], console.log("Nota excluída com sucesso"), resolve("Nota excluída com sucesso"), (_, error) => reject(error));
    });
  });
}

export async function filterCategoria(categoria) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("SELECT * FROM Notas WHERE categoria = ?;", [categoria], (transaction, results) => {
        resolve(results.rows._array);
      });
    });
  });
}

export async function fetchNotes() {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("SELECT * FROM Notas;", [], (transaction, resultado) => {
        console.log("Listando Notas"), resolve(resultado.rows._array);
      });
    });
  });
}
