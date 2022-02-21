import { useState, useEffect } from 'react'
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";


const ProductList = () => {
    const [products, setProduct] = useState([]);
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const history = useHistory();


    useEffect(() => {
        refreshToken();
        getProducts();
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

    const getProducts = async () => {
        const response = await axios.get('http://localhost:5000/products');

        setProduct(response.data);
    }

    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:5000/products/${id}`);
        getProducts();
    }

    return (
        <div className='container mt-5'>
            <h1>Welcome Back: {name}</h1>
            <Link to="/add" className='button is-primary mt-5'>Add New</Link>
            <div className='columns is-centered mt-5'>
                <div className='column is-7'>
                    <h1 className='title is-4 has-text-centered'>Product List</h1>
                    <table className='table is-bordered is-striped is-narrow is-hoverable '>
                        <thead className='has-text-centered'>
                            <tr>
                                <th width="5px">No</th>
                                <th width="200px">Name</th>
                                <th width="100px">Price</th>
                                <th width="100px">Quantity</th>
                                <th width="200px">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product.id}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td className='has-text-centered'>
                                        <Link to={`/edit/${product.id}`} className='button is-small is-info'>Edit</Link>
                                        <button  onClick={() => deleteProduct(product.id)} className='button is-small is-danger'>Delete</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductList;

