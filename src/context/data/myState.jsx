import React, { useEffect, useState } from 'react'
import MyContext from './myContext';
 import { fireDB } from '../../firebase/FirebaseConfig';
 import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
 import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

function MyState(props) {
    const [mode, setMode] = useState('light'); 
 const [loading, setLoading] = useState(false)
 
    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = "rgb(17, 24, 39)"
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = "white"
        }
    }
   const [products , setProducts] = useState({
    title:null,
    price:null,
    description:null,
    category:null,
    imageUrl:null,
    time:Timestamp.now(),
    date:new Date().toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )
   });

  //  add product 
  const addProduct = async () => {
    if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
      return toast.error("all fields are required")
  }

  setLoading(true)

  try {
      const productRef = collection(fireDB, 'products');
      await addDoc(productRef, products)
      toast.success("Add product successfully");
      setTimeout(() => {
          window.location.href = '/dashboard'
      }, 800);
      getProductData();
      setLoading(false)
  } catch (error) {
      console.log(error);
      setLoading(false)
  }
    // setProducts("")
  }
  const [product,setProduct] = useState([]);
  // get product 
  const getProductData = async() => {
    setLoading(true)

    try {
        const q = query(
            collection(fireDB, 'products'),
            orderBy('time')
        );

        const data = onSnapshot(q, (QuerySnapshot) => {
            let productArray = [];
            QuerySnapshot.forEach((doc) => {
                productArray.push({ ...doc.data(), id: doc.id });
            });
            setProduct(productArray);
            setLoading(false)
        });

        return () => data;

    } catch (error) {
        console.log(error)
        setLoading(false)
    }

  }

  // update product
  const editHandle = (item) => {
    setProducts(item);
  }
  const updatePr = async () => {
    setLoading(true)
    try {
         await setDoc(doc(fireDB,'products',products.id),products);
         toast.success("product updated successfully");
         getProductData();
         setLoading(false);
         window.location.href = '/dashboard';
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const deleteProduct = async (item) => {
    setLoading(true)
    try {
        await deleteDoc(doc(fireDB, 'products', item.id));
        toast.success("product deleted successfully")
        getProductData();
        setLoading(false)
    } catch (error) {
        setLoading(false)
        console.log(error)
    }
  }
  useEffect(() => {
    getProductData();
  }
  ,[]);
  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')
  return (
    <MyContext.Provider value={ {mode, toggleMode,loading,setLoading, products, setProducts,addProduct,product,editHandle,updatePr,deleteProduct,
      searchkey, setSearchkey,filterType, setFilterType,
      filterPrice, setFilterPrice
    } }>
       {props.children}
    </MyContext.Provider>
  )
}

export default MyState;