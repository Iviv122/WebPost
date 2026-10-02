import { Editor, type EditorProps } from "@monaco-editor/react";
interface Props extends EditorProps {
  defaultValue?: string;
  value?: string;
}

export default function ThemedEditor({
  defaultValue,
  value,
  onChange,
  options,
}: Props) {
  return (
    <Editor
      language="json"
      options={{
        minimap: { enabled: false },
        automaticLayout: true,
        ...options,
      }}
      defaultLanguage="json"
      defaultValue={defaultValue}
      onChange={onChange}
      value={value}
    />
  );
}
