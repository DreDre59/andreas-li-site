'use client'

import type { ForwardedRef } from 'react'
import {
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  type JsxComponentDescriptor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  frontmatterPlugin,
  jsxPlugin,
  GenericJsxEditor,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CodeToggle,
  ListsToggle,
  BlockTypeSelect,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertCodeBlock,
  InsertFrontmatter,
  InsertThematicBreak,
  DiffSourceToggleWrapper,
  diffSourcePlugin,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

const jsxComponentDescriptors: JsxComponentDescriptor[] = [
  {
    name: 'Callout',
    kind: 'flow',
    props: [{ name: 'type', type: 'string' }],
    hasChildren: true,
    Editor: GenericJsxEditor,
  },
  {
    name: 'ProjectImage',
    kind: 'flow',
    props: [
      { name: 'src', type: 'string' },
      { name: 'alt', type: 'string' },
      { name: 'caption', type: 'string' },
    ],
    hasChildren: false,
    Editor: GenericJsxEditor,
  },
  {
    name: 'VideoEmbed',
    kind: 'flow',
    props: [{ name: 'url', type: 'string' }],
    hasChildren: false,
    Editor: GenericJsxEditor,
  },
]

export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin(),
        tablePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'tsx' }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            tsx: 'TypeScript (React)',
            ts: 'TypeScript',
            js: 'JavaScript',
            css: 'CSS',
            python: 'Python',
            c: 'C',
            cpp: 'C++',
            bash: 'Bash',
            yaml: 'YAML',
            json: 'JSON',
            markdown: 'Markdown',
          },
        }),
        frontmatterPlugin(),
        jsxPlugin({ jsxComponentDescriptors }),
        diffSourcePlugin({ viewMode: 'rich-text' }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <DiffSourceToggleWrapper>
                <UndoRedo />
                <BlockTypeSelect />
                <BoldItalicUnderlineToggles />
                <CodeToggle />
                <ListsToggle />
                <CreateLink />
                <InsertImage />
                <InsertTable />
                <InsertCodeBlock />
                <InsertThematicBreak />
                <InsertFrontmatter />
              </DiffSourceToggleWrapper>
            </>
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  )
}
