import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import Header from '../components/shared/Header';
import Sidebar from '../components/shared/Sidebar';
import useFetch from '../utils/hooks/useFetch';

const Mainlayout = () => {
  const baseUrl = window.location.origin;
  const { data: companies, loading, error } = useFetch(`${baseUrl}/db.json`);
  console.log(companies?.companies)

  const [selectedCompany, setSelectedCompany] = useState(null);

  return (
    <>
      <Header
        companies={companies?.companies}
        loading={loading}
        error={error}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
      />
      <div className='app_wrapper'>
        <Sidebar />
        <main className='app_content'>
          <Outlet context={{ selectedCompany, companies }} /> 
        </main>
      </div>
    </>
  );
};

export default Mainlayout;
