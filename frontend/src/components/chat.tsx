import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'

type ChatProps = {
  selectedChannel: string | null
  selectedGroup: string | null
}

type Message = {
  id: string
  content: string
  sender: string
  timestamp: Date
  channelId: string
  groupId: string | null
}

export function Chat({ selectedChannel, selectedGroup }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    // In a real application, you would fetch messages for the selected channel/group here
    setMessages([])
  }, [selectedChannel, selectedGroup])

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChannel) {
      const message: Message = {
        id: Date.now().toString(),
        content: newMessage.trim(),
        sender: 'You',
        timestamp: new Date(),
        channelId: selectedChannel,
        groupId: selectedGroup,
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  const filteredMessages = messages.filter(
    (message) =>
      message.channelId === selectedChannel &&
      message.groupId === selectedGroup
  )

  if (!selectedChannel) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Select a channel to start chatting</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">
          {selectedGroup ? `${selectedChannel} > ${selectedGroup}` : selectedChannel}
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {filteredMessages.map((message) => (
          <div key={message.id} className="mb-4">
            <p className="font-bold">{message.sender}</p>
            <p>{message.content}</p>
            <p className="text-xs text-muted-foreground">
              {message.timestamp.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex items-center"
        >
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 mr-2"
          />
          <Button type="submit">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

