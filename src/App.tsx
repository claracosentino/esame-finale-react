import './App.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import DetailPage from './pages/DetailPage'
import {Suspense, lazy} from 'react'

const HomePage = lazy(() => import ('./pages/HomePage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>
  },
  {
    path: '/detail/:id',
    element: <DetailPage/>
  },
  {
    path: '*',
    //element: <h1>404</h1>
    element: <Navigate to=""/>
  }
])

function App() {

  return <Suspense fallback={<p>Waiting for lazy load</p>}>
  <RouterProvider router={router} />
  </Suspense>
}

export default App
