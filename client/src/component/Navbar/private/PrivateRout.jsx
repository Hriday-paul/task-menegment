
import PropTypes from 'prop-types'
import { useContext } from 'react'
import { authContext } from '../Authonicate/Authonicate'
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRout({children}) {
    const location = useLocation();
    const {loading, userInfo} = useContext(authContext)
    if(loading){
        return <div className='h-[60vh] flex justify-center items-center'><span className="loading loading-bars loading-lg"></span></div>
    }
    else if(userInfo){
        return children
    }
    return <Navigate state={location.pathname} to="/login" replace></Navigate>
    
}

PrivateRout.propTypes = {
    children : PropTypes.object,
}

export default PrivateRout

