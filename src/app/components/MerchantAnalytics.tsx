import { HomeMainCard } from "./HomeMainCard";
import icon1 from '../../_metronic/assets/card/1.png'
import customer from '../../_metronic/assets/card/customer.png'
import merchant from '../../_metronic/assets/card/merchant.png'

type Props = {
  dashboardData: any
}


export function MerchantAnaltytics({dashboardData}) {
    return (
        <>
   <div className='row g-5 g-xl-10'>
      {/* begin::Col */}
      <div className=' col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
        <HomeMainCard
          className='mb-5 mb-xl-10'
          description='Wallet Balance'
          color='#F0F0F0'
          icon={icon1}
          textColor='#071437'
          count={dashboardData?.wallet_balance}
        />
      </div>
      <div className=' col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
        <HomeMainCard
          className='mb-5 mb-xl-10'
          description='Total Visa'
          color='#071537'
          icon={customer}
          textColor='#ffff'
          count={dashboardData?.total_visa}
        />
      </div>
      <div className=' col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
        <HomeMainCard
          className='mb-5 mb-xl-10'
          description='Approved Visa'
          color='#FFC703'
          icon={merchant}
          textColor='#FFFF'
          count={dashboardData?.approved_visa}
        />
      </div>
      <div className=' col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
        <HomeMainCard
          className='mb-5 mb-xl-10'
          description='No. of Visa In-Process'
          color='#7239EB'
          icon={icon1}
          textColor='#FFFF'
          count={dashboardData?.in_process_visa}
        />
      </div>
    </div>
    <div className='row g-5 g-xl-10'>
      <div className=' col-md-6 col-lg-6 col-xl-6 col-xxl-3 '>
        <HomeMainCard
          className='mb-5 mb-xl-10'
          description='No. of Visa In Waiting'
          color='#F0F0F0'
          icon={icon1}
          textColor='#071437'
          count={dashboardData?.waiting_visa}
        />
      </div>
      <div className=' col-md-6 col-lg-6 col-xl-6 col-xxl-3 '>
        <HomeMainCard
          className='mb-5 mb-xl-10'
          description='No. of Visa Not Issued'
          color='#071537'
          icon={customer}
          textColor='#ffff'
          count={dashboardData?.not_issued_visa}
        />
      </div>
    </div>
        </>
    )
}