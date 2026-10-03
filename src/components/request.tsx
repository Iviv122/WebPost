import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  body?: string;
  className?: string;
  setResult: (s: string) => void;
}
interface RequestProps {
  url: string;
  headers?: HeadersInit;
  body?: string;
  method?: string;
}

export default function Request({ body, setResult, className }: Props) {
  const queryClient = useQueryClient();

  const [url, setUrl] = useState<string>("");
  const [method, setMethod] = useState<string>("POST");

  const mutation = useMutation({
    mutationFn: async ({ url, body, headers, method }: RequestProps) => {
      const response = await fetch(url, {
        body: method === "GET" ? undefined : JSON.stringify(body),
        headers: headers,
        method: method,
      });
      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: ${response.text || response.statusText}`,
        );
      }
      return response.text();
    },
    onSuccess: (data) => {
      setResult(data);
    },
    onError: (data) => {
      setResult(data.message);
    },
  });

  return (
    <div className={"flex justify-center gap-5 " + className}>
      <input
        className="bg-white hover:bg-gray-400 transition-all motion-reduce:transition-none motion-reduce:hover:transition-none p-2 rounded-xs flex-1"
        placeholder="https://..."
        value={url}
        onInput={(e) => {
          setUrl(e.target.value);
        }}
      ></input>
      <select
        onChange={(e) => {
          setMethod(e.target.value);
        }}
        defaultValue="POST"
        className="bg-white hover:bg-gray-400 transition-all motion-reduce:transition-none motion-reduce:hover:transition-none p-2 rounded-xs"
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="PATCH">PATCH</option>
        <option value="DELETE">DELETE</option>
        <option value="HEAD">HEAD</option>
        <option value="OPTIONS">OPTIONS</option>
      </select>
      <button
        className="bg-white hover:bg-gray-400 transition-all motion-reduce:transition-none motion-reduce:hover:transition-none p-2 rounded-xs"
        onClick={() =>
          mutation.mutateAsync({
            url: url,
            body: body,
            method: method,
            headers: {},
          })
        }
      >
        Submit
      </button>
    </div>
  );
}
