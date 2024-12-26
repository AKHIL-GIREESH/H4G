import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Chat } from '@/components/chat'

export default function DiscordClone() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

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
  )
}

