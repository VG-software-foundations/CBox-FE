
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import EnterWind from "./componentsEnter/enterWind/EnterWind";
import TextEditor from "./componentsEditWindow/TextEditor/TextEditor";
import { TextEditorProvider} from "./componentsEditWindow/TextEditor/context";
import ToolPanel from "./componentsEditWindow/ToolPanel/ToolPanel";
import MainM from "./componentsMain/mainM/MainM"
import RegistrationWind from './componentsRegistration/registartionWind/RegistartionWind';

function App() {
  return (
    <Router>
    <div className="App">
    <Routes>
         <Route path="/" element={<EnterWind />} />
          <Route path="/profil" element={<MainM />} />
          <Route path="/registration" element={<RegistrationWind/>}/>
          <Route path="/editor" element={
            <TextEditorProvider>
              <ToolPanel />
              <TextEditor />
            </TextEditorProvider>
          } /> 
        </Routes>
    </div>
    </Router>
  );
  
}

export default App;
