import { lazy, FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { MenuTestPage } from '../pages/MenuTestPage'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import CustomersWrapper from '../pages/customers/CustomersWrapper'
import MerchantWrapper from '../pages/merchants/MerchantWrapper'
import AddNewMerchant from '../pages/merchants/AddNewMerchant'
import ProcessedWrapper from '../pages/processed/ProcessedWrapper'
import InProcessWrapper from '../pages/In-process/InProcessWrapper'
import ApprovalWrapper from '../pages/waiting-for-approval/ApprovalWrapper'
import RejectedWrapper from '../pages/visa-rejected/RejectedWrapper'
import NewVisaWrapper from '../pages/New-visa/CreateNewVisa'
import ApplyVisaWrapper from '../pages/apply-visa/ApplyVisaWrapper'
import MerchantDashboard from '../pages/merchants/dashboard/Dashboard'
import MerchantNewVisaWrapper from '../pages/merchants/apply-visa/MerchantNewVisaWrapper'
import MerchantProfile from '../pages/merchants/profile/MerchantProfile'
import Cookies from 'js-cookie';
import WalletWrapper from '../pages/wallet/WalletWrapper'
import IssueApiWrapper from '../pages/IssueApi/IssueApiWrapper'
import ApiSettingWrapper from '../pages/api-setting/ApiSettingWrapper'
import ApiPaymentWrapper from '../pages/api-payment/ApiPaymentWrapper'
import ApiMerchantWrapper from '../pages/api-merchant/ApiMerchantWrapper'
import { ChangePassword } from '../modules/profile/components/ChangePassword'

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

  const user_type = Cookies.get('user_type');
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        {user_type == 'merchant' ?
          <>
          <Route path='*' element={<Navigate to='/merchant/apply-visa' />} />
          <Route path='merchant/apply-visa' element={<MerchantNewVisaWrapper />} />
          <Route path='merchant/dashboard' element={<MerchantDashboard />} />
          <Route path='merchant/profile' element={<MerchantProfile />} />
       
          </>
          :
          <>
          <Route path='*' element={<Navigate to='/superadmin/dashboard' />} />
        
         <Route path='superadmin/dashboard' element={<DashboardWrapper />} />
        <Route path='superadmin/customers' element={<CustomersWrapper />} />
        <Route path='superadmin/merchants' element={<MerchantWrapper />} />
        <Route path='superadmin/add-new-merchant' element={<AddNewMerchant />} />
        <Route path='superadmin/processed' element={<ProcessedWrapper />} />
        <Route path='superadmin/in-process' element={<InProcessWrapper />} />
        <Route path='superadmin/waiting-for-approval' element={< ApprovalWrapper />} />
        <Route path='superadmin/rejected' element={<RejectedWrapper />} />
        <Route path='superadmin/wallet' element={<WalletWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        <Route path='superadmin/issueApi' element={<IssueApiWrapper />}/>
        <Route path='superadmin/apiSetting' element={<ApiSettingWrapper />}/>
        <Route path='superadmin/apiPayment' element={<ApiPaymentWrapper />}/>
        <Route path='superadmin/apiMerchants' element={<ApiMerchantWrapper />}/>
        <Route path='superadmin/changepassword' element={<ChangePassword/>}/>



        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        </>
      }
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }
