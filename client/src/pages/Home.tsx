import { ArrowRight, ChevronRight, CircleDot, Database, LocateFixed, ScanSearch, ShieldCheck, Waves } from "lucide-react";
import { Link } from "wouter";

const signals = [
  { value: "18.4k", label: "sonar frames screened" },
  { value: "94.8%", label: "mean confidence" },
  { value: "06", label: "anomalies surfaced" },
];

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="eyebrow light"><span className="eyebrow-line" /> acoustic intelligence / 01</div>
            <h1>See what the<br /><em>ocean</em> is hiding.</h1>
            <p className="hero-lede">NEMO turns complex side-scan sonar into actionable marine intelligence — making debris visible, traceable, and easier to remove.</p>
            <div className="hero-actions">
              <Link href="/work" className="button button-primary button-large">Launch dashboard <ArrowRight size={17} /></Link>
              <Link href="/about" className="text-link light-link">Explore the method <ChevronRight size={15} /></Link>
            </div>
            <div className="hero-footnote"><span className="live-pip" /> Live model telemetry <span className="footnote-separator" /> RCDI–YOLO / LANConvNeXtv2</div>
          </div>
          <div className="hero-visual" aria-label="Abstract sonar visualization">
            <div className="visual-label visual-label-top"><CircleDot size={12} /> scan field / 04.2° S · 131.6° E</div>
            <div className="sonar-graphic">
              <div className="sonar-sweep" />
              <span className="sonar-point point-a" /><span className="sonar-point point-b" /><span className="sonar-point point-c" /><span className="sonar-point point-d" />
              <div className="sonar-box box-a"><span>01 / 0.98</span></div>
              <div className="sonar-box box-b"><span>02 / 0.61</span></div>
              <div className="sonar-coord coord-a">04° 12' 32.8&quot; S<br />131° 38' 14.0&quot; E</div>
              <div className="sonar-coord coord-b">ANOMALY FIELD<br />+ 03 objects</div>
              <div className="sonar-crosshair" />
            </div>
            <div className="visual-label visual-label-bottom"><span>01</span> high-confidence detection <span className="label-divider" /> <span className="teal-text">02</span> uncertain signature</div>
          </div>
        </div>
      </section>

      <section className="signal-strip">
        <div className="container signal-inner">
          <div className="signal-intro"><span className="section-kicker">mission control</span><strong>One signal.<br />A clearer ocean.</strong></div>
          {signals.map((signal) => <div className="signal-stat" key={signal.label}><strong>{signal.value}</strong><span>{signal.label}</span></div>)}
          <div className="signal-badge"><ShieldCheck size={16} /><span>Model operating<br /><strong>within tolerance</strong></span></div>
        </div>
      </section>

      <section className="home-method section-pad">
        <div className="container">
          <div className="section-heading split-heading">
            <div><div className="eyebrow"><span className="eyebrow-line" /> the NEMO method</div><h2>From noise<br /><em>to knowledge.</em></h2></div>
            <p>Traditional visual inspection leaves the ocean’s dark zones unexplored. NEMO gives every acoustic frame a second look — and every anomaly a coordinate.</p>
          </div>
          <div className="method-grid">
            <div className="method-card"><span className="method-number">01</span><div className="method-icon"><Database size={22} /></div><h3>Ingest</h3><p>Stream side-scan sonar and navigation metadata into one clean, traceable field log.</p><span className="method-line" /></div>
            <div className="method-card highlighted"><span className="method-number">02</span><div className="method-icon"><ScanSearch size={22} /></div><h3>Interpret</h3><p>Enhance acoustic detail, filter seabed clutter, and classify anomalies with a specialized vision stack.</p><span className="method-line" /></div>
            <div className="method-card"><span className="method-number">03</span><div className="method-icon"><LocateFixed size={22} /></div><h3>Locate</h3><p>Return every finding as a geotagged, confidence-scored record ready for human review.</p><span className="method-line" /></div>
          </div>
          <div className="method-bottom"><span>Built for AUV teams, marine scientists, and the people who protect the blue.</span><Link href="/about" className="text-link">Read the technical brief <ArrowRight size={15} /></Link></div>
        </div>
      </section>

      <section className="home-cta">
        <div className="container cta-inner"><div><div className="eyebrow light"><span className="eyebrow-line" /> ready to go deeper?</div><h2>Turn your next dive<br /><em>into evidence.</em></h2></div><Link href="/work" className="button button-light button-large">Open a sonar log <ArrowRight size={17} /></Link></div>
        <Waves className="cta-watermark" size={220} strokeWidth={0.45} />
      </section>
    </div>
  );
}
