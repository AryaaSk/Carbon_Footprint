import React, { useState } from 'react';
import './phone.css';
import background from './background.jpeg'

import Browser from './Apps/browser';

interface App {
  name: string;
  icon: string;
  component: React.ComponentType;
}

const apps: App[] = [
  { name: 'Browser', icon: '🧭', component: Browser }, 
];

function Phone() {

  const [currentlyOpenApp, setCurrentlyOpenApp] = useState<App | null>(null);

  const HandleAppClick = (app: App) => {
    setCurrentlyOpenApp(app);
  }

  return (
    <div className="phone" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {currentlyOpenApp && (
        <div style={{ width: '100%', height: '100%' }}>
          <currentlyOpenApp.component />
        </div>
      )}

      {!currentlyOpenApp && (
        <div className="phone-grid">
          {apps.map((app) => (
            <div className="app" key={app.name} onClick={() => HandleAppClick(app)}>
              {app.icon}
            </div>
          ))}
        </div>
      )}
      <div className='home-button-wrapper'>
        <div className='home-button' onClick={() => setCurrentlyOpenApp(null)}></div>
      </div>
    </div>
  );
}

export default Phone;