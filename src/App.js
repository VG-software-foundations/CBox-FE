import EnterWind from "./componentsEnter/enterWind/EnterWind";
import TextEditor from "./componentsEditWindow/TextEditor/TextEditor";
import { TextEditorProvider} from "./componentsEditWindow/TextEditor/context";
import ToolPanel from "./componentsEditWindow/ToolPanel/ToolPanel";
import MainM from "./componentsMain/mainM/MainM"

function App() {
  return (
    <div className="App">
      {/* <EnterWind/> */}
      <MainM/>
      {/* <TextEditorProvider>
      <ToolPanel />
      <TextEditor />
      </TextEditorProvider> */}
    </div>
  );
  
}

export default App;
