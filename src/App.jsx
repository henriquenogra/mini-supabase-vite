import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadNotes() {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('id', { ascending: true })

      if (error) {
        setError(error.message)
      } else {
        setNotes(data)
      }

      setLoading(false)
    }

    loadNotes()
  }, [])

  return (
    <main className="container">
      <section className="card">
        <p className="tag">Supabase + React + Vite</p>
        <h1>Mini projeto funcionando 🚀</h1>
        <p>
          Esta página está lendo dados de uma tabela chamada <strong>notes</strong>.
        </p>

        {loading && <p>Carregando dados...</p>}

        {error && <p className="error">Erro: {error}</p>}

        <ul>
          {notes.map((note) => (
            <li key={note.id}>{note.title}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App