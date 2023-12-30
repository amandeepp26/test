/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, CSSProperties } from 'react'
import { KTIcon, toAbsoluteUrl } from '../../_metronic/helpers'
import { Link, useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility'
import MerchantView from './MerchantView'
import { CloseOutlined, DeleteOutline } from '@mui/icons-material'
import axiosInstance from '../helpers/axiosInstance'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { ICreateAccount, inits } from '../modules/wizards/components/CreateAccountWizardHelper'


type Props = {
  className: string
  data: any[];
  loading: boolean
}

const overlayStyle: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
  opacity: 0,
  visibility: 'hidden',
  transition: 'opacity 0.3s, visibility 0.3s',
};

const activeOverlayStyle: CSSProperties = {
  opacity: 1,
  visibility: 'visible',
};
const contentStyle: CSSProperties = {
  backgroundColor: '#fff', // Background color for highlighting
  padding: '10px', // Adjust padding as needed
  borderRadius: '5px', // Rounded corners for the highlight
  // textAlign:'center',
  width: '70%',
  height: '40%',
  overflowY: 'auto'
};

const inputStyle = {
  border: '1.5px solid #d3d3d3', // Border width and color
  borderRadius: '15px', // Border radius
  padding: '10px',
  paddingLeft: '20px', // Padding
  width: '90%', // 100% width
  boxSizing: 'border-box', // Include padding and border in the width calculation
}



const IssueApiTable: React.FC<Props> = ({ className, data, loading }) => {

  const [formData, setFormData] = useState({
    walletBalance: ''
  })
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [initValues] = useState<ICreateAccount>(inits)
  const [deleteSelectedItem, setDeleteSelectedItem] = useState(null);
  const [loadingButton, setloadingButton] = useState(false);


  const [open, setOpen] = React.useState(false);

  const [disable, setDisable] = React.useState(false);

  const handleClickOpen = (item) => {
    setDeleteSelectedItem(item)
    setOpen(!open);
  };

  const handleClose = () => {
    setDeleteSelectedItem(null)
    setOpen(false);
  };

  const handleAddBalanceClick = (item) => {
    setSelectedItem(item);
    setVisible(true);
  };

  // const handleVisibilityClick = (item) => {
  //   setSelectedItem(item); // Set the selected item
  //   setVisible(true);
  // };

  const handleApproveClick = async () => {
    try {
      if (deleteSelectedItem) {
        const selectedEntry = deleteSelectedItem as { _id: string };
        if (deleteSelectedItem == null) {
          toast.error('Selected entry is null', {
            position: 'top-center',
          });
        }
        const response = await axiosInstance.post('/backend/merchant/delete_api', {
          api_id: selectedEntry._id,
        });

        if (response.status === 200) {
          toast.success(response.data.msg, {
            position: 'top-center',
          });
          // Handle any additional actions after a successful API call
        } else {
          console.log(response.data);
          toast.error(response.data.msg, {
            position: 'top-center',
          });
        }
      }
    } catch (error) {
      console.error('API error:', error);
    }
  };


  const handleCloseClick = () => {
    setSelectedItem(null);
    setDeleteSelectedItem(null)
    setVisible(false);
  };

  const handleFieldChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value })
  }

  const handleSaveClick = async () => {
    setloadingButton(true)
    const response = await axiosInstance.post('/backend/add_api_balance', {
      api_id: selectedItem._id,
      amount: formData.walletBalance
    })

    if (response.status == 200) {
      toast.success(response.data.msg, {
        position: 'top-center', // Center the toast notification
      })
      handleCloseClick();
      window.location.reload();
    } else {
      console.log(response.data)
      toast.error(response.data.msg, {
        position: 'top-center',
      })
    }
  };
  return (
    <div style={{ backgroundColor: '#fff' }} className='w-full'>
      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Merchant Statistics</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>{data.length} Member</span>
          </h3>

        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          <div className='tab-content'>
            {/* begin::Tap pane */}
            <div className='tab-pane fade show active' id='kt_table_widget_6_tab_1'>
              {/* begin::Table container */}
              <div className='table-responsive'>
                {/* begin::Table */}
                {loading ?
                  <div style={{ height: 300, overflowX: 'hidden', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <span className='indicator-progress' style={{ display: 'block' }}>
                      Please wait...
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  </div>
                  :
                  <table className='table align-middle gs-2 gy-3'>
                    {/* begin::Table head */}
                    <thead className='px-2' style={{ background: '#332786', color: "#fff" }}>
                      <tr className='fw-bold'>
                        <th className='min-w-150px text-center'>Agent</th>
                        <th className='min-w-200px text-center'>Email</th>
                        <th className='min-w-200px text-center'>Company</th>
                        <th className='min-w-150px text-center'>API Key</th>
                        <th className='min-w-200px text-center'>Wallet Balance</th>
                        <th className='min-w-200px text-center'>Action</th>
                      </tr>
                    </thead>
                    {/* end::Table head */}
                    {/* begin::Table body */}
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td className='text-center'>
                            <div className='d-flex flex-row align-items-center symbol symbol-50px me-2'>
                              <span className='symbol-label'>
                                <img
                                  src={item.merchant.merchant_profile_photo}
                                  alt=''
                                  className='h-75 align-self-end'
                                />
                              </span>
                              <a
                                href='#'
                                className='text-dark fw-bold text-hover-primary mb-1 fs-6'
                                style={{ whiteSpace: 'nowrap', paddingLeft: '5px', paddingTop: '5px' }}
                              >
                                {item.merchant.merchant_name}
                              </a>
                            </div>
                          </td>
                          <td className='text-center'>
                            <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6 '>
                              {item.merchant.merchant_email_id}
                            </a>
                          </td>
                          <td className='text-center'>
                            <span className='text-dark fw-bold d-block fs-5'>{item.company}</span>
                            <span className='text-dark fw-semibold d-block fs-7 '>{item.merchant.merchant_company_name}</span>
                          </td>
                          <td className='text-center min-w-50px' style={{ whiteSpace: 'pre-wrap' }}>
                            <span className='text-muted fw-semibold d-block fs-7 '>{item.api_key}</span>
                          </td>
                          <td className='text-center'>
                            <span className='text-dark fw-semibold d-block fs-7'>{item.api_wallet_balance}</span>
                          </td>
                          <td className='text-center'>
                            <div className='d-flex align-items-center'>
                              <DeleteOutline onClick={() =>
                                handleClickOpen(item)
                              } className='mx-5 cursor-pointer' />

                              <button className='btn btn-primary align-self-center' onClick={() => handleAddBalanceClick(item)}>Add Balance</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    {/* end::Table body */}
                  </table>
                }
              </div>
              {/* end::Table */}
            </div>
            {/* end::Tap pane */}

            {/* end::Tap pane */}
          </div>
        </div>

        {/* end::Body */}
      </div>
      {visible &&
        <div className='loader-overlay' style={{ ...overlayStyle, ...(visible && activeOverlayStyle), }}>
          <div style={contentStyle}>

            <div onClick={() => handleCloseClick()} style={{ backgroundColor: '#d3d3d3', padding: 10, position: 'absolute', right: 230, borderRadius: 20, cursor: 'pointer' }}>
              <CloseOutlined />
            </div>
            <div className='px-10 py-10'>
              {selectedItem && (
                <h3>
                  Current Balance: {selectedItem.api_wallet_balance}
                </h3>
              )}
              <Formik initialValues={formData} onSubmit={() => { }}>
                {() => (
                  <Form className='py-10 px-9' noValidate id='kt_create_account_form'>

                    <div className='fv-row mb-5'>
                      <label className='d-flex align-items-center form-label'>
                        <span className='required'>Add Balance</span>
                      </label>

                      <Field
                        style={{ ...inputStyle, width: '450px' }}
                        name='walletBalance'
                        value={formData.walletBalance}
                        className='form-control form-control-lg form-control-solid'
                        onChange={(e) => handleFieldChange('walletBalance', e.target.value)}
                      />
                      <div className='text-danger mt-2'>
                        <ErrorMessage name='walletBalance' />
                      </div>
                    </div>

                    <div className='d-flex justify-content-center mt-10'>
                      <button
                        type='submit'
                        className='btn btn-primary'
                        onClick={handleSaveClick}
                        style={{ backgroundColor: '#332789', width: 180 }}
                      >

                        {!loadingButton && <span className='indicator-label'>Save</span>}
                        {loadingButton && (
                          <span className='indicator-progress' style={{ display: 'block' }}>
                            Please wait...
                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                          </span>
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>

            </div>
          </div>
        </div>
      }
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move', color: 'red' }} id="draggable-dialog-title">
            Delete
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this API?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleApproveClick}>Yes</Button>
          </DialogActions>
        </Dialog>


      </div>
    </div>
  )
}

export { IssueApiTable }
