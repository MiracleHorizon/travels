import {
  ThemeProvider as GravityThemeProvider,
  ToasterProvider,
  ToasterComponent,
  Toaster
} from '@gravity-ui/uikit'
import { useMarkdownEditor, MarkdownEditorView } from '@gravity-ui/markdown-editor'
import { useEffect } from 'react'

import '@gravity-ui/uikit/styles/fonts.css'
import '@gravity-ui/uikit/styles/styles.css'

interface MarkdownEditorProps {
  onSubmit: (value: string) => void
}

const toaster = new Toaster()

const MarkdownEditor = ({ onSubmit }: MarkdownEditorProps) => {
  const editor = useMarkdownEditor({})

  useEffect(() => {
    function submitHandler() {
      // Serialize current content to markdown markup
      const value = editor.getValue()
      onSubmit(value)
    }

    editor.on('submit', submitHandler)

    return () => {
      editor.off('submit', submitHandler)
    }
  }, [onSubmit, editor])

  return (
    <GravityThemeProvider>
      <ToasterProvider toaster={toaster}>
        <MarkdownEditorView stickyToolbar autofocus editor={editor} />
        <ToasterComponent />
      </ToasterProvider>
    </GravityThemeProvider>
  )
}

export default MarkdownEditor
