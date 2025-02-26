import React, { useEffect, useState } from 'react';
import './visualisation.css';

function Visualization() {
  const [totalCO2, setCO2] = useState(0);
  const [emissions, setEmissions] = useState<{id: string, value: number, timestamp: number}[]>([]);
  const [showMainCloud, setShowMainCloud] = useState(false);

  // Listen for the emitCO2 event
  useEffect(() => {
    const handleCO2Event = (event: CustomEvent) => {
      EmitCO2(event.detail.co2);
    };
    document.addEventListener('emitCO2', handleCO2Event as EventListener);
    
    return () => {
      document.removeEventListener('emitCO2', handleCO2Event as EventListener);
    };
  }, []);

  // Clean up expired emissions every 100ms
  useEffect(() => {
    const interval = setInterval(() => {
      setEmissions(prev => prev.filter(emission => 
        Date.now() - emission.timestamp < 2000
      ));
    }, 100);

    return () => clearInterval(interval);
  }, []);




  // Handle emit CO2 event
  const EmitCO2 = (co2: number) => {
    // Show main cloud effect
    setShowMainCloud(true);
    setTimeout(() => setShowMainCloud(false), 2000);

    // Add new emission notification
    const newEmission = {
      id: `${Date.now()}-${Math.random()}`,
      value: co2,
      timestamp: Date.now()
    };
    setEmissions(prev => [...prev, newEmission]);
    setCO2(prev => prev + co2);
  }



  
  return (
    <div className="visualization">
      <div className="total-co2">
        <span className="co2-value">{totalCO2}</span>
        <span className="co2-unit">g CO₂</span>
      </div>

      {/* Main central cloud effect */}
      {showMainCloud && (
        <div className="main-cloud-container">
          <svg className="main-cloud" viewBox="0 0 100 60">
            <path 
              d="M25,45 C10,45 10,35 20,35 C20,20 40,20 45,35 C50,20 70,20 75,35 C85,35 85,45 75,45 Z"
              fill="rgba(128, 128, 128, 0.8)"
            />
          </svg>
        </div>
      )}

      {/* Bottom-left notifications */}
      <div className="notifications-container">
        {emissions.map(emission => (
          <div key={emission.id} className="notification">
            <span className="notification-value">+{emission.value}g CO₂</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Visualization; 