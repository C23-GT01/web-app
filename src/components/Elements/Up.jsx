import { MdArrowForwardIos } from "react-icons/md";
import React, { useState, useEffect } from "react";
import { MdArrowUpward } from "react-icons/md";
import Button from "./Button";
import Icon from "./Icon";

const Up = () => {
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <Button
        className="fixed bottom-4 right-4 -rotate-90 py-4"
        onClick={scrollToTop}
      >
        <MdArrowForwardIos />
      </Button>
    )
  );
};

export default Up;
