import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ElementTypesText } from '../constants/elementTypes'
import { FaTimes } from 'react-icons/fa'
import { updateEditorElement } from '../store/globalSlice'



const AttributePanel = ({ activeElementId, isDarkMode,closeDrawer }) => {
  const { editorElements } = useSelector((state) => state.global)
  const element = editorElements.find(
    (element) => element.id === activeElementId
  )
 
  const [placeHolder, setPlaceHolder] = useState(element ? element.placeHolder : '');

  const dispatch = useDispatch()
  const [isOpen , setIsOpen ] = useState(true)

  const applyChanges = () => {
    if (!element) return;
  
    const payload = {
      ...element,
      placeHolder,
    }

    dispatch(
      updateEditorElement({
        id: element.id,
        element: payload,
      })
    )

    closeDrawer()
  }

  return (
    <div className={`absolute h-screen overflow-auto bottom-0 top-[80px] shadow-lg z-10 p-10 w-[350px] flex flex-col gap-3 ${isOpen ? 'right-[0px] transition-all' : 'right-[-400px] ' }  ${isDarkMode ? 'bg-[#262626] text-white' : 'bg-white text-black'}`}>
      <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold">
          {element && ElementTypesText[element.type]}
        </h2>
      </div>

      <div className="flex flex-col gap-2 font-semibold">
        
        Display Label
        <input
          type="text"
          value={placeHolder}
          onChange={(e) => setPlaceHolder(e.target.value)}
          className="w-full border outline-none rounded p-2 focus:border-slate-700"
        />
      </div>

      <div className="mt-auto flex justify-end">
        <button
          onClick={applyChanges}
          className="px-2 py-1 bg-green-600 absolute top-[200px] rounded font-semibold hover:ring-4 hover:ring-green-200 hover:bg-green-500 transition-all text-white"
        >
          Apply
        </button>
      </div>
    </div>
  )
}

export default AttributePanel
