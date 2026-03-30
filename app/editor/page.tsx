'use client'

import { useEffect, useRef, useState } from 'react'
import { ForwardRefEditor } from '@/components/editor/ForwardRefEditor'
import type { MDXEditorMethods } from '@mdxeditor/editor'
import { notFound } from 'next/navigation'

interface MDXFile {
  type: 'projects' | 'blog'
  slug: string
}

export default function EditorPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }
  const editorRef = useRef<MDXEditorMethods>(null)
  const [files, setFiles] = useState<MDXFile[]>([])
  const [selected, setSelected] = useState<MDXFile | null>(null)
  const [markdown, setMarkdown] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/mdx')
      .then((r) => r.json())
      .then(setFiles)
  }, [])

  async function loadFile(file: MDXFile) {
    setLoading(true)
    const res = await fetch(`/api/mdx/${file.type}/${file.slug}`)
    const data = await res.json()
    setSelected(file)
    setMarkdown(data.content)
    editorRef.current?.setMarkdown(data.content)
    setLoading(false)
    setSaved(false)
  }

  async function save() {
    if (!selected) return
    const content = editorRef.current?.getMarkdown()
    if (content === undefined) return

    setSaving(true)
    await fetch('/api/mdx', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: selected.type, slug: selected.slug, content }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        save()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  const projects = files.filter((f) => f.type === 'projects')
  const blogs = files.filter((f) => f.type === 'blog')

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight">
          MDX Editor
        </h1>
        {selected && (
          <button
            onClick={save}
            disabled={saving}
            className="font-mono text-xs uppercase tracking-widest px-5 py-2.5 bg-neutral-900 text-white hover:bg-neutral-700 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : saved ? 'Saved' : 'Save'}
          </button>
        )}
      </div>

      <div className="flex gap-8">
        {/* Sidebar file list */}
        <div className="w-56 shrink-0">
          {projects.length > 0 && (
            <div className="mb-6">
              <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-3">
                Projects
              </h2>
              <ul className="space-y-1">
                {projects.map((f) => (
                  <li key={f.slug}>
                    <button
                      onClick={() => loadFile(f)}
                      className={`w-full text-left px-3 py-2 text-sm font-display transition-colors ${
                        selected?.slug === f.slug && selected?.type === f.type
                          ? 'bg-neutral-100 text-neutral-900 font-medium'
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                      }`}
                    >
                      {f.slug}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {blogs.length > 0 && (
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-3">
                Blog
              </h2>
              <ul className="space-y-1">
                {blogs.map((f) => (
                  <li key={f.slug}>
                    <button
                      onClick={() => loadFile(f)}
                      className={`w-full text-left px-3 py-2 text-sm font-display transition-colors ${
                        selected?.slug === f.slug && selected?.type === f.type
                          ? 'bg-neutral-100 text-neutral-900 font-medium'
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                      }`}
                    >
                      {f.slug}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Editor area */}
        <div className="flex-1 min-w-0">
          {selected ? (
            <div className="border border-neutral-200">
              {loading ? (
                <div className="p-10 text-center text-neutral-400 font-mono text-sm">
                  Loading...
                </div>
              ) : (
                <ForwardRefEditor
                  ref={editorRef}
                  markdown={markdown}
                  className="prose max-w-none"
                />
              )}
            </div>
          ) : (
            <div className="p-10 text-center text-neutral-400 font-mono text-sm border border-dashed border-neutral-200">
              Select a file from the sidebar to start editing
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
