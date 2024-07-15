import { Provider } from "jotai";
import { AppRouter } from "./routes/AppRouter";

function App() {
  return (
    <Provider>
      <AppRouter />
    </Provider>
  );
}

export default App;
