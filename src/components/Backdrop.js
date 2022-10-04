import '../css/Backdrop.css'

export default function Backdrop({clickFunction}) {
  return (
    <div    onClick={clickFunction}
            className="backdrop">      
    </div>
  )
}
