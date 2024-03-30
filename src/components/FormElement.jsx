import React from 'react'
import { FaCopy } from "react-icons/fa";
import { useDispatch } from 'react-redux'
import { ElementTypesText } from '../constants/elementTypes'
import { openDrawer } from '../store/drawerSlice'

import { cloneEditorElement } from '../store/globalSlice';
import Delete from './Delete'


const TextInput = ({ ...props }) => {
  const { placeHolder } = props
  return (
    <div className="px-4 py-2  flex flex-col gap-1">
      {placeHolder}
      <input
        type="text"
        className="bg-white p-1 rounded-lg border border-slate-300"
      />
    </div>
  )
}

const TextArea = ({ ...props }) => {
  const { placeHolder } = props
  return (
    <div className="px-4 py-2  flex flex-col gap-1">
      {placeHolder}
      <textarea
        rows={3}
        className="bg-white p-1 rounded-lg border border-slate-300"
      />
    </div>
  )
}

const Email = ({ ...props }) => {
  const { placeHolder } = props;
  return (
    <div className="px-4 py-2 flex flex-col gap-1">
      {placeHolder}
      <input
        type="email"
        className="bg-white p-1 rounded-lg border border-slate-300"
      />
    </div>
  );
};


const Password = ({ placeHolder }) => (
  <div className="px-4 py-2 flex flex-col gap-1">
    {placeHolder}
    <input
      type="password"
      className="bg-white p-1 rounded-lg border border-slate-300"
    />
  </div>
);

const Phone = ({ ...props }) => {
  const { placeHolder } = props;
  return (
    <div className="px-4 py-2 flex flex-col gap-1">
      {placeHolder}
      <input
        type="tel"
        className="bg-white p-1 rounded-lg border border-slate-300"
      />
    </div>
  );
};

const DateInput = ({ ...props }) => {
  const { placeHolder } = props;
  return (
    <div className="px-4 py-2 flex flex-col gap-1" >
      {placeHolder}
      <input
        type="date"
        className="bg-white p-1 rounded-lg border border-slate-300"
      />
    </div>
  );
};

const ElementTypes = {
  'text-input': TextInput,
  'text-area': TextArea,
  'email': Email,
  'date': DateInput,
  'phone': Phone,
  'password' : Password,

}

const FormElement = ({ withToolkit, setActiveElementId, ...props }) => {
  const { type, id } = props

  const dispatch = useDispatch()

  const handleClick = () => {
    setActiveElementId(id); // Set active to true when the form element is clicked
    dispatch(openDrawer({ id })); // Dispatch the action to open the attribute panel
  };

 
  const cloneClick = () => {
    dispatch(cloneEditorElement({ id }));
  };
  

  return (
    <div onClick={handleClick}>
      {ElementTypes[type]({ ...props })}
      {withToolkit && (
        <div className="group absolute inset-0 bg-transparent opacity-0 hover:opacity-100 flex p-2 px-10" >
          <div className="flex gap-4 p-1 items-center text-lg h-max ml-auto" >
            <div className="h-max p-1 px-2 rounded text-xs font-bold text-white bg-slate-900" >
              {ElementTypesText[type]}
            </div> 
           <div className='flex gap-[10px] relative top-[-36px]'>
          <div className='h-[22px] w-[22px] bg-[#17c495] rounded text-[15px] text-center 'onClick={cloneClick}>
          <button className='text-white'  >
              <FaCopy />
            </button>
          </div>
           <div className='h-[22px] w-[22px] bg-[#17c495] rounded text-center' >
           <Delete  id={id} />
           </div>
           </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FormElement
