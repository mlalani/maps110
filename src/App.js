import './App.css';
import Map from './components/Map';
import Seachbox from './components/Searchbox';
import { useState } from 'react'
import History from './components/History';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Referal from './components/Referal';

function App() {
  const [searchlocation, setsearchlocation] = useState(null)
  const [historyplacename, sethistoryplacename] = useState(null)
  const [allhistoryplacenames, setallhistoryplacenames] = useState([])

  return (
    <>
    <Router>
      <Seachbox setallhistoryplacenames={setallhistoryplacenames} historyplacename={historyplacename} searchlocation={searchlocation} setsearchlocation={setsearchlocation} />
      <Map searchlocation={searchlocation}  />
      <History setallhistoryplacenames={setallhistoryplacenames} allhistoryplacenames={allhistoryplacenames} historyplacename={historyplacename} sethistoryplacename = {sethistoryplacename}/>
      <Routes>
        <Route exact path="/:place" element={<Referal sethistoryplacename={sethistoryplacename} />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
