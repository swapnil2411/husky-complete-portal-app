import React from 'react'

const Plantcard = (props) => {
  
  const {plants} = props.data;
  console.log('Selected Company Data:', props.data)

  return (
    <>
      {
      plants?.map(item => {
        return(
          <div className='plant_quadrant' key={item?.id}>
      <div className='plant_quadrant_locationname'>
        <h3>{item?.name}</h3>
      </div>
      <div className='plant_quadrant_services'>
        <h4>Services</h4>
        <div className='services_list'>
          <ul>
            {
              item?.services?.map((service, idx) => {
                return(
                  <li key={idx}>{service}</li>
                )
              })
            }
          </ul>
        </div>
      </div>
      <div className='plant_quadrant_machines'>
        <h4>
          Services
        </h4>
        <div className='machines_content'>
          <h4>{item?.machines}</h4>
        </div>
      </div>
      <div className='plant_quadrant_users'>
        <h4>
          Users
        </h4>
        <div className='users_content'>
          <h4>{item?.users}</h4>
        </div>
      </div>
    </div>
        )
      })
    }
    </>
    
  )
}

export default Plantcard