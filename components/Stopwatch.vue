<!-- <script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";
import { IonButton, IonList, IonItem, IonLabel } from "@ionic/vue";

const time = ref(0);
const isRunning = ref(false);
const intervalId = ref<ReturnType<typeof setInterval> | null>(null);
const sessions = ref<{ id: number; duration: string }[]>([]);
let db: SQLiteConnection;

// Initialize SQLite database
const initDB = async () => {
  try {
    const sqlite = new SQLiteConnection(CapacitorSQLite);
    db = await sqlite.createConnection(
      "stopwatchDB",
      false,
      "no-encryption",
      1, false
    );
    await db.open();
    await db.execute(`
      CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        duration TEXT NOT NULL
      )
    `);
    await loadSessions();
  } catch (error) {
    console.error("Database initialization error:", error);
  }
};

// Start stopwatch
const startStopwatch = () => {
  if (!isRunning.value) {
    isRunning.value = true;
    intervalId.value = setInterval(() => {
      time.value++;
    }, 1000);
  }
};

// Stop stopwatch and save session
const stopStopwatch = async () => {
  if (isRunning.value) {
    isRunning.value = false;
    if (intervalId.value) clearInterval(intervalId.value);
    await saveSession();
  }
};

// Reset stopwatch
const resetStopwatch = () => {
  if (intervalId.value) clearInterval(intervalId.value);
  time.value = 0;
  isRunning.value = false;
};

// Save session to SQLite
const saveSession = async () => {
  const formattedTime = formatTime(time.value);
  try {
    await db.run("INSERT INTO sessions (duration) VALUES (?)", [formattedTime]);
    await loadSessions();
    resetStopwatch();
  } catch (error) {
    console.error("Error saving session:", error);
  }
};

// Load sessions from SQLite
const loadSessions = async () => {
  try {
    const result = await db.query("SELECT * FROM sessions");
    sessions.value = result.values || [];
  } catch (error) {
    console.error("Error loading sessions:", error);
  }
};

// Format time from seconds to mm:ss
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};

// Computed property to format time
const formattedTime = computed(() => formatTime(time.value));

onMounted(initDB);
</script>

<template>
  <div class="p-4 text-center">
    <h1 class="text-2xl font-bold mb-4">Stopwatch</h1>
    <p class="text-3xl font-mono">{{ formattedTime }}</p>
    <div class="mt-4 flex gap-2 justify-center">
      <IonButton @click="startStopwatch" color="success">Start</IonButton>
      <IonButton @click="stopStopwatch" color="danger">Stop</IonButton>
      <IonButton @click="resetStopwatch" color="medium">Reset</IonButton>
    </div>

    <h2 class="mt-6 text-xl font-semibold">Saved Sessions</h2>
    <IonList>
      <IonItem v-for="session in sessions" :key="session.id">
        <IonLabel>Session {{ session.id }}: {{ session.duration }}</IonLabel>
      </IonItem>
    </IonList>
  </div>
</template>

<style scoped>
button {
  transition: 0.2s;
}
button:hover {
  opacity: 0.8;
}
</style> -->
<!-- <script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";
import { IonButton, IonList, IonItem, IonLabel } from "@ionic/vue";

const time = ref(0);
const isRunning = ref(false);
const intervalId = ref<ReturnType<typeof setInterval> | null>(null);
const sessions = ref<{ id: number; duration: string }[]>([]);
let db: SQLiteConnection;

// Initialize SQLite database
const initDB = async () => {
  try {
    console.log("Initializing SQLite database...");
    const sqlite = new SQLiteConnection(CapacitorSQLite);
    db = await sqlite.createConnection(
      "stopwatchDB",
      false,
      "no-encryption",
      1,
      false
    );
    await db.open();
    console.log("Database opened successfully!");

    await db.execute(`
      CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        duration TEXT NOT NULL
      )
    `);
    await loadSessions();
  } catch (error) {
    console.error("Database initialization error:", error);
  }
};

// Start stopwatch
const startStopwatch = () => {
  if (!isRunning.value) {
    isRunning.value = true;
    intervalId.value = setInterval(() => {
      time.value++;
    }, 1000);
  }
};

// Stop stopwatch and save session
const stopStopwatch = async () => {
  if (isRunning.value) {
    isRunning.value = false;
    if (intervalId.value) clearInterval(intervalId.value);
    await saveSession();
  }
};

// Reset stopwatch
const resetStopwatch = () => {
  if (intervalId.value) clearInterval(intervalId.value);
  time.value = 0;
  isRunning.value = false;
};

// Save session to SQLite
const saveSession = async () => {
  const formattedTime = formatTime(time.value);
  console.log(`Saving session with time: ${formattedTime}`);
  try {
    // Check if the formatted time is valid
    if (formattedTime !== "00:00") {
      await db.run("INSERT INTO sessions (duration) VALUES (?)", [
        formattedTime,
      ]);
      await loadSessions();
      resetStopwatch();
    } else {
      console.error("Invalid session time. Not saving to DB.");
    }
  } catch (error) {
    console.error("Error saving session:", error);
  }
};

// Load sessions from SQLite
const loadSessions = async () => {
  try {
    const result = await db.query("SELECT * FROM sessions");
    console.log("Loaded sessions:", result.values);
    sessions.value = result.values || [];
  } catch (error) {
    console.error("Error loading sessions:", error);
  }
};

// Format time from seconds to mm:ss
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  console.log(`Formatted time: ${mins}:${secs}`);
  return `${mins}:${secs}`;
};

// Computed property to format time
const formattedTime = computed(() => formatTime(time.value));

onMounted(initDB);
</script>

<template>
  <div class="p-4 text-center">
    <h1 class="text-2xl font-bold mb-4">Stopwatch</h1>
    <p class="text-3xl font-mono">{{ formattedTime }}</p>
    <div class="mt-4 flex gap-2 justify-center">
      <IonButton @click="startStopwatch" color="success">Start</IonButton>
      <IonButton @click="stopStopwatch" color="danger">Stop</IonButton>
      <IonButton @click="resetStopwatch" color="medium">Reset</IonButton>
    </div>

    <h2 class="mt-6 text-xl font-semibold">Saved Sessions</h2>
    <IonList>
      <IonItem v-for="session in sessions" :key="session.id">
        <IonLabel>Session {{ session.id }}: {{ session.duration }}</IonLabel>
      </IonItem>
    </IonList>
  </div>
</template>

<style scoped>
button {
  transition: 0.2s;
}
button:hover {
  opacity: 0.8;
}
</style> -->
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";
import { IonButton, IonList, IonItem, IonLabel } from "@ionic/vue";

const time = ref(0);
const isRunning = ref(false);
const intervalId = ref<ReturnType<typeof setInterval> | null>(null);
const sessions = ref<{ id: number; duration: string }[]>([]);
let db: SQLiteConnection | null = null; // Set the initial value to null

// Initialize SQLite database
const initDB = async () => {
  try {
    console.log("Initializing SQLite database...");
    const sqlite = new SQLiteConnection(CapacitorSQLite);
    db = await sqlite.createConnection(
      "stopwatchDB",
      false,
      "no-encryption",
      1,
      false
    );
    await db.open();
    console.log("Database opened successfully!");

    await db.execute(`
      CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        duration TEXT NOT NULL
      )
    `);
    await loadSessions();
  } catch (error) {
    console.error("Database initialization error:", error);
  }
};

// Start stopwatch
const startStopwatch = () => {
  if (!isRunning.value) {
    isRunning.value = true;
    intervalId.value = setInterval(() => {
      time.value++;
    }, 1000);
  }
};

// Stop stopwatch and save session
const stopStopwatch = async () => {
  if (isRunning.value) {
    isRunning.value = false;
    if (intervalId.value) clearInterval(intervalId.value);
    await saveSession();
  }
};

// Reset stopwatch
const resetStopwatch = () => {
  if (intervalId.value) clearInterval(intervalId.value);
  time.value = 0;
  isRunning.value = false;
};

// Save session to SQLite
const saveSession = async () => {
  if (!db) {
    console.error("Database connection is not established.");
    return;
  }

  const formattedTime = formatTime(time.value);
  console.log(`Saving session with time: ${formattedTime}`);

  try {
    // Check if the formatted time is valid
    if (formattedTime !== "00:00") {
      await db.run("INSERT INTO sessions (duration) VALUES (?)", [
        formattedTime,
      ]);
      await loadSessions();
      resetStopwatch();
    } else {
      console.error("Invalid session time. Not saving to DB.");
    }
  } catch (error) {
    console.error("Error saving session:", error);
  }
};

// Load sessions from SQLite
const loadSessions = async () => {
  if (!db) {
    console.error("Database connection is not established.");
    return;
  }

  try {
    const result = await db.query("SELECT * FROM sessions");
    console.log("Loaded sessions:", result.values);
    sessions.value = result.values || [];
  } catch (error) {
    console.error("Error loading sessions:", error);
  }
};

// Format time from seconds to mm:ss
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  console.log(`Formatted time: ${mins}:${secs}`); // Log the formatted time to debug
  return `${mins}:${secs}`;
};

// Computed property to format time
const formattedTime = computed(() => {
  const formatted = formatTime(time.value);
  console.log(`Current formatted time: ${formatted}`); // Log current time
  return formatted;
});

onMounted(initDB);
</script>

<template>
  <div class="p-4 text-center">
    <h1 class="text-2xl font-bold mb-4">Stopwatch</h1>
    <p class="text-3xl font-mono">{{ formattedTime }}</p>
    <div class="mt-4 flex gap-2 justify-center">
      <IonButton @click="startStopwatch" color="success">Start</IonButton>
      <IonButton @click="stopStopwatch" color="danger">Stop</IonButton>
      <IonButton @click="resetStopwatch" color="medium">Reset</IonButton>
    </div>

    <h2 class="mt-6 text-xl font-semibold">Saved Sessions</h2>
    <IonList>
      <IonItem v-for="session in sessions" :key="session.id">
        <IonLabel>Session {{ session.id }}: {{ session.duration }}</IonLabel>
      </IonItem>
    </IonList>
  </div>
</template>

<style scoped>
button {
  transition: 0.2s;
}
button:hover {
  opacity: 0.8;
}
</style>
