import React from 'react';

const Browser: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: 'red' }}>
      <iframe
        src="https://www.google.com"
        style={{
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        title="Google Browser"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  );
};

export default Browser;