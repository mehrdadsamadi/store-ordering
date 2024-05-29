// Tooltip.js
import { useState } from 'react';

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, right: 0 });

  const handleMouseEnter = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({
      top: rect.top + window.scrollY,
      right: window.innerWidth - rect.left + window.scrollX,
    });
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {visible && (
        <div
          className="fixed bg-gray-700 text-white text-sm p-2 rounded-md shadow-lg mt-4 mr-4 z-50"
          style={{ top: position.top, right: position.right }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
