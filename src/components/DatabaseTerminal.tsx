import React, { useState } from 'react';
import { Terminal, Volume2, VolumeX, LogOut, PlusCircle, Edit, Bot, Mail, Upload } from 'lucide-react';
import { User } from '../types';
import { useSound } from '../hooks/useSound';
import { SearchBar } from './SearchBar';
import { SearchResults } from './SearchResults';
import { CSVUploader } from './CSVUploader';

interface DatabaseTerminalProps {
  user: User;
  onLogout: () => void;
}

export const DatabaseTerminal: React.FC<DatabaseTerminalProps> = ({ user, onLogout }) => {
  const [searchResults, setSearchResults] = useState<Record[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showCSVUploader, setShowCSVUploader] = useState(false);
  const { playSound, toggleSound, isEnabled } = useSound();

  const handleLogout = () => {
    playSound('logout');
    onLogout();
  };

  const handleButtonClick = (action: string) => {
    playSound('keypress');
    if (action === 'CSV Upload') {
      setShowCSVUploader(true);
    } else {
      // Other actions to be implemented
      console.log(`${action} clicked`);
    }
  };

  return (
    <div className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-lg p-8 font-mono">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 text-green-500/80 text-lg">
          <Terminal className="w-6 h-6" />
          <span>DATABASE QUERY INTERFACE</span>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={toggleSound}
            className="text-green-500/70 hover:text-green-500 transition-colors"
            aria-label={isEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          >
            {isEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </button>
          <div className="text-base text-green-500/70">
            USER: {user.name} | ROLE: {user.role}
          </div>
          <button
            onClick={handleLogout}
            className="text-red-500/70 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => handleButtonClick('Add Company')}
          className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 px-4 py-2 rounded-lg transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Add Company</span>
        </button>
        <button
          onClick={() => handleButtonClick('Edit Company')}
          className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 px-4 py-2 rounded-lg transition-colors"
        >
          <Edit className="w-5 h-5" />
          <span>Edit Company</span>
        </button>
        <button
          onClick={() => handleButtonClick('AI Agent')}
          className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 px-4 py-2 rounded-lg transition-colors"
        >
          <Bot className="w-5 h-5" />
          <span>AI Agent</span>
        </button>
        <button
          onClick={() => handleButtonClick('Contact Plugilo')}
          className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 px-4 py-2 rounded-lg transition-colors"
        >
          <Mail className="w-5 h-5" />
          <span>Contact Plugilo</span>
        </button>
        <button
          onClick={() => handleButtonClick('CSV Upload')}
          className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 px-4 py-2 rounded-lg transition-colors"
        >
          <Upload className="w-5 h-5" />
          <span>CSV Upload</span>
        </button>
      </div>

      <SearchBar 
        onSearch={setSearchResults} 
        setIsSearching={setIsSearching}
        playSound={playSound}
      />

      <SearchResults 
        results={searchResults}
        isSearching={isSearching}
        onLogout={handleLogout}
      />

      {showCSVUploader && (
        <CSVUploader onClose={() => setShowCSVUploader(false)} playSound={playSound} />
      )}
    </div>
  );
};