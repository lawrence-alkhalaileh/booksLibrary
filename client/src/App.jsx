import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookList from './components/BookList'
import EditBook from './components/EditBook'
function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <BookList />
    }, {
      path: '/edit/:id',
      element: <EditBook />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
