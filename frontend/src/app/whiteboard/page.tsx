import { Whiteboard } from '@/components/Whiteboard'

export default function WhiteboardPage() {
  return (
    <>
      <style jsx global>{`
        .react-draggable-dragging {
          transition: none !important;
        }
        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
        }
      `}</style>
      <div className="min-h-screen flex flex-col px-4 sm:px-6 md:px-8 lg:px-12">
        <h1 className="text-3xl font-bold p-4">Whiteboard</h1>
        <div className="flex-grow">
          <Whiteboard />
        </div>
      </div>
    </>
  )
}

