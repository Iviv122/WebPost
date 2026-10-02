import { useState } from "react";
import ThemedEditor from "./components/ThemedEditor";

function App() {
  const init_value = `{
    "message" : "Hello World!"
}`;
  const init_value1 = `{
    "result" : "Example response will be here"
}`;

  const [input, setInput] = useState("");

  return (
    // remember h-screen 100vh not 100%
    <div className="h-screen p-5 w-screen bg-blue-200">
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
          <ThemedEditor defaultValue={init_value1} value={input} />
        </div>
      </div>
      <div className="flex justify-center gap-5 mt-10">
        <button className="bg-white hover:bg-gray-400 transition-all motion-reduce:transition-none motion-reduce:hover:transition-none p-2 rounded-xs">
          Submit
        </button>
        <input
          className="bg-white text-black p-1"
          placeholder="https://..."
        ></input>
      </div>
    </div>
  );
}

export default App;
