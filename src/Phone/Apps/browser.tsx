import React, { useState } from 'react';


// SearchBar outside of the Browser component to prevent it from being re-rendered on each keypress
const SearchBar: React.FC<{
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}> = ({ searchQuery, setSearchQuery, onSubmit }) => (
  <form onSubmit={onSubmit} style={{ width: '100%' }}>
      <div style={{
        display: 'flex',
        border: '1px solid #dfe1e5',
        borderRadius: '20px',
        padding: '6px 12px',
        boxShadow: '0 1px 3px rgba(32,33,36,.28)',
        margin: '0 5px'
      }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            fontSize: '14px'
          }}
          placeholder="Search Google"
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#f8f9fa',
            border: 'none',
            borderRadius: '4px',
            color: '#3c4043',
            cursor: 'pointer',
            fontSize: '14px',
            marginLeft: '8px',
            padding: '0 16px',
            height: '28px'
          }}
        >
          Search
        </button>
      </div>
    </form>
);



const Browser: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSearchQuery, setCurrentSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setHasSearched(true);
      setCurrentSearchQuery(searchQuery);
      setIsLoading(false);
      
      const event = new CustomEvent('emitCO2', { detail: { co2: 3 } });
      document.dispatchEvent(event);
    }, 700);
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: hasSearched ? 'flex-start' : 'center',
      padding: '10px',
      boxSizing: 'border-box',
      overflow: 'auto',
      position: 'relative'
    }}>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '3px',
          backgroundColor: '#f3f3f3',
          overflow: 'hidden'
        }}>
          <div style={{
            width: '20%',
            height: '100%',
            backgroundColor: '#4285f4',
            animation: 'loading 1s infinite ease-in-out'
          }} />
        </div>
      )}
      
      <style>
        {`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(500%); }
          }
        `}
      </style>

      {!hasSearched ? (
        <>
          <img 
            src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
            alt="Google Logo"
            style={{ 
              width: '100px',
              marginBottom: '15px',
              marginTop: '20px'
            }}
          />
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSubmit={handleSearch}
          />
        </>
      ) : (
        <div style={{ width: '100%' }}>
          <div style={{ 
            borderBottom: '1px solid #ebebeb',
            padding: '10px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <img 
              src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
              alt="Google Logo"
              style={{ width: '92px', height: '30px' }}
            />
            <div style={{ flex: 1 }}>
              <SearchBar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSubmit={handleSearch}
              />
            </div>
          </div>
          
          <div style={{ 
            padding: '20px',
            color: '#202124',
            fontSize: '20px'
          }}>
            Your search - <b>{currentSearchQuery}</b> - did not match any documents.
            
            <div style={{ 
              marginTop: '20px',
              fontSize: '14px',
              color: '#5f6368'
            }}>
              Suggestions:
              <ul style={{ marginTop: '5px' }}>
                <li>Make sure all words are spelled correctly.</li>
                <li>Try different keywords.</li>
                <li>Try more general keywords.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Browser;