import {useEffect, useState, useRef, ChangeEvent} from 'react'
import {ErrorMessage, Field, Form, Formik, FormikValues} from 'formik'
import {useNavigate} from 'react-router-dom'
import axiosInstance from '../helpers/axiosInstance'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {ICreateAccount, inits} from '../modules/wizards/components/CreateAccountWizardHelper'
function ApplicationFormView({viewApplication}) {
  console.log(viewApplication)
  const [initValues] = useState<ICreateAccount>(inits)

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

  const [issueDate, setIssueDate] = useState(null)
  const [expiryDate, setExpiryDate] = useState(null)
  const [dob, setDob] = useState(null)

  return (
    <div
      className='py-10 px-20'
      style={{
        borderRadius: 20,
        borderColor: '#f5f5f5',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        marginLeft: 10,
        marginTop: 20,
        backgroundColor: 'white',
      }}
    >
      <h5 style={{fontSize: 30, letterSpacing: 0.3}}>Traveller 1 </h5>
      <hr />
      <br />
      <h3>Upload Traveler's Front Passport Page</h3>
      <p>
      The destination country requires a scan of the traveler's passport. Upload a clear passport
        image and Visa 24/7 will scan and enter all the details directly from the file.
      </p>
      <div className='d-flex ' style={{width: '100%'}}>
        <div style={{width: '40%', marginTop: 70}}>
          <h6>Passport Front Page Image</h6>
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
              style={{
                justifyContent: 'flex-end',
                position: 'absolute',
                backgroundColor: 'white',
                padding: 7,
                borderRadius: 50,
                cursor: 'pointer',
              }}
            ></div>
            <img
              src={viewApplication.passport_front}
              alt='Uploaded Image'
              style={{maxWidth: '100%', maxHeight: '100%',}}
            />
          </div>
        </div>

        <div
          className='d-flex flex-row-fluid flex-center bg-body rounded'
          style={{width: '70%', backgroundColor: 'blue'}}
        >
          <Formik initialValues={initValues} onSubmit={() => {}}>
            {() => (
              <Form className='py-20 px-9' noValidate id='kt_create_account_form'>
                <div>
                  <div className='fv-row mb-5'>
                    <label className='d-flex align-items-center form-label'>
                      <span className='required'>Passport Number</span>
                    </label>

                    <Field
                      style={{...inputStyle, width: '450px'}}
                      name='passportNumber'
                      readOnly
                      value={viewApplication.passport_number}
                      className='form-control form-control-lg form-control-solid'
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name='passportNumber' />
                    </div>
                  </div>
                  <div className='d-flex' style={{justifyContent: 'space-between'}}>
                    <div className='fv-row mb-5'>
                      <label className='form-label required'>First Name</label>

                      <Field
                        name='firstName'
                        readOnly
                        value={viewApplication.first_name}
                        style={inputStyle}
                        className='form-control form-control-lg form-control-solid'
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
                        readOnly
                        value={viewApplication.last_name}
                        className='form-control form-control-lg form-control-solid'
                      />
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='businessDescriptor' />
                      </div>
                    </div>
                  </div>

                  <div className='d-flex' style={{justifyContent: 'space-between'}}>
                    <div className='fv-row mb-5'>
                      <label className='d-flex align-items-center form-label'>
                        <span className='required'>Birth Place</span>
                      </label>

                      <Field
                        style={inputStyle}
                        readOnly
                        value={viewApplication.birth_place}
                        name='birthPlace'
                        className='form-control form-control-lg form-control-solid'
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
                        name='birthDetail'
                        readOnly
                        value={viewApplication.birthday_date}
                        className='form-control form-control-lg form-control-solid'
                        dateFormat='MM/dd/yyyy'
                        placeholderText='Select DOB'
                        style={inputStyle}
                      />

                      <div className='text-danger mt-2'>
                        <ErrorMessage name='birthDetail' />
                      </div>
                    </div>
                  </div>

                  <div className='d-flex' style={{justifyContent: 'space-between'}}>
                    <div className='fv-row mb-5'>
                      <label className='d-flex align-items-center form-label'>
                        <span className='required'>Passport Issue Date</span>
                      </label>

                      <DatePicker
                        name='passportIssueDate'
                        readOnly
                        value={viewApplication.passport_issue_date}
                        className='form-control form-control-lg form-control-solid'
                        dateFormat='MM/dd/yyyy'
                        placeholderText='Select Issue Date'
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
                        name='passPortExpiryDate'
                        readOnly
                        value={viewApplication.passport_expiry_date}
                        className='form-control form-control-lg form-control-solid'
                        dateFormat='MM/dd/yyyy'
                        placeholderText='Select Expiry Date'
                      />

                      <div className='text-danger mt-2'>
                        <ErrorMessage name='passPortExpiryDate' />
                      </div>
                    </div>
                  </div>
                  <div className='d-flex' style={{justifyContent: 'space-between'}}>
                    <div className='fv-row mb-10'>
                      <label className='form-label required'>Gender</label>

                      <Field
                        name='gender'
                        readOnly
                        value={viewApplication.gender}
                        style={{...inputStyle, width: '215px', backgroundColor: 'white'}}
                        className='form-select form-select-lg form-select-solid'
                      />
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='businessType' />
                      </div>
                    </div>
                    <div className='fv-row mb-10'>
                      <label className='form-label required'>Marital Status</label>

                      <Field
                        readOnly
                        value={viewApplication.marital_status}
                        style={{...inputStyle, width: '215px', backgroundColor: 'white'}}
                        name='maritalStatus'
                        className='form-select form-select-lg form-select-solid'
                      />
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
      <div className='d-flex ' style={{width: '100%'}}>
        <div style={{width: '40%', marginTop: 50}}>
          <h6>Passport Back Page Image</h6>
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
              style={{
                justifyContent: 'flex-end',
                position: 'absolute',
                backgroundColor: 'white',
                padding: 7,
                borderRadius: 50,
                cursor: 'pointer',
              }}
            ></div>
            <img
              src={viewApplication.passport_back}
              alt='Uploaded Image'
              style={{maxWidth: '100%', maxHeight: '100%',}}
            />
          </div>
        </div>

        <div
          className='d-flex flex-row-fluid flex-center bg-body rounded'
          style={{width: '70%', backgroundColor: 'blue'}}
        >
          <Formik initialValues={initValues} onSubmit={() => {}}>
            {() => (
              <Form className='py-20 px-9' noValidate id='kt_create_account_form'>
                <div className='fv-row mb-10'>
                  <label className='d-flex align-items-center form-label'>
                    <span className='required'>Father's Name</span>
                  </label>

                  <Field
                    style={{...inputStyle, width: '450px'}}
                    readOnly
                    value={viewApplication.fathers_name}
                    name='fatherName'
                    className='form-control form-control-lg form-control-solid'
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
                    style={{...inputStyle, width: '450px'}}
                    name='motherName'
                    readOnly
                    value={viewApplication.fathers_name}
                    className='form-control form-control-lg form-control-solid'
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
      <div className='d-flex ' style={{width: '100%'}}>
        <div style={{width: '40%', marginTop: 50}}>
          <h6>Pan Card Photo</h6>
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
              style={{
                justifyContent: 'flex-end',
                position: 'absolute',
                backgroundColor: 'white',
                padding: 7,
                borderRadius: 50,
                cursor: 'pointer',
              }}
            ></div>
            <img
              src={viewApplication.pan_card}
              alt='Uploaded Image'
              style={{maxWidth: '100%', maxHeight: '100%',}}
            />
          </div>
        </div>
        {/* <div style={{ marginLeft: 50 }}>
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
                    className='form-control form-control-lg form-control-solid' onChange={(e) => handleFieldChange('panNo', e.target.value)}
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='businessDescriptor' />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div> */}
      </div>
      <h3 className='mt-20'>Upload Traveler Photo</h3>
      <p>
        The destination country requires a passport-sized photo of the traveler. The photo should
        have a solid light-colored background, like a white wall or door, and be taken in a well lit
        room. The traveler should have a neutral facial expression and not be wearing any headgear
        or glasses.
      </p>
      <div className='d-flex ' style={{width: '100%'}}>
        <div style={{width: '40%', marginTop: 50}}>
          <h6>Photo</h6>
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
              style={{
                justifyContent: 'flex-end',
                position: 'absolute',
                backgroundColor: 'white',
                padding: 7,
                borderRadius: 50,
                cursor: 'pointer',
              }}
            ></div>
            <img
              src={viewApplication.photo}
              alt='Uploaded Image'
              style={{maxWidth: '100%', maxHeight: '100%', }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicationFormView
