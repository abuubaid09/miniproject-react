import { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const history = useHistory();

    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');

    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                history.push("/login");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });


    const saveProduct = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/products', {
            name: name,
            price: price,
            quantity: quantity
        });
        history.push("/product");
    }
    return (
        <div className="container mt-5">
            
            <div className="columns is-centered">
                <div className="column is-5">
                    <form onSubmit={saveProduct} className="box">
                    <h1 className='title is-4 has-text-centered'>Add Product</h1>
                        <div className='field'>
                            <label className='label'>Name</label>
                            <input
                                className="input"
                                type="text"
                                placeholder='Name'
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className='field'>
                            <label className='label'>Price</label>
                            <input
                                className="input"
                                type="text"
                                placeholder='Price'
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div className='field'>
                            <label className='label'>Quantity</label>
                            <input
                                className="input"
                                type="text"
                                placeholder='Quantity'
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>

                        <div className='field'>
                            <button className='button is-primary'>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct;