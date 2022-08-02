<template>
  <v-container>
    <v-subheader class="title">
      {{ book.title }}
    </v-subheader>
    <v-img
      v-if="book.cover"
      :src="getImage('/books/' + book.cover)"
      height="250px"
      contain
    ></v-img>
    <v-subheader>Information</v-subheader>
    <table class="v-data-table">
      <tbody>
        <tr>
          <th class="text-xs-left">Seller</th>
          <td>{{ book.author }}</td>
        </tr>
        <tr>
          <th class="text-xs-left">Price</th>
          <td v-if="book.price">
            Rp. {{ book.price.toLocaleString("id-ID") }}
          </td>
        </tr>
        <tr>
          <th class="text-xs-left">Weight</th>
          <td>{{ book.weight }} Kg</td>
        </tr>
        <tr>
          <th class="text-xs-left">Stock</th>
          <td>{{ book.stock }}</td>
        </tr>
        <tr>
          <th class="text-xs-left">Categories</th>
          <td>
            <template v-for="category in book.categories">
              {{ category.name }},
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    <v-subheader>Description</v-subheader>
    <p class="body-2">
      {{ book.description }}
    </p>
    <div style="position: relative">
      <v-btn block color="success" @click="buy" :disabled="book.stock == 0">
        <v-icon>mdi mdi-tray-arrow-down</v-icon> &nbsp; BUY
      </v-btn>
    </div>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      book: {},
    };
  },
  methods: {
    ...mapActions({
      addCart: "cart/add",
      setAlert: "alert/set",
    }),
    buy() {
      this.addCart(this.book);
      this.setAlert({
        status: true,
        text: "Added to cart",
        type: "success",
      });
    },
  },
  created() {
    let slug = this.$route.params.slug;
    this.axios
      .get("/books/slug/" + slug)
      .then((response) => {
        let book = response.data.data;
        this.book = book;
      })
      .catch((error) => {
        let responses = error.response;
        console.log(responses);
      });
  },
};
</script>