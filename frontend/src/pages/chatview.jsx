import {useState} from 'react'
import Sidebar from '@/components/pageCompo/sidebar';
import Chat from '@/components/pageCompo/chat';

export default function Chatview() {
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
  
    return (
      <div className="flex h-screen bg-background text-foreground">
        <Sidebar 
          onSelectChannel={setSelectedChannel} 
          onSelectGroup={setSelectedGroup} 
        />
        <Chat 
          selectedChannel={selectedChannel} 
          selectedGroup={selectedGroup} 
        />
      </div>
    );
}
