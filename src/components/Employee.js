import React from "react";
import EditEmployee from "./EditEmployee";

function Employee(props) {
  return (
    <React.Fragment>
      <div>
        <div className="min-w-[350px] max-w-[350px] py-8 px-8 mx-auto space-y-2 bg-white rounded-xl shadow-lg sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6">
          <img
            className="object-cover w-[100px] block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
            src={props.image}
            alt="Woman's Face"
          />
          <div className="text-center space-y-2 sm:text-left">
            <div className="space-y-0.5">
              <p className="text-lg text-black font-semibold">{props.name}</p>
              <p className="text-slate-500 font-medium">{props.role}</p>
            </div>

            {props.editEmployee}

          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Employee;
