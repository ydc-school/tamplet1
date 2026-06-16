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
      Branch_Id: schoolInfo?.Branch_Id,
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