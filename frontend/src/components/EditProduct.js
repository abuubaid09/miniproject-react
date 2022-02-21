import { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory, useParams } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const EditProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const history = useHistory();
    const { id } = useParams();
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');

    const updateProduct = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/products/${id}`, {
            name: name,
            price: price,
            quantity: quantity
        });
        history.push("/product");
    }

    useEffect(() => {
        refreshToken();
        getProductById();
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


    const getProductById = async () => {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setName(response.data.name);
        setPrice(response.data.price);
        setQuantity(response.data.quantity);
    }

    return (
        <div className="container mt-5">
            
            <div className='columns is-centered mt-5'>
                <div className='column is-4 box'>
                    <h1 className='title is-4 has-text-centered'>Edit Product</h1>
                    <form onSubmit={updateProduct}>
                        <div className='field'>
                            <label className='label'>Product Name</label>
                            <input
                                className="input"
                                type="text"
                                placeholder='Product Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className='field'>
                            <label className='label'>Price</label>
                            <input
                                className="input"
                                type="text"
                                placeholder='Price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div className='field'>
                            <label className='label'>Quantity</label>
                            <input
                                className="input"
                                type="text"
                                placeholder='Quantity'
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>

                        <div className='field'>
                            <button className='button is-primary'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProduct;