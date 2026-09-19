import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Activity, Anchor, ArrowUpRight, CircleDot, Github, Radio, Waves } from "lucide-react";
import { Link, Route, Switch, useLocation } from "wouter";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import NotFound from "./pages/NotFound";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
];

function Shell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="site-shell">
      <header className="topbar">
        <Link href="/" className="brand" aria-label="NEMO home">
          <span className="brand-mark"><Waves size={17} strokeWidth={2.4} /></span>
          <span>NEMO</span>
          <span className="brand-slash">/</span>
          <span className="brand-type">field intelligence</span>
        </Link>
        <nav className="main-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`nav-link ${location === item.href ? "active" : ""}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="topbar-meta">
          <span className="status-dot" />
          <span className="topbar-status">system ready</span>
          <Link href="/work" className="nav-launch"><span>Launch dashboard</span><ArrowUpRight size={14} /></Link>
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="footer-brand"><span className="brand-mark small"><Waves size={13} /></span><strong>NEMO</strong><span>nautical eco-monitoring</span></div>
        <div className="footer-meta"><span><Radio size={13} /> acoustic intelligence lab</span><span><Activity size={13} /> model v2.4.1</span><span>© 2026</span></div>
        <a className="footer-github" href="https://github.com" target="_blank" rel="noreferrer"><Github size={14} /> research notes</a>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster position="bottom-right" />
        <Shell>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/work" component={Work} />
            <Route path="/404" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </Shell>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
