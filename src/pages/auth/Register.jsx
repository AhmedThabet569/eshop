import { use, useState } from 'react';
import { Link } from 'react-router-dom'
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

function Register() {
    const context = use(myContext);
    const { loading, setLoading } = context;

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    // const [error,setError] = useState('')
    // const [success,setSuccess] = useState('')   

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true)
        if(name === '' || email === '' || password === '') {
           return toast.error('Please fill all the fields')
        }
        try {
                const users = await createUserWithEmailAndPassword(auth,email,password)
              console.log(users);
              
                const user = { 
                    name:name,
                    id:users.user.uid,
                    email:users.user.email,
                }
                const userRef = collection(fireDB,'users');
                await addDoc(userRef,user)
                toast.success('User created successfully')
                setLoading(false)
                setName('')
                setEmail('')
                setPassword('')
        } catch (error) {
            console.log(error)
            toast.error(error.message);
            setLoading(false)
        }
         
    }
    return (
        <div className=' flex justify-center items-center h-screen'>
                        {loading && <Loader/>}

        <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
            <div className="">
                <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
            </div>
             <form>
             <div>
                    <input type="text" 
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Name'
                    />
                </div>
            <div>
                <input type="email"
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                    placeholder='Email'
                />
            </div>
            <div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                    placeholder='Password'
                />
            </div>
            <div className=' flex justify-center mb-3'>
                <button onClick={submit}
                    className=' bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                    Signup
                </button>
            </div>
             </form>
            <div>
                <h2 className='text-white'>Have an account <Link className=' text-red-500 font-bold' to={'/login'}>Login</Link></h2>
            </div>
        </div>
    </div>
    )
}

export default Register