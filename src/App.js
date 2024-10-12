import Footer from "./componentsEnter/footer/Footer";
import Main from "./componentsEnter/enter/Main";
import TextEditor from "./componentsEditWindow/TextEditor/TextEditor";
import { TextEditorProvider} from "./componentsEditWindow/TextEditor/context";
import ToolPanel from "./componentsEditWindow/ToolPanel/ToolPanel";
function App() {
  return (
    <div className="App">
      
      <TextEditorProvider>
      <ToolPanel />
      <TextEditor />
      </TextEditorProvider>
    </div>
  );
  
}

export default App;
