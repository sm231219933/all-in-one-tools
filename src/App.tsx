import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calculator, Check, Code2, FileText, Image, Menu, Moon, Search, ShieldCheck, Sparkles, Sun, Type, X, Zap } from 'lucide-react'

type Tool = { name: string; description: string; path: string; icon: typeof Calculator; category: string }

const tools: Tool[] = [
  { name: 'Basic Calculator', description: 'Fast everyday arithmetic calculator.', path: '/calculators/basic-calculator', icon: Calculator, category: 'Calculators' },
  { name: 'Percentage Calculator', description: 'Calculate percentages, increases and decreases.', path: '/calculators/percentage-calculator', icon: Calculator, category: 'Calculators' },
  { name: 'Age Calculator', description: 'Find exact age from date of birth.', path: '/calculators/age-calculator', icon: Calculator, category: 'Calculators' },
  { name: 'EMI Calculator', description: 'Estimate monthly loan payments instantly.', path: '/calculators/emi-calculator', icon: Calculator, category: 'Calculators' },
  { name: 'Unit Converter', description: 'Convert length, weight, temperature and more.', path: '/converters/unit-converter', icon: Zap, category: 'Converters' },
  { name: 'Word Counter', description: 'Count words, characters and reading time.', path: '/text/word-counter', icon: Type, category: 'Text Tools' },
  { name: 'Case Converter', description: 'Transform text to upper, lower or title case.', path: '/text/case-converter', icon: Type, category: 'Text Tools' },
  { name: 'JSON Formatter', description: 'Format, validate and beautify JSON.', path: '/developer/json-formatter', icon: Code2, category: 'Developer' },
  { name: 'Password Generator', description: 'Create strong random passwords locally.', path: '/generators/password-generator', icon: ShieldCheck, category: 'Generators' },
  { name: 'Image Compressor', description: 'Reduce image size directly in your browser.', path: '/image/image-compressor', icon: Image, category: 'Image Tools' },
  { name: 'JPG to PDF', description: 'Turn images into a PDF quickly.', path: '/pdf/jpg-to-pdf', icon: FileText, category: 'PDF Tools' },
  { name: 'Text Cleaner', description: 'Clean spaces, lines and unwanted formatting.', path: '/text/text-cleaner', icon: Type, category: 'Text Tools' },
]

const categories = [
  ['Calculators', 'Everyday, finance and math calculators', Calculator],
  ['Converters', 'Units, numbers, dates and data', Zap],
  ['Text Tools', 'Writing, grammar and text utilities', Type],
  ['PDF Tools', 'Convert, merge and optimize documents', FileText],
  ['Image Tools', 'Resize, compress and convert images', Image],
  ['Developer Tools', 'JSON, encoding and coding utilities', Code2],
]

function App() {
  const [query, setQuery] = useState('')
  const [dark, setDark] = useState(false)
  const [menu, setMenu] = useState(false)
  const results = useMemo(() => query.trim() ? tools.filter(t => `${t.name} ${t.description} ${t.category}`.toLowerCase().includes(query.toLowerCase())) : [], [query])

  return (
    <div className={dark ? 'app dark' : 'app'}>
      <header className="header">
        <div className="container nav">
          <Link to="/" className="brand" onClick={() => setMenu(false)}><span className="brand-mark"><Sparkles size={18}/></span><span>Tool<span>Box</span></span></Link>
          <nav className={menu ? 'nav-links open' : 'nav-links'}>
            <Link to="/calculators" onClick={() => setMenu(false)}>Calculators</Link>
            <Link to="/converters" onClick={() => setMenu(false)}>Converters</Link>
            <Link to="/text" onClick={() => setMenu(false)}>Text Tools</Link>
            <Link to="/pdf" onClick={() => setMenu(false)}>PDF Tools</Link>
            <Link to="/developer" onClick={() => setMenu(false)}>Developer</Link>
          </nav>
          <div className="nav-actions">
            <button className="icon-btn" aria-label="Toggle theme" onClick={() => setDark(v => !v)}>{dark ? <Sun size={19}/> : <Moon size={19}/>}</button>
            <button className="menu-btn" aria-label="Menu" onClick={() => setMenu(v => !v)}>{menu ? <X/> : <Menu/>}</button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-glow glow-one"/><div className="hero-glow glow-two"/>
          <div className="container hero-inner">
            <div className="eyebrow"><span><Zap size={14}/> Free forever</span> <span><ShieldCheck size={14}/> Privacy-first</span></div>
            <h1>One place for <em>every tool</em> you need.</h1>
            <p className="hero-copy">Calculators, converters, text tools, PDF utilities, image tools and developer helpers — fast, simple and free.</p>
            <div className="search-wrap">
              <Search size={21}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search 100+ free tools..." aria-label="Search tools"/>
              {query && <button onClick={() => setQuery('')}><X size={17}/></button>}
              {results.length > 0 && <div className="search-results">{results.slice(0, 7).map(tool => <Link to={tool.path} key={tool.path} onClick={() => setQuery('')}><tool.icon size={18}/><span><strong>{tool.name}</strong><small>{tool.category}</small></span><ArrowRight size={16}/></Link>)}</div>}
              {query && results.length === 0 && <div className="search-results empty">No tool found yet — more are coming.</div>}
            </div>
            <div className="quick-links"><span>Popular:</span>{tools.slice(0,5).map(t => <Link to={t.path} key={t.path}>{t.name}</Link>)}</div>
          </div>
        </section>

        <section className="section container">
          <div className="section-head"><div><p className="kicker">EXPLORE</p><h2>Tools for every task</h2></div><Link className="view-all" to="/tools">View all tools <ArrowRight size={17}/></Link></div>
          <div className="category-grid">{categories.map(([name, desc, Icon]) => <Link className="category-card" to={`/${String(name).toLowerCase().replaceAll(' ', '-')}`} key={String(name)}><span className="category-icon"><Icon size={22}/></span><span><h3>{String(name)}</h3><p>{String(desc)}</p></span><ArrowRight className="card-arrow" size={18}/></Link>)}</div>
        </section>

        <section className="section container popular">
          <div className="section-head"><div><p className="kicker">POPULAR TOOLS</p><h2>Start with something useful</h2></div></div>
          <div className="tool-grid">{tools.slice(0, 8).map(tool => { const Icon = tool.icon; return <Link className="tool-card" to={tool.path} key={tool.path}><span className="tool-icon"><Icon size={20}/></span><div><h3>{tool.name}</h3><p>{tool.description}</p></div><ArrowRight className="card-arrow" size={17}/></Link> })}</div>
        </section>

        <section className="trust-section"><div className="container trust-grid"><div><span className="trust-icon"><Zap size={21}/></span><div><h3>Fast by design</h3><p>Lightweight tools built for instant results.</p></div></div><div><span className="trust-icon"><ShieldCheck size={21}/></span><div><h3>Privacy first</h3><p>We aim to process files in your browser whenever possible.</p></div></div><div><span className="trust-icon"><Check size={21}/></span><div><h3>Always improving</h3><p>New tools and useful upgrades added regularly.</p></div></div></div></section>
      </main>

      <footer className="footer"><div className="container footer-main"><div className="footer-brand"><Link to="/" className="brand"><span className="brand-mark"><Sparkles size={18}/></span><span>Tool<span>Box</span></span></Link><p>Simple, powerful online utilities for everyday work.</p></div><div className="footer-col"><h4>Tools</h4><Link to="/calculators">Calculators</Link><Link to="/converters">Converters</Link><Link to="/text">Text Tools</Link><Link to="/pdf">PDF Tools</Link></div><div className="footer-col"><h4>More</h4><Link to="/developer">Developer</Link><Link to="/image">Image Tools</Link><Link to="/generators">Generators</Link><Link to="/tools">All Tools</Link></div><div className="footer-col"><h4>About</h4><Link to="/about">About</Link><Link to="/privacy">Privacy</Link><Link to="/contact">Contact</Link></div></div><div className="container footer-bottom"><span>© 2026 ToolBox. Free online tools.</span><span>Built for speed • Built for everyone</span></div></footer>
    </div>
  )
}

export default App
