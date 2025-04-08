import { openDatabaseSync } from "expo-sqlite";

const db = openDatabaseSync("todos.db") as any;

export const getDBConnection = () => db;

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const createTables = () => {
  db.executeSql?.(
    `CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      completed INTEGER NOT NULL
    );`
  );
};


export const loadTodos = (
  callback: (todos: Todo[]) => void,
  onError?: (error: any) => void
) => {
  db.executeSql?.(
    "SELECT * FROM todos",
    [],
    (_: any, result: any) => {
      const todos: Todo[] = [];
      for (let i = 0; i < result.rows.length; i++) {
        const row = result.rows.item(i);
        todos.push({
          id: row.id,
          text: row.text,
          completed: row.completed === 1,
        });
      }
      callback(todos);
    },
    (_: any, error: any) => {
      console.error("Error loading todos:", error);
      onError?.(error);
      return true;
    }
  );
};

export const clearAllTodos = (
  onSuccess?: () => void,
  onError?: (error: any) => void
) => {
  db.executeSql?.(
    "DELETE FROM todos",
    [],
    () => {
      onSuccess?.();
    },
    (_: any, error: any) => {
      console.error("Error clearing todos:", error);
      onError?.(error);
      return true;
    }
  )
};

export const insertTodo = (
  text: string,
  completed: boolean,
  onSuccess: () => void,
  onError?: (error: any) => void
) => {
  db.executeSql?.(
    "INSERT INTO todos (text, completed) VALUES (?, ?)",
    [text, completed ? 1 : 0],
    () => onSuccess(),
    (_: any, error: any) => {
      console.error("Error inserting todo:", error);
      onError?.(error);
      return true;
    }
  );
};
