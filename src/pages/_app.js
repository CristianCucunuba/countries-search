import { QueryClientProvider, QueryClient } from "react-query"
import "../styles/styles.css"

const queryClient = new QueryClient()


function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default App
