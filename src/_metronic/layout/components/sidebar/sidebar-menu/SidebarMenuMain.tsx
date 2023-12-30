/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { useIntl } from 'react-intl'
import { KTIcon } from '../../../../helpers'
import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub'
import { SidebarMenuItem } from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
    <>
      <SidebarMenuItem
        to='/superadmin/dashboard'
        icon='element-11'
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
        fontIcon='bi-app-indicator'
      />
      {/* <SidebarMenuItem
        to='/superadmin/customers'
        icon='element-11'
        title={'Customers'}
        fontIcon='bi-app-indicator'
      /> */}
            <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Merchants</span>
        </div>
      </div>
      <SidebarMenuItem
        to='/superadmin/merchants'
        icon='element-11'
        title={'Merchants'}
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/superadmin/issueApi'
        icon='element-11'
        title={'Merchant Api'}
        fontIcon='bi-app-indicator'
      />
      {/* <SidebarMenuItem to='/builder' icon='switch' title='Layout Builder' fontIcon='bi-layers' /> */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>VISA</span>
        </div>
      </div>
      {/* <SidebarMenuItem
        to='/apply-visa'
        icon='element-11'
        title={'Create New VISA'}
        fontIcon='bi-app-indicator'
      /> */}
      <SidebarMenuItem
        to='/superadmin/processed'
        icon='element-11'
        title={'Processed'}
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/superadmin/in-process'
        icon='element-11'
        title={'In-Process'}
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/superadmin/waiting-for-approval'
        icon='element-11'
        title={'Waiting For Approval'}
        fontIcon='bi-app-indicator'
      />{' '}
      <SidebarMenuItem
        to='/superadmin/rejected'
        icon='element-11'
        title={'Rejected'}
        fontIcon='bi-app-indicator'
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Wallet</span>
        </div>
      </div>
      <SidebarMenuItem
        to='/superadmin/wallet'
        icon='element-11'
        title={'Wallet'}
        fontIcon='bi-app-indicator'
      />
            <SidebarMenuItem
        to='/superadmin/apiPayment'
        icon='element-11'
        title={'Api Payment'}
        fontIcon='bi-app-indicator'
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Settings</span>
        </div>
      </div>
      <SidebarMenuItem
        to='/superadmin/apisetting'
        icon='element-11'
        title={'API Setting'}
        fontIcon='bi-app-indicator'
      />
    </>
  )
}

export { SidebarMenuMain }
