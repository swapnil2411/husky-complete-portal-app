import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import Header from '../components/shared/Header';
import Sidebar from '../components/shared/Sidebar';
import useFetch from '../utils/hooks/useFetch';

const Mainlayout = () => {
  const baseUrl = window.location.origin;
  const { data, loading, error } = useFetch(`${baseUrl}/db.json`);
  const companies = data?.companies || [];
  const [selectedCompany, setSelectedCompany] = useState(null);
  return (
    <>
      <Header
        companies={companies}
        loading={loading}
        error={error}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
      />
      <div className='app_wrapper'>
        <Sidebar />
        <main className='app_content'>
          <Outlet context={{ selectedCompany, setSelectedCompany, companies }} />
        </main>
      </div>
    </>
  );
};

export default Mainlayout;
