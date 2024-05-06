import React from "react";

const ButtonReg = () => {
    return(
        <div className="flex flex-col py-2 items-center mx-4 gap-2">
            <button className='hover:opacity-80 hover:scale-[0.99] transition-all w-full justify-center text-center rounded-2xl bg-color-cream py-5 px-10 flex text-sm font-poppins font-semibold text-color-black'>
              Sign up
            </button>
          <button className='hover:opacity-80 hover:scale-[0.99] transition-all w-full justify-center text-center rounded-2xl bg-color-cream/10 border-2 border-color-cream py-5 px-10 flex flex-row text-sm font-poppins font-semibold text-color-cream'>
            Log in
          </button>
        </div>
    )

}
export default ButtonReg