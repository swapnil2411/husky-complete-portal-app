import React from 'react'
import Plants from './Plants'
import Groups from './Groups'
import Commonheader from '../../components/shared/Commonheader'

const Plantandgroups = () => {
  return (
    <div className='plants_groups_wrapper'>
        <Commonheader
            titleSection={
                <h2 className='page_heading'>Plants & groups</h2>
          }
        />
        <Plants/>
        <Groups />
    </div>
  )
}

export default Plantandgroups