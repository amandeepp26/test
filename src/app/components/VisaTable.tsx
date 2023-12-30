import React, {useState} from 'react'
import ApplyVisa from './ApplyVisa'
import ClearIcon from '@mui/icons-material/Clear'
import InfoIcon from '@mui/icons-material/InfoOutlined'
import MerchantApplyVisa from './MerchantApplyVisa'
type Props = {
  className: string
  title: String
  show: (value: boolean) => void
  visaList: boolean
  visaListLoader: (value: boolean) => void
  apiData: any
  onSelectClick: (entryData: any) => void // Add a new prop for API data
}

const VisaTable: React.FC<Props> = ({
  className,
  title,
  show,
  visaList,
  visaListLoader,
  apiData,
  onSelectClick,
}) => {
  const handleSelectClick = (entryData) => {
    // Pass the selected entry data to the parent component
    onSelectClick(entryData)
  }
  const markup_percentage = localStorage.getItem('markup_percentage')??'1';

  const [expandedCardIndex, setExpandedCardIndex] = useState(-1)

  const [priceCardIndex, setPriceCardIndex] = useState(-1)
  return (
    <div style={{backgroundColor: '#fff'}} className='w-full'>
      <MerchantApplyVisa
        visaListLoader={visaListLoader}
        visaList={visaList}
        show={show}
        onApiDataReceived={function (data: any): void {
          throw new Error('Function not implemented.')
        }}
      />
      {/* Visa card 1 */}
      {/* ... Rest of your component remains the same */}
      {apiData.map((entry: any, index: number) => (
        <div className='card-body' style={{paddingLeft: 30, paddingRight: 30}}>
          <div
            className='w-full mt-10'
            style={{
              borderRadius: 25,
              borderColor: '#F3F3F3',
              boxShadow: '4px 4px 15px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div
              style={{
                backgroundColor: '#332786',
                width: '100%',
                height: 60,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                paddingLeft: 20,
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <h2 style={{color: 'white', marginTop: 10}}>{entry.description}</h2>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginLeft: 15,
                marginTop: 15,
              }}
            >
              <div style={{width: '70%'}} className='table-responsive'>
                {/* begin::Table */}
                <table className='table table-row-gray-500 align-middle gs-0 gy-4'>
                  <thead style={{backgroundColor: '#f7f7f7'}}>
                    <tr className='fw-bold text-dark'>
                      <th
                        style={{paddingLeft: 10, fontSize: 16, width: '25%'}}
                        className='min-w-140px'
                      >
                        Entry
                      </th>
                      <th style={{fontSize: 16, width: '25%'}} className='max-w-120px'>
                        Validity
                      </th>
                      <th style={{fontSize: 16, width: '25%'}} className='min-w-120px'>
                        Documents
                      </th>
                      <th style={{fontSize: 16, width: '25%'}} className='min-w-120px'>
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{backgroundColor: 'white'}}>
                    <tr>
                      <td style={{paddingLeft: 10}}>
                        {/* Date */}
                        <a
                          href='#'
                          className='text-dark fw-medium text-hover-primary d-block fs-30'
                        >
                          {entry.entryType}
                        </a>
                      </td>
                      <td>
                        {/* Location 1 */}
                        <a
                          href='#'
                          className='text-dark fw-medium text-hover-primary d-block fs-30'
                        >
                          {entry.day}
                        </a>
                      </td>

                      <td>
                        {/* Status */}
                        <span className='text-dark fw-medium text-hover-primary d-block fs-30'>
                          <a
                            href='javascript:void(0);'
                            onClick={() =>
                              setExpandedCardIndex(expandedCardIndex === index ? -1 : index)
                            }
                          >
                            View Here
                          </a>
                        </span>
                        {expandedCardIndex === index && (
                          <div
                            style={{
                              position: 'absolute',
                              backgroundColor: 'white',
                              width: 320,
                              marginTop: 15,
                              marginLeft: -100,
                              borderRadius: 10,
                              borderColor: '#f5f5f5',
                              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                              paddingLeft: 10,
                              paddingTop: 5,
                            }}
                          >
                            {/* Render your list of documents here */}
                            <div className='d-flex w-full justify-content-between'>
                              <h4 className='mx-3 mt-3'>Documents</h4>
                              <h1 className='mx-5 mt-3'>
                                <a
                                  href='javascript:void(0);'
                                  onClick={() => setExpandedCardIndex(-1)}
                                >
                                  <ClearIcon style={{marginTop: -5}} />
                                </a>
                              </h1>
                            </div>
                            <ul>
                              <li>India PAN Card</li>
                              <li>Passport</li>
                              <li>Passport Back</li>
                              <li>Traveler Photo</li>
                              {/* Add your document data from entry here */}
                            </ul>
                          </div>
                        )}
                      </td>

                      <td>
                        {/* Status */}
                        <span className='text-dark fw-medium text-hover-primary d-block fs-30'>
                          {Math.ceil((entry.receipt['Visa Fees'] ? entry.receipt['Visa Fees'] : 0)*((parseFloat(markup_percentage)?(1+(parseFloat(markup_percentage)/100)):1))) +
                            (entry.receipt['Service Fees'] ? entry.receipt['Service Fees'] : 0)}
                          <a href='javascript:void(0);'>
                            <InfoIcon
                              style={{marginLeft: 5}}
                              onClick={() =>
                                setPriceCardIndex(priceCardIndex === index ? -1 : index)
                              }
                            />
                          </a>
                        </span>
                        {priceCardIndex === index && (
                          <div
                            style={{
                              position: 'absolute',
                              backgroundColor: 'white',
                              width: 220,
                              marginTop: 15,
                              marginLeft: -100,
                              borderRadius: 10,
                              borderColor: '#f5f5f5',
                              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                              paddingLeft: 10,
                              paddingTop: 5,
                            }}
                          >
                            {/* Render your list of documents here */}
                            <div className='d-flex w-full justify-content-between'>
                              <h4 className=' mt-3'>Price Breakdown</h4>
                              <hr />
                              <h1 className='mx-5 mt-3'>
                                <a href='javascript:void(0);' onClick={() => setPriceCardIndex(-1)}>
                                  <ClearIcon style={{marginTop: -5}} />
                                </a>
                              </h1>
                            </div>
                            {entry.receipt['Visa Fees'] && (
                              <h6>Visa Fees : {Math.ceil(entry.receipt['Visa Fees'])}</h6>
                            )}
                            <hr />
                            {entry.receipt['Service Fees'] && (
                              <h6>Service Fees : {entry.receipt['Service Fees']}</h6>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className='d-flex justify-content-end'
                style={{width: 110, height: 45, margin: 20}}
              >
                <button
                  type='submit'
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 25,
                    marginTop: 10,
                    backgroundColor: '#332786',
                  }}
                  onClick={() => handleSelectClick(entry)}
                  className='btn btn-primary'
                >
                  Select
                </button>
              </div>
            </div>
          </div>
          {/* end::Table container */}
        </div>
      ))}
    </div>
  )
}

export {VisaTable}
