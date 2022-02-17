import {useState} from 'react';
import axios from "axios";
import {useHistory} from 'react-router-dom';

const AddProduct = () => {
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [quantity,setQuantity] = useState('');
    const history = useHistory();

    const saveProduct = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/products',{
            name: name,
            price: price,
            quantity: quantity
        });
        history.push("/product");
    }
  return (
    <div>
        <form onSubmit={saveProduct}>
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
                <label className='label'>Price</label>
                <input 
                    className="input" 
                    type="text" 
                    placeholder='Price'
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)}
                />
            </div>

            <div className='field'>
                <label className='label'>Quantity</label>
                <input 
                    className="input" 
                    type="text" 
                    placeholder='Quantity'
                    value={quantity}
                    onChange={(e)=>setQuantity(e.target.value)}
                />
            </div>

            <div className='field'>
                <button className='button is-primary'>Save</button>
            </div>
        </form>
    </div>
  )
}

export default AddProduct;