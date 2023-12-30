import { Route, Routes } from 'react-router-dom';
import { Registration as SuperadminRegistration } from './components/Superadmin/Registration'; 
import { ForgotPassword as SuperadminForgotPassword } from './components/Superadmin/ForgotPassword'; 
import { Login as SuperadminLogin } from './components/Superadmin/Login'; 
import { AuthLayout } from './AuthLayout';
import { Login as MerchantLogin } from './components/Merchant/Login'; 
import { Registration as MerchantRegistration } from './components/Merchant/Registration'; 
import { ForgotPassword as MerchantForgotPassword } from './components/Merchant/ForgotPassword'; 
import { Login as CustomerLogin } from './components/Customer/Login'; 
import { Registration as CustomerRegistration } from './components/Customer/Registration'; 
import { ForgotPassword as CustomerForgotPassword } from './components/Customer/ForgotPassword'; 
import { LandingPage } from './components/LandingPage';
import { ChangePassword } from './components/Merchant/ChangePassword';

const AuthPage = () => (
  <Routes>
    
    <Route index element={<LandingPage />} />
    <Route element={<AuthLayout />}>
      <Route path='superadmin/login' element={<SuperadminLogin />} />
      <Route path='superadmin/registration' element={<SuperadminRegistration />} />
      <Route path='superadmin/forgot-password' element={<SuperadminForgotPassword />} />
      <Route path='merchant/login' element={<MerchantLogin />} />
      <Route path='merchant/registration' element={<MerchantRegistration />} />
      <Route path='merchant/forgot-password' element={<MerchantForgotPassword />} />
      <Route path='merchant/change-password' element={<ChangePassword />} />
      <Route path='customer/login' element={<CustomerLogin />} />
      <Route path='customer/registration' element={<CustomerRegistration />} />
      <Route path='customer/forgot-password' element={<CustomerForgotPassword />} />
    </Route>
  </Routes>
);

export { AuthPage };
