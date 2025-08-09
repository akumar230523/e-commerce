import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/cartstore.js';

import './index.css';

import App from './App.jsx';
import Home from './pages/Home.jsx';
const ACH = lazy(() => import('./pages/ACH.jsx'));
const SignIn = lazy(() => import('./pages/SignIn.jsx'));
const ProductList = lazy(() => import('./pages/ProductList.jsx'));
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'));
const Cart = lazy(() => import('./pages/Cart.jsx'));
const Checkout = lazy(() => import('./pages/Checkout.jsx'));
import NotFound from './pages/NotFound.jsx';

const appRouter = createHashRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <> <Home /> <ProductList /> </> },
            { path: 'ach', element: <ACH /> },
            { path: 'sign-in', element: <SignIn /> },
            { path: 'product-list', element: <ProductList /> },
            { path: 'product-detail/:id', element: <ProductDetail /> },
            { path: 'cart', element: <Cart /> },
            { path: 'checkout', element: <Checkout /> },
        ],
        errorElement: <NotFound />,
    },
]);

function Loader() {
    return (
        <div className="main-loading">
            <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            <p> Loading  </p>
        </div>
    );
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <Suspense fallback={<Loader />}>
                <RouterProvider router={appRouter} />
            </Suspense>
        </Provider>
    </StrictMode>
);

