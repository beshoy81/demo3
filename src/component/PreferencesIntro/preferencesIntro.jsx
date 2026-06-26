// PreferencesIntro.jsx
import React from "react";



export default function PreferencesIntro() {
  return (
    <div className="pref-page-root">
      <div className="pref-card" role="dialog" aria-labelledby="pref-title" aria-describedby="pref-desc">
        <h1 id="pref-title">Let’s set up your preferences!</h1>

        <p id="pref-desc" className="pref-desc">
          Just a few quick questions to help us find roommates that truly match
          your lifestyle. You can skip for now and fill it later if you want. ✨
        </p>

        <div className="buttons">
          <button className="btn btn-primary" type="button">Continue</button>
          <button className="btn btn-ghost" type="button">Skip</button>
        </div>
      </div>

    
    </div>
  );
}
