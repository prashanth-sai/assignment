<template>
  <div class="book-details" v-if="book">
    <h1>{{ book.volumeInfo.title }}</h1>
    <p v-if="book.volumeInfo.authors">By: {{ book.volumeInfo.authors.join(', ') }}</p>
    <p>{{ book.volumeInfo.description }}</p>
    <router-link to="/">Back to list</router-link>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'BookDetails',
  setup() {
    const route = useRoute();
    const book = ref(null);
    const error = ref('');

    const fetchBook = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${route.params.id}`);
        book.value = response.data;
        error.value = '';
      } catch (err) {
        error.value = 'Failed to fetch book details';
      }
    };

    onMounted(fetchBook);

    return {
      book,
      error
    };
  }
};
</script>

<style scoped>
.book-details {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
