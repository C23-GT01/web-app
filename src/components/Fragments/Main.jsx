const Main = ({ children, nodiv=false }) => {
  return (
    // <main className="max-w-[1240px] mx-auto py-4 min-h-screen">
    <main className={`w-full min-h-screen ${(!nodiv) ? 'bg-[#bbb]' : 'bg-fff' } `}>
      {children}
    </main>
  );
};

export default Main;