import React, { useState } from "react";
import { logout } from "../../assets";
import Cookies from 'js-cookie'
import { ThreeDot } from "react-loading-indicators";
const ButtonLogOut = () => {
    const [loading, setLoading] = useState(false)
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function logOut(){
      //remueve el access token y redirecciona al log in
      setLoading(true)
      Cookies.remove('access_token_cookie')
      delay(2000).then(()=>{
        setLoading(false)
        window.location.href='/'
      })
    }
    return(
        <div className="flex flex-col py-4 items-center mx-4">
          <div onClick={logOut} className='hover:opacity-80 hover:cursor-pointer gap-2 items-center hover:scale-[0.99] transition-all w-full justify-center text-center rounded-2xl bg-color-cream/10 border-2 border-color-cream py-5 px-10 flex flex-row text-sm font-poppins font-semibold text-color-cream'>
            <img src={logout}/>
            {
              loading ? <ThreeDot variant="pulsate" color="#FDF0D5" size="small" text="" textColor="" /> : 'Log out'}
          </div>
        </div>
    )

}
export default ButtonLogOut