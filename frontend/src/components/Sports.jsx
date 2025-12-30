import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import React, { lazy, Suspense, useEffect, useState } from 'react'
const API= import.meta.env.VITE_API_BASE_URL;
const LazyComponent= lazy(()=>import('../cards/SportsCard.jsx'))


const Sports = () => {
    const[data,setData]= useState([])
    const[loading,setLoading]= useState(true)
    async function Sports() {
       await axios.get(`${API}/api/sports`).then
        ((response)=>setData(response.data.products)).then
        setLoading(false)
    }
    useEffect(()=>{
        Sports();
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
                    <h1>Popular Items</h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
                        {skeletonItems}
                    </div>
                </div>
            );
            }

  return (
    <div style={{backgroundColor:'#f3f4ff'}}>
      <h1 className='text-3xl'>Sports Items</h1>
             <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'15px'}}>
       <Suspense fallback={<Skeleton count={5}/>}>
       {
        data.map((item)=>{
          return <LazyComponent key={item.id} products={item} />
        }
      )
       }
       </Suspense>
       </div>
    </div>
  )
}

export default Sports
