import React from 'react'
import Companyprofile from '../../components/icons/Companyprofile'

const Companyprofileoverviewcard = () => {
  return (
    
    <div className='company_profile_overview_card'>
        <Companyprofile />
        <h3 className='company_profile_overview_card_heading'>We are setting up your company profile.</h3>
        <p className='company_profile_overview_card_paragraph'>As soon as we are ready with the set up, you will be able to see all your plants and their basic information here.</p>
    </div>
  )
}

export default Companyprofileoverviewcard