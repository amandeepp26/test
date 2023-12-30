import { useState } from 'react'
import { Header } from '../../_metronic/layout/components/header/Header'
import BackIcon from '@mui/icons-material/ArrowBackOutlined'
import CheckIcon from '@mui/icons-material/VerifiedUserOutlined'
import TravelerForm from '../modules/wizards/components/TravelerForm'
import ApplicationFormView from './ApplicationFormView'
import { Box, Step, StepLabel, Stepper } from '@mui/material'
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import { toAbsoluteUrl } from '../../_metronic/helpers'

type VisaData = {
    country_code: string
    nationality_code: string
    entry_process: string
    application_id: string
    customer_id: string
    first_name: string
    last_name: string
    birth_place: string
    birthday_date: string
    nationality: string
    passport_number: string
    passport_issue_date: string
    passport_expiry_date: string
    gender: string
    marital_status: string
    passport_front: string
    application_arrival_date: string
    application_departure_date: string
    application_destination: string
    photo: string
    fathers_name: string
    passport_back: string
    pan_card: string
    visa_status: string
    visa_amount: string
    created_at: string
    updated_at: string
    visa_description: string
    // Add other properties as needed
}

type Props = {
    visaData: VisaData[] | null
}

const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    }

    const formattedDate = date.toLocaleDateString('en-US', options)
    return formattedDate
}

const formatDate1 = (dateString) => {
    // Create a Date object from the input date string
    const date = new Date(dateString)

    // Get the month name as a three-letter abbreviation (e.g., "Oct")
    const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]
    const month = monthNames[date.getMonth()]

    // Get the day and year
    const day = date.getDate()
    const year = date.getFullYear()

    // Format the date string
    return `${month} ${day}, ${year}`
}
const getCountryNameByCode = (countryCode) => {
    const countryCodes = {
        AE: 'United Arab Emirates',
    }

    // Use the provided countryCode to look up the country name
    return countryCodes[countryCode] || 'Unknown' // Default to "Unknown" if the code is not found
}

const getStepStatuses = (visa_status) => {
    // Define your default stepStatuses with 'done' set to false for all steps
    const defaultStepStatuses = [
        { label: 'Errors Fixed', done: false },
        { label: 'Application Complete', done: false },
        { label: 'Application Paid', done: false },
        { label: 'Application Submitted', done: false },
        { label: 'Automated QC Passed', done: false },
        { label: 'Manual QC Passed', done: false },
        { label: 'Submitted to Immigration', done: false },
        { label: 'Visa Approved', done: false },
    ];

    // Use a switch statement or if/else to customize stepStatuses based on visa_status
    switch (visa_status) {
        case 'Applied' || 'In process':
            // Set 'done' to true for steps up to 'Application Submitted'
            return defaultStepStatuses.map((step, index) =>
                index <= 3 ? { ...step, done: true } : step
            );
        case 'Processed':
            // Set 'done' to true for steps up to 'Manual QC Passed'
            return defaultStepStatuses.map((step, index) =>
                index <= 7 ? { ...step, done: true } : step
            );
        case 'Not Issued':
            // Set 'done' to true for steps up to 'Manual QC Passed' and 'Visa Approved'
            return defaultStepStatuses.map((step, index) =>
                index <= 1 ? { ...step, done: true } : step
            );
        case 'Waiting':
            return defaultStepStatuses.map((step, index) =>
                index <= 2 ? { ...step, done: true } : step
            );
        default:
            return defaultStepStatuses;
    }
};

const VisaDetailCard = ({ visaData }: Props) => {
    function generateDynamicInvoice(data) {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Company Invoice - Bootdey.com</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" rel="stylesheet">
            <style type="text/css">
                body {
                    margin-top: 20px;
                    color: #484b51;
                }
        
                .text-secondary-d1 {
                    color: #728299!important;
                }
        
                .page-content.container {
                    max-width: 100%;
                }
        
                .page-header {
                    margin: 0 0 1rem;
                    padding-bottom: 1rem;
                    padding-top: 0.5rem;
                    border-bottom: 1px dotted #e2e2e2;
                    display: -ms-flexbox;
                    display: flex;
                    -ms-flex-pack: justify;
                    justify-content: space-between;
                    -ms-flex-align: center;
                    align-items: center;
                }
        
                .page-title {
                    padding: 0;
                    margin: 0;
                    font-size: 1.75rem;
                    font-weight: 300;
                }
        
                .brc-default-l1 {
                    border-color: #dce9f0!important;
                }
        
                .ml-n1, .mx-n1 {
                    margin-left: -0.25rem!important;
                }
        
                .mr-n1, .mx-n1 {
                    margin-right: -0.25rem!important;
                }
        
                .mb-4, .my-4 {
                    margin-bottom: 1.5rem!important;
                }
        
                hr {
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                    border: 0;
                    border-top: 1px solid rgba(0, 0, 0, 0.1);
                }
        
                .text-grey-m2 {
                    color: #888a8d!important;
                }
        
                .text-success-m2 {
                    color: #86bd68!important;
                }
        
                .font-bolder, .text-600 {
                    font-weight: 600!important;
                }
        
                .text-110 {
                    font-size: 110%!important;
                }
        
                .text-blue {
                    color: #478fcc!important;
                }
        
                .pb-25, .py-25 {
                    padding-bottom: 0.75rem!important;
                }
        
                .pt-25, .py-25 {
                    padding-top: 0.75rem!important;
                }
        
                .bgc-default-tp1 {
                    background-color: rgba(121, 169, 197, .92)!important;
                }
        
                .bgc-default-l4, .bgc-h-default-l4:hover {
                    background-color: #f3f8fa!important;
                }
        
                .page-header .page-tools {
                    -ms-flex-item-align: end;
                    align-self: flex-end;
                }
        
                .btn-light {
                    color: #757984;
                    background-color: #f5f6f9;
                    border-color: #dddfe4;
                }
        
                .w-2 {
                    width: 1rem;
                }
        
                .text-120 {
                    font-size: 120%!important;
                }
        
                .text-primary-m1 {
                    color: #4087d4!important;
                }
        
                .text-danger-m1 {
                    color: #dd4949!important;
                }
        
                .text-blue-m2 {
                    color: #68a3d5!important;
                }
        
                .text-150 {
                    font-size: 150%!important;
                }
        
                .text-60 {
                    font-size: 60%!important;
                }
        
                .text-grey-m1 {
                    color: #7b7d81!important;
                }
        
                .align-bottom {
                    vertical-align: bottom!important;
                }
        
                .container {
                    max-width: 100%;
                }
        
                .col-left {
                    float: left;
                    width: 48%; /* Adjust as needed */
                }
        
                .col-right {
                    float: right;
                    width: 48%; /* Adjust as needed */
                }
                .total-section {
                    float: right;
                    width: 48%;
                    margin-top: 20px;
                    margin-right:20px;
                    text-align: right;
                }
                .clear {
                    clear: both;
                }
                .logo-container {
                    text-align: center;
                    margin-top: 10px;
                    padding-bottom: 1rem;
                    padding-top: 0.5rem;
                    border-bottom: 1px dotted #e2e2e2;
                }
        
                .logo {
                    max-width: 100px; /* Adjust the width as needed */
                }
            </style>
        </head>
        <body>
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
        <div class="page-content container">
            <div class="page-header text-blue-d2">
                <h1 class="page-title text-secondary-d1">
                    Invoice
                    <small class="page-info">
                        <i class="fa fa-angle-double-right text-80"></i>
                        ID: #${data._id}
                    </small>
                </h1>
            </div>
            <div class="logo-container">
            <img src=${toAbsoluteUrl('/media/logos/logo.png')} alt="Company Logo" class="logo">
            </div>
            <div class="container px-0">
                <div class="row mt-4">
                    <div class="col-left">
                        <span class="text-sm text-grey-m2 align-middle">To:</span>
                        <span class="text-600 text-110 text-blue align-middle">${data.first_name} ${data.last_name}</span>
                        <div class="my-1">
                        <b class="text-600">${getCountryNameByCode(data.country_code)}</b>
                        </div>
                        <div class="my-1">
                            <b class="text-500">${data.passport_number}</b>
                        </div>
                    </div>
                    <div class="col-right">
                        <div class="text-grey-m2">
                            <div class="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                                Invoice
                            </div>
                            <div class="my-2">
                                <i class="fa fa-circle text-blue-m2 text-xs mr-1"></i>
                                <span class="text-600 text-90">ID:</span>
                                #${data._id}
                            </div>
                            <div class="my-2">
                                <i class="fa fa-circle text-blue-m2 text-xs mr-1"></i>
                                <span class="text-600 text-90">Issue Date:</span>
                                ${formatDate(data.created_at)}
                            </div>
                            <div class="my-2">
                                <i class="fa fa-circle text-blue-m2 text-xs mr-1"></i>
                                <span class="text-600 text-90">Status:</span>
                                <span class="badge badge-warning badge-pill px-25">${data.visa_status}</span>
                            </div>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="mt-4">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Visa type</th>
                                <th>Qty</th>
                                <th>Entry Process</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>${data.visa_description}</td>
                                <td>1</td>
                                <td>${data.entry_process}</td>
                                <td>${data.markup_visa_amount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="total-section">
            <div>
                <span>SubTotal :   </span>
                <span>${data.markup_visa_amount}</span>
            </div>
            <div>
                <span>Visa Fee (0%) :   </span>
                <span> 0 </span>
            </div>
            <div>
                <span>Total Amount :  </span>
                <span>${data.markup_visa_amount}</span>
            </div>
            </div>
           
        </div>
        </body>
        </html>
        `
        
    }

    const generateAndDownloadPDF = (data) => {
        // Generate dynamic invoice content using data (similar to the earlier example)
        const dynamicInvoiceContent = generateDynamicInvoice(data);

        const contentDiv = document.createElement('div');
        contentDiv.innerHTML = dynamicInvoiceContent;
        // Create new jsPDF instance
        const pdf = new jsPDF();

        // Set up the PDF content from the HTML string
        const options = {
            margin: 10,
            filename: `visa_${data._id}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Generate PDF from HTML content
        html2pdf()
            .from(contentDiv)
            .set(options)
            .save();
    };

    const [Detail, seeDetail] = useState(false)
    const [selectedVisa, setSelectedVisa] = useState<VisaData | null>(null)
    const [viewApplication, setViewApplication] = useState<VisaData | null>(null)
    const handleViewDetailsClick = (entry: VisaData) => {
        setSelectedVisa(entry)
    }

    const handleViewApplicationClick = (entry: VisaData) => {
        setSelectedVisa(null)
        setViewApplication(entry)
    }

    const handleGoBackClick = () => {
        setSelectedVisa(null)
        setViewApplication(null)
    }

    // Check if visaData is null or an empty array and handle it accordingly
    if (visaData === null || visaData.length === 0) {
        return <div>No visa data available</div>
    }

    if (selectedVisa) {

        const stepStatusesForVisa = getStepStatuses(selectedVisa.visa_status);

        return (
            <div>
                <div
                    onClick={handleGoBackClick}
                    style={{ cursor: 'pointer' }}
                    className='d-flex items-center'
                >
                    <BackIcon style={{ color: '#007bff' }} />
                    <h6 style={{ color: '#007bff', marginLeft: 10 }}>Go Back to main Dashboard</h6>
                </div>
                <div className='p-10'>
                    <h2>
                        {selectedVisa.first_name} {selectedVisa.last_name} - {selectedVisa.passport_number} -{' '}
                        {formatDate1(selectedVisa.application_arrival_date)}
                    </h2>
                    <br />
                    <div className='d-flex'>
                        <h6>
                            Created On
                            <p className='pt-2 fs-8'>{formatDate1(selectedVisa.created_at)}</p>
                        </h6>
                        <h6 className='px-20'>
                            Applicants
                            <p className='pt-2 fs-8'>1</p>
                        </h6>
                    </div>
                </div>
                {/* <div
                    className='mb-10 mx-10 px-5 py-5'
                    style={{
                        width: 210,
                        border: '1px solid',
                        borderColor: '#696969',
                        borderRadius: 10,
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                    }}
                >
                    <h6 className='fs-4' style={{ marginTop: 5 }}>
                        + Add Application
                    </h6>
                </div> */}
                <div className='card-body'>
                    <div
                        className='w-full'
                        style={{
                            borderRadius: 20,
                            borderColor: '#f5f5f5',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                            marginLeft: 10,
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: '#332789',
                                width: '100%',
                                height: 50,
                                borderTopRightRadius: 20,
                                borderTopLeftRadius: 20,
                                paddingLeft: 20,
                                alignItems: 'center',
                                display: 'flex',
                            }}
                        >
                            <h2 style={{ color: 'white', paddingTop: 7 }}>VISA {selectedVisa.visa_status}</h2>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginLeft: 15,
                                marginTop: 15,
                            }}
                        >
                            <div style={{ flex: '1', borderRight: '1px solid #f5f5f5' }} className='p-10'>
                                <h2>
                                    {selectedVisa.first_name} {selectedVisa.last_name}
                                </h2>
                                <br />
                                <h6>
                                    Submitted On:
                                    {formatDate(selectedVisa.created_at)}
                                    <br />
                                    <br />
                                    Passport Number: {selectedVisa.passport_number}
                                </h6>
                                <br />

                                <h5>{getCountryNameByCode(selectedVisa.country_code)}</h5>
                                <p>
                                    {selectedVisa.visa_description}
                                    <br />
                                    Travel: {formatDate1(selectedVisa.application_arrival_date)} -{' '}
                                    {formatDate1(selectedVisa.application_departure_date)}
                                </p>
                            </div>
                            <div style={{ flex: '1', borderRight: '1px solid #f5f5f5' }} className='p-10'>
                                <h2>Application Details :</h2>
                                <br />

                                <div style={{ flex: '1', padding: '20px', paddingTop: 0, marginLeft: 20 }}>
                                    <Stepper orientation="vertical">
                                        {stepStatusesForVisa.map((step, index) => (
                                            <Step key={step.label} completed={step.done}>
                                                <StepLabel style={{ padding: 0, paddingLeft: 0 }}>
                                                    <Box display="flex" flexDirection="column" alignItems="flex-start">
                                                        <span style={{ fontSize: 14, marginLeft: 5 }}>{step.label}</span>
                                                    </Box>
                                                </StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </div>
                                {/* <ul style={{listStyleType: 'none', paddingLeft: 0}}>
                  {selectedVisa.visa_status === 'Processed' && (
                    <>
                      <li>✓ Errors Fixed</li>
                      <li className='pt-4'>✓ Application Complete</li>
                      <li className='pt-4'>✓ Application Paid</li>
                      <li className='pt-4'>✓ Application Submitted</li>
                      <li className='pt-4'>✓ Automated QC Passed</li>
                      <li className='pt-4'>✓ Manual QC Passed</li>
                      <li className='pt-4'>✓ Submitted to Immigration</li>
                      <li className='pt-4'>✓ Visa Approved</li>
                    </>
                  )}
                  {selectedVisa.visa_status === 'Not Issued' && (
                    <>
                      <li>✓ Errors Fixed</li>
                      <li className='pt-4'>✓ Application Complete</li>
                      <li className='pt-4'>Application Paid</li>
                      <li className='pt-4'>Application Submitted</li>
                      <li className='pt-4'>Automated QC Passed</li>
                      <li className='pt-4'>✓ Manual QC Passed</li>
                      <li className='pt-4'>✓ Submitted to Immigration</li>
                      <li className='pt-4'>✓ Visa Approved</li>
                    </>
                  )}
                </ul> */}
                            </div>

                            <div style={{ flex: '1', borderRight: '1px solid #f5f5f5' }} className='p-10 '>
                                {/* <div
                                    className='px-10 py-5'
                                    style={{ width: '100%', backgroundColor: '#332789', borderRadius: 10 }}
                                >
                                    <h6 style={{ color: 'white' }}>
                                        <CheckIcon style={{ marginLeft: -20 }} />
                                        VISA Approved on
                                    </h6>
                                    <h4 style={{ color: 'white' }}>{formatDate(selectedVisa.updated_at)}</h4>
                                </div> */}
                                <div
                                    onClick={() => handleViewApplicationClick(selectedVisa)}
                                    className='mb-10 mx-10 mt-20 px-10 py-5'
                                    style={{
                                        border: '2px solid #332789',
                                        cursor: 'pointer',
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        backgroundColor: '#fff',
                                    }}
                                >
                                    <h6 className='fs-4' style={{ color: '#332789', paddingTop: 7 }}>
                                        View Application
                                    </h6>

                                </div>
                                {selectedVisa.visa_status === 'Proccesed' &&
                                    <button className='mb-10 mx-10 px-20 py-5' style={{
                                        border: 'none',
                                        cursor: 'pointer',
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        backgroundColor: '#332789',
                                        color: '#fff',
                                        fontSize: "17px",
                                        whiteSpace: 'nowrap'

                                    }}>
                                        Download
                                    </button>
                                }
                                {selectedVisa.visa_status === 'Not issued' &&
                                    <button className='mb-10 mx-10 px-20 py-5' style={{
                                        border: 'none',
                                        cursor: 'pointer',
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        backgroundColor: '#332789',
                                        color: '#fff',
                                        fontSize: "17px",
                                        whiteSpace: 'nowrap'

                                    }}>
                                        Issue Visa
                                    </button>
                                }
                                {selectedVisa.visa_status === 'In process' || selectedVisa.visa_status === 'Applied' &&
                                    <button className='mb-10 mx-10 px-20 py-5' style={{
                                        border: 'none',
                                        cursor: 'pointer',
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        backgroundColor: '#332789',
                                        color: '#fff',
                                        fontSize: "17px",
                                        whiteSpace: 'nowrap'
                                    }}>
                                        Check Status
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                    {/* end::Table container */}
                </div>
            </div>
        )
    }
    if (viewApplication) {
        return (
            <div>
                <div
                    onClick={handleGoBackClick}
                    style={{ cursor: 'pointer' }}
                    className='d-flex items-center'
                >
                    <BackIcon style={{ color: '#007bff' }} />
                    <h6 style={{ color: '#007bff', marginLeft: 10 }}>Go Back to main Dashboard</h6>
                </div>
                <ApplicationFormView viewApplication={viewApplication} />
            </div>
        )
    }
    return (
        <div>
            {visaData?.map((entry, index) => (
                <div
                    className='w-full mt-5'
                    style={{
                        display: 'flex',
                        backgroundColor: '#fff',
                        justifyContent: 'space-between',
                        borderRadius: 25,
                        borderColor: '#f5f5f5',
                        boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.1)',
                        width: '100%',
                    }}
                >
                    <div style={{ flex: '1', borderRight: '1px solid #f5f5f5' }} className='p-10'>
                        <h2 style={{ textTransform: 'capitalize' }}>
                            {entry.first_name} {entry.last_name} - {entry.passport_number} -{' '}
                            {formatDate1(entry.application_arrival_date)}
                        </h2>
                        <h6>Created: {formatDate(entry.created_at)}</h6>

                        <h5 style={{ marginTop: 20 }}>{getCountryNameByCode(entry.country_code)}</h5>
                        <p>
                        {entry.visa_description} {entry.entry_process}:{' '}
                            {formatDate1(entry.application_arrival_date)} -{' '}
                            {formatDate1(entry.application_departure_date)}
                        </p>
                    </div>
                    <div style={{ flex: '1', borderRight: '1px solid #f5f5f5' }} className='p-10'>
                        <h2>Applicants: 1</h2>
                        <br />
                        <br />
                        <h6>{entry.visa_status}</h6>
                    </div>
                    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <button
                            type='submit'
                            id='kt_sign_in_submit'
                            className='btn btn-primary'
                            onClick={() => handleViewDetailsClick(entry)}
                            style={{ backgroundColor: '#332786' }}
                        >
                            View Group
                        </button>
                        <button
                            type='submit'
                            id='kt_sign_in_submit'
                            className='btn btn-primary'
                            onClick={() => generateAndDownloadPDF(entry)}
                            style={{ backgroundColor: '#332786', marginTop: 20 }}
                        >
                            Download Invoice
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export { VisaDetailCard }
