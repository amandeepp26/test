import React, { ChangeEvent, useRef, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik'
import { Delete } from '@mui/icons-material';
import { ICreateAccount, inits } from '../../modules/wizards/components/CreateAccountWizardHelper';
import axiosInstance from '../../helpers/axiosInstance'
import { toast } from 'react-toastify';
import BackIcon from '@mui/icons-material/ArrowBackOutlined'


const inputStyle = {
  border: '1.5px solid #d3d3d3', // Border width and color
  borderRadius: '15px', // Border radius
  padding: '10px',
  paddingLeft: '20px', // Padding
  width: '90%', // 100% width
  boxSizing: 'border-box', // Include padding and border in the width calculation
}
function AddNewMerchant() {

  const navigate = useNavigate();

  const [formChange, setformChange] = useState(false)
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


  const [initValues] = useState<ICreateAccount>(inits)
  const [aadharFrontUrl, setAadharFrontUrl] = useState('');
  const [aadharBackUrl, setAadharBackUrl] = useState('');
  const [panPhotoUrl, setPanPhotoUrl] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // State to track success
  const [photo, setPhoto] = useState('')
  const photoFileInputRef = useRef<HTMLInputElement | null>(null)
  const panFileInputRef = useRef<HTMLInputElement | null>(null)
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });

      if (name === 'aadharFront') {
        setAadharFrontUrl('');
      } else if (name === 'aadharBack') {
        setAadharBackUrl('');
      } else if (name === 'panPhoto') {
        setPanPhotoUrl('');
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });

      if (name === 'aadharFrontUrl') {
        setAadharFrontUrl(value);
      } else if (name === 'aadharBackUrl') {
        setAadharBackUrl(value);
      } else if (name === 'panPhotoUrl') {
        setPanPhotoUrl(value);
      }

    }
  };

  const handleSaveClick = async () => {

    const response = await axiosInstance.post('/backend/create_merchant_user', formData)

    if (response.status == 200) {
      toast.success(response.data.msg, {
        position: 'top-center', // Center the toast notification
      })
      // navigate('/merchant/apply-visa')
    } else {
      console.log(response.data)
      toast.error(response.data.msg, {
        position: 'top-center',
      })
    }
  }


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
  const handleImageUploadBack = () => {
    // Trigger the hidden file input
    if (panFileInputRef.current) {
      panFileInputRef.current.click()
    }
  }



  const handlePhotoUpload = () => {
    // Trigger the hidden file input
    if (photoFileInputRef.current) {
      photoFileInputRef.current.click()
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



  return (
    <div className='w-full' style={{ backgroundColor: 'white' }}>

      <div className='container' style={{ marginTop: -35 }}>
        <div className='d-flex align-items-center pt-3'>
          <Link to='/superadmin/merchants' >
            <BackIcon style={{ color: '#332786', width: 30, height: 25, cursor: 'pointer', }} />
          </Link>
          <h5 style={{ fontSize: 30, alignSelf: 'center', marginLeft: 10, display: 'flex', letterSpacing: 0.3 }}>Onboard new Merchant</h5>
        </div>
        <hr />
        <br />
        <div className='d-flex ' style={{ width: '100%' }}>
          <div style={{ width: '40%', marginTop: 10 }}>
            <h6>Merchant Photo</h6>
            {photo ? (
              <div
                style={{
                  border: '4px dotted gray',
                  width: '100%',
                  height: 300,
                  borderRadius: '10px',
                  justifyContent: 'center',
                  textAlign: 'center',
                  marginTop: 20,
                }}
              >
                <div
                  onClick={() => setPhoto('')}
                  style={{
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    backgroundColor: 'white',
                    padding: 7,
                    borderRadius: 50,
                    cursor: 'pointer',
                  }}
                >
                  <Delete style={{ color: 'red' }} />
                </div>
                <img
                  src={photo}
                  alt='Uploaded Image'
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </div>
            ) : (
              <div
                style={{
                  border: '4px dotted gray',
                  width: '100%',
                  height: 300,
                  borderRadius: '10px',
                  justifyContent: 'center',
                  textAlign: 'center',
                  paddingTop: 40,
                  marginTop: 20,
                }}
              >
                <h4 className='mx-10 mt-10'>Merchant Photo</h4>
                <button
                  type='button'
                  onClick={handlePhotoUpload}
                  className='btn btn-lg btn-primary me-3 mt-3'
                  style={{ justifyContent: 'flex-end', backgroundColor: '#332786' }}
                >
                  <span className='indicator-label'>Select Files</span>
                </button>
                <p className='text-bold pt-5 fs-9' style={{ color: '#555555' }}>
                  Supports JPEG, JPG, PNG.
                </p>
                <input
                  type='file'
                  ref={photoFileInputRef}
                  style={{ display: 'none' }}
                  accept='.jpeg, .jpg, .pdf, .png'
                  onChange={handleFileSelect}
                />
              </div>
            )}
          </div>

          <div
            className='d-flex flex-row-fluid flex-center bg-body rounded'
            style={{ width: '70%', }}
          >

            <Formik initialValues={initValues} onSubmit={() => { }}>
              {() => (
                <Form className='py-20 px-9' noValidate id='kt_create_account_form'>
                  <div>
                    <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                      <div className='fv-row mb-5'>
                        <label className='form-label required mx-5'>Merchant Name</label>

                        <Field
                          name='merchantName'
                          placeholder="Merchant Name"
                          value={formData.merchant_name}
                          onChange={(e) => handleFieldChange('merchant_name', e.target.value)}
                          style={inputStyle}
                          className='form-control form-control-lg form-control-solid'
                        />
                        <div className='text-danger mt-2'>
                          <ErrorMessage name='merchant_name' />
                        </div>
                      </div>
                      <div className='fv-row mb-5'>
                        <label className='d-flex align-items-center form-label mx-5'>
                          <span className='required'>Company Name</span>
                        </label>

                        <Field
                          style={inputStyle}
                          placeholder="Company Name"
                          name='merchant_company_name'
                          value={formData.merchant_company_name}
                          onChange={(e) => handleFieldChange('merchant_company_name', e.target.value)}
                          className='form-control form-control-lg form-control-solid'
                        />
                        <div className='text-danger mt-2'>
                          <ErrorMessage name='merchant_company_name' />
                        </div>
                      </div>
                    </div>
                    <div className='fv-row mb-10 w-100'>

                      <label className='form-label fs-4 mx-5'>Country</label>
                      <Field
                        style={inputStyle}
                        placeholder="Country"
                        name='merchant_country'
                        value={formData.merchant_country}
                        onChange={(e) => handleFieldChange('merchant_country', e.target.value)}
                        className='form-control form-control-lg form-control-solid'
                      />
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='merchant_country' />
                      </div>
                    </div>
                    <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                      <div className='fv-row mb-5'>
                        <label className='d-flex align-items-center form-label mx-5'>
                          <span className='required'>Email</span>
                        </label>

                        <Field
                          style={inputStyle}
                          placeholder="Email"
                          value={formData.merchant_email_id}
                          onChange={(e) => handleFieldChange('merchant_email_id', e.target.value)}
                          name='merchant_email_id'
                          className='form-control form-control-lg form-control-solid'
                        />
                        <div className='text-danger mt-2'>
                          <ErrorMessage name='merchant_email_id' />
                        </div>
                      </div>
                      <div className='fv-row mb-5'>
                        <label className='d-flex align-items-center form-label mx-5'>
                          <span className='required'>Contact Number</span>
                        </label>

                        <Field
                          style={inputStyle}
                          placeholder="Contact Number"
                          value={formData.merchant_phone_number}
                          onChange={(e) => handleFieldChange('merchant_phone_number', e.target.value)}
                          name='merchant_phone_number'
                          className='form-control form-control-lg form-control-solid'
                        />
                        <div className='text-danger mt-2'>
                          <ErrorMessage name='merchant_phone_number' />
                        </div>
                      </div>
                    </div>

                    <div className='fv-row mb-10'>
                      <label className='d-flex align-items-center form-label mx-5'>
                        <span className='required'>Address first line</span>
                      </label>

                      <Field
                        style={{ ...inputStyle, width: '450px' }}
                        name='merchant_address_one_line'
                        placeholder="Address first line"
                        value={formData.merchant_address_one_line}
                        onChange={(e) => handleFieldChange('merchant_address_one_line', e.target.value)}
                        className='form-control form-control-lg form-control-solid'
                      />
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='merchant_address_one_line' />
                      </div>
                    </div>

                    <div className='fv-row mb-10'>
                      <label className='d-flex align-items-center form-label mx-5'>
                        <span className='required'>Address second line</span>
                      </label>

                      <Field
                        style={{ ...inputStyle, width: '450px' }}
                        name='merchant_address_second_line'
                        placeholder="Address second line"
                        value={formData.merchant_address_second_line}
                        onChange={(e) => handleFieldChange('merchant_address_second_line', e.target.value)}
                        className='form-control form-control-lg form-control-solid'
                      />
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='merchant_address_second_line' />
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        <div className='d-flex ' style={{ width: '100%' }}>
          <div style={{ width: '40%', marginTop: 10 }}>
            <h6>PAN card Photo</h6>
            {panPhotoUrl ? (
              <div
                style={{
                  border: '4px dotted gray',
                  width: '100%',
                  height: 300,
                  borderRadius: '10px',
                  justifyContent: 'center',
                  textAlign: 'center',
                  marginTop: 20,
                }}
              >
                <div
                  onClick={() => setPanPhotoUrl('')}
                  style={{
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    backgroundColor: 'white',
                    padding: 7,
                    borderRadius: 50,
                    cursor: 'pointer',
                  }}
                >
                  <Delete style={{ color: 'red' }} />
                </div>
                <img
                  src={panPhotoUrl}
                  alt='Uploaded Image'
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </div>
            ) : (
              <div
                style={{
                  border: '4px dotted gray',
                  width: '100%',
                  height: 300,
                  borderRadius: '10px',
                  justifyContent: 'center',
                  textAlign: 'center',
                  paddingTop: 40,
                  marginTop: 20,
                }}
              >
                <h4 className='mx-10 mt-10'>PAN Card Photo</h4>
                <button
                  type='button'
                  onClick={handleImageUploadBack}
                  className='btn btn-lg btn-primary me-3 mt-3'
                  style={{ justifyContent: 'flex-end', backgroundColor: '#332786' }}
                >
                  <span className='indicator-label'>Select Files</span>
                </button>
                <p className='text-bold pt-5 fs-9' style={{ color: '#555555' }}>
                  Supports JPEG, JPG, PNG.
                </p>
                <input
                  type='file'
                  ref={panFileInputRef}
                  style={{ display: 'none' }}
                  accept='.jpeg, .jpg, .pdf, .png'
                  onChange={handleFileSelectBack}
                />
              </div>
            )}
          </div>

          <div
            className='d-flex flex-row-fluid flex-center bg-body rounded'
            style={{ width: '70%', }}
          >
            <Formik initialValues={initValues} onSubmit={() => { }}>
              {() => (
                <Form className='py-20 px-9' noValidate id='kt_create_account_form'>

                  <div className='fv-row mb-10'>
                    <label className='d-flex align-items-center form-label mx-5'>
                      <span className='required'>PAN Number</span>
                    </label>

                    <Field
                      style={{ ...inputStyle, width: '450px' }}
                      name='merchant_pan_no'
                      placeholder="PAN Number"
                      value={formData.merchant_pan_no}
                      onChange={(e) => handleFieldChange('merchant_pan_no', e.target.value)}
                      className='form-control form-control-lg form-control-solid'
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='merchant_pan_no' />
                    </div>
                  </div>

                  <div className='fv-row mb-10'>
                    <label className='d-flex align-items-center form-label mx-5'>
                      <span className='required'>GST</span>
                    </label>

                    <Field
                      style={{ ...inputStyle, width: '450px' }}
                      name='merchant_gst_no'
                      placeholder="GST"
                      value={formData.merchant_gst_no}
                      onChange={(e) => handleFieldChange('merchant_gst_no', e.target.value)}
                      className='form-control form-control-lg form-control-solid'
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='merchant_gst_no' />
                    </div>
                  </div>

                  <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                    <div className='fv-row mb-5'>
                      <label className='d-flex align-items-center form-label mx-5'>
                        <span className='required'>State</span>
                      </label>

                      <Field
                        style={inputStyle}
                        placeholder="State"
                        value={formData.merchant_state}
                        onChange={(e) => handleFieldChange('merchant_state', e.target.value)}
                        name='merchant_state'
                        className='form-control form-control-lg form-control-solid'
                      />
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='merchant_state' />
                      </div>
                    </div>
                    <div className='fv-row mb-5'>
                      <label className='d-flex align-items-center form-label mx-5'>
                        <span className='required'>Zip code</span>
                      </label>

                      <Field
                        style={inputStyle}
                        placeholder="Zip code"
                        value={formData.merchant_zip_code}
                        onChange={(e) => handleFieldChange('merchant_zip_code', e.target.value)}
                        name='merchant_zip_code'
                        className='form-control form-control-lg form-control-solid'
                      />
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='merchant_zip_code' />
                      </div>
                    </div>
                  </div>
                  <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                    <div className='fv-row mb-5'>
                      <label className='d-flex align-items-center form-label mx-5'>
                        <span className='required'>Wallet</span>
                      </label>

                      <Field
                        style={inputStyle}
                        value={formData.wallet_balance}
                        placeholder="Wallet"
                        onChange={(e) => handleFieldChange('wallet_balance', e.target.value)}
                        name='wallet_balance'
                        className='form-control form-control-lg form-control-solid'
                      />
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='wallet_balance' />
                      </div>
                    </div>
                  </div>

                  <div
                    // onClick={handleReviewAndSave}
                    className='mt-10'
                    onClick={handleSaveClick}
                    style={{
                      height: 40,
                      width: 190,
                      border: '1px solid',
                      marginLeft: 20,
                      borderColor: '#696969',
                      borderRadius: 25,
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      backgroundColor: '#332786',
                      cursor: 'pointer',
                    }}
                  >
                    <h6 className='fs-4' style={{ color: 'white', paddingTop: 7 }}>
                      Submit
                    </h6>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AddNewMerchant
