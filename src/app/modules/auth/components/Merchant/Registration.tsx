/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect, useRef,ChangeEvent } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import { getUserByToken, register } from '../../core/_requests'
import { Link } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../../../_metronic/helpers'
import { PasswordMeterComponent } from '../../../../../_metronic/assets/ts/components'
import { useAuth } from '../../core/Auth'
import axiosInstance from '../../../../helpers/axiosInstance'
import { toast } from 'react-toastify'
import axios from 'axios'
import Cookies from 'js-cookie'; 

const validationSchema = Yup.object().shape({
  merchant_name: Yup.string().required('Name is required'),
  merchant_company_name: Yup.string().required('Company name is required'),
  merchant_email_id: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  merchant_phone_number: Yup.string().required('Contact Number is required'),
  merchant_gst_no: Yup.string().required('GST No. is required'),
  merchant_pan_no: Yup.string().required('PAN No. is required'),
  merchant_address_one_line: Yup.string().required('Address is required'),
  merchant_address_second_line: Yup.string().required('Address is required'),
  merchant_state: Yup.string().required('State is required'),
  merchant_zip_code: Yup.string().required('Zip Code is required'),
  wallet_balance: Yup.number()
    .typeError('Wallet balance must be a number')
    .required('Wallet balance is required')
    .min(0, 'Wallet balance must be greater than or equal to 0'),
});


export function Registration() {
  const [loading, setLoading] = useState(false)
  const { saveAuth, setCurrentUser } = useAuth()
  const [panPhotoUrl, setPanPhotoUrl] = useState('');
  const [photo, setPhoto] = useState('');
  const photoFileInputRef = useRef<HTMLInputElement | null>(null)
  const panFileInputRef = useRef<HTMLInputElement | null>(null)
  const [formData, setFormData] = useState({
    merchant_name: '',
    merchant_company_name: '',
    merchant_email_id: '',
    merchant_phone_number: '',
    merchant_profile_photo: '',
    merchant_gst_no: '',
    merchant_pan_no: '',
    merchant_country: '',
    merchant_state: '',
    merchant_zip_code: '',
    merchant_address_one_line: '',
    merchant_address_second_line: '',
    merchant_pan_photo: '',
    wallet_balance: '0'
  })

  const formik = useFormik({
    initialValues: formData,
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
    // 
    try {
      
      axiosInstance.post('/backend/register_merchant_user', formData)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setLoading(false);
            toast.success(response.data.msg, {
              position: "top-center", // Center the toast notification
            });
            // Cookies.set('isLoggedIn', 'true', { expires: 15 });
            // Cookies.set('user_id', response.data.user_id,{ expires: 15 });
            // Cookies.set('user_type', 'merchant',{ expires: 15 });

            setTimeout(() => {
              window.location.href = '/merchant/login'                
            }, 400);
          } else {
            setLoading(false);
            toast.error(response.data.msg,{
              position:'top-center'
            });
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } catch (error) {
      console.error('Error:', error);
    }
    },
  });
  const handleFileSelectBack = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = async (e) => {
        // Update the state variable with the image data (base64-encoded)
        if (e.target) {
          setPanPhotoUrl(e.target.result as string)
          try {
            // Assuming handleFileUpload is an asynchronous function that returns a promise
            const imageLink = await handleFileUpload(file)
            console.log(imageLink)

            // Update the form data with the image link
            setFormData({ ...formData, merchant_pan_photo: imageLink })
          } catch (error) {
            console.error('Error uploading image:', error)
          }
        }
      }

      reader.readAsDataURL(file)
    }
  }

  
  const handleFileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      // Make a POST request to your server to upload the file
      const response = await axiosInstance.post('/backend/upload_image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Assuming your server responds with the file URL
      const fileUrl = response.data.data;
      return fileUrl; // Return the file URL
    } catch (error) {
      console.error('Error uploading file:', error);
      return ''; // Return an empty string in case of an error
    }
  };

  const handleSaveClick = async () => {
    setLoading(true);
    const response = await axiosInstance.post('/backend/register_merchant_user', formData)
    if (response.status === 200) {
      setLoading(false);
      toast.success(response.data.msg, {
        position: "top-center", // Center the toast notification
      });
      // Cookies.set('isLoggedIn', 'true', { expires: 15 });
      // Cookies.set('user_id', response.data.user_id,{ expires: 15 });
      // Cookies.set('user_type', 'merchant',{ expires: 15 });

      setTimeout(() => {
        window.location.href = '/merchant/login'                
      }, 400);
    } else {
      setLoading(false);
      toast.error(response.data.msg,{
        position:'top-center'
      });
    }
  }
  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        if (e.target) {
          setPhoto(e.target.result as string)

          try {
            // Assuming handleFileUpload is an asynchronous function that returns a promise
            const imageLink = await handleFileUpload(file)
            setFormData({ ...formData, merchant_profile_photo: imageLink })

            // Update the form data with the image link
          } catch (error) {
            console.error('Error uploading image:', error)
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFieldChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value })
  }
  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  return (
    <div style={{  maxHeight: '100vh', flex: 1 }}>
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      // onSubmit={formik.handleSubmit}
    >
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        {/* begin::Title */}
        <h1 className='text-dark fw-bolder mb-3'>Sign Up</h1>
        {/* end::Title */}

        {/* <div className='text-gray-500 fw-semibold fs-6'>Your Social Campaigns</div> */}
      </div>
      {/* end::Heading */}


      {/* begin::Form group Firstname */}
      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>Name</label>
        <input
          placeholder='First name'
          type='text'
          value={formData.merchant_name}
          onChange={(e) => handleFieldChange('merchant_name', e.target.value)}
          autoComplete='off'
          className={clsx(
            'form-control bg-transparent',  
          )}
        />
      </div>
      {/* end::Form group */}
      <div className='fv-row mb-5'>
        {/* begin::Form group Lastname */}
        <label className='form-label fw-bolder text-dark fs-6'>Company name</label>
        <input
          placeholder='Company name'
          type='text'
          value={formData.merchant_company_name}
          onChange={(e) => handleFieldChange('merchant_company_name', e.target.value)}
          autoComplete='off'
          className={clsx(
            'form-control bg-transparent',  
          )}
        />
        {/* end::Form group */}
      </div>

      {/* begin::Form group Email */}
      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>Email</label>
        <input
          placeholder='Email'
          type='email'
          autoComplete='off'
          value={formData.merchant_email_id}
          onChange={(e) => handleFieldChange('merchant_email_id', e.target.value)}
          className={clsx(
            'form-control bg-transparent',  
          )}
        />
      </div>
      {/* end::Form group */}
      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>Contact Number</label>
        <input
          placeholder='Contact Number'
          type='email'
          autoComplete='off'
          value={formData.merchant_phone_number}
          onChange={(e) => handleFieldChange('merchant_phone_number', e.target.value)}
          className={clsx(
            'form-control bg-transparent',  
          )}
        />
      </div>

      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>GST No.</label>
        <input
          placeholder='GST No.'
          type='email'
          value={formData.merchant_gst_no}
          onChange={(e) => handleFieldChange('merchant_gst_no', e.target.value)}
          autoComplete='off'
          className={clsx(
            'form-control bg-transparent',  
          )}
        />
      </div>
      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>PAN No.</label>
        <input
          placeholder='PAN No.'
          type='email'
          value={formData.merchant_pan_no}
          onChange={(e) => handleFieldChange('merchant_pan_no', e.target.value)}
          autoComplete='off'
          className={clsx(
            'form-control bg-transparent',  
          )}
        />
      </div>
      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>Country</label>
        <input
          placeholder='Country'
          type='email'
          autoComplete='off'
          className={clsx(
            'form-control bg-transparent',  
          )}
        />
      </div>
      <div className='fv-row mb-5'>
        {/* begin::Form group Lastname */}
        <label className='form-label fw-bolder text-dark fs-6'>Address first line</label>
        <input
          placeholder='Address first line'
          type='text'
          autoComplete='off'
          value={formData.merchant_address_one_line}
          onChange={(e) => handleFieldChange('merchant_address_one_line', e.target.value)}
          className={clsx(
            'form-control bg-transparent',  
          )}
        />
        {/* end::Form group */}
      </div>
      <div className='fv-row mb-5'>
        {/* begin::Form group Lastname */}
        <label className='form-label fw-bolder text-dark fs-6'>Address second line</label>
        <input
          placeholder='Address second line'
          type='text'
          autoComplete='off'
          value={formData.merchant_address_second_line}
          onChange={(e) => handleFieldChange('merchant_address_second_line', e.target.value)}
          className={clsx(
            'form-control bg-transparent',  
          )}
        />
        {/* end::Form group */}
      </div>
      <div className='fv-row mb-5'>
        {/* begin::Form group Lastname */}
        <label className='form-label fw-bolder text-dark fs-6'>State</label>
        <input
          placeholder='State'
          type='text'
          value={formData.merchant_state}
          onChange={(e) => handleFieldChange('merchant_state', e.target.value)}
          autoComplete='off'
          className={clsx(
            'form-control bg-transparent',  
          )}
        />
        {/* end::Form group */}
      </div>
      <div className='fv-row mb-5'>
        {/* begin::Form group Lastname */}
        <label className='form-label fw-bolder text-dark fs-6'>Zip Code</label>
        <input
          placeholder='Zip Code'
          type='text'
          value={formData.merchant_zip_code}
          onChange={(e) => handleFieldChange('merchant_zip_code', e.target.value)}
          autoComplete='off'
          className={clsx(
            'form-control bg-transparent',  
          )}
        />
        {/* end::Form group */}
      </div>
      
    

      <div className='mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>
          Upload Profile Photo
        </label>
        <input
          type='file'
          ref={photoFileInputRef}
          className='form-control'
          id='aadharFront'
          name='photo'
          accept='image/*'
          onChange={handleFileSelect}
          required
        />
      </div>

      <div className='mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>
          Upload Pan card Photo
        </label>
        <input
          type='file'
          ref={panFileInputRef}
          className='form-control'
          id='panPhotoUrl'
          name='panPhotoUrl'
          accept='image/*'
          onChange={handleFileSelectBack}
          required
        />
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      {/* <div className='fv-row mb-5'>
        <label className='form-check form-check-inline' htmlFor='kt_login_toc_agree'>
          <input
            className='form-check-input'
            type='checkbox'
            id='kt_login_toc_agree'
          />
          <span>
            I Accept the{' '}
            <a
              href='https://keenthemes.com/metronic/?page=faq'
              target='_blank'
              className='ms-1 link-primary'
            >
              Terms
            </a>
            .
          </span>
        </label>
      </div> */}
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          // disabled={formik.isSubmitting}
          onClick={() => handleSaveClick()}
        >
          {!loading && <span className='indicator-label'>Submit</span>}
          {loading && (
            <span className='indicator-progress' style={{ display: 'block' }}>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/merchant/login'>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='btn btn-lg btn-light-primary w-100 mb-5'
          >
            Cancel
          </button>
        </Link>
      </div>
      {/* end::Form group */}
    </form>
    </div>
  )
}
