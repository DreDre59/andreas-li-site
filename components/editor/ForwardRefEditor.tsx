'use client'

import dynamic from 'next/dynamic'
import { forwardRef, type ComponentProps } from 'react'
import type { MDXEditorMethods } from '@mdxeditor/editor'

const Editor = dynamic(() => import('./InitializedMDXEditor'), {
  ssr: false,
})

type EditorProps = Omit<ComponentProps<typeof Editor>, 'editorRef'>

export const ForwardRefEditor = forwardRef<MDXEditorMethods, EditorProps>(
  (props, ref) => <Editor {...props} editorRef={ref} />
)

ForwardRefEditor.displayName = 'ForwardRefEditor'
