"use client";
import { useState } from "react";
import axios from "axios";
import { useSchool } from "@/context/SchoolContext";


export default function AdmissionForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { schoolInfo} = useSchool();

  // 1. Unified state keys to perfectly match the JSX input 'name' attributes
  const [formData, setFormData] = useState({
    fullName: "",
    fathersName: "",
    mothersName: "",
    email: "",
    phone: "",
    Branch_Id: schoolInfo?.Branch_Id, // Enabled and matched here
    classGrade: "",
    dob: "",
    gender: "",
    admissionDate: "",
    city: "",
    state: "",
    additionalInfo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 1));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step < 3) {
      nextStep();
      return;
    }

    setLoading(true);
    setError(null);

    // 2. Map the camelCase state back to the Pascal/Snake case format your API expects
    const apiPayload = {
      Name: formData.fullName,
      Father_Name: formData.fathersName,
      Mother_Name: formData.mothersName,
      Email: formData.email,
      Phone: formData.phone,
      Branch_Id: formData.Branch_Id,
      Class: formData.classGrade,
      DOB: formData.dob,
      Gender: formData.gender,
      Admission_Date: formData.admissionDate,
      City: formData.city,
      State: formData.state,
      More_Info: formData.additionalInfo,
    };

    try {
      const response = await axios.post("/api/client/admission", apiPayload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === "success") {
        setSuccess(true);
      } else {
        setError(response.data.message || "Failed to submit admission details.");
      }
    } catch (err) {
      console.error("API Error:", err);
      setError(
        err.response?.data?.message ||
        "Network error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .af-root { min-height: 100vh; background: #f6f8fc; font-family: 'Source Sans 3', sans-serif; padding: 60px 24px; position: relative; }
        .af-root::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 35% at 50% 0%, rgba(196,160,72,0.055) 0%, transparent 65%); pointer-events: none; }
        
        .af-container { max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid rgba(196,160,72,0.15); border-radius: 4px; box-shadow: 0 4px 20px rgba(16,33,58,0.03); position: relative; z-index: 1; overflow: hidden; }
        .af-header { background: linear-gradient(160deg, #f3f7fc 0%, #f6f8fc 100%); padding: 32px; border-bottom: 1px solid rgba(196,160,72,0.12); position: relative; }
        .af-header::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, transparent, #c4a048, #e0c060, #c4a048, transparent); }
        
        .af-title { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 800; color: #10213a; margin: 0 0 8px; }
        .af-subtitle { font-size: 13px; color: #3a5a7a; margin: 0; }
        
        .af-steps { display: flex; justify-content: space-between; padding: 20px 32px; background: #fcfdfe; border-bottom: 1px solid rgba(196,160,72,0.06); }
        .af-step { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; color: #3a5a7a; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.5; }
        .af-step.active { opacity: 1; color: #c4a048; }
        .af-step-num { width: 22px; height: 22px; border-radius: 50%; background: rgba(58,90,122,0.1); display: flex; align-items: center; justify-content: center; font-size: 11px; }
        .af-step.active .af-step-num { background: #c4a048; color: #fff; }

        .af-body { padding: 32px; }
        .af-group-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 500px) { .af-group-row { grid-template-columns: 1fr; gap: 0; } }
        
        .af-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px; }
        .af-label { font-size: 12px; font-weight: 700; color: #10213a; text-transform: uppercase; letter-spacing: 0.05em; }
        .af-input, .af-select, .af-textarea { background: #fff; border: 1px solid rgba(196,160,72,0.2); border-radius: 2px; padding: 10px 14px; font-family: inherit; font-size: 14px; color: #1d3557; outline: none; transition: border-color 0.2s; width: 100%; box-sizing: border-box; }
        .af-input:focus, .af-select:focus, .af-textarea:focus { border-color: #c4a048; box-shadow: 0 0 0 3px rgba(196,160,72,0.08); }
        .af-textarea { resize: vertical; min-height: 90px; }
        
        .af-radio-group { display: flex; gap: 20px; padding: 10px 0; }
        .af-radio-label { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #1d3557; cursor: pointer; }
        .af-radio-label input { accent-color: #c4a048; width: 16px; height: 16px; }

        .af-error-message { background: #fee2e2; color: #b91c1c; padding: 12px; border-radius: 4px; font-size: 13px; margin-bottom: 20px; border: 1px solid #f87171; }

        .af-footer { display: flex; justify-content: space-between; margin-top: 12px; }
        .af-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 12px 24px; border: none; border-radius: 2px; cursor: pointer; font-family: inherit; transition: background 0.2s; }
        .af-btn-prev { background: transparent; border: 1px solid rgba(196,160,72,0.3); color: #3a5a7a; }
        .af-btn-prev:hover { background: rgba(196,160,72,0.05); }
        .af-btn-next { background: #c4a048; color: #f6f8fc; margin-left: auto; }
        .af-btn-next:hover { background: #e0c060; }
        .af-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .af-success-state { text-align: center; padding: 48px 24px; display: flex; flex-direction: column; align-items: center; gap: 16px; }
        .af-success-icon { width: 56px; height: 56px; background: rgba(196,160,72,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #c4a048; }
      `}</style>

      <div className="af-root">
        <div className="af-container">
          <div className="af-header">
            <h1 className="af-title">Student Admission Form</h1>
            <p className="af-subtitle">Please enter accurate details to register your student profile.</p>
          </div>

          {!success ? (
            <form onSubmit={handleSubmit}>
              <div className="af-steps">
                <div className={`af-step ${step === 1 ? "active" : ""}`}>
                  <span className="af-step-num">1</span> Basic Info
                </div>
                <div className={`af-step ${step === 2 ? "active" : ""}`}>
                  <span className="af-step-num">2</span> Academic & Path
                </div>
                <div className={`af-step ${step === 3 ? "active" : ""}`}>
                  <span className="af-step-num">3</span> Address & Meta
                </div>
              </div>

              <div className="af-body">
                {/* ── STEP 1: Personal Details ── */}
                {step === 1 && (
                  <div>
                    <div className="af-field">
                      <label className="af-label">Full Name *</label>
                      <input type="text" name="fullName" required className="af-input" placeholder="Enter student's full name" value={formData.fullName} onChange={handleChange} />
                    </div>
                    <div className="af-field">
                      <label className="af-label">Father's Name *</label>
                      <input type="text" name="fathersName" required className="af-input" placeholder="Enter father's name" value={formData.fathersName} onChange={handleChange} />
                    </div>
                    <div className="af-field">
                      <label className="af-label">Mother's Name *</label>
                      <input type="text" name="mothersName" required className="af-input" placeholder="Enter mother's name" value={formData.mothersName} onChange={handleChange} />
                    </div>
                    <div className="af-group-row">
                      <div className="af-field">
                        <label className="af-label">Email Address *</label>
                        <input type="email" name="email" required className="af-input" placeholder="name@example.com" value={formData.email} onChange={handleChange} />
                      </div>
                      <div className="af-field">
                        <label className="af-label">Phone Number *</label>
                        <input type="tel" name="phone" required className="af-input" placeholder="10-digit mobile number" value={formData.phone} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 2: Academic & Gender ── */}
                {step === 2 && (
                  <div>
                    <div className="af-group-row">
                      {/* <div className="af-field">
                        <label className="af-label">Branch *</label>
                        
                        <input type="text" name="Branch_Id" required className="af-input" placeholder="e.g. Main Campus, Science" value={formData.Branch_Id} onChange={handleChange} />
                      </div> */}
                      <div className="af-field">
                        <label className="af-label">Class / Grade *</label>
                        <input type="text" name="classGrade" required className="af-input" placeholder="e.g. Grade 10, Freshman" value={formData.classGrade} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="af-group-row">
                      <div className="af-field">
                        <label className="af-label">Date of Birth *</label>
                        <input type="date" name="dob" required className="af-input" value={formData.dob} onChange={handleChange} />
                      </div>
                      <div className="af-field">
                        <label className="af-label">Admission Date *</label>
                        <input type="date" name="admissionDate" required className="af-input" value={formData.admissionDate} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="af-field">
                      <label className="af-label">Gender *</label>
                      <div className="af-radio-group">
                        <label className="af-radio-label">
                          <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} required onChange={handleChange} />
                          Male
                        </label>
                        <label className="af-radio-label">
                          <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} />
                          Female
                        </label>
                        <label className="af-radio-label">
                          <input type="radio" name="gender" value="Other" checked={formData.gender === "Other"} onChange={handleChange} />
                          Other
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 3: Location & Additional Meta ── */}
                {step === 3 && (
                  <div>
                    <div className="af-group-row">
                      <div className="af-field">
                        <label className="af-label">City *</label>
                        <input type="text" name="city" required className="af-input" placeholder="e.g. Mumbai" value={formData.city} onChange={handleChange} />
                      </div>
                      <div className="af-field">
                        <label className="af-label">State *</label>
                        <input type="text" name="state" required className="af-input" placeholder="e.g. Maharashtra" value={formData.state} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="af-field">
                      <label className="af-label">Additional Information (Optional)</label>
                      <textarea name="additionalInfo" className="af-textarea" placeholder="Provide extra background or medical information if needed..." value={formData.additionalInfo} onChange={handleChange} />
                    </div>
                  </div>
                )}

                {/* ── Error Display ── */}
                {error && (
                  <div className="af-error-message">
                    {error}
                  </div>
                )}

                {/* ── Footer Navigation Controls ── */}
                <div className="af-footer">
                  {step > 1 && (
                    <button type="button" className="af-btn af-btn-prev" onClick={prevStep}>
                      Back
                    </button>
                  )}
                  <button type="submit" className="af-btn af-btn-next" disabled={loading}>
                    {loading ? "Submitting..." : step === 3 ? "Submit Admission" : "Next"}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* ── Final Submission Success Layout ── */
            <div className="af-success-state">
              <div className="af-success-icon">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="af-title">Admission Form Submitted</h2>
              <p className="af-subtitle" style={{ maxWidth: "420px", lineHeight: "1.6" }}>
                Success! The profile for student <strong>{formData.fullName}</strong> has been successfully configured into the system pipeline.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}