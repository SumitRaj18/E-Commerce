import axios from 'axios';
import { lazy, Suspense, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Ensure CSS is imported

const LazyComponent = lazy(() => import('../cards/ElectronicsCard.jsx'));

const Electronics = () => {
  const [edata, setData] = useState([]);
  console.log(edata)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Using Promise.all so both categories load at once
        const [laptopsRes, phonesRes] = await Promise.all([
          axios.get(`https://dummyjson.com/products/category/laptops`),
          axios.get(`https://dummyjson.com/products/category/smartphones`)
        ]);

        const combinedData = [
          ...laptopsRes.data.products,
          ...phonesRes.data.products
        ];

        setData(combinedData);
      } catch (error) {
        console.error("Error fetching electronics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Separate loading UI for cleaner return statement
  if (loading) {
    return (
      <div className="p-5">
        <div className='text-3xl mb-5'>Electronics Items</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} style={{ width: '250px', padding: '10px', border: '1px solid #ddd', borderRadius: '12px', background: '#fff' }}>
              <Skeleton height={200} borderRadius={12} />
              <div style={{ marginTop: '10px' }}>
                <Skeleton width="80%" height={20} />
                <Skeleton width="40%" height={15} style={{ marginTop: '10px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-5" style={{backgroundColor:'#f3f4ff'}} >
      <div className='text-3xl mb-5'>Electronics Items</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
        <Suspense fallback={<Skeleton count={5} />}>
          {edata.map((item) => (
            <LazyComponent key={item.id} products={item} />
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default Electronics;