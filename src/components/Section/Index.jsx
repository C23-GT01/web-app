import TitleSection from "../Elements/TitleSection";

const Section = ({ title = '...', children, nomb = false }) => {
  return (
    <div className={`pt-6 pb-5 xl:px-0 p-4 bg-white w-full ${(!nomb) ? 'mb-2' : ''} `}>
      <div className="max-w-[1240px] mx-auto">
        <TitleSection>{title}</TitleSection>
        {children}
      </div>
    </div>
  );
};

export default Section;