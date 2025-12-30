import { lazy, Suspense, useEffect, useLayoutEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// import Card from '../cards/BeautyCard.jsx';
const LazyComponent= lazy(()=>import('../cards/BeautyCard.jsx'))

const BeautyProducts = () => {
    const [data,setData]= useState([])
    const[loading,setLoading]= useState(true)

    async function GetData() {
        const response= await fetch('https://dummyjson.com/products');
       const json= await response.json();

       console.log(json);
       setData(json.products);
       setLoading(false)
    }
   
    useEffect(()=>{
        GetData();
    },[])
    
        if (loading) {
             const skeletonItems = Array.from({ length: 10 }, (_, index) => (
            <div key={index} style={{ width: '250px', padding: '10px', border: '1px solid #ddd' }}>
                <Skeleton height={200} /> 
                <Skeleton count={2} /> 
            </div>
        ));
    
        return (
            <div>
                <h1 className='text-3xl'>Popular Items</h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', backgroundColor: '#ffc0c2' }}>
                    {skeletonItems}
                </div>
            </div>
        );
        }

  return (
    <div style={{marginTop:'10px',backgroundColor:'#f3f4ff'}}>
      <h1 className='text-3xl'>Beauty & Grocery Products</h1>
     
       <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'15px'}}>
      <Suspense fallback={<Skeleton count={5}/>}>

      {
        data.map((item)=>{
            return  <LazyComponent key={item.id} products={item}/>
        })
      }
            </Suspense>

       </div>
    </div>
  )
}

export default BeautyProducts;
