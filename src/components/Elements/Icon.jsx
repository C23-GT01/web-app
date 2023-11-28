import React, { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';

const Icon = ({ children, active = false, hidden = false }) => {
  const childrenWithClassName = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      className: `${child.props.className} h-full w-full`,
    });
  });

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsHovered(active);
  }, [active]);

  const hoverHandler = () => {
    if (!active) {
      setIsHovered(!isHovered);
    }
  };

  const iconColor = isHovered ? '#886345' : '#BBBBBB';
  const isHidden = hidden ? 'hidden' : '';

  return (
    <IconContext.Provider value={{ color: iconColor }}>
      <div className={`w-[44px] h-[44px] ${isHidden} `} onMouseEnter={hoverHandler} onMouseLeave={hoverHandler} > 
        {childrenWithClassName}
      </div>
    </IconContext.Provider>
  );
};

export default Icon;