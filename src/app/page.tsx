
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground gap-10">
      <h1 className="text-4xl font-bold">RadioGuessr</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create lobby
      </button>
    </div>
  );
}
