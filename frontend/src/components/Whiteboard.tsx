import React, { useState, useRef, useEffect } from 'react'
import { Pencil, ImageIcon, Type, Eraser, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Rnd } from 'react-rnd'

type Tool = 'draw' | 'image' | 'text' | 'erase'

interface Image {
  id: string
  src: string
  x: number
  y: number
  width: number
  height: number
}

export function Whiteboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [tool, setTool] = useState<Tool>('draw')
  const [color, setColor] = useState('#000000')
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 })
  const [images, setImages] = useState<Image[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      if (context) {
        context.lineCap = 'round'
        context.lineJoin = 'round'
        context.lineWidth = 2
      }
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const resizeCanvas = () => {
        const parent = canvas.parentElement
        if (parent) {
          canvas.width = parent.clientWidth
          canvas.height = parent.clientHeight
        }
      }
      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)
      return () => window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setLastPosition({ x, y })
      setIsDrawing(true)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (canvas && context) {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      context.strokeStyle = color
      context.beginPath()
      context.moveTo(lastPosition.x, lastPosition.y)
      context.lineTo(x, y)
      context.stroke()

      setLastPosition({ x, y })
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          const canvas = canvasRef.current
          if (canvas) {
            const scale = Math.min(canvas.width / img.width, canvas.height / img.height, 1)
            const newImage: Image = {
              id: Date.now().toString(),
              src: event.target?.result as string,
              x: 0,
              y: 0,
              width: img.width * scale,
              height: img.height * scale
            }
            setImages(prevImages => [...prevImages, newImage])
          }
        }
        img.src = event.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  const addText = () => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (canvas && context) {
      const text = prompt('Enter text:')
      if (text) {
        context.font = '16px Arial'
        context.fillStyle = color
        context.fillText(text, 50, 50)
      }
    }
  }

  const erase = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (canvas && context) {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      context.clearRect(x - 10, y - 10, 20, 20)
    }
  }

  const clearWhiteboard = () => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height)
    }
    setImages([])
  }

  return (
    <div className="flex flex-col items-center w-full h-full px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="mb-4 flex flex-wrap justify-center gap-2 w-full">
        <Button onClick={() => setTool('draw')} variant={tool === 'draw' ? 'default' : 'outline'}>
          <Pencil className="h-4 w-4 mr-2" />
          Draw
        </Button>
        <Button onClick={() => setTool('image')} variant={tool === 'image' ? 'default' : 'outline'}>
          <ImageIcon className="h-4 w-4 mr-2" />
          Add Image
        </Button>
        <Button onClick={() => setTool('text')} variant={tool === 'text' ? 'default' : 'outline'}>
          <Type className="h-4 w-4 mr-2" />
          Add Text
        </Button>
        <Button onClick={() => setTool('erase')} variant={tool === 'erase' ? 'default' : 'outline'}>
          <Eraser className="h-4 w-4 mr-2" />
          Erase
        </Button>
        <Button onClick={clearWhiteboard} variant="outline">
          <Trash2 className="h-4 w-4 mr-2" />
          Clear
        </Button>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-10 w-10 border border-gray-300 rounded"
        />
      </div>
      <div className="relative w-full max-w-5xl h-[calc(100vh-200px)] overflow-hidden">
        <canvas
          ref={canvasRef}
          className="border border-gray-300 w-full h-full"
          onMouseDown={tool === 'draw' ? startDrawing : tool === 'erase' ? erase : undefined}
          onMouseMove={tool === 'draw' ? draw : tool === 'erase' ? erase : undefined}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
        />
        {images.map((image) => (
          <Rnd
            key={image.id}
            default={{
              x: image.x,
              y: image.y,
              width: image.width,
              height: image.height,
            }}
            minWidth={50}
            minHeight={50}
            bounds="parent"
            onDragStop={(e, d) => {
              setImages(prevImages =>
                prevImages.map(img =>
                  img.id === image.id ? { ...img, x: d.x, y: d.y } : img
                )
              )
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              setImages(prevImages =>
                prevImages.map(img =>
                  img.id === image.id
                    ? {
                        ...img,
                        width: parseInt(ref.style.width),
                        height: parseInt(ref.style.height),
                        ...position,
                      }
                    : img
                )
              )
            }}
          >
            <img src={image.src} alt="Uploaded" style={{ width: '100%', height: '100%', pointerEvents: 'none' }} />
          </Rnd>
        ))}
      </div>
      {tool === 'image' && (
        <input
          type="file"
          accept="image/*"
          onChange={addImage}
          className="mt-4"
        />
      )}
      {tool === 'text' && (
        <Button onClick={addText} className="mt-4">
          Add Text
        </Button>
      )}
    </div>
  )
}

