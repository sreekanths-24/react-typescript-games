import Tictactoe from "./pages/Tictactoe"
import { TicTacToeProvider } from "./context/TicTacToeContext";
function App() {
  return (
    <TicTacToeProvider> 
      < Tictactoe />
    </TicTacToeProvider>
  )
}

export default App
