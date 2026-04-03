import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.js';

import './index.css';
import App from './App.jsx';
import NotFound from './pages/NotFound.jsx';
import Loader from './components/Loader.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const ACH = lazy(() => import('./pages/ACH.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'));
const ProductList = lazy(() => import('./pages/ProductList.jsx'));
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'));
const Cart = lazy(() => import('./pages/Cart.jsx'));
const Checkout = lazy(() => import('./pages/Checkout.jsx'));
const SignIn = lazy(() => import('./pages/SignIn.jsx'));

const appRouter = createHashRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: (<> <Home /> <ProductList /> </>) },
            { path: 'product-list', element: <ProductList /> },
            { path: 'product-detail/:id', element: <ProductDetail /> },
            { path: 'cart', element: <Cart /> },
            { path: 'checkout', element: (<ProtectedRoute> <Checkout /> </ProtectedRoute>) },
            { path: 'sign-in', element: <SignIn /> },
            { path: 'ach', element: <ACH /> },
        ],
        errorElement: <NotFound />,
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <Suspense fallback={<Loader />}>
                <RouterProvider router={appRouter} />
            </Suspense>
        </Provider>
    </StrictMode>
);