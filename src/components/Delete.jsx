import React from 'react'
import { removeEditorElement } from '../store/globalSlice';
import { RiDeleteBin5Line } from 'react-icons/ri'
import { useDispatch } from 'react-redux'

const Delete = ({id}) => {

    const dispatch = useDispatch()
    const deleteClick = () => {
        dispatch(removeEditorElement({ id }))
      }
    
  return (
    <>
    <button className='text-white'  onClick={deleteClick}>
              <RiDeleteBin5Line />
            </button>
    </>
  )
}

export default Delete