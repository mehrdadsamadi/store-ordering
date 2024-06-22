// // Tooltip.js
// import { useState } from 'react';

// const Tooltip = ({ text, children }) => {
//   const [visible, setVisible] = useState(false);
//   const [position, setPosition] = useState({ top: 0, right: 0 });

//   const handleMouseEnter = (event) => {
//     const rect = event.currentTarget.getBoundingClientRect();
//     setPosition({
//       top: rect.top + window.scrollY,
//       right: window.innerWidth - rect.left + window.scrollX,
//     });
//     setVisible(true);
//   };

//   const handleMouseLeave = () => {
//     setVisible(false);
//   };

//   return (
//     <div
//       className="relative inline-block"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       {children}
//       {visible && (
//         <div
//           className="fixed bg-gray-700 text-white text-sm p-2 rounded-md shadow-lg mt-4 mr-4 z-50"
//           style={{ top: position.top, right: position.right }}
//         >
//           {text}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Tooltip;

import { useState } from 'react';

const Tooltip = ({ text, arrayText = [], children, direction = 'left' }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({});

  const handleMouseEnter = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    let newPosition = {};

    switch (direction) {
      case 'top':
        newPosition = {
          top: rect.top + scrollY - rect.height - 10,
          left: rect.left + scrollX + rect.width / 2,
          transform: 'translateX(-50%)',
        };
        break;
      case 'right':
        newPosition = {
          top: rect.top + scrollY + rect.height / 2,
          left: rect.right + scrollX + 10,
          transform: 'translateY(-50%)',
        };
        break;
      case 'bottom':
        newPosition = {
          top: rect.bottom + scrollY + 10,
          left: rect.left + scrollX + rect.width / 2,
          transform: 'translateX(-50%)',
        };
        break;
      case 'left':
        newPosition = {
          top: rect.top + scrollY + rect.height / 2,
          left: rect.left + scrollX - rect.width - 10,
          transform: 'translateY(-50%)',
        };
        break;
      default:
        break;
    }

    setPosition(newPosition);
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
          className="fixed bg-gray-700 text-white text-sm text-wrap p-2 rounded-md shadow-lg z-50 max-w-[200px]"
          style={{ ...position }}
        >
          {
            arrayText?.length > 0 ? (
              arrayText.map((txt, index) => (
                <p key={index} className='border-b pb-2 mb-2 last:border-b-0 last:pb-0 last:mb-0'>{txt}</p>
              ))
            ) : (
              <p>{text}</p>
            )
          }
        </div>
      )}
    </div>
  );
};

export default Tooltip;