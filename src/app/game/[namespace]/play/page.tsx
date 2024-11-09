
export default function Game({ params: { namespace } }: { params: { namespace: string } }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground gap-10">
      <h1 className="text-4xl font-bold">Game {namespace}</h1>
    </div>
  );
}