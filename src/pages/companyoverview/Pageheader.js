import React from 'react'
import Button from '../../components/shared/Button'
import Invite from '../../components/icons/Invite'

const Pageheader = ({data}) => {
  return (
    <div className='top_bar'>
        <div className='top_bar_titlesubtitles'>
            <div className='top_bar_titlesubtitles_heading'>{data?.name}</div>
            <div className='top_bar_titlesubtitles_subheading'>
                <p className='date'>{data?.setupDate}</p>
                <p className='trends'>Trends: {data?.trends?.period}, {data?.trends?.summary}</p>
            </div>
        </div>
        {
            (data?.plants?.length > 0 && (data?.pendingUsers === 0 && data?.activeUsers === 0)) ? 
            <div className='top_bar_active_users_frame'>
                <p>Invite your users to start using Husky Complete.</p>
                <Button variant="border_btn">
                    <span className='icon'><Invite /></span>
                    <span className='txt'>Invite User</span>
                </Button>
            </div> : ''
        }
        {
            (data?.plants?.length > 0 && (data?.pendingUsers !== 0 || data?.activeUsers !== 0)) ? 
        <div className='top_bar_user_tiles'>
            <div className={data?.activeUsers === 0 ? 'top_bar_user_tiles_active_user_tile active_user_tile_border' : 'top_bar_user_tiles_active_user_tile'}>
                {
                    data?.activeUsers === 0 ? <><h6>No users are active yet.</h6></> :
                    <>
                        <p>Active Users</p>
                        <h4>{data?.activeUsers}</h4>
                    </>
                }
            </div>
            <div className={data?.pendingUsers === 0 ? 'top_bar_user_tiles_pending_user_tile pending_user_tile_border' : 'top_bar_user_tiles_pending_user_tile'}>
                {
                    data?.pendingUsers === 0 ? <><h6>No pending users at the moment.</h6></> :
                    <>
                        <p>Pending Users</p>
                        <h4>{data?.pendingUsers}</h4>
                    </>
                }
                
            </div>
        </div>: ''
        }

    </div>
  )
}

export default Pageheader