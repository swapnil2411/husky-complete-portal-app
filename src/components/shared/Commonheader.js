import React from 'react'

const Commonheader = ({ backButton, titleSection }) => {
  return (
    <div className='common_page_header'>
      <div className='common_page_header_backbutton'>
        {backButton}
      </div>
      <div className='common_page_header_title_with_element'>
        {titleSection}
      </div>
    </div>
  )
}

export default Commonheader