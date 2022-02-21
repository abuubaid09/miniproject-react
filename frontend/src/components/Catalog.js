import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios";
import './Catalog.css';
import { Link } from "react-router-dom";

const Catalog = () => {

    const [products, setProduct] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await axios.get('http://localhost:5000/products');

        setProduct(response.data);
    }

    return (

        <div className="container-fluid">
            <nav className="navbar is-light" role="navigation" aria-label="main navigation">
                <div className="container">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="/">
                            <img src="images/lucky.png" width="50" height="50" alt="logo" />
                        </a>

                        <a href="/" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-start">
                            <a href="/" className="navbar-item">
                                Home
                            </a>
                        </div>

                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                    <a href="/login" className="button is-light">
                                        Login
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </nav>




            <section className="hero is-primary">

                <div className="hero-body">

                    <div className="container">
                        <h1 className="title">
                            Lucky Store
                        </h1>
                        <h3 className='title is-6'>Modern Muslim Cloth</h3>
                    </div>

                </div>

            </section>



            <div className='columns is-7'>
                <section className="section">
                    <div className="container">
                        <div className="tile is-ancestor">
                            <div className="tile is-parent">
                                {products.map((product, index) => (
                                    <div className="card Card-style" key={product.id}>
                                        <div className="card-image">
                                            <figure className="image is-128x128">
                                                <img src={`images/${product.id}.jpg`} alt="Product"/>
                                            </figure>
                                        </div>
                                        <div className="card-content">
                                            <div className="media">
                                                <div className="media-content">
                                                    <p className="title is-6">{product.name}</p>
                                                    <p className="subtitle is-6">Rp. {product.price}</p>
                                                </div>
                                            </div>

                                            {/* <div className="content">Eyeliner spidol & Gudetama Lipstick & Liquid matte kylie</div> */}
                                        </div>
                                        <footer className="card-footer">
                                            {/* <a href={`/catalog/${product.id}`} class="card-footer-item">Preview</a> */}
                                            <Link to={`/${product.id}`} className='card-footer-item button is-small is-info'>Preview</Link>
                                        </footer>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </section>
            </div>


        </div >


    )
}

export default Catalog;