"use client"

import { API_PATH } from "@/utils/api";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  function onCreate() {
    fetch(`${API_PATH}/create`, {
      method: "POST"
    }).then((res) => {
      return res.json()
    }
    ).then((data: CreateLobbyResponse) => {
      router.push(data.url)
    })
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground gap-10">
      <h1 className="text-4xl font-bold">RadioGuessr</h1>
      <button onClick={onCreate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create lobby
      </button>
    </div>
  );
}
