import Jumbotron from "../Elements/Jumbotron";
import FLotbar from "../Elements/Floatbar";
import QrScanner from "../Elements/QrScanner";
import { useEffect, useRef, useState } from 'react';

const Header = ({ jumbotron, fbBg }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openScan = () => {
    setIsOpen(!isOpen);
  }

  const jumbotronRef = useRef(null);
  const [showSearch, setShowSearch] = useState(true);
  const [hideFloatbar, setHideFloatbar] = useState(false); // Initial state set to true

  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      let jumbotronHeight
      try {
        jumbotronHeight = jumbotronRef.current.offsetHeight;
      } catch {
        jumbotronHeight = 0;
      }

      const scrollPosition = window.scrollY;

      (scrollPosition > jumbotronHeight - 300)
        ? setShowSearch(false)
        : setShowSearch(true);


      clearTimeout(timeoutId);
      if (scrollPosition > 200) {
        setHideFloatbar(false);
        timeoutId = setTimeout(() => {
          setHideFloatbar(true);
        }, 1500);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <header>
      <FLotbar bg={fbBg} openScan={openScan} showSearch={showSearch} hidden={hideFloatbar} />
      {jumbotron ? (<Jumbotron showSearch={showSearch} jumbotronRef={jumbotronRef} />) : null}
      <QrScanner isActive={true} isOpen={isOpen} closeScan={openScan}></QrScanner>
    </header>
  )
}

export default Header;
