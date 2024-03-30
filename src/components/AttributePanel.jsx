import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ElementTypesText } from '../constants/elementTypes';
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { updateEditorElement } from '../store/globalSlice';

const AttributePanel = ({ activeElementId, isDarkMode, closeDrawer }) => {
  const { editorElements } = useSelector((state) => state.global);
  const element = editorElements.find(
    (element) => element.id === activeElementId
  );

  const [label, setLabel] = useState(element ? element.label : '');
  const [description, setDescription] = useState(
    element ? element.description : ''
  );
  const [placeHolder, setPlaceHolder] = useState(
    element ? element.placeHolder : ''
  );
  const [isOpen, setIsOpen] = useState(true);
  const [activeIcon, setActiveIcon] = useState('left');

  const changeIcon = () => {
    setActiveIcon(activeIcon === 'minus' ? 'plus' : 'minus');
  setIsOpen(!isOpen);
};  
  

  const dispatch = useDispatch();
 

  const applyChanges = () => {
    if (!element) return;

    const payload = {
      ...element,
      label,
      description,
      placeHolder,
    };

    dispatch(
      updateEditorElement({
        id: element.id,
        element: payload,
      })
    );

    closeDrawer();
  };
  // ${ isOpen ? 'right-[0px] transition-all' : 'right-[-400px] '}
  return (
    <div
      className={`absolute h-screen overflow-auto bottom-0 top-[80px] shadow-lg z-10 w-[350px] flex flex-col gap-3 
      right-[0px]
          ${isDarkMode ? 'bg-white text-black':'bg-[#262626] text-white'}`}
    >
      <div className="flex items-center justify-between w-[400px]">
        <h2 className="text-2xl font-semibold p-[14px] pl-[26px]">
          {element && ElementTypesText[element.type]}
        </h2>
        
      </div>

     <div className='flex flex-col w-[400px]'>
      <div className='w-full h-[55px] bg-[#323232] flex items-center' onClick={() => changeIcon('minus')}>
        <h1 className='text-[17px] pl-[30px] font-semibold' >Properties</h1>
        {activeIcon === 'minus' ? <FaPlus className='absolute right-[40px] text-xl' /> : <FaMinus className='absolute right-[40px] text-xl'/> }</div>
     <div className={`${isOpen ? 'w-[400px]  h-[170px] visible ': 'h-[0px] invisible' } `}>
     <div className="flex items-center gap-2 font-semibold h-[55px]">
        <label className='pl-[30px] text-[14px] font-[400]' htmlFor="label">Label</label>
        <input
          type="text"
          id="label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-[190px] h-[30px] absolute right-[20px] bg-[#323232] border outline-none rounded p-2 focus:border-slate-700"
        />
      </div>

      <div className="flex items-center gap-2 font-semibold h-[55px]">
        <label className='pl-[30px] text-[14px] font-[400]' htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-[190px] h-[30px] absolute right-[20px] bg-[#323232] border outline-none rounded p-2 focus:border-slate-700"
        ></textarea>
      </div>

      <div className="flex items-center gap-2 font-semibold h-[55px]">
        <label className='pl-[30px] text-[14px] font-[400]'  htmlFor="placeholder">Placeholder</label>
        <input
          type="text"
          id="placeholder"
          value={placeHolder}
          onChange={(e) => setPlaceHolder(e.target.value)}
          className="w-[190px] h-[30px] absolute right-[20px] bg-[#323232] border outline-none rounded p-2 focus:border-slate-700"
        />
      </div>
     </div>
     </div>

      <div className="mt-auto flex justify-end absolute top-[350px] left-[50px]">
        <button
          onClick={applyChanges}
          className="px-2 py-1 bg-green-600 rounded font-semibold hover:ring-4 hover:ring-green-200 hover:bg-green-500 transition-all text-white"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default AttributePanel;
