export default function Home() {
  return (
    <main className="bg-gray-100 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 h-screen flex items-center justify-center p-5 ">
      <div className="flex flex-col gap-2 bg-white shadow-lg p-5 rounded-3xl w-full max-w-sm ">
        {["Nico", "Me", "You", "Yourself"].map((person, index) => (
          <div
            key={index}
            className="flex items-center gap-5 even:bg-cyan-100 odd:bg-gray-100 p-2.5 rounded-xl"
          >
            <div className="size-7 bg-blue-400 rounded-full" />
            <span className="text-lg font-medium">{person}</span>
            <div className="size-6 bg-red-500 text-white flex items-center justify-center rounded-full">
              <span>{index}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
