import React from "react";
import { logout } from "../../assets";

const ButtonLogOut = () => {
    return(
        <div className="flex flex-col py-20 items-center">
          <div className='gap-2 text-center flex flex-row m-5 rounded-xl bg-color-lightblack/20 ring-white ring-2 py-3 px-10 flex flex-row text-sm font-poppins font-semibold text-white'>
          <img src={logout}/> Log out
          </div>
            
        </div>
    )

}
export default ButtonLogOut