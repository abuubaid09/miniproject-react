import { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory, useParams } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const EditUser = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhone_Number] = useState('');
    const history = useHistory();
    const { id } = useParams();

    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');

    const updateUser = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/users/${id}`, {
            name: name,
            email: email,
            address: address,
            phone_number: phone_number
        });
        history.push("/dashboard");
    }

    useEffect(() => {
        refreshToken();
        getUserById();
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

    const getUserById = async () => {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setAddress(response.data.address);
        setPhone_Number(response.data.phone_number);
    }

    return (
        <div className="container mt-5">
            <div className='columns is-centered mt-5'>
                <div className='column is-4 box'>
                    <h1 className='title is-4 has-text-centered'>Edit User</h1>
                    <form onSubmit={updateUser}>
                        <div className='field'>
                            <label className='label'>Name</label>
                            <input
                                className="input"
                                type="text"
                                placeholder='Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className='field'>
                            <label className='label'>Email</label>
                            <input
                                className="input"
                                type="text"
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='field'>
                            <label className='label'>Address</label>
                            <input
                                className="input"
                                type="text"
                                placeholder='Address'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div className='field'>
                            <label className='label'>Phone Number</label>
                            <input
                                className="input"
                                type="text"
                                placeholder='Phone Number'
                                value={phone_number}
                                onChange={(e) => setPhone_Number(e.target.value)}
                            />
                        </div>

                        <div className='field'>
                            <button className='button is-success is-fullwidth'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditUser;