import { Whiteboard } from '@/components/Whiteboard'

export default function WhiteboardPage() {
  return (
    <>
      <style jsx global>{`
        .react-draggable-dragging {
          transition: none !important;
        }
      `}</style>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Whiteboard</h1>
        <Whiteboard />
      </div>
    </>
  )
}

