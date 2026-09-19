import { useEffect, useRef, useState } from "react";
import { AlertTriangle, ArrowDownToLine, ArrowRight, Check, CheckCircle2, ChevronDown, CircleHelp, Clock3, Crosshair, FileJson, FileText, Info, LocateFixed, Map as MapIcon, Maximize2, Navigation, Paperclip, RotateCcw, Satellite, ScanSearch, Send, ThumbsDown, ThumbsUp, UploadCloud, X, ZoomIn } from "lucide-react";
import { toast } from "sonner";

type Stage = "ready" | "processing" | "results";
type Anomaly = { id: number; label: string; type: "confident" | "unclear"; confidence: number; lat: string; lon: string; size: string; x: string; y: string; w: string; h: string };

const anomalies: Anomaly[] = [
  { id: 1, label: "Plane fragment", type: "confident", confidence: 98, lat: "04° 12' 32.8\" S", lon: "131° 38' 14.0\" E", size: "2.4 × 1.8 m", x: "24%", y: "33%", w: "13%", h: "17%" },
  { id: 2, label: "Natural debris", type: "confident", confidence: 87, lat: "04° 12' 41.1\" S", lon: "131° 38' 07.6\" E", size: "1.1 × 0.8 m", x: "62%", y: "53%", w: "10%", h: "14%" },
  { id: 3, label: "Unclear anomaly", type: "unclear", confidence: 61, lat: "04° 12' 28.4\" S", lon: "131° 38' 32.9\" E", size: "3.2 × 2.0 m", x: "71%", y: "23%", w: "15%", h: "19%" },
  { id: 4, label: "Unknown object", type: "unclear", confidence: 44, lat: "04° 12' 47.8\" S", lon: "131° 37' 58.2\" E", size: "0.9 × 0.7 m", x: "38%", y: "72%", w: "9%", h: "12%" },
];

function MapCanvas({ onVerify }: { onVerify: (anomaly: Anomaly) => void }) {
  return <div className="map-canvas">
    <div className="map-water-lines" /><div className="map-land land-one" /><div className="map-land land-two" /><div className="map-route route-one" /><div className="map-route route-two" />
    <div className="map-toolbar"><button className="map-tool active" aria-label="Satellite map"><Satellite size={15} /></button><button className="map-tool" aria-label="Zoom map"><ZoomIn size={15} /></button><button className="map-tool" aria-label="Center map"><LocateFixed size={15} /></button></div>
    <div className="map-badge"><span className="map-live-dot" /> LIVE TRACK / 04° 12' S, 131° 38' E</div>
    {anomalies.map((anomaly) => <button key={anomaly.id} className={`map-box ${anomaly.type}`} style={{ left: anomaly.x, top: anomaly.y, width: anomaly.w, height: anomaly.h }} onClick={() => onVerify(anomaly)} aria-label={`Verify ${anomaly.label}`}><span className="map-box-number">0{anomaly.id}</span><span className="map-box-label">{anomaly.label}</span><span className="map-box-pointer" /></button>)}
    <div className="map-scale"><span>0</span><i /><span>250 m</span></div>
    <div className="map-compass"><Navigation size={17} /><span>N</span></div>
  </div>;
}

function VerificationModal({ anomaly, onClose }: { anomaly: Anomaly; onClose: () => void }) {
  const [feedback, setFeedback] = useState<"yes" | "no" | null>(null);
  const submit = () => { if (!feedback) return; toast.success("Verification recorded", { description: "Thanks — this signal will help calibrate the next model pass." }); onClose(); };
  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Human verification">
    <div className="verify-modal"><button className="modal-close" onClick={onClose} aria-label="Close verification"><X size={18} /></button><div className="verify-modal-grid"><div className="verify-image"><div className="verify-image-grid" /><div className="verify-focus"><span>0{anomaly.id}</span></div><div className="verify-image-caption"><span><Maximize2 size={13} /> zoom 4.0×</span><span>frame 3281 / crop A</span></div></div><div className="verify-content"><div className="eyebrow"><span className="eyebrow-line" /> human verification</div><h2>Does this look<br /><em>accurate?</em></h2><p className="verify-sub">Your eye helps NEMO learn the difference between a real finding and a false positive.</p><div className="verify-detection"><div className={`mini-status ${anomaly.type}`} /> <div><strong>{anomaly.label}</strong><span>{anomaly.confidence}% confidence · {anomaly.size}</span></div><ChevronDown size={15} /></div><div className="reference-strip"><span className="reference-title">reference signatures</span><div className="reference-thumbs"><div className="ref-thumb ref-one" /><div className="ref-thumb ref-two" /><div className="ref-thumb ref-three" /><span>+ 12</span></div></div><div className="feedback-buttons"><button className={feedback === "yes" ? "selected yes" : ""} onClick={() => setFeedback("yes")}><ThumbsUp size={18} /><span>Yes, accurate</span></button><button className={feedback === "no" ? "selected no" : ""} onClick={() => setFeedback("no")}><ThumbsDown size={18} /><span>Needs review</span></button></div><button className="button button-primary submit-feedback" onClick={submit} disabled={!feedback}>Submit verification <Send size={15} /></button></div></div>
    </div>
  </div>;
}

function UploadState({ onUpload }: { onUpload: (file?: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  return <div className={`upload-state ${dragging ? "dragging" : ""}`} onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(e) => { e.preventDefault(); setDragging(false); onUpload(e.dataTransfer.files[0]); }} onClick={() => inputRef.current?.click()} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") inputRef.current?.click(); }}>
    <input ref={inputRef} type="file" accept=".csv,.json,.log,.zip" hidden onChange={(e) => onUpload(e.target.files?.[0])} />
    <div className="upload-orbit"><UploadCloud size={29} strokeWidth={1.55} /></div><h2>Upload sonar log & metadata</h2><p>Drop a sonar archive here, or <span>browse your files</span></p><div className="upload-formats"><span>.CSV</span><span>.JSON</span><span>.LOG</span><span>.ZIP</span><span className="upload-size">up to 250 MB</span></div>
  </div>;
}

function ProcessingState({ fileName, progress }: { fileName: string; progress: number }) {
  return <div className="processing-state"><div className="processing-top"><div className="file-chip"><FileText size={17} /><div><strong>{fileName}</strong><span>ready for analysis</span></div></div><span className="uploaded-badge"><Check size={13} /> uploaded!</span></div><div className="processing-visual"><div className="processing-ring"><span>{progress}%</span></div><div><div className="eyebrow teal-eyebrow"><span className="eyebrow-line" /> field analysis in progress</div><h2>Reading the<br /><em>signal.</em></h2><p>Sending to backend… processing acoustic data &amp; analyzing anomalies.</p></div></div><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><div className="processing-meta"><span><Clock3 size={14} /> Estimated time remaining: {progress < 80 ? "00:18" : "00:04"}</span><span>{progress < 50 ? "CLAHE enhancement" : progress < 90 ? "RCDI–YOLO inference" : "Geotagging anomalies"}</span></div></div>;
}

function ResultsState({ onVerify }: { onVerify: (a: Anomaly) => void }) {
  const download = (format: "json" | "csv") => { const payload = format === "json" ? JSON.stringify(anomalies, null, 2) : `id,label,confidence,latitude,longitude,size\n${anomalies.map(a => `${a.id},${a.label},${a.confidence},${a.lat},${a.lon},${a.size}`).join("\n")}`; const blob = new Blob([payload], { type: format === "json" ? "application/json" : "text/csv" }); const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = `nemo-anomalies.${format}`; anchor.click(); URL.revokeObjectURL(url); toast.success(`Downloaded ${format.toUpperCase()}`, { description: "Anomalies detected export is ready." }); };
  return <div className="results-state"><div className="results-toolbar"><div><div className="eyebrow teal-eyebrow"><span className="eyebrow-line" /> analysis complete</div><h2>Seafloor survey / <em>anomaly map</em></h2></div><div className="toolbar-actions"><span className="survey-time"><Clock3 size={14} /> processed 00:01:42</span><button className="button button-ghost"><RotateCcw size={14} /> reset</button></div></div><div className="results-layout"><div className="map-wrap"><MapCanvas onVerify={onVerify} /></div><aside className="anomaly-panel"><div className="panel-heading"><div><span className="section-kicker">field report</span><h3>Anomalies detected <span>04</span></h3></div><button className="icon-button" aria-label="Panel information"><Info size={16} /></button></div><div className="confidence-legend"><div className="legend-labels"><span><i className="legend-dot green" /> clear signal</span><span><i className="legend-dot red" /> needs review</span></div><div className="confidence-spectrum" /></div><div className="anomaly-list">{anomalies.map((a) => <button className="anomaly-row" key={a.id} onClick={() => onVerify(a)}><span className={`anomaly-index ${a.type}`}>0{a.id}</span><span className="anomaly-main"><strong>{a.label}</strong><span>{a.lat} · {a.lon}</span></span><span className="anomaly-score">{a.confidence}%</span><ArrowRight size={14} className="anomaly-arrow" /></button>)}</div><div className="panel-foot"><label htmlFor="scene-context">scene context</label><textarea id="scene-context" defaultValue="Low swell. Mixed sediment bed with scattered anthropogenic signatures along the eastern pass." /><div className="export-actions"><button onClick={() => download("json")}><FileJson size={15} /> JSON</button><button onClick={() => download("csv")}><FileText size={15} /> CSV</button></div><button className="verify-cta" onClick={() => onVerify(anomalies[2])}><CircleHelp size={15} /> Help us verify <span>→</span></button></div></aside></div><div className="results-footer"><span><Paperclip size={13} /> survey_0412_log.zip</span><span><Crosshair size={13} /> 4 objects mapped</span><span><Clock3 size={13} /> last updated just now</span></div></div>;
}

export default function Work() {
  const [stage, setStage] = useState<Stage>("ready");
  const [fileName, setFileName] = useState("sonar_survey_0412.zip");
  const [progress, setProgress] = useState(0);
  const [verify, setVerify] = useState<Anomaly | null>(null);
  useEffect(() => { if (stage !== "processing") return; setProgress(8); const interval = window.setInterval(() => setProgress((value) => { if (value >= 96) { window.clearInterval(interval); return 100; } return value + 11; }), 260); const done = window.setTimeout(() => setStage("results"), 2700); return () => { window.clearInterval(interval); window.clearTimeout(done); }; }, [stage]);
  const upload = (file?: File) => { setFileName(file?.name || "sonar_survey_0412.zip"); setProgress(0); setStage("processing"); };
  return <div className="work-page"><section className="work-header"><div className="container work-header-inner"><div><div className="eyebrow"><span className="eyebrow-line" /> mission control / 03</div><h1>Field <em>dashboard.</em></h1></div><div className="work-header-right"><span className="work-status"><span className="status-dot" /> secure local session</span><span>survey workspace / 04</span></div></div></section><section className="dashboard-section"><div className="container">{stage === "ready" && <UploadState onUpload={upload} />}{stage === "processing" && <ProcessingState fileName={fileName} progress={progress} />}{stage === "results" && <ResultsState onVerify={setVerify} />}</div></section>{stage === "ready" && <section className="upload-details"><div className="container upload-details-grid"><div><span className="section-kicker">what happens next</span><h3>One file. Three<br />layers of <em>clarity.</em></h3></div><div className="detail-point"><span>01</span><strong>Enhance</strong><p>Acoustic contrast comes forward.</p></div><div className="detail-point"><span>02</span><strong>Detect</strong><p>Objects are classified by confidence.</p></div><div className="detail-point"><span>03</span><strong>Locate</strong><p>Coordinates return to the map.</p></div></div></section>}{verify && <VerificationModal anomaly={verify} onClose={() => setVerify(null)} />}</div>;
}
