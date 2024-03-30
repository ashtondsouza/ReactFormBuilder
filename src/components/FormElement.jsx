import React from 'react';
import { FaCopy } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { ElementTypesText } from '../constants/elementTypes';
import { openDrawer } from '../store/drawerSlice';
import { cloneEditorElement } from '../store/globalSlice';
import Delete from './Delete';

const TextInput = ({ label, placeHolder }) => (
  <div className="px-4 py-2 flex flex-col gap-1">
    <label htmlFor="textInput">{label}</label>
    <input
      id="textInput"
      type="text"
      placeholder={placeHolder}
      label={label}
      className="bg-white p-1 rounded-lg border border-slate-300"
    />
  </div>
);

const TextArea = ({ label, placeHolder }) => (
  <div className="px-4 py-2 flex flex-col gap-1">
    <label htmlFor="textArea">{label}</label>
    <textarea
      id="textArea"
      rows={3}
      placeholder={placeHolder}
      label={label}
      className="bg-white p-1 rounded-lg border border-slate-300"
    />
  </div>
);

const Email = ({ label, placeHolder }) => (
  <div className="px-4 py-2 flex flex-col gap-1">
    <label htmlFor="emailInput">{label}</label>
    <input
      id="emailInput"
      type="email"
      placeholder={placeHolder}
      label={label}
      className="bg-white p-1 rounded-lg border border-slate-300"
    />
  </div>
);

const Password = ({ label, placeHolder }) => (
  <div className="px-4 py-2 flex flex-col gap-1">
    <label htmlFor="passwordInput">{label}</label>
    <input
      id="passwordInput"
      type="password"
      placeholder={placeHolder}
      label={label}
      className="bg-white p-1 rounded-lg border border-slate-300"
    />
  </div>
);

const Phone = ({ label, placeHolder }) => (
  <div className="px-4 py-2 flex flex-col gap-1">
    <label htmlFor="phoneInput">{label}</label>
    <input
      id="phoneInput"
      type="tel"
      placeholder={placeHolder}
      label={label}
      className="bg-white p-1 rounded-lg border border-slate-300"
    />
  </div>
);

const DateInput = ({ label, placeHolder }) => (
  <div className="px-4 py-2 flex flex-col gap-1">
    <label htmlFor="dateInput">{label}</label>
    <input
      id="dateInput"
      type="date"
      placeholder={placeHolder}
      label={label}
      className="bg-white p-1 rounded-lg border border-slate-300"
    />
  </div>
);

const ElementTypes = {
  'text-input': TextInput,
  'text-area': TextArea,
  'email': Email,
  'date': DateInput,
  'phone': Phone,
  'password': Password,
};

const FormElement = ({ withToolkit, setActiveElementId,description, ...props }) => {
  const { type, id,  label = ElementTypesText[type], placeHolder } = props;
  const dispatch = useDispatch();

  const handleClick = () => {
    setActiveElementId(id);
    dispatch(openDrawer({ id }));
  };

  const cloneClick = () => {
    dispatch(cloneEditorElement({ id }));
  };

  return (
    <div onClick={handleClick}>
      {ElementTypes[type]({ label, placeHolder })}
      {description}
      {withToolkit && (
        <div className="group absolute inset-0 bg-transparent opacity-0 hover:opacity-100 flex p-2 px-10">
          <div className="flex gap-4 p-1 items-center text-lg h-max ml-auto">
            <div className="h-max p-1 px-2 rounded text-xs font-bold text-white bg-slate-900">
              {ElementTypesText[type]}
            </div>
            <div className="flex gap-[10px] relative top-[-36px]">
              <div className="h-[22px] w-[22px] bg-[#17c495] rounded text-[15px] text-center" onClick={cloneClick}>
                <button className="text-white">
                  <FaCopy />
                </button>
              </div>
              <div className="h-[22px] w-[22px] bg-[#17c495] rounded text-center">
                <Delete id={id} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormElement;
