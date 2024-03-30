import React, { useState,useEffect } from 'react'
import Nav from './components/Nav'
import './App.css'
import Panel from './components/Panel';
import Canvas from './components/Canvas';
import PanelRight from './components/PanelRight';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSelector } from 'react-redux'
import AttributePanel from './components/AttributePanel'


const App = () => {

  const { activeElementId, isOpened } = useSelector((state) => state.drawer)
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeIcon, setActiveIcon] = useState('moon');
  const [isOpen, setIsOpen] = useState(true);

  const changeIcon = () => {
    setActiveIcon(activeIcon === 'moon' ? 'sun' : 'moon');
  setIsOpen(!isOpen);
  setIsDarkMode(!isDarkMode);
};

  useEffect(() => {
    if (isDarkMode) {
        document.body.classList.add('bg-[#191919]'); // Add dark mode background color
    } else {
        document.body.classList.remove('bg-[#191919]'); // Remove dark mode background color
    }
}, [isDarkMode]);



  return (
    <>
    <div className={`${isDarkMode ?'bg-[#191919] text-white' : 'bg-white text-black'}`}>
    <Nav isDarkMode={isDarkMode} changeIcon={changeIcon} isOpen={isOpen} activeIcon={activeIcon}/>
    <DndProvider backend={HTML5Backend}>
    <div className='flex w-full border border-gray-800 justify-between'>
    
    <Panel isDarkMode={isDarkMode}  />
    <Canvas/>
    {isOpened && <AttributePanel activeElementId={activeElementId} isDarkMode={isDarkMode} />}
    <PanelRight isDarkMode={isDarkMode} />
    </div>
    </DndProvider>
    </div>
    </>
  )
}

export default App