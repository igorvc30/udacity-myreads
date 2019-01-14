import BookManager from './../screens/BookManager';
import SearchBook from './../screens/SearchBook';

const appRoutes = [
    {
      name: "Home",
      path: "/",
      component: BookManager,
      exact: true
    },
    {
      name: "Search",
      path: "/search",
      component: SearchBook,
      exact: true
    },
    
];

  export default appRoutes;
  