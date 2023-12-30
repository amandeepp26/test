import React, { useState } from 'react';
import { Vertical } from '../../../modules/wizards/components/Vertical';
import 'react-datepicker/dist/react-datepicker.css';
import SelectCountry from '../../../components/VisaCountrySelect';
import { VisaTable } from '../../../components/VisaTable';
import ApplyVisa from '../../../components/ApplyVisa';
import Loader from '../../../components/Loader';
import MerchantApplyVisa from '../../../components/MerchantApplyVisa';


function MerchantNewVisaWrapper() {
  const [visaForm, showVisaForm] = useState(false);
  const [visaList, setVisaList] = useState(false); // Initialize as false
  const [apiData, setApiData] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [visaListLoader, setVisalistLoader] = useState(false);
  const [finalSubmitLoader, setFinalSubmitLoader] = useState(false);

  const handleApiDataReceived = (data) => {
    // Handle the API data as needed
    setApiData(data);

    // Extract visaList from the API response and set it
    if (data && data.visaList) {
      setVisaList(data.visaList);
    }

    setVisaList(true); // Show the VisaTable component
    setVisalistLoader(false);
  };

  const handleSelectClick = (selectedEntryData) => {
    setSelectedEntry(selectedEntryData);

    showVisaForm(true); // Set VisaForm visibility to true when the "Select" field is clicked
  };
  return (
    <div>
      {visaForm ? (
        <>
          {finalSubmitLoader ?
            <Loader loading={finalSubmitLoader} />
            :
            <Vertical 
            visaListLoader={setVisalistLoader}
            show={(value) => setVisaList(value)}
            visaList={visaList} selectedEntry={selectedEntry} showfinalSubmitLoader={setFinalSubmitLoader} />
          }
        </>
      ) : (
        <>
          {visaList ? (
            <VisaTable
              className=''
              title={'VISA'}
              visaListLoader={setVisalistLoader}
              show={(value) => setVisaList(value)}
              visaList={visaList}
              apiData={apiData} // Pass the API data to VisaTable
              onSelectClick={handleSelectClick}
            />
          ) : (
            <>
                <MerchantApplyVisa
                  show={(value) => setVisaList(value)}
                  visaList={visaList}
                  visaListLoader={setVisalistLoader}
                  onApiDataReceived={handleApiDataReceived}
                />
              
              {visaListLoader &&
                <Loader loading={visaListLoader} />
              }
            </>
          )}
        </>
      )}
    </div>
  );
}

export default MerchantNewVisaWrapper;
