import { ProcessedTable } from '../../components/ProcessedTable'
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../helpers/axiosInstance';
import { IssueApiTable } from '../../components/IssueApiTable';

function IssueApiWrapper() {
    const [memberStatsData, setMemberStatsData] = useState([]);
    const [loading,setLoading] = useState(false);
  
    useEffect(() => {
      // Define a function to make the POST request
      const fetchData = async () => {
        setLoading(true);
        try {
        
          // Make a POST request to your API endpoint
          axiosInstance.get('/backend/fetch_merchant_api')
            .then((response) => {
              console.log(response.data)
              setMemberStatsData(response.data.data);
              setLoading(false);
            })
            .catch((error) => {
              console.error('Error fetching Atlys data:', error);
              setLoading(false);
            });
  
          
        } catch (error) {
          console.error('Error:', error);
          setLoading(false);
        }
      };
  
      // Call the fetchData function when the component mounts
      fetchData();
    }, []); // The empty dependency array ensures this effect runs once on mount
  return (
    <div>
      <IssueApiTable className='' data={memberStatsData} loading={loading}/>
    </div>
  )
}

export default IssueApiWrapper;