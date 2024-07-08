import './waitlist.css'
import React, { useState } from 'react';

const WaitlistCount = () => {
  const [name, setName] = useState('');
  const [waitlist, setWaitlist] = useState([]);

  const addToWaitlist = (e) => {
    e.preventDefault();
    if (name && !waitlist.includes(name)) {
      setWaitlist([...waitlist, name]);
      setName(''); 
    } else {
      
      alert("Please enter a unique name or the name is already on the waitlist.");
  };
}

  return (
    <div className="waitlist-container">
      <h3 style={{color: 'white', textAlign: 'center' }}>Join Our Waitlist</h3>
      <div className="waitlist-form">
      <form onSubmit={addToWaitlist} className="waitlist-form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name..."
        />
        <button type="submit" className="waitlist-button">Join Waitlist</button>
      </form>
      </div>
      <div className="waitlist-count">Waitlist Count: {waitlist.length}</div>
    </div>
  );
};

export default WaitlistCount;