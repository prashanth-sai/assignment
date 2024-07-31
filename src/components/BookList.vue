<template>
  <div class="book-list">
    <h1>Book List</h1>
    <input v-model="query" @input="fetchBooks" placeholder="Search for books..." />
    <button @click="resetData"> Reset </button>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="books.length">
      <ul>
        <li v-for="book in paginatedBooks" :key="book.id" @click="goToBookDetails(book.id)">
          <h3>{{ book.volumeInfo.title }}</h3>
          <p v-if="book.volumeInfo.authors">By: {{ book.volumeInfo.authors.join(', ') }}</p>
          <p>{{ book.volumeInfo.description }}</p>
        </li>
      </ul>
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'BookList',
  setup() {
    const books = ref([]);
    const error = ref('');
    const query = ref('');
    const currentPage = ref(1);
    const booksPerPage = 5;
    const router = useRouter();

    const fetchBooks = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query.value}`);
        books.value = response.data.items;
        error.value = '';
      } catch (err) {
        books.value = []
        error.value = 'Failed to fetch books';
      }
    };

    const paginatedBooks = computed(() => {
      const start = (currentPage.value - 1) * booksPerPage;
      const end = start + booksPerPage;
      return books.value.slice(start, end);
    });

    const totalPages = computed(() => Math.ceil(books.value.length / booksPerPage));

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value += 1;
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value -= 1;
      }
    };

    const goToBookDetails = (id) => {
      router.push(`/book/${id}`);
    };

    const resetData = () => {
        books.value = []
        query.value = ''
        error.value = ''

    }

    return {
      books,
      error,
      query,
      currentPage,
      paginatedBooks,
      totalPages,
      nextPage,
      prevPage,
      fetchBooks,
      goToBookDetails,
      resetData
    };
  }
};
</script>

<style scoped>
.book-list {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.error {
  color: red;
  margin-top: 10px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}
li:hover {
  background-color: #f0f0f0;
}
button {
  margin: 10px;
}
</style>
