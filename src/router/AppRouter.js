import BookManager from './../screens/BookManager';
import SearchBook from './../screens/SearchBook';
import BookInfo from './../screens/BookInfo';

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
    {
      name: "Information",
      path: "/info/:id",
      component: BookInfo,
      exact: true
    },
    
];

  export default appRoutes;
  