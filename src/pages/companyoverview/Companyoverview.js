import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Pageheader from './Pageheader';
import Companyprofileoverviewcard from './Companyprofileoverviewcard';
import Plantcard from './Plantcard';

const Companyoverview = () => {
  const { companies, selectedCompany, setSelectedCompany } = useOutletContext();
  console.log(companies)

  // 👇 auto-select first company when none is selected
  useEffect(() => {
  if (!selectedCompany && companies.length > 0) {
    setSelectedCompany(companies[0]);
  }
}, [companies, selectedCompany, setSelectedCompany]);

  if (!selectedCompany) {
    return <div>Please select a company</div>;
  }

  return (
    <>
      <Pageheader data={selectedCompany} />
      {selectedCompany?.plants.length === 0 ? (
        <Companyprofileoverviewcard />
      ) : (
        <div className='locations_wrapper'>
          <Plantcard data={selectedCompany} />
        </div>
      )}
    </>
  );
};

export default Companyoverview;
