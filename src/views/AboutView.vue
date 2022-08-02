<template>
  <v-container>
    <h1 class="text-center">Data kelompok</h1>
    <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
      <v-timeline-item
        v-for="(item, i) in items"
        :key="i"
        :color="item.color"
        :icon="item.icon"
        fill-dot
      >
        <v-card :color="item.color" dark>
          <v-card-title class="text-h6"> {{ item.nama }} </v-card-title>
          <v-card-text class="white text--primary"
            ><br />
            <h2 class="text-left">{{ item.nim }}</h2>
            <h3>Teknik Informatika 2020 - C</h3>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        color: "red lighten-2",
        icon: "mdi-account",
        nama: "Fardan Faturrahman",
        nim: "D112011030",
      },

      {
        color: "green lighten-1",
        icon: "mdi-account",
        nama: "Fajar Agustian",
        nim: "D112011081",
      },
      {
        color: "indigo",
        icon: "mdi-account",
        nama: "Ahsan Fahreza",
        nim: "D112011042",
      },
    ],
  }),
};
</script>
Lorem