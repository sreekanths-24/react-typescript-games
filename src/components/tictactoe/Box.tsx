import Xtoken from './Xtoken'
import Otoken from './Otoken'
interface BoxProps {
  value: string;
  onClick: () => void; // Adding this so you can handle clicks!
}
function Box({ value, onClick }: BoxProps) {
  return (
    <div onClick={onClick} className="bg-gray-900 flex justify-center items-center cursor-pointer aspect-square">
      {value === 'X' && <Xtoken />}
      {value === 'O' && <Otoken />}
    </div>
  )
}


export default Box