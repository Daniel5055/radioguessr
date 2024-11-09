import { redirect } from "next/navigation";

export default function Home() {
  function onCreate() {
    fetch("/api/create", {
      method: "POST"
    }).then((res) =>
      res.json()
    ).then((data: CreateLobbyResponse) => {
      redirect(data.url)
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
