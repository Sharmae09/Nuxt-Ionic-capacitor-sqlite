// import { CapacitorSQLite, SQLiteDBConnection } from "@capacitor-community/sqlite";
// import { Kysely, SqliteDialect } from "kysely";
// import { SQLiteDatabase } from "@/types/DatabaseTypes";

// export function useDatabase() {
//   let db: Kysely<SQLiteDatabase>;

//   const init = async () => {
//     try {
//       const sqlite = CapacitorSQLite;
//       const dbConn = await sqlite.createConnection("stopwatchDB", false, "no-encryption", 1);
//       await dbConn.open();

//       db = new Kysely<SQLiteDatabase>({
//         dialect: new SqliteDialect({ database: dbConn }),
//       });

//       await db.schema
//         .createTable("sessions")
//         .ifNotExists()
//         .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
//         .addColumn("duration", "integer")
//         .execute();
//     } catch (error) {
//       console.error("Database initialization error:", error);
//     }
//   };

//   const getDb = () => db;

//   return { init, getDb };
// }

// import {
//   CapacitorSQLite,
//   SQLiteDBConnection,
// } from "@capacitor-community/sqlite";
// import { Kysely, SqliteDialect } from "kysely";
// import { SQLiteDatabase } from "@/types/DatabaseTypes";

// export function useDatabase() {
//   let db: Kysely<SQLiteDatabase>;

//   const init = async () => {
//     try {
//       const sqlite = CapacitorSQLite;
//       const dbConn = await sqlite.createConnection(
//         "notepadDB",
//         false,
//         "no-encryption",
//         1
//       );
//       await dbConn.open();

//       db = new Kysely<SQLiteDatabase>({
//         dialect: new SqliteDialect({ database: dbConn }),
//       });

//       await db.schema
//         .createTable("notes")
//         .ifNotExists()
//         .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
//         .addColumn("content", "text")
//         .execute();
//     } catch (error) {
//       console.error("Database initialization error:", error);
//     }
//   };

//   const getDb = () => db;

//   return { init, getDb };
// }
// composables/useDatabase.ts
import { Capacitor } from "@capacitor/core";
import {
  CapacitorSQLite,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";
import { Kysely, SqliteDialect } from "kysely";
import { SQLiteDatabase } from "@/types/DatabaseTypes"; // Your custom type definitions

export function useDatabase() {
  let db: Kysely<SQLiteDatabase> | null = null;

  const init = async () => {
    if (!Capacitor.isNative) {
      // --- Web Fallback Using localStorage ---
      console.log("Using localStorage fallback for database (web).");

      // Create a dummy Kysely-like object that implements the methods we need.
      db = {
        // Dummy schema builder (no-op)
        schema: {
          createTable: () => ({
            ifNotExists: () => ({
              addColumn: () => ({
                execute: async () => {
                  /* no-op for web fallback */
                },
              }),
            }),
          }),
        },
        // Insert method: saves note into localStorage under key "notes"
        insertInto: (_table: string) => ({
          values: (obj: any) => ({
            execute: async () => {
              let notes = JSON.parse(localStorage.getItem("notes") || "[]");
              // Generate an id – increment from the last id or start at 1
              const id = notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;
              notes.push({ id, ...obj });
              localStorage.setItem("notes", JSON.stringify(notes));
            },
          }),
        }),
        // Select method: returns all saved notes from localStorage
        selectFrom: (_table: string) => ({
          selectAll: () => ({
            execute: async () => {
              return JSON.parse(localStorage.getItem("notes") || "[]");
            },
          }),
        }),
        // Delete method: removes a note by id from localStorage
        deleteFrom: (_table: string) => ({
          where: (_col: string, _op: string, value: any) => ({
            execute: async () => {
              let notes = JSON.parse(localStorage.getItem("notes") || "[]");
              notes = notes.filter((n: any) => n.id !== value);
              localStorage.setItem("notes", JSON.stringify(notes));
            },
          }),
        }),
      } as unknown as Kysely<SQLiteDatabase>;
    } else {
      // --- Native: Use Capacitor SQLite via Jeep-SQLite ---
      try {
        const sqlite = CapacitorSQLite;
        const dbConn: SQLiteDBConnection = await sqlite.createConnection(
          "notepadDB",
          false,
          "no-encryption",
          1
        );
        await dbConn.open();

        db = new Kysely<SQLiteDatabase>({
          dialect: new SqliteDialect({ database: dbConn }),
        });

        await db.schema
          .createTable("notes")
          .ifNotExists()
          .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
          .addColumn("content", "text")
          .execute();

        console.log("Database initialized successfully on native.");
      } catch (error) {
        console.error("Database initialization error:", error);
      }
    }
  };

  const getDb = () => {
    if (!db) {
      throw new Error("Database is not initialized yet. Call init() first.");
    }
    return db;
  };

  return { init, getDb };
}
