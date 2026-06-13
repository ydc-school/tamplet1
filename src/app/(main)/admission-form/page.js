"use client";
import { useState } from "react";
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

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => { setStep((s) => Math.max(s - 1, 1)); setError(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) { nextStep(); return; }

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
      const response = await axios.post("/api/client/admission", apiPayload, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.status === "success") setSuccess(true);
      else setError(response.data.message || "Failed to submit.");
    } catch (err) {
      setError(err.response?.data?.message || "Network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#c4a048]/50 focus:border-[#c4a048] outline-none transition-all text-sm";
  const labelClass = "block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5";

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        {!success ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <h1 className="text-2xl font-black text-[#10213a] mb-2">Student Admission</h1>
              <p className="text-slate-600 text-sm">Fill in the student details to begin the registration process.</p>
              
              {/* Progress Indicator */}
              <div className="flex justify-between mt-6 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10" />
                {[1, 2, 3].map((s) => (
                  <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= s ? "bg-[#c4a048] text-white" : "bg-slate-100 text-slate-400"}`}>
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div><label className={labelClass}>Full Name *</label><input type="text" name="fullName" required className={inputClass} value={formData.fullName} onChange={handleChange} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={labelClass}>Father's Name *</label><input type="text" name="fathersName" required className={inputClass} value={formData.fathersName} onChange={handleChange} /></div>
                    <div><label className={labelClass}>Mother's Name *</label><input type="text" name="mothersName" required className={inputClass} value={formData.mothersName} onChange={handleChange} /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={labelClass}>Email *</label><input type="email" name="email" required className={inputClass} value={formData.email} onChange={handleChange} /></div>
                    <div><label className={labelClass}>Phone *</label><input type="tel" name="phone" required className={inputClass} value={formData.phone} onChange={handleChange} /></div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div><label className={labelClass}>Class / Grade *</label><input type="text" name="classGrade" required className={inputClass} value={formData.classGrade} onChange={handleChange} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={labelClass}>Date of Birth *</label><input type="date" name="dob" required className={inputClass} value={formData.dob} onChange={handleChange} /></div>
                    <div><label className={labelClass}>Admission Date *</label><input type="date" name="admissionDate" required className={inputClass} value={formData.admissionDate} onChange={handleChange} /></div>
                  </div>
                  <div>
                    <label className={labelClass}>Gender *</label>
                    <div className="flex gap-6 mt-2">
                      {["Male", "Female", "Other"].map((g) => (
                        <label key={g} className="flex items-center gap-2 cursor-pointer text-sm font-medium"><input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleChange} /> {g}</label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={labelClass}>City *</label><input type="text" name="city" required className={inputClass} value={formData.city} onChange={handleChange} /></div>
                    <div><label className={labelClass}>State *</label><input type="text" name="state" required className={inputClass} value={formData.state} onChange={handleChange} /></div>
                  </div>
                  <div><label className={labelClass}>Additional Info</label><textarea name="additionalInfo" className={`${inputClass} h-32`} value={formData.additionalInfo} onChange={handleChange} /></div>
                </div>
              )}
            </div>

            {error && <p className="mt-4 text-red-500 text-xs font-bold">{error}</p>}

            <div className="flex justify-between mt-8">
              {step > 1 && <button type="button" onClick={prevStep} className="px-6 py-2.5 text-slate-500 font-bold text-sm">Back</button>}
              <button type="submit" disabled={loading} className="ml-auto bg-[#c4a048] text-white px-8 py-2.5 rounded-lg font-bold text-sm hover:bg-[#b08e3d] transition-all disabled:opacity-50">
                {loading ? "Submitting..." : step === 3 ? "Submit" : "Next Step"}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-xl font-black text-slate-800">Form Submitted!</h2>
            <p className="text-slate-500 mt-2 text-sm">Student <strong>{formData.fullName}</strong> is now in our registry.</p>
          </div>
        )}
      </div>
    </div>
  );
}