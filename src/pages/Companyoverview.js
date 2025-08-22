import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Pageheader from '../components/shared/Pageheader';
import Companyprofileoverviewcard from '../components/shared/Companyprofileoverviewcard';
import Plantcard from '../components/shared/Plantcard';


const Companyoverview = () => {
  const { selectedCompany } = useOutletContext();
  // console.log(selectedCompany)

  if (!selectedCompany) {
    return (
      <>
        <div>Please select a company</div>
      </>
    );
  }


  return (
    <>
      <Pageheader data={selectedCompany} />
      {
        selectedCompany?.plants.length === 0 ?
        <Companyprofileoverviewcard />  :
        <div className='locations_wrapper'>
          <Plantcard data={selectedCompany}/>
        </div>
      }
      
      
    </>
  );
};

export default Companyoverview;
