

export default function Game({ params: { namespace } }: { params: { namespace: string } }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground gap-10">
      <h1 className="text-4xl font-bold">Results for game {namespace}</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-2xl font-bold">Team 1</h2>
          <ul>
            <li>Player 1</li>
            <li>Player 2</li>
            <li>Player 3</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Team 2</h2>
          <ul>
            <li>Player 4</li>
            <li>Player 5</li>
            <li>Player 6</li>
          </ul>
        </div>
      </div>
    </div>
  );
}