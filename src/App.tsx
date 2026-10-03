import { useState } from "react";
import ThemedEditor from "./components/ThemedEditor";
import Request from "./components/request";

function App() {
  const init_value = `{
    "message" : "Hello World!"
}`;
  const init_value1 = `{
    "result" : "Example response will be here"
}`;

  const [input, setInput] = useState(init_value);
  const [result, setResult] = useState(init_value1);

  return (
    // remember h-screen 100vh not 100%
    <div className="h-screen p-5 w-screen bg-blue-200">
      <Request body={input} setResult={setResult} />
      <div className="flex content-around justify-center gap-5">
        <div className="h-96 flex-1">
          <p>Input</p>
          <ThemedEditor
            defaultValue={init_value}
            value={input}
            onChange={(value) => {
              if (value) setInput(value);
            }}
          />
        </div>
        <div className="h-96 flex-1">
          <p>Output</p>
          <ThemedEditor
            defaultValue={init_value1}
            value={result}
            onChange={(value) => {
              if (value) setResult(value);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
