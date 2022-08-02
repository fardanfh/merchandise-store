<template>
  <div>
    <!-- Bagian pertama yaitu Category -->
    <v-container grid-list-md>
      <h1 class="pt-3 pl-2 pb-3">
        Welcome to marketplace of
        <span class="blue--text">merchandise</span> the best in town.
      </h1>
      <v-img src="img/banner1.png" height="100%" width="100%"></v-img><br />
      <v-subheader>
        <h2 class="font-weight-bold">Kategori</h2>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <!-- link ke router categories yang nantinya akan kita definisikan routing dan componentnya -->
        <router-link to="/categories">See All</router-link>
      </v-subheader>
      <v-layout row wrap>
        <!-- variabel categories ini nantinya kita isi dengan data dari endpoint category -->
        <v-flex v-for="category in categories" xs2 :key="category.id">
          <v-card elevation="3" :to="'/category/' + category.slug">
            <!-- untuk load image supaya lebih rapi akan kita buatkan method getImage -->
            <v-layout><br /></v-layout>
            <v-img
              :src="getImage('/categories/' + category.image)"
              class="mx-auto ma-0"
              height="75"
              contain
            >
            </v-img>
            <v-container class="mt-2">
              <p
                class="button blue--text text-center"
                v-text="category.name"
              ></p>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- Bagian kedua yaitu book -->
    <v-container grid-list-md>
      <v-subheader>
        <h2 class="font-weight-bold">Top Merchandise</h2>
        <v-spacer></v-spacer>
        <!-- link ke route books yang nantinya akan kita definisikan routing dan componentnya -->
        <router-link to="/books">See All</router-link>
      </v-subheader>
      <v-layout row wrap>
        <!-- data buku kita tampilkan dalam dua kolom (xs6) -->
        <v-flex v-for="(book, index) in books" xs3 :key="index">
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
  </div>
</template>

<style scoped>
/* mengatur posisi judul */
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
  data: () => ({
    categories: [], // kita definisikan sebagai array kosong
    books: [],
  }),
  methods: {
    getImage(image) {
      if (image != null && image.length > 0) {
        //return "http://bookstore-api.test/images" + image;
        return process.env.VUE_APP_BACKEND_URL + "/images" + image;
      }
      // default image jika tidak ditemukan,
      // letakkan image ini pada folder /public/img di project vue
      return "/img/buku.jpg";
    },
  },
  created() {
    let count = 6;
    // request ke endpoint category random dengan parameter count = 4
    this.axios
      .get("/categories/random/" + count)
      .then((response) => {
        let categories = response.data.data;
        //ketika dapat datanya maka nilainya dimasukkan ke dalam properti data categories
        this.categories = categories;
      })
      .catch((error) => {
        let responses = error.response;
        console.log(responses);
      });
    count = 8;
    //request ke endpoint top book dengan parameter count = 8
    this.axios
      .get("/books/top/" + count)
      .then((response) => {
        let books = response.data.data;
        this.books = books;
      })
      .catch((error) => {
        let responses = error.response;
        console.log(responses);
      });
  },
};
</script>