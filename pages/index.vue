<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>EastQuest</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <IonButton @click="showAlert">Click Me</IonButton>
      <Stopwatch />
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/vue";

const showAlert = () => {
  alert("Ionic button clicked!");
};
</script>
