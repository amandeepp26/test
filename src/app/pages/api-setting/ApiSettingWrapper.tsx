import { ProcessedTable } from '../../components/ProcessedTable'
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../helpers/axiosInstance';
import { IssueApiTable } from '../../components/IssueApiTable';
import { ICreateAccount, inits } from '../../modules/wizards/components/CreateAccountWizardHelper';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';

const inputStyle = {
  border: '1.5px solid #d3d3d3', // Border width and color
  borderRadius: '15px', // Border radius
  padding: '10px',
  paddingLeft: '20px', // Padding
  width: '90%', // 100% width
  boxSizing: 'border-box', // Include padding and border in the width calculation
}

function ApiSettingWrapper() {
  const [memberStatsData, setMemberStatsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [initValues] = useState<ICreateAccount>(inits)

  const [formData, setFormData] = useState({
    api_percentage: '',
    merchant_percantage: '',
    panel_api_percantage: '',
  })

  const handleFieldChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value })
  }

  const handleSave = async () => {
    setLoading(true);

    const response = await axiosInstance.post('/backend/settings', formData)
    console.log(response.data.data)
    if (response.status == 203) {
      toast.error(response.data.msg, {
        position: 'top-center',
      })
      setLoading(false);
    } else {
      toast.success(response.data.msg, {
        position: 'top-center',
      })
      setLoading(false);
    }
  }
  useEffect(() => {
    // Define a function to make the POST request
    const fetchData = async () => {
      setLoading(true);
      try {

        // Make a POST request to your API endpoint
        axiosInstance.get('/backend/fetch_setting')
          .then((response) => {
            console.log(response.data)
            const responseData = response.data.data;

            // Update the formData state with the fetched data
            setFormData({
              api_percentage: responseData.api_percentage || '', // Use default value if the response data is missing
              merchant_percantage: responseData.merchant_percantage || '',
              panel_api_percantage: responseData.panel_api_percantage || '',
            });
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching Atlys data:', error);
            setLoading(false);
          });


      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // The empty dependency array ensures this effect runs once on mount
  return (
    <div>
      <div className='w-full' style={{ backgroundColor: '#fff' }}>

        <div className='px-10 py-10'>

          <Formik initialValues={initValues} onSubmit={() => { }}>
            {() => (
              <Form className='py-10 px-9' noValidate id='kt_create_account_form'>
                <div className='fv-row mb-10 w-100'>

                  <label className='form-label fs-4'>All Countries</label>
                  <Field
                    as='select'
                    name='fromCountry'
                    className='form-select form-select-lg form-select-solid border border-2  border-secondary rounded-4 mt-2'
                    style={{ background: '#fff' }}
                  >
                    <option value=''>All Countries</option>

                  </Field>
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='businessType' />
                  </div>
                </div>
                <div className='fv-row mb-10'>
                  <label className='d-flex align-items-center form-label'>
                    <span className='required'>All Country percentage</span>
                  </label>

                  <Field
                    style={{ ...inputStyle, width: '450px' }}
                    onChange={(e) => handleFieldChange('api_percentage', e.target.value)}
                    value={formData.api_percentage}
                    name='api_percentage'
                    className='form-control form-control-lg form-control-solid'
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='api_percentage' />
                  </div>
                </div>

                <div className='fv-row mb-10'>
                  <label className='d-flex align-items-center form-label'>
                    <span className='required'>Merchant percentage</span>
                  </label>

                  <Field
                    style={{ ...inputStyle, width: '450px' }}
                    onChange={(e) => handleFieldChange('merchant_percantage', e.target.value)}
                    name='merchant_percantage'
                    value={formData.merchant_percantage}
                    className='form-control form-control-lg form-control-solid'
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='merchant_percantage' />
                  </div>
                </div>

                <div className='fv-row mb-10'>
                  <label className='d-flex align-items-center form-label'>
                    <span className='required'>API percentage</span>
                  </label>

                  <Field
                    style={{ ...inputStyle, width: '450px' }}
                    onChange={(e) => handleFieldChange('panel_api_percantage', e.target.value)}
                    name='panel_api_percantage'
                    value={formData.panel_api_percantage}
                    className='form-control form-control-lg form-control-solid'
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='panel_api_percantage' />
                  </div>
                </div>

                <div className='d-flex justify-content-center mt-10'>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    onClick={handleSave}
                    style={{ backgroundColor: '#332789', width: 180 }}
                  >
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>

        </div>
      </div>
    </div>
  )
}

export default ApiSettingWrapper;