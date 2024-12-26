"use client"
import { FaCheckCircle } from "react-icons/fa";

function filterItem({ children, id, ...props }) {
  return (
    <div className="min-w-16 w-[max-content] cursor-pointer flex items-center justify-center gap-1 p-1 rounded-full border-[1px] border-solid border-gray-400 shadow-md shadow-gray-300">
      <input 
       className="peer checked:hidden inline-block w-4 h-4 rounded-full"
        type="checkbox"
         id={id}
          {...props} />
      <label className="peer-checked:inline-block hidden" htmlFor={id}>
        <FaCheckCircle className=" w-4 h-4 text-blue-700" />
      </label>
      <span>{children}</span>
    </div>
  )
}

export default filterItem