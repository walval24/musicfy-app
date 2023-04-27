import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <>
    <header>
      {/* Navbar generica con elementi link in orizzontale e responsive */}
      {/*<Header/>*/}

      {/* SIdebar che appare sulla sinistra e navbar con toggle button */}
      <Sidebar/>
    </header>
    <main></main>
    </>
  );
}

export default App;
