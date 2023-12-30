import { useIntl } from 'react-intl'
import { MenuItem } from './MenuItem'
import { MenuInnerWithSub } from './MenuInnerWithSub'
import { MegaMenu } from './MegaMenu'
import Cookies from 'js-cookie';
export function MenuInner() {
  const intl = useIntl()

  const user_type = Cookies.get('user_type');
  return (
    <>
      {/* Super admin flow */}
      {user_type == 'super_admin' ?
        <>
          {/* <MenuItem title={'Apply Visa'} to='/superadmin/apply-visa' />

          <MenuItem title={intl.formatMessage({ id: 'MENU.DASHBOARD' })} to='/superadmin/dashboard' /> */}
        </>
        :

        <>

          <MenuItem title={intl.formatMessage({ id: 'MENU.DASHBOARD' })} to='/merchant/dashboard' />
          <MenuItem title={'Apply Visa'} to='/merchant/apply-visa' />

        </>
      }

          </>
  )
}
