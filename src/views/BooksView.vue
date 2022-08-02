<template>
  <div>
    <v-container grid-list-md>
      <v-subheader> All Merchandise </v-subheader>
      <v-layout row wrap>
        <v-flex v-for="(book, index) in books" xs6 :key="index">
          <v-card :to="'/book/' + book.slug" class="mx-auto my-2">
            <v-img height="250" :src="getImage('/books/' + book.cover)"></v-img>

            <v-card-title
              class="d-inline-block text-truncate"
              style="max-width: 100%"
              >{{ book.title }}</v-card-title
            >

            <v-card-subtitle>
              <div class="my-1 text-button-lg">Rp. {{ book.price }}</div>

              <div class="text-caption">{{ book.description }}</div>
            </v-card-subtitle>

            <v-divider class="mx-4"></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi mdi-bookmark</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <template>
      <div clas="text-xs-center">
        <v-pagination
          v-model="page"
          @input="go"
          :length="lengthPage"
          :total-visible="4"
        ></v-pagination>
      </div>
    </template>
  </div>
</template>

<style scoped>
.text-block {
  position: absolute;
  bottom: 5px;
  left: 5px;
  background-color: black;
  padding-left: 5px;
  padding-right: 5px;
  opacity: 0.7;
  width: 100%;
}
</style>

<script>
export default {
  data() {
    return {
      books: [],
      page: 0,
      lengthPage: 0,
    };
  },
  methods: {
    go() {
      let url = "/books";
      if (this.page > 0) url = "/books?page=" + this.page;
      this.axios
        .get(url)
        .then((response) => {
          let response_data = response.data;
          let books = response_data.data;
          this.lengthPage = response_data.meta.last_page;
          this.books = books;
        })
        .catch((error) => {
          console.log(error.responses);
        });
    },
    getImage(image) {
      if (image != null && image.length > 0) {
        return "http://bookstore-api.test/images" + image;
        //return process.env.VUE_APP_BACKEND_URL+"/images"+ image
      }
      return "/img/unavailable.jpg";
    },
  },
  created() {
    this.go();
  },
};
</script>