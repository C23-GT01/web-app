

const Main = ({ children, nodiv = false }) => {

  return (
    <main className={`w-full ${(!nodiv) ? 'bg-[#bbb]' : 'bg-fff'} `}>
      {children}
    </main>
  );
};

export default Main;