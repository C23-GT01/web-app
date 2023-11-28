import TitleSection from "../Elements/TitleSection";

const Section = ({ title = '...', children }) => {
  return (
    <div className="py-4 xl:px-0 p-4">
      <TitleSection>{title}</TitleSection>
      {children}
    </div>
  );
};

export default Section;