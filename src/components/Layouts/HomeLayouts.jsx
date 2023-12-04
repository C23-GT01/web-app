import Header from "../Fragments/Header";
import Main from "../Fragments/Main";
import Footer from "../Fragments/Footer";


const HomeLayout = ({ children, jumbotron = false, fbBg, nodiv=false }) => {
  return (
    <div className="">
      <Header jumbotron={jumbotron} fbBg={fbBg} />
      <Main nodiv={nodiv} >{children}</Main>
      <Footer />
    </div>
  );
};

export default HomeLayout;