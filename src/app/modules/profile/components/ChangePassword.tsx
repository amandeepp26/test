
export function ChangePassword(){
    return(
        <>
            <div className='card mb-5 mb-xl-10'>
      <div id='kt_account_profile_details' className='collapse show'>
        <form noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Old Password</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      style={{
                        border: '2px solid #d3d3d3',
                        borderRadius: '25px',
                        padding: '10px',
                        paddingLeft: '20px',
                        width: 280,
                        boxSizing: 'border-box',
                        backgroundColor: 'white'
                      }}
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='Enter Old Password'
                    
                    />
           
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>New Password</label>

              <div className='col-lg-8 fv-row'>
                <input
                      style={{
                        border: '2px solid #d3d3d3',
                        borderRadius: '25px',
                        padding: '10px',
                        paddingLeft: '20px',
                        width: 280,
                        boxSizing: 'border-box',
                        backgroundColor: 'white'
                      }}
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Enter New Password'
                
                />
             
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Confirm New Password</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                      style={{
                        border: '2px solid #d3d3d3',
                        borderRadius: '25px',
                        padding: '10px',
                        paddingLeft: '20px',
                        width: 280,
                        boxSizing: 'border-box',
                        backgroundColor: 'white'
                      }}
                  type='tel'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Enter New Password'
                
                />
         
              </div>
            </div>
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button type='submit' className='btn btn-primary'>
    Save
            </button>
          </div>
        </form>
      </div>
    </div>
        
        </>
    )
}