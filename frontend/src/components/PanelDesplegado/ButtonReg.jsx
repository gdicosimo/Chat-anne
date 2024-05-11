import React from "react";
import { Link } from "react-router-dom";

const ButtonReg = () => {
    return(
        <div className="flex flex-col py-2 items-center mx-4 gap-2">
          <Link 
          to="/register" 
          className='hover:opacity-80 hover:scale-[0.99] transition-all w-full 
          justify-center text-center rounded-2xl bg-color-cream py-5 px-10 flex 
          text-sm font-poppins font-semibold text-color-black'>
                Sign up
          </Link>
          <Link 
          to="/login"
          className='hover:opacity-80 hover:scale-[0.99] transition-all w-full justify-center text-center rounded-2xl bg-color-cream/10 border-2 border-color-cream py-5 px-10 flex flex-row text-sm font-poppins font-semibold text-color-cream'
          >
            Log in
          </Link>
        </div>
    )

}
export default ButtonReg