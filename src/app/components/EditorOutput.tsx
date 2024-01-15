'use client'

import dynamic from 'next/dynamic'

const Output = dynamic(
  async () => (await import('editorjs-react-renderer')).default,
  { ssr: false }
)

interface EditorOutputProps {
  content: any
}

const style = {
  paragraph: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
}


function CustomCodeRenderer({ data }: any) {
    (data)
  
    return (
      <pre className='bg-gray-800 rounded-md p-4'>
        <code className='text-gray-100 text-sm'>{data.code}</code>
      </pre>
    )
  }
  

const EditorOutput = ({ content }: EditorOutputProps) => {
  return (
    <Output
    // Remove the style prop
      style={style}
      className='text-sm'
      renderers={CustomCodeRenderer}
      data={content}
    />
  )
}

export default EditorOutput