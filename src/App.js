import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";

import store from "./store/store";
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import Banner from "./component/main/Banner";

import Main from "./component/main/Main";
import Catalog from "./component/main/catalog/Catalog";
import About from "./component/main/About";
import Contact from "./component/main/Contact";
import Product from "./component/main/product/Product";
import Cart from "./component/cart/Cart";
import Page404 from "./component/main/Page404";


// import banner from "./img/banner.jpg";

function App() {

  // Банер
  const banner = require('./img/banner.jpg');

  return (
      <BrowserRouter>
         <Provider store={store}>
            <Header />

            <main className="container">
                <div className="row">
                    <div className="col">
                        <Banner text='К весне готовы!' img={banner} />

                        <Routes>
                          <Route path='/' element={<Main />} />
                          <Route path='/about' element={<About />} />
                          <Route path='/contact' element={<Contact />} />

                          <Route path='/catalog' element={<Catalog />} />
                          <Route path='/catalog/:id' element={<Product />} />

                          <Route path='/cart' element={<Cart />} />

                          <Route path='*' element={<Page404 />} />

                        </Routes>

                    </div>
                </div>
            </main>

            <Footer />
         </Provider>
      </BrowserRouter>
  );
}

export default App;
