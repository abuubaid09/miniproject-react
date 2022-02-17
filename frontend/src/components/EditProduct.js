import {useState, useEffect} from 'react';
import axios from "axios";
import {useHistory, useParams} from 'react-router-dom';

const EditProduct = () => {
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [quantity,setQuantity] = useState('');
    const history = useHistory();
    const { id } = useParams();

    const updateProduct = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/products/${id}`,{
            name: name,
            price: price,
            quantity: quantity
        });
        history.push("/product");
    }

    useEffect(() => {
        getProductById();
    }, []);

    const getProductById = async () => {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setName(response.data.name);
        setPrice(response.data.price);
        setQuantity(response.data.quantity);
    }

  return (
    <div>
        <form onSubmit={updateProduct}>
            <div className='field'>
                <label className='label'>Product Name</label>
                <input 
                    className="input" 
                    type="text" 
                    placeholder='Product Name'
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
                <button className='button is-primary'>Update</button>
            </div>
        </form>
        
    </div>
  )
}

export default EditProduct;