import './App.css'
import Pokedex from './Pokedex'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {

  // Create a client
  const queryClient = new QueryClient()

  return (
    <>
      {/* Provide the client to your App */}
      <QueryClientProvider client={queryClient}>
        <Pokedex />
      </QueryClientProvider>
    </>
  )
}

export default App
