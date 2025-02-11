<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Notepad</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-textarea
        v-model="noteText"
        placeholder="Write your note here..."
        rows="5"
      ></ion-textarea>
      <ion-button expand="block" @click="saveNote">Save Note</ion-button>

      <ion-list>
        <ion-list-header>
          <ion-label>Saved Notes</ion-label>
        </ion-list-header>
        <ion-item v-for="note in notes" :key="note.id">
          <ion-label>{{ note.content }}</ion-label>
          <ion-button fill="clear" color="danger" @click="deleteNote(note.id)">
            <ion-icon name="trash"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDatabase } from "@/composables/useDatabase";

const noteText = ref("");
const notes = ref<{ id: number; content: string }[]>([]);
const db = useDatabase();

const saveNote = async () => {
  if (!noteText.value.trim()) return;

  try {
    const dbConn = db.getDb();
    await dbConn
      .insertInto("notes")
      .values({ content: noteText.value })
      .execute();
    noteText.value = "";
    loadNotes();
  } catch (error) {
    console.error("Error saving note:", error);
  }
};

const loadNotes = async () => {
  try {
    const dbConn = db.getDb();
    notes.value = await dbConn.selectFrom("notes").selectAll().execute();
  } catch (error) {
    console.error("Error loading notes:", error);
  }
};

const deleteNote = async (id: number) => {
  try {
    const dbConn = db.getDb();
    await dbConn.deleteFrom("notes").where("id", "=", id).execute();
    loadNotes();
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};

onMounted(async () => {
  await db.init();
  await loadNotes();
});
</script>

<style scoped>
ion-textarea {
  margin-bottom: 10px;
}
</style>
