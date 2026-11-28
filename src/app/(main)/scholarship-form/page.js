"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSchool } from "@/context/SchoolContext";

export default function ScholarshipForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { schoolInfo } = useSchool();
  const [branches, setBranches] = useState([]);

  // Hardcoded captcha code
  const CAPTCHA_CODE = "S7K4M";

  // Unified State
  const [formData, setFormData] = useState({
    sch_type: "",
    ttl_nme: "",
    st_name: "",
    fth_name: "",
    mth_name: "",
    dob: "",
    sel_gen: "",
    curr_school: "",
    curr_class: "",
    eml_id: "",
    mob_no: "",
    alt_mob_no: "",
    add: "",
    txtCaptcha: "",
    branches: "",
  });

  useEffect(() => {
    if (schoolInfo?.branchId) {
      setFormData((prev) => ({
        ...prev,
        branches: prev.branches || String(schoolInfo.branchId),
      }));
    }
  }, [schoolInfo]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const res = await axios.get("/api/client/branch");
        setBranches(res?.data?.data?.data || []);
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

    if (formData.alt_mob_no && formData.alt_mob_no.length !== 10) {
      setError("Please enter a valid 10-digit alternate/parent mobile number.");
      setLoading(false);
      return;
    }

    // 2. Branch Validation
    if (!formData.branches) {
      setError("Please select a preferred branch.");
      setLoading(false);
      return;
    }

    // 3. Captcha Validation (Case-Insensitive)
    if (
      formData.txtCaptcha.trim().toUpperCase() !== CAPTCHA_CODE.toUpperCase()
    ) {
      setError("Invalid Captcha code! Please try again.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("Scholarship_Type", formData.sch_type);
    data.append("Title", formData.ttl_nme);
    data.append("Student_Name", formData.st_name);
    data.append("Father_Name", formData.fth_name);
    data.append("Mother_Name", formData.mth_name);
    data.append("DOB", formData.dob);
    data.append("Gender", formData.sel_gen);
    data.append("Current_School", formData.curr_school);
    data.append("Current_Class", formData.curr_class);
    data.append("Email_Id", formData.eml_id);
    data.append("Mobile_No", formData.mob_no);
    data.append("Alternate_Mobile_No", formData.alt_mob_no);
    data.append("Address", formData.add);
    data.append("Branch_Id", formData.branches);
    data.append("Captcha", formData.txtCaptcha);

    try {
      const response = await axios.post("/api/client/scholarship", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status === "success" || response.data.code === 200) {
        setSuccess(true);
      } else {
        setError(response.data.message || "Scholarship application failed.");
      }
    } catch (err) {
      console.error("API Error:", err);
      setError(
        err.response?.data?.message ||
          "A network error occurred. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-white border border-[#c4a048]/20 rounded-[2px] px-[14px] py-[10px] text-[14px] text-[#1d3557] outline-none transition duration-200 box-border focus:border-[#c4a048] focus:ring-3 focus:ring-[#c4a048]/10";

  return (
    <div className="relative min-h-screen bg-[#f6f8fc] px-6 py-10 font-sans before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_60%_35%_at_50%_0%,rgba(196,160,72,0.055)_0%,transparent_65%)] before:pointer-events-none">
      <div className="relative z-10 mx-auto max-w-[950px] overflow-hidden rounded-[4px] border border-[#c4a048]/15 bg-white shadow-[0_4px_20px_rgba(16,33,58,0.03)]">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#f3f7fc] to-[#f6f8fc] px-8 py-6 border-b border-[#c4a048]/12 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-gradient-to-r after:from-transparent after:via-[#c4a048] after:to-transparent">
          <h1 className="font-serif text-2xl font-extrabold text-[#10213a] mb-[6px]">
            Student Scholarship Application Form
          </h1>
          <p className="text-[13px] text-[#3a5a7a]">
            Complete all required student, academic, and contact details to
            apply for scholarship.
          </p>
        </div>

        {!success ? (
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="p-8">
              {/* ── SECTION 1: Student & Family Details ── */}
              <div className="text-[14px] font-bold text-[#c4a048] uppercase tracking-[0.08em] mt-6 mb-4 border-b border-dashed border-[#c4a048]/30 pb-[6px] first-of-type:mt-0">
                1. Student & Family Details
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">
                    Scholarship Category / Scheme *
                  </label>
                  <select
                    id="sch_type"
                    name="sch_type"
                    required
                    className={inputClass}
                    value={formData.sch_type}
                    onChange={handleChange}
                  >
                    <option value="">Select Scholarship</option>
                    <option value="Merit-Based">Merit-Based Scholarship</option>
                  </select>
                </div>

                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">
                    Preferred Branch *
                  </label>
                  <select
                    id="branch"
                    name="branches"
                    required
                    className={inputClass}
                    value={formData.branches}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select a branch
                    </option>
                    {schoolInfo?.branchId && (
                      <option value={schoolInfo.branchId}>
                        {schoolInfo?.School_Name || "Current Branch"}
                      </option>
                    )}
                    {branches
                      ?.filter(
                        (i) =>
                          i.Name !== "main" &&
                          i.Branch_Type !== "main" &&
                          String(i.Id) !== String(schoolInfo?.branchId),
                      )
                      ?.map((i) => (
                        <option key={i.Id} value={i.Id}>
                          {i.Name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">
                    Title *
                  </label>
                  <select
                    id="ttl_nme"
                    name="ttl_nme"
                    required
                    className={inputClass}
                    value={formData.ttl_nme}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Master">Master</option>
                    <option value="Miss">Miss</option>
                  </select>
                </div>
                <div className="flex flex-col gap-[6px] mb-[18px] sm:col-span-2">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    id="st_name"
                    name="st_name"
                    required
                    className={inputClass}
                    placeholder="Enter student full name"
                    value={formData.st_name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">
                    Father&apos;s Name *
                  </label>
                  <input
                    type="text"
                    id="fth_name"
                    name="fth_name"
                    required
                    className={inputClass}
                    placeholder="Enter father's full name"
                    value={formData.fth_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">
                    Mother&apos;s Name
                  </label>
                  <input
                    type="text"
                    id="mth_name"
                    name="mth_name"
                    className={inputClass}
                    placeholder="Enter mother's full name"
                    value={formData.mth_name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    required
                    className={inputClass}
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">
                    Gender *
                  </label>
                  <select
                    id="sel_gen"
                    name="sel_gen"
                    required
                    className={inputClass}
                    value={formData.sel_gen}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* ── SECTION 2: Current School & Academic Details ── */}
              <div className="text-[14px] font-bold text-[#c4a048] uppercase tracking-[0.08em] mt-6 mb-4 border-b border-dashed border-[#c4a048]/30 pb-[6px]">
                2. Current School & Academic Details
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">
                    Current School Name *
                  </label>
                  <input
                    type="text"
                    id="curr_school"
                    name="curr_school"
                    required
                    className={inputClass}
                    placeholder="Enter current school name"
                    value={formData.curr_school}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">
                    Current Class / Grade *
                  </label>
                  <input
                    type="text"
                    id="curr_class"
                    name="curr_class"
                    required
                    className={inputClass}
                    placeholder="e.g. Class 9, Class 11"
                    value={formData.curr_class}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* ── SECTION 3: Contact & Address Details ── */}
              <div className="text-[14px] font-bold text-[#c4a048] uppercase tracking-[0.08em] mt-6 mb-4 border-b border-dashed border-[#c4a048]/30 pb-[6px]">
                3. Contact & Address Details
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">
                    Email ID *
                  </label>
                  <input
                    type="email"
                    id="eml_id"
                    name="eml_id"
                    required
                    className={inputClass}
                    placeholder="student@example.com"
                    value={formData.eml_id}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">
                    Phone / Mobile No. *
                  </label>
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
                      setFormData((prev) => ({
                        ...prev,
                        mob_no: val.slice(0, 10),
                      }));
                    }}
                  />
                </div>
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">
                    Parent / Alternate No.
                  </label>
                  <input
                    type="tel"
                    id="alt_mob_no"
                    name="alt_mob_no"
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit mobile number"
                    className={inputClass}
                    placeholder="10-digit number"
                    value={formData.alt_mob_no}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setFormData((prev) => ({
                        ...prev,
                        alt_mob_no: val.slice(0, 10),
                      }));
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[6px] mb-[18px]">
                <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">
                  Residential Address *
                </label>
                <input
                  type="text"
                  id="add"
                  name="add"
                  required
                  className={inputClass}
                  placeholder="Enter complete residential address with pin code"
                  value={formData.add}
                  onChange={handleChange}
                />
              </div>

              {/* ── SECTION 4: Captcha & Submission ── */}
              <div className="text-[14px] font-bold text-[#c4a048] uppercase tracking-[0.08em] mt-6 mb-4 border-b border-dashed border-[#c4a048]/30 pb-[6px]">
                4. Captcha & Application Submission
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-end">
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">
                    Code Display
                  </label>
                  <div className="bg-[#f3f7fc] p-[10px] font-bold text-[18px] tracking-[4px] text-center border border-[#c4a048]/15 rounded-[2px] text-[#3a5a7a] select-none">
                    {CAPTCHA_CODE}
                  </div>
                </div>
                <div className="flex flex-col gap-[6px] mb-[18px]">
                  <label className="text-[12px] font-bold text-[#10213a] uppercase tracking-[0.05em]">
                    Enter Captcha *
                  </label>
                  <input
                    type="text"
                    id="txtCaptcha"
                    name="txtCaptcha"
                    required
                    className={inputClass}
                    placeholder="Enter code above"
                    value={formData.txtCaptcha}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Error Box */}
              {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-[4px] text-[13px] mb-5 border border-red-400">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  id="btn_apply"
                  className="bg-[#c4a048] text-[#f6f8fc] w-full text-[13px] font-bold tracking-[0.08em] uppercase p-[14px] border-none rounded-[2px] cursor-pointer transition duration-200 hover:bg-[#e0c060] disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading
                    ? "Submitting Application..."
                    : "Apply for Scholarship"}
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Success State */
          <div className="text-center px-6 py-12 flex flex-col items-center gap-4">
            <div className="w-14 h-14 bg-[#c4a048]/10 rounded-full flex items-center justify-center text-[#c4a048] p-3">
              <svg
                width="28"
                height="28"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="font-serif text-2xl font-extrabold text-[#10213a] m-0">
              Application Submitted!
            </h2>
            <p className="text-[13px] text-[#3a5a7a] max-w-[440px] leading-[1.6]">
              Thank you, <strong>{formData.st_name}</strong>. Your scholarship
              application has been submitted successfully.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
