import {useState, useEffect} from 'react';
import axios from "axios";
import {useHistory, useParams} from 'react-router-dom';

const EditUser = () => {
    const [name,setName] = useState('');
    const [address,setAddress] = useState('');
    const [email,setEmail] = useState('');
    const [phone_number,setPhone_Number] = useState('');
    const history = useHistory();
    const { id } = useParams();

    const updateUser = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/users/${id}`,{
            name: name,
            email: email,
            address: address,
            phone_number: phone_number
        });
        history.push("/dashboard");
    }

    useEffect(() => {
        getUserById();
    }, []);

    const getUserById = async () => {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setAddress(response.data.address);
        setPhone_Number(response.data.phone_number);
    }

  return (
    <div>
        <form onSubmit={updateUser}>
            <div className='field'>
                <label className='label'>Name</label>
                <input 
                    className="input" 
                    type="text" 
                    placeholder='Name'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
            </div>

            <div className='field'>
                <label className='label'>Email</label>
                <input 
                    className="input" 
                    type="text" 
                    placeholder='Email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </div>

            <div className='field'>
                <label className='label'>Address</label>
                <input 
                    className="input" 
                    type="text" 
                    placeholder='Address'
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                />
            </div>

            <div className='field'>
                <label className='label'>Phone Number</label>
                <input 
                    className="input" 
                    type="text" 
                    placeholder='Phone Number'
                    value={phone_number}
                    onChange={(e)=>setPhone_Number(e.target.value)}
                />
            </div>

            <div className='field'>
                <button className='button is-primary'>Update</button>
            </div>
        </form>
        
    </div>
  )
}

export default EditUser;