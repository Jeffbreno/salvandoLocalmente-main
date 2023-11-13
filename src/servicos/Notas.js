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
          console.log("id insert: " + insertId);
          resolve("Nota adicionada com sucesso");
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

export async function fetchNotes() {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("SELECT * FROM Notas;", [], (transaction, resultado) => {
        resolve(resultado.rows._array);
      });
    });
  });
}
