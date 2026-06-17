"use client";
import React, { useState } from "react";
import axios from "axios";
import { useSchool } from "@/context/SchoolContext";

export default function AdmissionForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { schoolInfo } = useSchool();

  const [formData, setFormData] = useState({
    fullName: "",
    fathersName: "",
    mothersName: "",
    email: "",
    phone: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // अगर अंतिम स्टेप नहीं है, तो अगले स्टेप पर जाएँ
    if (step < 3) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);
    setError(null);

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
      const response = await axios.post("/api/client/admission", apiPayload);
      if (response.data?.status === "success") {
        setSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError(response.data?.message || "Submission failed. Please verify your entries.");
      }
    } catch (err) {
      setError("A network error occurred. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const stepsMeta = [
    { num: 1, label: "Basic Info" },
    { num: 2, label: "Academic & Path" },
    { num: 3, label: "Address & Meta" },
  ];

  return (
    <main className="bg-[#f8fafc] min-h-screen py-20 md:py-28 relative overflow-hidden">
      {/* एम्बिएंट लक्ज़री बैकग्राउंड डेकोरेशन */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c4a048]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#7f1d1d]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[800px] mx-auto px-6 relative z-10">
        
        {/* HERO TITLE HEADER */}
        <header className="text-center space-y-3 mb-12">
          <span className="font-sans font-black text-xs md:text-sm text-[#c4a048] tracking-[0.4em] uppercase block">
            Enrollment Hub
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-black text-[#1e1b4b] tracking-tight">
            Student Admission Form
          </h1>
          <div className="w-16 h-1 bg-[#7f1d1d] rounded-full mx-auto mt-2" />
          <p className="font-sans text-sm md:text-base text-[#0f172a]/60 font-medium pt-2">
            Please enter accurate details to register your student profile.
          </p>
        </header>

        {!success ? (
          <div className="bg-white border border-[#f1f5f9] rounded-[2.5rem] shadow-xl p-6 md:p-12 transition-all duration-500">
            
            {/* PROGRESS VISUAL STEPPER */}
            <nav aria-label="Progress" className="mb-12">
              <ol className="flex items-center justify-between relative w-full">
                {/* स्टेपर बैकग्राउंड लाइन */}
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-100 z-0" />
                <div 
                  className="absolute top-5 left-0 h-0.5 bg-[#c4a048] transition-all duration-500 z-0" 
                  style={{ width: `${((step - 1) / (stepsMeta.length - 1)) * 100}%` }}
                />

                {stepsMeta.map((s, idx) => {
                  const isActive = step === s.num;
                  const isCompleted = step > s.num;
                  return (
                    <li 
                      key={s.num} 
                      aria-current={isActive ? "step" : undefined}
                      className="flex flex-col items-center relative z-10 flex-1 group"
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-sans font-black text-xs uppercase tracking-wider transition-all duration-500 border-2 
                        ${isActive 
                          ? "bg-white border-[#c4a048] text-[#c4a048] shadow-md ring-4 ring-[#c4a048]/10 scale-105" 
                          : isCompleted 
                            ? "bg-[#c4a048] border-[#c4a048] text-white" 
                            : "bg-white border-slate-200 text-slate-400"
                        }`}
                      >
                        {isCompleted ? "✓" : s.num}
                      </div>
                      <span className={`font-sans text-[11px] md:text-xs font-black uppercase tracking-wider mt-3 transition-colors duration-300
                        ${isActive ? "text-[#1e1b4b]" : isCompleted ? "text-[#c4a048]" : "text-slate-400"}`}
                      >
                        {s.label}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </nav>

            {/* CORE FORM ELEMENT */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 font-sans text-sm font-medium flex items-center gap-3 animate-shake">
                  <span>✕</span> {error}
                </div>
              )}

              <fieldset className="border-none p-0 m-0 space-y-6">
                <legend className="sr-only">Step {step} of 3</legend>
                
                {/* STAGE 1: BASIC INFO */}
                {step === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-[fadeIn_0.3s_ease-out]">
                    <div className="flex flex-col space-y-2 md:col-span-2">
                      <label htmlFor="fullName" className="font-sans text-xs font-black uppercase tracking-wider text-[#1e1b4b]">Full Name <span className="text-red-500">*</span></label>
                      <input id="fullName" name="fullName" type="text" required value={formData.fullName} onChange={handleChange} placeholder="John Doe" className="w-full px-5 py-3.5 border border-slate-200 rounded-xl font-sans text-sm focus:outline-none focus:border-[#c4a048] focus:ring-4 focus:ring-[#c4a048]/5 transition-all bg-slate-50/50" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="fathersName" className="font-sans text-xs font-black uppercase tracking-wider text-[#1e1b4b]">Father's Name <span className="text-red-500">*</span></label>
                      <input id="fathersName" name="fathersName" type="text" required value={formData.fathersName} onChange={handleChange} placeholder="Robert Doe" className="w-full px-5 py-3.5 border border-slate-200 rounded-xl font-sans text-sm focus:outline-none focus:border-[#c4a048] focus:ring-4 focus:ring-[#c4a048]/5 transition-all bg-slate-50/50" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="mothersName" className="font-sans text-xs font-black uppercase tracking-wider text-[#1e1b4b]">Mother's Name <span className="text-red-500">*</span></label>
                      <input id="mothersName" name="mothersName" type="text" required value={formData.mothersName} onChange={handleChange} placeholder="Mary Doe" className="w-full px-5 py-3.5 border border-slate-200 rounded-xl font-sans text-sm focus:outline-none focus:border-[#c4a048] focus:ring-4 focus:ring-[#c4a048]/5 transition-all bg-slate-50/50" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="email" className="font-sans text-xs font-black uppercase tracking-wider text-[#1e1b4b]">Email Address <span className="text-red-500">*</span></label>
                      <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="john.doe@example.com" className="w-full px-5 py-3.5 border border-slate-200 rounded-xl font-sans text-sm focus:outline-none focus:border-[#c4a048] focus:ring-4 focus:ring-[#c4a048]/5 transition-all bg-slate-50/50" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="phone" className="font-sans text-xs font-black uppercase tracking-wider text-[#1e1b4b]">Phone Number <span className="text-red-500">*</span></label>
                      <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="9876543210" className="w-full px-5 py-3.5 border border-slate-200 rounded-xl font-sans text-sm focus:outline-none focus:border-[#c4a048] focus:ring-4 focus:ring-[#c4a048]/5 transition-all bg-slate-50/50" />
                    </div>
                  </div>
                )}

                {/* STAGE 2: ACADEMIC & PATH */}
                {step === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-[fadeIn_0.3s_ease-out]">
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="classGrade" className="font-sans text-xs font-black uppercase tracking-wider text-[#1e1b4b]">Class / Grade <span className="text-red-500">*</span></label>
                      <input id="classGrade" name="classGrade" type="text" required value={formData.classGrade} onChange={handleChange} placeholder="e.g. 11th Medical, B.Sc" className="w-full px-5 py-3.5 border border-slate-200 rounded-xl font-sans text-sm focus:outline-none focus:border-[#c4a048] focus:ring-4 focus:ring-[#c4a048]/5 transition-all bg-slate-50/50" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="dob" className="font-sans text-xs font-black uppercase tracking-wider text-[#1e1b4b]">Date of Birth <span className="text-red-500">*</span></label>
                      <input id="dob" name="dob" type="date" required value={formData.dob} onChange={handleChange} className="w-full px-5 py-3.5 border border-slate-200 rounded-xl font-sans text-sm focus:outline-none focus:border-[#c4a048] focus:ring-4 focus:ring-[#c4a048]/5 transition-all bg-slate-50/50" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="gender" className="font-sans text-xs font-black uppercase tracking-wider text-[#1e1b4b]">Gender <span className="text-red-500">*</span></label>
                      <select id="gender" name="gender" required value={formData.gender} onChange={handleChange} className="w-full px-5 py-3.5 border border-slate-200 rounded-xl font-sans text-sm focus:outline-none focus:border-[#c4a048] focus:ring-4 focus:ring-[#c4a048]/5 transition-all bg-slate-50/50 appearance-none">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="admissionDate" className="font-sans text-xs font-black uppercase tracking-wider text-[#1e1b4b]">Proposed Admission Date <span className="text-red-500">*</span></label>
                      <input id="admissionDate" name="admissionDate" type="date" required value={formData.admissionDate} onChange={handleChange} className="w-full px-5 py-3.5 border border-slate-200 rounded-xl font-sans text-sm focus:outline-none focus:border-[#c4a048] focus:ring-4 focus:ring-[#c4a048]/5 transition-all bg-slate-50/50" />
                    </div>
                  </div>
                )}

                {/* STAGE 3: ADDRESS & META */}
                {step === 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-[fadeIn_0.3s_ease-out]">
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="city" className="font-sans text-xs font-black uppercase tracking-wider text-[#1e1b4b]">City <span className="text-red-500">*</span></label>
                      <input id="city" name="city" type="text" required value={formData.city} onChange={handleChange} placeholder="Mahendragarh" className="w-full px-5 py-3.5 border border-slate-200 rounded-xl font-sans text-sm focus:outline-none focus:border-[#c4a048] focus:ring-4 focus:ring-[#c4a048]/5 transition-all bg-slate-50/50" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="state" className="font-sans text-xs font-black uppercase tracking-wider text-[#1e1b4b]">State <span className="text-red-500">*</span></label>
                      <input id="state" name="state" type="text" required value={formData.state} onChange={handleChange} placeholder="Haryana" className="w-full px-5 py-3.5 border border-slate-200 rounded-xl font-sans text-sm focus:outline-none focus:border-[#c4a048] focus:ring-4 focus:ring-[#c4a048]/5 transition-all bg-slate-50/50" />
                    </div>
                    <div className="flex flex-col space-y-2 md:col-span-2">
                      <label htmlFor="additionalInfo" className="font-sans text-xs font-black uppercase tracking-wider text-[#1e1b4b]">Additional Notes / More Info</label>
                      <textarea id="additionalInfo" name="additionalInfo" rows="4" value={formData.additionalInfo} onChange={handleChange} placeholder="Any specific achievements, subject choices or requirements..." className="w-full px-5 py-3.5 border border-slate-200 rounded-xl font-sans text-sm focus:outline-none focus:border-[#c4a048] focus:ring-4 focus:ring-[#c4a048]/5 transition-all bg-slate-50/50 resize-none" />
                    </div>
                  </div>
                )}
              </fieldset>

              {/* ACTION BUTTON TRIGGER FOOTEB */}
              <footer className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                {step > 1 ? (
                  <button 
                    type="button" 
                    onClick={() => setStep(s => s - 1)}
                    className="border border-[#1e1b4b]/20 hover:bg-slate-50 text-[#1e1b4b] font-sans font-black text-xs uppercase tracking-widest px-6 py-4 rounded-xl transition-colors focus:outline-none"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}
                
                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-gradient-to-r from-[#c4a048] to-[#aa842c] hover:from-[#7f1d1d] hover:to-[#7f1d1d] text-white font-sans font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none min-w-[140px]"
                >
                  {loading ? "Submitting..." : step === 3 ? "Submit Form" : "Next Step"}
                </button>
              </footer>
            </form>
          </div>
        ) : (
          /* HIGH-ELEVATION SUCCESS SCREEN */
          <section 
            aria-label="Success Message"
            className="bg-white border border-[#f1f5f9] rounded-[2.5rem] shadow-2xl p-8 md:p-16 text-center space-y-6 max-w-2xl mx-auto animate-[zoomIn_0.3s_ease-out]"
          >
            {/* बड़ी एनिमेटेड ग्रीन चेक-मार्क */}
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500 shadow-inner border border-green-100">
              <svg className="w-10 h-10 stroke-current animate-[dash_0.6s_ease-in-out]" fill="none" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            
            <div className="space-y-2">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1e1b4b]">
                Admission Form Submitted
              </h2>
              <div className="w-12 h-0.5 bg-[#c4a048] rounded-full mx-auto" />
            </div>

            <p className="font-sans text-base text-[#0f172a]/65 leading-relaxed font-medium">
              The profile for <strong className="text-[#7f1d1d] font-bold">{formData.fullName}</strong> has been successfully configured and sent to our management portal. Our administration desk will review and contact you shortly.
            </p>

            <div className="pt-4">
              <button 
                onClick={() => {
                  setSuccess(false);
                  setStep(1);
                  setFormData({ fullName: "", fathersName: "", mothersName: "", email: "", phone: "", classGrade: "", dob: "", gender: "", admissionDate: "", city: "", state: "", additionalInfo: "" });
                }}
                className="bg-[#1e1b4b] hover:bg-[#7f1d1d] text-white font-sans font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl transition-colors shadow-md"
              >
                Register Another Student
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}