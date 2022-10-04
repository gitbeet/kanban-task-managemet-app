import React from 'react'
import Backdrop from './Backdrop'
import BoardsList from './BoardsList'
import '../css/Sidebar.css'
import ToggleTheme from './ToggleTheme'
import { useDarkMode } from '../context/DarkModeContext'
import { useBoardData } from '../context/BoardDataContext'
import { usePopUp } from '../context/PopUpContext'


export default function Sidebar() {

  const {darkMode} = useDarkMode()
  const {currentBoard,changeCurrentBoard,boards} = useBoardData()
  const {toggleSidebar} = usePopUp()

  return (
    <>
        <div className={darkMode ? 'sidebar border-rounded-md bg-dark-300' : 'sidebar border-rounded-md bg-light-900'}>
            <BoardsList   currentBoard={currentBoard}
                          changeCurrentBoard={changeCurrentBoard}
                          boards={boards} />
            <div className='sidebar-toggle-theme'>
              <ToggleTheme />
            </div>
        </div>
      <Backdrop clickFunction={toggleSidebar} />
    </>
  )
}
