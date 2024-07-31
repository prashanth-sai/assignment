import { createRouter, createWebHistory } from 'vue-router';
import BookList from '../components/BookList.vue';
import BookDetails from '../components/BookDetails.vue';

const routes = [
  {
    path: '/',
    name: 'BookList',
    component: BookList
  },
  {
    path: '/book/:id',
    name: 'BookDetails',
    component: BookDetails
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
