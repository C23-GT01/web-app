import Header from "../Fragments/Header";
import Main from "../Fragments/Main";
import Footer from "../Fragments/Footer";


const HomeLayout = ({ children, jumbotron=false, fbBg }) => {
  return (
    <div className="">
      <Header jumbotron={jumbotron} fbBg={fbBg}/>
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};

export default HomeLayout;