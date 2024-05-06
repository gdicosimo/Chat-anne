import React from "react";
import { logout } from "../../assets";

const ButtonLogOut = () => {
    return(
        <div className="flex flex-col py-4 items-center mx-4">
          <div className='hover:opacity-80 gap-2 items-center hover:scale-[0.99] transition-all w-full justify-center text-center rounded-2xl bg-color-cream/10 border-2 border-color-cream py-5 px-10 flex flex-row text-sm font-poppins font-semibold text-color-cream'>
            <img src={logout}/>
            Log out
          </div>
            
        </div>
    )

}
export default ButtonLogOut