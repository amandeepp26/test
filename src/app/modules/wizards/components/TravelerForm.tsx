import { useEffect, useState, useRef, ChangeEvent } from 'react'
import { KTIcon } from '../../../../_metronic/helpers'
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik'
import { ICreateAccount, inits } from './CreateAccountWizardHelper'
import { useNavigate } from 'react-router-dom'
import ClearIcon from '@mui/icons-material/Delete'
import axiosInstance from '../../../helpers/axiosInstance'
import { DatePicker } from 'antd'
import 'react-datepicker/dist/react-datepicker.css'
function TravelerForm({ onDataChange, ind }) {
  const [initValues] = useState<ICreateAccount>(inits)
  const passportFrontFileInputRef = useRef<HTMLInputElement | null>(null)
  const passportBackFileInputRef = useRef<HTMLInputElement | null>(null)
  const photoFileInputRef = useRef<HTMLInputElement | null>(null)
  const panFileInputRef = useRef<HTMLInputElement | null>(null)
  const [passportFrontImageURL, setPassportFrontImageURL] = useState('')
  const [passportBackImageURL, setPassportBackImageURL] = useState('')
  const [photo, setPhoto] = useState('')
  const [pan, setPan] = useState('')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthPlace: '',
    birthDetail: '',
    gender: '',
    maritalStatus: '',
    fatherName: '',
    motherName: '',
    panNumber: '',
    passportNumber: '',
    passportIssueDate: '',
    passPortExpiryDate: '',
    passFrontPhoto: '',
    passBackPhoto: '',
    travelerPhoto: '',
    panNo: '',
    panPhoto: '',
  })

  const inputStyle = {
    border: '1.5px solid #d3d3d3', // Border width and color
    borderRadius: '15px', // Border radius
    padding: '10px',
    paddingLeft: '20px', // Padding
    width: '90%', // 100% width
    boxSizing: 'border-box', // Include padding and border in the width calculation
  }
  const handleFileUpload = async (file) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      // Make a POST request to your server to upload the file
      const response = await axiosInstance.post('/backend/upload_image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      // Assuming your server responds with the file URL
      const fileUrl = response.data.data
      return fileUrl // Return the file URL
    } catch (error) {
      console.error('Error uploading file:', error)
      return '' // Return an empty string in case of an error
    }
  }
  // Function to handle file selection
  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        if (e.target) {
          setPassportFrontImageURL(e.target.result as string)

          try {
            // Assuming handleFileUpload is an asynchronous function that returns a promise
            const imageLink = await handleFileUpload(file)

            // Update the form data with the image link
            setFormData({ ...formData, passFrontPhoto: imageLink })
            onDataChange({ ...formData, passFrontPhoto: imageLink })
          } catch (error) {
            console.error('Error uploading image:', error)
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageUpload = () => {
    // Trigger the hidden file input
    if (passportFrontFileInputRef.current) {
      passportFrontFileInputRef.current.click()
    }
  }
  const handleFileSelectBack = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = async (e) => {
        // Update the state variable with the image data (base64-encoded)
        if (e.target) {
          setPassportBackImageURL(e.target.result as string)
          try {
            // Assuming handleFileUpload is an asynchronous function that returns a promise
            const imageLink = await handleFileUpload(file)

            // Update the form data with the image link
            setFormData({ ...formData, passBackPhoto: imageLink })
            onDataChange({ ...formData, passBackPhoto: imageLink })
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
    if (passportBackFileInputRef.current) {
      passportBackFileInputRef.current.click()
    }
  }

  const handlePhotoSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = async (e) => {
        // Update the state variable with the image data (base64-encoded)
        if (e.target) {
          setPhoto(e.target.result as string)
          try {
            // Assuming handleFileUpload is an asynchronous function that returns a promise
            const imageLink = await handleFileUpload(file)

            // Update the form data with the image link
            setFormData({ ...formData, travelerPhoto: imageLink })
            onDataChange({ ...formData, travelerPhoto: imageLink })
          } catch (error) {
            console.error('Error uploading image:', error)
          }
        }
      }

      reader.readAsDataURL(file)
    }
  }
  const handlePhotoUpload = () => {
    // Trigger the hidden file input
    if (photoFileInputRef.current) {
      photoFileInputRef.current.click()
    }
  }

  // Function to handle file selection
  const handlePanSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        if (e.target) {
          setPan(e.target.result as string)

          try {
            // Assuming handleFileUpload is an asynchronous function that returns a promise
            const imageLink = await handleFileUpload(file)

            // Update the form data with the image link
            setFormData({ ...formData, panPhoto: imageLink })
            onDataChange({ ...formData, panPhoto: imageLink })
          } catch (error) {
            console.error('Error uploading image:', error)
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePanUpload = () => {
    // Trigger the hidden file input
    if (panFileInputRef.current) {
      panFileInputRef.current.click()
    }
  }

  const handleFieldChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value })
    onDataChange({ ...formData, [fieldName]: value })

    if (fieldName == 'birthDetail') {
      setDob(value)
    }
    if (fieldName == 'passportIssueDate') {
      setIssueDate(value)
    }
    if (fieldName == 'passPortExpiryDate') {
      setExpiryDate(value)
    }
  }

  const [issueDate, setIssueDate] = useState<string | undefined>('');
  const [expiryDate, setExpiryDate] =useState<string | undefined>('');
  const [dob, setDob] = useState<string | undefined>('');

  return (
    <div
      className='py-10 px-20'
      style={{
        borderRadius: 20,
        borderColor: '#f2f2f2',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        marginLeft: 10,
        marginTop: 10,
        backgroundColor: 'white',
      }}
    >
      <h5 style={{ fontSize: 30, letterSpacing: 0.3 }}>Traveller {ind + 1} </h5>
      <hr />
      <br />
      <h3>Upload Traveler's Front Passport Page</h3>
      <p>
      The destination country requires a scan of the traveler's passport. Upload a clear passport
        image and Visa 24/7 will scan and enter all the details directly from the file.
      </p>
      <div className='d-flex ' style={{ width: '100%' }}>
        <div style={{ width: '40%', marginTop: 70 }}>
          <h6>Passport Front Page Image</h6>
          {passportFrontImageURL ? (
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
                onClick={() => setPassportFrontImageURL('')}
                style={{
                  justifyContent: 'flex-end',
                  position: 'absolute',
                  backgroundColor: 'white',
                  padding: 7,
                  borderRadius: 50,
                  cursor: 'pointer',
                }}
              >
                <ClearIcon style={{ color: 'red' }} />
              </div>
              <img
                src={passportFrontImageURL}
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
              <h4 className='mx-10 mt-10'>Passport Front Photo</h4>
              <button
                type='button'
                onClick={handleImageUpload}
                className='btn btn-lg btn-primary me-3 mt-7'
                style={{ justifyContent: 'flex-end', backgroundColor: '#332786' }}
              >
                <span className='indicator-label'>Select Files</span>
              </button>
              <p className='text-bold pt-5 fs-9' style={{ color: '#555555' }}>
                Supports JPEG, JPG, PDF, PNG.
              </p>
              <input
                type='file'
                ref={passportFrontFileInputRef}
                style={{ display: 'none' }}
                accept='.jpeg, .jpg, .pdf, .png'
                onChange={handleFileSelect}
              />
            </div>
          )}
        </div>

        <div
          className='d-flex flex-row-fluid flex-center bg-body rounded'
          style={{ width: '70%', backgroundColor: 'blue' }}
        >
          <Formik initialValues={initValues} onSubmit={() => { }}>
            {() => (
              <Form className='py-20 px-9' noValidate id='kt_create_account_form'>
                <div>
                  <div className='fv-row mb-5'>
                    <label className='d-flex align-items-center form-label'>
                      <span className='required'>Passport Number</span>
                    </label>

                    <Field
                      style={{ ...inputStyle, width: '450px' }}
                      name='passportNumber'
                      className='form-control form-control-lg form-control-solid'
                      onChange={(e) => handleFieldChange('passportNumber', e.target.value)}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='passportNumber' />
                    </div>
                  </div>
                  <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                    <div className='fv-row mb-5'>
                      <label className='form-label required'>First Name</label>

                      <Field
                        name='firstName'
                        style={inputStyle}
                        className='form-control form-control-lg form-control-solid'
                        onChange={(e) => handleFieldChange('firstName', e.target.value)}
                      />
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='businessName' />
                      </div>
                    </div>
                    <div className='fv-row mb-5'>
                      <label className='d-flex align-items-center form-label'>
                        <span className='required'>Last Name</span>
                      </label>

                      <Field
                        style={inputStyle}
                        name='lastName'
                        className='form-control form-control-lg form-control-solid'
                        onChange={(e) => handleFieldChange('lastName', e.target.value)}
                      />
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='businessDescriptor' />
                      </div>
                    </div>
                  </div>

                  <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                    <div className='fv-row mb-5'>
                      <label className='d-flex align-items-center form-label'>
                        <span className='required'>Birth Place</span>
                      </label>

                      <Field
                        style={inputStyle}
                        name='birthPlace'
                        className='form-control form-control-lg form-control-solid'
                        onChange={(e) => handleFieldChange('birthPlace', e.target.value)}
                      />
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='birthPlace' />
                      </div>
                    </div>
                    <div className='fv-row mb-5'>
                      <label className='d-flex align-items-center form-label'>
                        <span className='required'>Date of Birth</span>
                      </label>

                      <DatePicker
                        style={{ backgroundClip: '#fff', width: 220, marginTop: 2, border: '1.5px solid #d3d3d3', borderRadius: 15, padding: 10 }}
                        onChange={(value) => {
                          if (value) {
                            handleFieldChange('birthDetail', value.format('YYYY-MM-DD'))
                          }
                        }
                        }
                      />

                      <div className='text-danger mt-2'>
                        <ErrorMessage name='birthDetail' />
                      </div>
                    </div>
                  </div>

                  <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                    <div className='fv-row mb-5'>
                      <label className='d-flex align-items-center form-label'>
                        <span className='required'>Passport Issue Date</span>
                      </label>
                      <DatePicker
                        style={{ backgroundClip: '#fff', width: 220, marginTop: 2, border: '1.5px solid #d3d3d3', borderRadius: 15, padding: 10 }}
                        onChange={(value) => {
                          if (value) {
                            handleFieldChange('passportIssueDate', value.format('YYYY-MM-DD'))
                          }
                        }
                        }
                      />

                      <div className='text-danger mt-2'>
                        <ErrorMessage name='passportIssueDate' />
                      </div>
                    </div>

                    <div className='fv-row mb-5'>
                      <label className='d-flex align-items-center form-label'>
                        <span className='required'>Passport Expiry Date</span>
                      </label>
                      <DatePicker
                        style={{ backgroundClip: '#fff', width: 220, marginTop: 2, border: '1.5px solid #d3d3d3', borderRadius: 15, padding: 10 }}
                        onChange={(value) => {
                          if (value) {
                            handleFieldChange('passPortExpiryDate', value.format('YYYY-MM-DD'))
                          }
                        }
                        }
                      />

                      <div className='text-danger mt-2'>
                        <ErrorMessage name='passPortExpiryDate' />
                      </div>
                    </div>
                  </div>
                  <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                    <div className='fv-row mb-10'>
                      <label className='form-label required'>Gender</label>

                      <Field
                        as='select'
                        name='gender'
                        style={{ ...inputStyle, width: '215px', backgroundColor: 'white' }}
                        className='form-select form-select-lg form-select-solid'
                        onChange={(e) => handleFieldChange('gender', e.target.value)}
                      >
                        <option></option>
                        <option value='M'>Male</option>
                        <option value='F'>Female</option>
                      </Field>
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='businessType' />
                      </div>
                    </div>
                    <div className='fv-row mb-10'>
                      <label className='form-label required'>Marital Status</label>

                      <Field
                        as='select'
                        style={{ ...inputStyle, width: '215px', backgroundColor: 'white' }}
                        name='maritalStatus'
                        className='form-select form-select-lg form-select-solid'
                        onChange={(e) => handleFieldChange('maritalStatus', e.target.value)}
                      >
                        <option></option>
                        <option value='Single'>Single</option>
                        <option value='Married'>Married</option>
                        <option value='Separated'>Separated</option>
                        <option value='Divorced'>Divorced</option>
                        <option value='Widowed'>Widowed</option>
                        <option value='Civil partnership'>Civil partnership</option>
                      </Field>
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='businessType' />
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <h3>Upload Traveler's Back Passport Page</h3>
      <p>
      The destination country requires a scan of the back page of the traveler's passport. Upload a
        clear passport image and Visa 24/7 will scan and enter all the details directly from the file.
      </p>
      <div className='d-flex ' style={{ width: '100%' }}>
        <div style={{ width: '40%', marginTop: 60 }}>
          <h6>Passport Back Page Image</h6>
          {passportBackImageURL ? (
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
                onClick={() => setPassportBackImageURL('')}
                style={{
                  justifyContent: 'flex-end',
                  position: 'absolute',
                  backgroundColor: 'white',
                  padding: 7,
                  borderRadius: 50,
                  cursor: 'pointer',
                }}
              >
                <ClearIcon style={{ color: 'red' }} />
              </div>
              <img
                src={passportBackImageURL}
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
              <h4 className='mx-10 mt-10'>Passport Back Photo</h4>
              <button
                type='button'
                onClick={handleImageUploadBack}
                className='btn btn-lg btn-primary me-3 mt-7'
                style={{ justifyContent: 'flex-end', backgroundColor: '#332786' }}
              >
                <span className='indicator-label'>Select Files</span>
              </button>
              <p className='text-bold pt-5 fs-9' style={{ color: '#555555' }}>
                Supports JPEG, JPG, PDF, PNG.
              </p>
              <input
                type='file'
                ref={passportBackFileInputRef}
                style={{ display: 'none' }}
                accept='.jpeg, .jpg, .pdf, .png'
                onChange={handleFileSelectBack}
              />
            </div>
          )}
        </div>

        <div
          className='d-flex flex-row-fluid flex-center bg-body rounded'
          style={{ width: '70%', backgroundColor: 'blue' }}
        >
          <Formik initialValues={initValues} onSubmit={() => { }}>
            {() => (
              <Form className='py-20 px-9' noValidate id='kt_create_account_form'>
                <div className='fv-row mb-10'>
                  <label className='d-flex align-items-center form-label'>
                    <span className='required'>Father's Name</span>
                  </label>

                  <Field
                    style={{ ...inputStyle, width: '450px' }}
                    name='fatherName'
                    className='form-control form-control-lg form-control-solid'
                    onChange={(e) => handleFieldChange('fatherName', e.target.value)}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='fatherName' />
                  </div>
                </div>

                <div className='fv-row mb-10'>
                  <label className='d-flex align-items-center form-label'>
                    <span className='required'>Mother's Name</span>
                  </label>

                  <Field
                    style={{ ...inputStyle, width: '450px' }}
                    name='motherName'
                    className='form-control form-control-lg form-control-solid'
                    onChange={(e) => handleFieldChange('motherName', e.target.value)}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='motherName' />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <h3 className='mt-20'>Upload PAN Card Photo</h3>
      <p>
        The destination country requires a passport-sized photo of the traveler. The photo should
        have a solid light-colored background, like a white wall or door, and be taken in a well lit
        room. The traveler should have a neutral facial expression and not be wearing any headgear
        or glasses.
      </p>
      <div className='d-flex ' style={{ width: '100%' }}>
        <div style={{ width: '40%', marginTop: 60 }}>
          <h6>Pan Card Photo</h6>
          {pan ? (
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
                onClick={() => setPan('')}
                style={{
                  justifyContent: 'flex-end',
                  position: 'absolute',
                  backgroundColor: 'white',
                  padding: 7,
                  borderRadius: 50,
                  cursor: 'pointer',
                }}
              >
                <ClearIcon style={{ color: 'red' }} />
              </div>
              <img src={pan} alt='Uploaded Image' style={{ maxWidth: '100%', maxHeight: '100%' }} />
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
                onClick={handlePanUpload}
                className='btn btn-lg btn-primary me-3 mt-7'
                style={{ justifyContent: 'flex-end', backgroundColor: '#332786' }}
              >
                <span className='indicator-label'>Select Files</span>
              </button>
              <p className='text-bold pt-5 fs-9' style={{ color: '#555555' }}>
                Supports JPEG, JPG, PDF, PNG.
              </p>
              <input
                type='file'
                ref={panFileInputRef}
                style={{ display: 'none' }}
                accept='.jpeg, .jpg, .pdf, .png'
                onChange={handlePanSelect}
              />
            </div>
          )}
        </div>
        <div style={{ marginLeft: 50 }}>
          <Formik initialValues={initValues} onSubmit={() => { }}>
            {() => (
              <Form className='py-20 px-9' noValidate id='kt_create_account_form'>
                <div className='fv-row mb-10'>
                  <label className='d-flex align-items-center form-label'>
                    <span className='required'>PAN Number</span>
                  </label>

                  <Field
                    style={{ ...inputStyle, width: '450px' }}
                    name='panNo'
                    className='form-control form-control-lg form-control-solid'
                    onChange={(e) => handleFieldChange('panNo', e.target.value)}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='businessDescriptor' />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <h3 className='mt-20'>Upload Traveler Photo</h3>
      <p>
        The destination country requires a passport-sized photo of the traveler. The photo should
        have a solid light-colored background, like a white wall or door, and be taken in a well lit
        room. The traveler should have a neutral facial expression and not be wearing any headgear
        or glasses.
      </p>
      <div className='d-flex ' style={{ width: '100%' }}>
        <div style={{ width: '40%', marginTop: 60 }}>
          <h6>Photo</h6>
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
                onClick={() => setPassportFrontImageURL('')}
                style={{
                  justifyContent: 'flex-end',
                  position: 'absolute',
                  backgroundColor: 'white',
                  padding: 7,
                  borderRadius: 50,
                  cursor: 'pointer',
                }}
              >
                <ClearIcon style={{ color: 'red' }} />
              </div>
              <img src={photo} alt='Uploaded Image' style={{ maxWidth: '100%', maxHeight: '100%' }} />
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
              <h4 className='mx-10 mt-10'>Traveller Photo</h4>
              <button
                type='button'
                onClick={handlePhotoUpload}
                className='btn btn-lg btn-primary me-3 mt-7'
                style={{ justifyContent: 'flex-end', backgroundColor: '#332786' }}
              >
                <span className='indicator-label'>Select Files</span>
              </button>
              <p className='text-bold pt-5 fs-9' style={{ color: '#555555' }}>
                Supports JPEG, JPG, PDF, PNG.
              </p>
              <input
                type='file'
                ref={photoFileInputRef}
                style={{ display: 'none' }}
                accept='.jpeg, .jpg, .pdf, .png'
                onChange={handlePhotoSelect}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TravelerForm
