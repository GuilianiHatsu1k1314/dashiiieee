import React from 'react';
import '../assets/styles/button.css';
function Button({ onClick, children }) {
  return (
    <button className='get-started-button' onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
