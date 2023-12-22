import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from "react"
import auth from '../../../firebase.config.js'
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'


export const authContext = createContext(null)

function Authonicate({children}) {
    const [userInfo, setUserInfo] = useState("")
    const [loading, setLoading] = useState(true)

    const provider = new GoogleAuthProvider();

    const createUser = (email,pass)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, pass)
    }

    const loginUser = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth ,email,password)
    }

    const googleLogin = ()=>{
        setLoading(true)
        return signInWithPopup(auth, provider)
    }


    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUserInfo(currentUser)
            setLoading(false)
        })
        return ()=>{
            unsubscribe()
        }
    },[])


    const authInfo = {
        userInfo,
        createUser,
        loginUser,
        googleLogin,
        logOut,
        loading
    }

  return (
    <authContext.Provider value={authInfo}>
        {children}
    </authContext.Provider>
  )
}

Authonicate.propTypes = {
    children: PropTypes.object,
}

export default Authonicate