import { useRef,useState } from 'react'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { ItemTypes } from '../constants/itemTypes'
import { insertEditorElement, moveEditorElement } from '../store/globalSlice'
import { RiDragDropLine } from "react-icons/ri";
import DraggableTool from './DraggableTool'
import FormElement from './FormElement'
import { closeDrawer } from '../store/drawerSlice'; 
import AttributePanel from './AttributePanel';

const Canvas = () => {
  const [activeElementId, setActiveElementId] = useState(null);

  const [elements, setElements] = useState([]);

  const updateElements = (updatedElements) => {
    setElements(updatedElements);
  };
 
  const { editorElements } = useSelector((state) => state.global)
  const dispatch = useDispatch()

  const ref = useRef(null)
  const closeDrawerPanel = () => {
    setActiveElementId(null); // Reset activeElementId to close the AttributePanel
  };

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: (item) => {
      if (!item.index && item.index !== 0 & editorElements.length < 1) {
        dispatch(
          insertEditorElement({
            type: item.type,
          })
        )
      }
    },
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
  }))

  drop(ref)

  const renderElements = (element, index) => {
    return (
      <DraggableTool
        key={element.id}
        index={index}
        type={element.type}
        moveElement={(from, to) => dispatch(moveEditorElement({ from, to }))}
      >
        <FormElement withToolkit {...element} id={element.id} elements={elements} updateElements={updateElements} setActiveElementId={setActiveElementId} index={index}/>
      </DraggableTool>
    )
  }

  return (
    <>

      <div className="flex flex-col justify-center items-center flex-1 gap-4 w-full min-w-[20rem]">
        <div
          ref={ref}
          className=" w-[580px] bg-white text-black drop-shadow-lg mt-4 p-7 flex flex-col gap-4 rounded-md h-screen overflow-auto"
        >
          {editorElements.length < 1 && (
            <div className="text-center p-[70px] border-2 border-solid border-slate-400 ">
              <div className='text-[69px] pl-[40%] mb-[30px] text-[#17c495]'><RiDragDropLine /></div>
              <h1 className='text-xl text-black'>Drag elments here</h1>
              <h2 className='text-gray-500'>Grab an element from the left and drop it</h2>
            </div>
          )}
          {editorElements.map(renderElements)}
        </div>
      </div>
      {activeElementId !== null && <AttributePanel activeElementId={activeElementId} closeDrawer={closeDrawerPanel} />}
    </>
  )
}

export default Canvas
