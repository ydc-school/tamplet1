"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSchool } from "@/context/SchoolContext";

export default function CareersForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { schoolInfo } = useSchool();
  const [branches, setBranches] = useState([]);

  // Hardcoded captcha code
  const CAPTCHA_CODE = "F8B2X";

  // Unified State
  const [formData, setFormData] = useState({
    apl_pst: "",
    ar_spec: "",
    ttl_nme: "",
    nme: "",
    qual: "",
    dob: "",
    sel_gen: "",
    eml_id: "",
    mob_no: "",
    add: "",
    has_experience: "", // 'yes' or 'no'
    ex_org: "",
    ex_des: "",
    ex_dt_start: "",
    ex_dt_end: "",
    txtUploadResume: null,
    txtCaptcha: "",
    branches: ''
  });

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const res = await axios.get("/api/client/branch?branchType=school");
        console.log(res.data?.data?.data);
        setBranches(res?.data?.data || []);
      } catch (err) {
        console.error("Error fetching branches:", err);
      }
    };
    fetchBranches();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleExperienceChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      has_experience: value,
      // Clear experience data if 'no' is selected
      ...(value === "no" && {
        ex_org: "",
        ex_des: "",
        ex_dt_start: "",
        ex_dt_end: ""
      })
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      setError("Please upload PDF files only.");
      e.target.value = null; // Reset input
      return;
    }
    setError(null);
    setFormData((prev) => ({ ...prev, txtUploadResume: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1. Mobile Number Validation (10 digits)
    if (formData.mob_no.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      setLoading(false);
      return;
    }

    // 2. Experience Validation
    if (!formData.has_experience) {
      setError("Please select whether you have work experience or not.");
      setLoading(false);
      return;
    }

    // 3. Captcha Validation (Case-Insensitive)
    if (formData.txtCaptcha.trim().toUpperCase() !== CAPTCHA_CODE.toUpperCase()) {
      setError("Invalid Captcha code! Please try again.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("Post_Applied", formData.apl_pst);
    data.append("Area_Specialization", formData.ar_spec);
    data.append("Title", formData.ttl_nme);
    data.append("Name", formData.nme);
    data.append("Qualification", formData.qual);
    data.append("DOB", formData.dob);
    data.append("Gender", formData.sel_gen);
    data.append("Email_Id", formData.eml_id);
    data.append("Mobile_No", formData.mob_no);
    data.append("Address", formData.add);
    data.append("Branch_Id", formData.branches);
    data.append("Captcha", formData.txtCaptcha);

    if (formData.has_experience === "yes") {
      data.append("Has_Experience", formData.has_experience);
      data.append("Organisation", formData.ex_org);
      data.append("Designation", formData.ex_des);
      data.append("Service_From", formData.ex_dt_start);
      data.append("Service_End", formData.ex_dt_end);
    }

    if (formData.txtUploadResume) {
      data.append("Resume", formData.txtUploadResume);
    }

    try {
      const response = await axios.post("/api/client/branch?branchType=college", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status === "success" || response.data.code === 200) {
        setSuccess(true);
      } else {
        setError(response.data.message || "Registration failed.");
      }
    } catch (err) {
      console.error("API Error:", err);
      setError(err.response?.data?.message || "A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-white border border-[#c4a048]/20 rounded-[2px] px-[14px] py-[10px] text-[14px] text-[#1d3557] outline-none transition duration-200 box-border focus:border-[#c4a048] focus:ring-3 focus:ring-[#c4a048]/10";

  return (
    <div className="relative min-h-screen bg-[#f6f8fc] px-6 py-10 font-sans before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_60%_35%_at_50%_0%,rgba(196,160,72,0.055)_0%,transparent_65%)] before:pointer-events-none">
      <div className="relative z-10 mx-auto max-w-[950px] overflow-hidden rounded-[4px] border border-[#c4a048]/15 bg-white shadow-[0_4px_20px_rgba(16,33,58,0.03)]">

        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#f3f7fc] to-[#f6f8fc] px-8 py-6 border-b border-[#c4a048]/12 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-gradient-to-r after:from-transparent after:via-[#c4a048] after:to-transparent">
          <h1 className="font-serif text-2xl font-extrabold text-[#10213a] mb-[6px]">Job Registration Form</h1>
          <p className="text-[13px] text-[#3a5a7a]">Complete all sections in a single step to submit your profile.</p>
        </div>

        {!success ? (
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="p-8">

              {/* ── SECTION 1: Professional Profile ── */}
              <div className="text-[14px] font-bold text-[#c4a048] uppercase tracking-[0.08em] mt-6 mb-4 border-b border-dashed border-[#c4a048]/30 pb-[6px] first-of-type:mt-0">
                1. Professional Profile
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Post Applied For *</label>
                  <select id="apl_pst" name="apl_pst" required className={inputClass} value={formData.apl_pst} onChange={handleChange}>
                    <option value="">Select Position</option>
                    <option value="PRT">PRT Teacher</option>
                    <option value="TGT">TGT Teacher</option>
                    <option value="PGT">PGT Teacher</option>
                    <option value="others">OTHERS</option>
                    <option value="Admin">Administrative Staff</option>
                  </select>
                </div>

                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]"> Branch *</label>
                  <select id="branch" name="branches" required className={inputClass} value={formData.branches} onChange={handleChange}>
                    <option value="" disabled>Select a branch</option>
                    {branches
                      ?.filter(i => i.Name !== "main")
                      ?.map((i) => (
                        <option key={i.Id} value={i.Id}>
                          {i.Name}
                        </option>
                      ))
                    }
                  </select>
                </div>

                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Area of Specialization *</label>
                  <input type="text" id="ar_spec" name="ar_spec" required className={inputClass} placeholder="e.g. Mathematics, English" value={formData.ar_spec} onChange={handleChange} />
                </div>
              </div>

              <div className="flex flex-col gap-[6px] mb-[18px]">
                <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Designation *</label>
                <input type="text" id="ex_des" name="ex_des" required={formData.has_experience === "yes"} className={inputClass} placeholder="e.g. Senior Teacher" value={formData.ex_des} onChange={handleChange} />
              </div>

              {/* ── SECTION 2: Professional & Contact Details ── */}
              <div className="text-[14px] font-bold text-[#c4a048] uppercase tracking-[0.08em] mt-6 mb-4 border-b border-dashed border-[#c4a048]/30 pb-[6px]">
                2. Professional & Contact Details
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Title *</label>
                  <select id="ttl_nme" name="ttl_nme" required className={inputClass} value={formData.ttl_nme} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Dr.">Dr.</option>
                  </select>
                </div>
                <div className="flex flex-col gap-[6px] mb-[18px] sm:col-span-2">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Full Name *</label>
                  <input type="text" id="nme" name="nme" required className={inputClass} placeholder="Enter your full name" value={formData.nme} onChange={handleChange} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Qualification *</label>
                  <input type="text" id="qual" name="qual" required className={inputClass} placeholder="e.g. B.Ed, M.Sc" value={formData.qual} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Date of Birth *</label>
                  <input type="date" id="dob" name="dob" required className={inputClass} value={formData.dob} onChange={handleChange} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Gender *</label>
                  <select id="sel_gen" name="sel_gen" required className={inputClass} value={formData.sel_gen} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Email ID *</label>
                  <input type="email" id="eml_id" name="eml_id" required className={inputClass} placeholder="name@example.com" value={formData.eml_id} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Mobile No. *</label>
                  <input
                    type="tel"
                    id="mob_no"
                    name="mob_no"
                    required
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit mobile number"
                    className={inputClass}
                    placeholder="10-digit number"
                    value={formData.mob_no}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setFormData(prev => ({ ...prev, mob_no: val.slice(0, 10) }));
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[6px] mb-[18px]">
                <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Address *</label>
                <input type="text" id="add" name="add" required className={inputClass} placeholder="Enter complete full address" value={formData.add} onChange={handleChange} />
              </div>

              {/* ── SECTION 3: Add Experience Details ── */}
              <div className="text-[14px] font-bold text-[#c4a048] uppercase tracking-[0.08em] mt-6 mb-4 border-b border-dashed border-[#c4a048]/30 pb-[6px]">
                3. Add Experience Details
              </div>
              <div className="flex flex-col gap-[6px] mb-[18px]">
                <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Do you have Work Experience? *</label>
                <div className="flex gap-6 py-2">
                  <label className="flex items-center gap-2 text-[14px] text-[#1d3557] cursor-pointer">
                    <input type="radio" name="has_experience" id="yes" className="accent-[#c4a048] w-4 h-4" checked={formData.has_experience === "yes"} onChange={() => handleExperienceChange("yes")} />
                    Yes
                  </label>
                  <label className="flex items-center gap-2 text-[14px] text-[#1d3557] cursor-pointer">
                    <input type="radio" name="has_experience" id="no" className="accent-[#c4a048] w-4 h-4" checked={formData.has_experience === "no"} onChange={() => handleExperienceChange("no")} />
                    No
                  </label>
                </div>
              </div>

              {formData.has_experience === "yes" && (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-[6px] mb-[18px]">
                      <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Organisation *</label>
                      <input type="text" id="ex_org" name="ex_org" required={formData.has_experience === "yes"} className={inputClass} placeholder="Company / School Name" value={formData.ex_org} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-[6px] mb-[18px]">
                      <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Designation *</label>
                      <input type="text" id="ex_des" name="ex_des" required={formData.has_experience === "yes"} className={inputClass} placeholder="e.g. Senior Teacher" value={formData.ex_des} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-[6px] mb-[18px]">
                      <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Service From *</label>
                      <input type="date" id="ex_dt_start" name="ex_dt_start" required={formData.has_experience === "yes"} className={inputClass} value={formData.ex_dt_start} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-[6px] mb-[18px]">
                      <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Service End *</label>
                      <input type="date" id="ex_dt_end" name="ex_dt_end" required={formData.has_experience === "yes"} className={inputClass} value={formData.ex_dt_end} onChange={handleChange} />
                    </div>
                  </div>
                </div>
              )}

              {/* ── SECTION 4: Upload your Resume ── */}
              <div className="text-[14px] font-bold text-[#c4a048] uppercase tracking-[0.08em] mt-6 mb-4 border-b border-dashed border-[#c4a048]/30 pb-[6px]">
                4. Upload your Resume
              </div>
              <div className="flex flex-col gap-[6px] mb-[18px]">
                <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Select File (PDF Only) *</label>
                <input type="file" id="txtUploadResume" name="txtUploadResume" accept=".pdf" required className={`${inputClass} !py-[7px]`} onChange={handleFileChange} />
              </div>

              {/* ── SECTION 5: Captcha & Registration ── */}
              <div className="text-[14px] font-bold text-[#c4a048] uppercase tracking-[0.08em] mt-6 mb-4 border-b border-dashed border-[#c4a048]/30 pb-[6px]">
                5. Captcha & Registration
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-end">
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Code Display</label>
                  <div className="bg-[#f3f7fc] p-[10px] font-bold text-[18px] tracking-[4px] text-center border border-[#c4a048]/15 rounded-[2px] text-[#3a5a7a] select-none">{CAPTCHA_CODE}</div>
                </div>
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">Enter Captcha *</label>
                  <input type="text" id="txtCaptcha" name="txtCaptcha" required className={inputClass} placeholder="Enter code above" value={formData.txtCaptcha} onChange={handleChange} />
                </div>
              </div>

              {/* Error Box */}
              {error && <div className="bg-red-100 text-red-700 p-3 rounded-[4px] text-[13px] mb-5 border border-red-400">{error}</div>}

              {/* Register Submit Button */}
              <div className="mt-6">
                <button type="submit" id="btn_reg" className="bg-[#c4a048] text-[#f6f8fc] w-full text-[13px] font-bold tracking-[0.08em] uppercase p-[14px] border-none rounded-[2px] cursor-pointer transition duration-200 hover:bg-[#e0c060] disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
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
            <h2 className="font-serif text-2xl font-extrabold text-[#10213a] m-0">Registration Successful!</h2>
            <p className="text-[13px] text-[#3a5a7a] max-w-[420px] leading-[1.6]">
              Thank you, <strong>{formData.nme}</strong>. Your application with reference details has been submitted successfully.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}