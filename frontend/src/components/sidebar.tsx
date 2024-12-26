import { useState } from 'react'
import { Plus, Hash, ChevronDown, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

type Channel = {
  id: string
  name: string
  groups: Group[]
}

type Group = {
  id: string
  name: string
}

type SidebarProps = {
  onSelectChannel: (channelId: string) => void
  onSelectGroup: (groupId: string) => void
}

export function Sidebar({ onSelectChannel, onSelectGroup }: SidebarProps) {
  const [channels, setChannels] = useState<Channel[]>([
    { id: '1', name: 'General', groups: [{ id: '1', name: 'Welcome' }] },
  ])
  const [newChannelName, setNewChannelName] = useState('')
  const [newGroupName, setNewGroupName] = useState('')
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null)
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null)

  const handleCreateChannel = () => {
    if (newChannelName.trim()) {
      const newChannel: Channel = {
        id: Date.now().toString(),
        name: newChannelName.trim(),
        groups: [],
      }
      setChannels([...channels, newChannel])
      setNewChannelName('')
    }
  }

  const handleCreateGroup = (channelId: string) => {
    if (newGroupName.trim()) {
      const updatedChannels = channels.map(channel => {
        if (channel.id === channelId) {
          return {
            ...channel,
            groups: [
              ...channel.groups,
              { id: Date.now().toString(), name: newGroupName.trim() },
            ],
          }
        }
        return channel
      })
      setChannels(updatedChannels)
      setNewGroupName('')
    }
  }

  const handleSelectChannel = (channelId: string) => {
    setSelectedChannelId(channelId)
    onSelectChannel(channelId)
    setSelectedGroupId(null)
    onSelectGroup('')
  }

  const handleSelectGroup = (channelId: string, groupId: string) => {
    setSelectedChannelId(channelId)
    setSelectedGroupId(groupId)
    onSelectChannel(channelId)
    onSelectGroup(groupId)
  }

  return (
    <div className="w-64 bg-sidebar text-sidebar-foreground p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Channels</h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full mb-4">
            <Plus className="mr-2 h-4 w-4" /> Create Channel
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Channel</DialogTitle>
          </DialogHeader>
          <Input
            value={newChannelName}
            onChange={(e) => setNewChannelName(e.target.value)}
            placeholder="Channel name"
          />
          <Button onClick={handleCreateChannel}>Create</Button>
        </DialogContent>
      </Dialog>
      {channels.map((channel) => (
        <Collapsible key={channel.id} className="mb-2">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-sidebar-accent rounded-md">
            <div className="flex items-center">
              <Hash className="mr-2 h-4 w-4" />
              <span>{channel.name}</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="ml-4 mt-2">
              <Button
                variant="ghost"
                className={`w-full justify-start mb-1 ${
                  selectedChannelId === channel.id && !selectedGroupId
                    ? 'bg-primary text-primary-foreground'
                    : ''
                }`}
                onClick={() => handleSelectChannel(channel.id)}
              >
                <Hash className="mr-2 h-4 w-4" />
                General
              </Button>
              {channel.groups.map((group) => (
                <Button
                  key={group.id}
                  variant="ghost"
                  className={`w-full justify-start mb-1 ${
                    selectedGroupId === group.id
                      ? 'bg-primary text-primary-foreground'
                      : ''
                  }`}
                  onClick={() => handleSelectGroup(channel.id, group.id)}
                >
                  <Users className="mr-2 h-4 w-4" />
                  {group.name}
                </Button>
              ))}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full mt-2">
                    <Plus className="mr-2 h-4 w-4" /> Create Group
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Group</DialogTitle>
                  </DialogHeader>
                  <Input
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="Group name"
                  />
                  <Button onClick={() => handleCreateGroup(channel.id)}>Create</Button>
                </DialogContent>
              </Dialog>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}

