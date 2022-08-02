<template>
  <div>
    <v-container grid-list-md>
      <v-subheader>
        {{ category.name }}
      </v-subheader>
      <v-img
        v-if="category.image"
        :src="getImage('/categories/' + category.image)"
        height="150px"
        contain
      ></v-img>
      <v-subheader> Merchandise by "{{ category.name }}" category"</v-subheader>
      <v-layout row wrap>
        <v-flex v-for="book in books" xs3 :key="book.id">
          <v-card :to="'/book/' + book.slug" class="mx-auto my-2">
            <v-img height="250" :src="getImage('/books/' + book.cover)"></v-img>

            <v-card-title
              class="d-inline-block text-truncate"
              style="max-width: 100%"
              >{{ book.title }}</v-card-title
            >

            <v-card-subtitle>
              <div class="my-1 text-lg-h6">Rp. {{ book.price }}</div>

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
      <template>
        <div class="text-xs-center">
          <v-pagination
            v-model="page"
            @input="go"
            :length="lengthPage"
            :total-visible="5"
          ></v-pagination>
        </div>
      </template>
    </v-container>
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
      category: {}, // menampung satu objek category
      books: [], // menampung daftar buku pada category te page: 6,
      page: 0,
      lengthPage: 0,
    };
  },
  methods: {
    go() {
      let slug = this.$route.params.slug;
      let url = "/categories/slug/" + slug;
      if (this.page > 0) url = url + "?page=" + this.page;
      url = encodeURI(url);
      this.axios
        .get(url)
        .then((response) => {
          let response_data = response.data;
          let category = response_data.data;
          this.category = category;
          this.books = category.books.data;
          this.lengthPage = category.books.last_page;
        })
        .catch((error) => {
          console.error(error.response);
        });
    },
  },
  created() {
    this.go();
  },
};
</script>