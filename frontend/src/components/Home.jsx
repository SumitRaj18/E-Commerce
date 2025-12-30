import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Banner from './Banner';
import React, { useEffect, useState, lazy, Suspense } from 'react';
import Promos from './Promos';

const LazyComponent = lazy(() => import('../cards/ClothesCard'));

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); 

    async function GetData() {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            setData(response.data);
            setLoading(false)
        } catch (error) {
            console.error("Error fetching data:", error);
        } 
    }

    useEffect(() => {
        GetData();
    }, []); 

    if (loading) {
         const skeletonItems = Array.from({ length: 10 }, (_, index) => (
        <div key={index} style={{ width: '250px', padding: '10px', border: '1px solid #ddd' }}>
            <Skeleton height={200} /> 
            <Skeleton count={2} /> 
        </div>
    ));

    return ( 
        <div>
            <div className='text-3xl'>Popular Items</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', backgroundColor: '#e3e2c3' }}>
                {skeletonItems}
            </div>
        </div>
    );
    }
    
    return (
        <div>
     <Promos/>
            <div style={{ marginTop: '10px' }}>
                <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-around' }}>
                </div>
                
                <div className='text-3xl'>Popular Items</div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', backgroundColor:'#f3f4ff', marginBottom:'20px' }}>
                    <Suspense fallback={<Skeleton count={5}/>}>
                        {
                            data.map((item) => {
                                return <LazyComponent key={item.id} products={item} />;
                            })
                        }
                    </Suspense> 
                </div>
            </div>
        </div>
    );
}

export default Home;