"use client";

import "./cube.css";

export default function Cube() {
  return (
    <div className="cube-wrapper">
      <div className="cube">
        <div className="face front">DEV</div>
        <div className="face back">API</div>
        <div className="face right">AI</div>
        <div className="face left">UI</div>
        <div className="face top">CODE</div>
        <div className="face bottom">KMAB</div>
      </div>
    </div>
  );
}
