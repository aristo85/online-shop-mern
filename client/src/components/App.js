import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import About from "./landingPage";
import Login from "./RegisterLogin";
import Register from './RegisterLogin/register'
import './general.css';
import UploadProductPage from "./UploadProductPage/UploadProductPage";
import AuthenticationCheck from "./nonPresentational/auth";
import 'bootstrap/dist/css/bootstrap.css';
import NavbarMenu from "./navbar";
import ProductDetailPage from "./productDetailPage/productDetailPage";
import CartPage from "./cartPage/cartPage";
import History from "./history/history";

function App() {
    return (
        <div>
            <NavbarMenu />
            <Switch>
                {/*<Route path="/about" component={ () => <AuthenticationCheck pageToAuth={About} reload={null}/> } />*/}
                <Route path="/login" component={ () => <AuthenticationCheck pageToAuth={Login} reload={false}/> } />
                <Route path="/register" component={ () => <AuthenticationCheck pageToAuth={Register} reload={false}/> } />
                <Route path="/"  exact component={ () => <AuthenticationCheck pageToAuth={About} reload={null}/> } />
                <Route path="/product/upload"
                       component={ () => <AuthenticationCheck pageToAuth={UploadProductPage} reload={true} adminRoute={true} /> }
                />
                <Route path="/product/:productId"
                       component={ () => <AuthenticationCheck pageToAuth={ProductDetailPage} reload={null}/> }
                />
                <Route path="/cartpage"
                       component={ () => <AuthenticationCheck pageToAuth={CartPage} reload={true}/> }
                />
                <Route path="/history"
                       component={ () => <AuthenticationCheck pageToAuth={History} reload={true}/> }
                />
                <Redirect to="/" />
            </Switch>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
        </div>
    );
}

export default App;
