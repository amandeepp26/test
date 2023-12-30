import { useEffect, useState } from "react";
import { VisaDetailCard } from "../../../components/VisaDetailCard";
import axiosInstance from "../../../helpers/axiosInstance";
import Cookies from 'js-cookie';
import { MerchantAnaltytics } from "../../../components/MerchantAnalytics";


const MerchantDashboard = () => {
  const [activeTab, setActiveTab] = useState("Analytics"); // Initialize active tab state
  const [visaData, setVisaData] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);


  useEffect(() => {
    // Function to fetch data from the API based on the activeTab
    
    fetchData();
    fetchDashboardData(); // Call the fetchData function when activeTab changes
  }, [activeTab]);
  // Function to handle tab clicks
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const fetchData = async () => {
    try {
      const merchant_id = Cookies.get('user_id');
      let postBody = {
        merchant_id: merchant_id
      }
      let data;

      let response = await axiosInstance.post("/backend/merchant/fetch_visa", postBody);
      if (response.status == 200) {
        if (activeTab === "Processed") {
          data = response.data.data.filter(item => item.visa_status === 'Processed');
        } else if (activeTab === "In-Process") {
          data = response.data.data.filter(item => item.visa_status === 'Applied');
        } else if (activeTab === "All") {
          data = response.data.data
        } else if (activeTab === "Not Issued") {
          data = response.data.data.filter(item => item.visa_status === 'Not Issued');
        } else if (activeTab === "Rejected") {
          data = response.data.data.filter(item => item.visa_status === 'Rejected');
        } else if (activeTab === "Waiting") {
          data = response.data.data.filter(item => item.visa_status === 'Waiting');
        }
        if(activeTab != "Analytics"){
        setVisaData(data); // Set the fetched data in the state
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const merchant_id = Cookies.get('user_id');
      let postBody = {
        merchant_id: merchant_id
      }
      let response = await axiosInstance.post("/backend/merchant_dashboard", postBody);
      if (response.status == 200) {
        
        // if(activeTab!= "Analytics"){
          setDashboardData(response.data.data); // Set the fetched data in the state
        // }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // Define inline styles for the active tab text
  const activeTabTextStyle = {
    color: '#332789', // Text color for the active tab
    cursor: 'pointer',
    fontSize: 18,
    fontWeight: 600,
    borderBottom: "1px solid #ccc",
    paddingBottom: "20px",
    padding: '10px 0',
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
  };

  // Define inline styles for the active tab border
  const activeTabBorderStyle = { // Add a bottom border for the active tab
    padding: 7,
    paddingLeft: 8,
    marginTop: 5,
    borderRadius: 7,
    color: '#332789', // Add some padding to the active tab
  };

  // Define inline styles for the inactive tab text
  const tabTextStyle = {
    color: '#000', // Text color for the inactive tab
    cursor: 'pointer',
    fontSize: 18,
    borderBottom: "1px solid #ccc",
    paddingBottom: "20px",
    padding: '10px 0',
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
  };

  // Define inline styles for the inactive tab border
  const tabBorderStyle = { // Add a transparent bottom border for inactive tabs
    padding: '8px',
    marginTop: 5,
    // Add some padding to the inactive tabs
  };

  return (
    <div style={{ display: 'flex', width: '100%', marginTop: -35, backgroundColor: '#fff' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '20%',
          backgroundColor: '#fff',
          padding: '16px',
          position: 'fixed',
          height: '100%',
          overflowY: 'auto',
          paddingTop: 50
        }}
      >

        <div
          onClick={() => handleTabClick("Analytics")}
          style={activeTab === "Analytics" ? { ...activeTabTextStyle, ...activeTabBorderStyle } : { ...tabTextStyle, ...tabBorderStyle }}
        >
          Analytics
        </div>
        <h5 className="py-7" style={{ padding: 8 }}>
          VISA
        </h5>
        <div
          onClick={() => handleTabClick("All")}
          style={activeTab === "All" ? { ...activeTabTextStyle, ...activeTabBorderStyle } : { ...tabTextStyle, ...tabBorderStyle }}
        >
          All
        </div>
        <div
          onClick={() => handleTabClick("Processed")}
          style={activeTab === "Processed" ? { ...activeTabTextStyle, ...activeTabBorderStyle } : { ...tabTextStyle, ...tabBorderStyle }}
        >
          Processed
        </div>
        <div
          onClick={() => handleTabClick("In-Process")}
          style={activeTab === "In-Process" ? { ...activeTabTextStyle, ...activeTabBorderStyle } : { ...tabTextStyle, ...tabBorderStyle }}
        >
          In-Process
        </div>

        <div
          onClick={() => handleTabClick("Waiting")}
          style={activeTab === "Waiting" ? { ...activeTabTextStyle, ...activeTabBorderStyle } : { ...tabTextStyle, ...tabBorderStyle }}
        >
          Waiting for Approval
        </div>
        <div
          onClick={() => handleTabClick("Not Issued")}
          style={activeTab === "Not Issued" ? { ...activeTabTextStyle, ...activeTabBorderStyle } : { ...tabTextStyle, ...tabBorderStyle }}
        >
          Not Issued
        </div>
        <div
          onClick={() => handleTabClick("Rejected")}
          style={activeTab === "Rejected" ? { ...activeTabTextStyle, ...activeTabBorderStyle } : { ...tabTextStyle, ...tabBorderStyle }}
        >
          Rejected
        </div>
      </div>

      {/* Right-side content */}
      <div style={{ marginLeft: '20%', width: '80%', overflowY: 'auto', padding: '16px' }}>
        {activeTab === "Analytics" ?
          <div>
            <MerchantAnaltytics dashboardData={dashboardData}/>
          </div>
          :
          <VisaDetailCard visaData={visaData} />
        }
      </div>
    </div>
  );
};

export default MerchantDashboard;
