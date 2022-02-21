import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios";
import './Catalog.css';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

const DetilProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const { id } = useParams();

    const getProductById = async () => {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setName(response.data.name);
        setPrice(response.data.price);
        setQuantity(response.data.quantity);
    }

    useEffect(() => {
        getProductById();
    }, []);

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



            <div className='container mt-5'>

                <div className='columns'>
                    <div className='column is-two-fifths'>
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-130x130">
                                    <img src={`images/${id}.jpg`} alt="Product" />
                                </figure>
                            </div>

                        </div>
                    </div>
                    <div className=''>
                        <div className="card">
                            <div className="card-content">

                                <div className="media">
                                    <div className="media-content">
                                        <p className="title is-4">{name}</p>
                                        <p className="subtitle is-6">Rp. {price}</p>
                                    </div>
                                </div>

                                <div className="content">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Phasellus nec iaculis mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Phasellus nec iaculis mauris.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Phasellus nec iaculis mauris.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Phasellus nec iaculis mauris.

                                    <br />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div >


    )
}

export default DetilProduct;