"use client";
import { useState } from "react";
import axios from "axios";

export default function AchievementForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    studentName: "",
    phoneNo: "",
    emailId: "",
    passingYear: "",
    achievementDate: "",
    type: "placement", // 'placement' (Corporate), 'govt_job', ya 'achievement'
    companyOrAuthority: "", // Company / Dept / Authority Name
    designationOrTitle: "", // Designation / Post / Title
    achievementDesc: "",
    proofFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Jab category badle, toh company aur designation fields ko clear kar de taaki fresh data aaye
    if (name === "type") {
      setFormData((prev) => ({ ...prev, [name]: value, companyOrAuthority: "", designationOrTitle: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, proofFile: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData();
    data.append("Student_Name", formData.studentName);
    data.append("Phone_No", formData.phoneNo);
    data.append("Email_Id", formData.emailId);
    data.append("Passing_Year", formData.passingYear);
    data.append("Achievement_Date", formData.achievementDate);
    data.append("Type", formData.type);
    data.append("Company_Or_Authority", formData.companyOrAuthority);
    data.append("Designation_Or_Title", formData.designationOrTitle);
    data.append("Description", formData.achievementDesc);
    
    if (formData.proofFile) {
      data.append("Proof_File", formData.proofFile);
    }

    try {
      const response = await axios.post("/api/client/student-achievements", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.status === "success") {
        setSuccess(true);
      } else {
        setError(response.data.message || "Submission failed.");
      }
    } catch (err) {
      console.error("API Error:", err);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-white border border-[#c4a048]/20 rounded-[2px] px-[14px] py-[10px] text-[14px] text-[#1d3557] outline-none transition duration-200 box-border focus:border-[#c4a048] focus:ring-3 focus:ring-[#c4a048]/10";

  // Dynamic labels helper functions
  const getOrgLabel = () => {
    if (formData.type === "placement") return "Company Name *";
    if (formData.type === "govt_job") return "Government Department / Ministry *";
    return "Authority / Organisation *";
  };

  const getOrgPlaceholder = () => {
    if (formData.type === "placement") return "e.g. TCS, Infosys, Wipro";
    if (formData.type === "govt_job") return "e.g. Indian Railways, DRDO, SBI Bank";
    return "e.g. Govt. Body, College, Sports Federation";
  };

  const getTitleLabel = () => {
    if (formData.type === "placement") return "Designation *";
    if (formData.type === "govt_job") return "Post / Rank *";
    return "Achievement Title *";
  };

  const getTitlePlaceholder = () => {
    if (formData.type === "placement") return "e.g. Software Engineer";
    if (formData.type === "govt_job") return "e.g. Assistant Manager, Junior Engineer";
    return "e.g. GATE Cleared, National Level Winner";
  };

  return (
    <div className="relative min-h-screen bg-[#f6f8fc] px-6 py-10 font-sans before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_60%_35%_at_50%_0%,rgba(196,160,72,0.055)_0%,transparent_65%)] before:pointer-events-none">
      <div className="relative z-10 mx-auto max-w-[650px] overflow-hidden rounded-[4px] border border-[#c4a048]/15 bg-white shadow-[0_4px_20px_rgba(16,33,58,0.03)]">
        
        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#f3f7fc] to-[#f6f8fc] px-8 py-6 border-b border-[#c4a048]/12 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-gradient-to-r after:from-transparent after:via-[#c4a048] after:to-transparent">
          <h1 className="font-serif text-2xl font-extrabold text-[#10213a] mb-[6px]">Submit Your Achievement</h1>
          <p className="text-[13px] text-[#3a5a7a]">Share your placement, government job selection, or recent achievements with the college.</p>
        </div>

        {!success ? (
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="p-8">
              
              {/* ── SECTION 1: Personal Details ── */}
              <div className="text-[14px] font-bold text-[#c4a048] uppercase tracking-[0.08em] mb-4 border-b border-dashed border-[#c4a048]/30 pb-[6px]">
                1. Student / Alumni Details
              </div>
              
              <div className="flex flex-col gap-[6px] mb-[18px]">
                <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Full Name *</label>
                <input type="text" name="studentName" required className={inputClass} placeholder="Enter your full name" value={formData.studentName} onChange={handleChange} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Phone Number *</label>
                  <input 
                    type="text" 
                    name="phoneNo" 
                    required 
                    className={inputClass} 
                    placeholder="10-digit number" 
                    value={formData.phoneNo} 
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setFormData(prev => ({ ...prev, phoneNo: val.slice(0, 10) }));
                    }} 
                  />
                </div>
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Passing Year *</label>
                  <input type="number" name="passingYear" required className={inputClass} placeholder="e.g. 2024" min="1990" max="2030" value={formData.passingYear} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Achievement Date *</label>
                  <input type="date" name="achievementDate" required className={inputClass} value={formData.achievementDate} onChange={handleChange} />
                </div>
              </div>

              <div className="flex flex-col gap-[6px] mb-[18px]">
                <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Email ID</label>
                <input type="email" name="emailId" className={inputClass} placeholder="name@example.com" value={formData.emailId} onChange={handleChange} />
              </div>

              {/* ── SECTION 2: Success Details ── */}
              <div className="text-[14px] font-bold text-[#c4a048] uppercase tracking-[0.08em] mt-6 mb-4 border-b border-dashed border-[#c4a048]/30 pb-[6px]">
                2. Achievement / Placement Details
              </div>

              {/* Updated Selection Dropdown with Government Job option */}
              <div className="flex flex-col gap-[6px] mb-[18px]">
                <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Select Type *</label>
                <select name="type" required className={inputClass} value={formData.type} onChange={handleChange}>
                  <option value="placement">Corporate Placement / New Job (Private)</option>
                  <option value="govt_job">Government Job Selection</option>
                  <option value="achievement">Other Achievement (Exam cleared, Award, Sports etc.)</option>
                </select>
              </div>

              {/* Dynamic Grid Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">
                    {getOrgLabel()}
                  </label>
                  <input type="text" name="companyOrAuthority" required className={inputClass} placeholder={getOrgPlaceholder()} value={formData.companyOrAuthority} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">
                    {getTitleLabel()}
                  </label>
                  <input type="text" name="designationOrTitle" required className={inputClass} placeholder={getTitlePlaceholder()} value={formData.designationOrTitle} onChange={handleChange} />
                </div>
              </div>

              <div className="flex flex-col gap-[6px] mb-[18px]">
                <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Description / Details *</label>
                <textarea name="achievementDesc" required rows="3" className={`${inputClass} resize-none`} placeholder="Briefly explain your job role, exam scores, or details about your selection..." value={formData.achievementDesc} onChange={handleChange} />
              </div>

              <div className="flex flex-col gap-[6px] mb-[18px]">
                <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Upload Proof (Offer Letter / Selection Certificate PDF) *</label>
                <input type="file" id="proofFile" accept=".pdf,image/*" required className={`${inputClass} !py-[7px]`} onChange={handleFileChange} />
              </div>

              {error && <div className="bg-red-100 text-red-700 p-3 rounded-[4px] text-[13px] mb-5 border border-red-400">{error}</div>}

              <div className="mt-6">
                <button type="submit" className="bg-[#c4a048] text-[#f6f8fc] w-full text-[13px] font-bold tracking-[0.08em] uppercase p-[14px] border-none rounded-[2px] cursor-pointer transition duration-200 hover:bg-[#e0c060] disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Profile"}
                </button>
              </div>

            </div>
          </form>
        ) : (
          /* Success State */
          <div className="text-center px-6 py-12 flex flex-col items-center gap-4">
            <div className="w-14 h-14 bg-[#c4a048]/10 rounded-full flex items-center justify-center text-[#c4a048] p-3">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl font-extrabold text-[#10213a] m-0">Thank You!</h2>
            <p className="text-[13px] text-[#3a5a7a] max-w-[420px] leading-[1.6]">
              Congratulations <strong>{formData.studentName}</strong>, your success story and details have been recorded successfully.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}