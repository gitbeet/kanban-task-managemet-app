import { useBoardData } from "../context/BoardDataContext";
import { usePopUp } from "../context/PopUpContext";
import Board from "./Board";
import {v4 as uuid} from 'uuid'

export default function BoardsList() {

  const {boards,currentBoard,changeCurrentBoard} = useBoardData()
  const {toggleCreateNewBoardWindow,toggleSidebar} = usePopUp()

  function showCreateBoardWindow(){
    toggleCreateNewBoardWindow()
    toggleSidebar()
  }
  
  return (
    <div>
                  <div className='board fs-heading-300 text-primary-500'>ALL BOARDS ({boards.length})</div>

        {boards.map( board => <Board  key={uuid()}
                                      currentBoard={currentBoard}
                                      changeCurrentBoard={changeCurrentBoard}
                                      board={board.name}/>)}
        <div onClick={showCreateBoardWindow} className='board text-primary-600  fs-heading-400 '>+Create New Board</div>
    </div>
  )
}
