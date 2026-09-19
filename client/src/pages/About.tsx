import { ArrowRight, Check, Cpu, Crosshair, Gauge, Layers, Radio, ScanSearch, Waves } from "lucide-react";
import { Link } from "wouter";

const steps = [
  { no: "01", icon: Radio, title: "Collect", body: "Side-scan sonar and navigation metadata are captured in the field, frame by frame." },
  { no: "02", icon: Layers, title: "Enhance", body: "CLAHE and Gaussian Blur reveal acoustic signatures that raw imagery leaves buried." },
  { no: "03", icon: ScanSearch, title: "Detect", body: "RCDI-YOLO with LANConvNeXtv2 separates objects from complex seabed clutter." },
  { no: "04", icon: Crosshair, title: "Geotag", body: "Every anomaly is returned with a confidence score, size, label, and exact coordinate." },
];

export default function About() {
  return <div className="about-page">
    <section className="about-hero section-pad-top">
      <div className="container about-hero-grid">
        <div><div className="eyebrow"><span className="eyebrow-line" /> project notes / 02</div><h1>A better read<br />of the <em>blue.</em></h1></div>
        <div className="about-intro"><p className="lead-copy">NEMO is an acoustic intelligence layer for marine operations. We turn the difficult, beautiful ambiguity of sonar into a shared, inspectable record.</p><div className="intro-rule" /><p className="small-copy">Our system is designed for the moments when a human eye is the most valuable sensor in the loop — surfacing what deserves attention, never pretending the ocean is simple.</p></div>
      </div>
    </section>

    <section className="pipeline-section section-pad">
      <div className="container">
        <div className="section-heading pipeline-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> how NEMO works</div><h2>Signal in.<br /><em>Context out.</em></h2></div><p>Four deliberate passes turn a raw survey into a map your crew can trust.</p></div>
        <div className="pipeline-grid">{steps.map((step, index) => { const Icon = step.icon; return <div className={`pipeline-step ${index === 1 ? "active" : ""}`} key={step.no}><div className="pipeline-top"><span>{step.no}</span><Icon size={20} /></div><h3>{step.title}</h3><p>{step.body}</p>{index < steps.length - 1 && <ArrowRight className="pipeline-arrow" size={17} />}</div> })}</div>
      </div>
    </section>

    <section className="processing-section section-pad">
      <div className="container processing-grid">
        <div className="processing-copy"><div className="eyebrow"><span className="eyebrow-line" /> seeing the unseen</div><h2>Acoustic data<br /><em>with a pulse.</em></h2><p>We combine signal processing with a modern object-detection architecture to preserve the subtle texture of a seafloor — while making the meaningful deviations impossible to miss.</p><ul className="check-list"><li><span><Check size={13} /></span> Dynamic seabed clutter filtering</li><li><span><Check size={13} /></span> Confidence-aware classification</li><li><span><Check size={13} /></span> Coordinate-level traceability</li></ul><Link className="text-link" href="/work">See the dashboard in action <ArrowRight size={15} /></Link></div>
        <div className="comparison-card"><div className="comparison-head"><span>acoustic transformation</span><span>raw <strong>→</strong> processed</span></div><div className="comparison-images"><div className="sonar-tile raw-tile"><div className="tile-grain" /><span className="tile-label">raw sonar / frame 3281</span><i className="tile-shape shape-one" /><i className="tile-shape shape-two" /></div><div className="comparison-arrow"><ArrowRight size={17} /></div><div className="sonar-tile processed-tile"><div className="tile-grain" /><span className="tile-label">enhanced / frame 3281</span><i className="tile-shape shape-one" /><i className="tile-shape shape-two" /><i className="tile-target" /></div></div><div className="comparison-foot"><span><Gauge size={14} /> contrast gain <strong>+42%</strong></span><span><Cpu size={14} /> inference <strong>124 ms</strong></span></div></div>
      </div>
    </section>

    <section className="about-note"><div className="container about-note-inner"><Waves size={24} /><p>“The goal is not to replace expertise. It is to give expertise a clearer place to begin.”</p><span>— NEMO research principle</span></div></section>
  </div>;
}
