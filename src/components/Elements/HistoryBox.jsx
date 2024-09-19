const HistoryBox = ({ data }) => {
  return (
    <div className="clearfix">
      <img
        src={data.history.image}
        alt="history umkm"
        className="w-full sm:w-64 sm:h-64 rounded-2xl drop-shadow-xl float-left mr-8 mb-5"
      />
      <div>
        {data.history.text.split("\n").map((line, index) => (
          <p key={index} className="font-inter text-justify mb-4">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export default HistoryBox;
