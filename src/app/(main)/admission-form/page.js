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
    fullName: "", fathersName: "", mothersName: "", email: "", phone: "",
    classGrade: "", dob: "", gender: "", admissionDate: "", city: "",
    state: "", additionalInfo: "",
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
      const response = await axios.post("/api/client/admission", apiPayload);
      if (response.data.status === "success") setSuccess(true);
      else setError(response.data.message || "Failed to submit.");
    } catch (err) { setError("Network error occurred."); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 font-sans text-stone-900">
      <div className="mb-12">
        <h1 className="text-4xl font-serif font-bold text-stone-950 mb-2">Student Admission</h1>
        <p className="text-stone-600">Please provide accurate academic and personal details.</p>
      </div>

      {!success ? (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm">
          {/* Progress Indicator */}
          <div className="flex gap-4 mb-10 border-b border-stone-100 pb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${step >= i ? "text-amber-600" : "text-stone-300"}`}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center border ${step >= i ? "bg-amber-500 text-white border-amber-500" : "border-stone-200"}`}>{i}</span>
                Step {i}
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
                <Input label="Father's Name" name="fathersName" value={formData.fathersName} onChange={handleChange} required />
                <Input label="Mother's Name" name="mothersName" value={formData.mothersName} onChange={handleChange} required />
                <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
                <Input label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Class/Grade" name="classGrade" value={formData.classGrade} onChange={handleChange} required />
                <Input label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
                <Input label="Admission Date" name="admissionDate" type="date" value={formData.admissionDate} onChange={handleChange} required />
                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase text-stone-500 mb-2">Gender *</label>
                  <div className="flex gap-6">
                    {["Male", "Female", "Other"].map(g => (
                      <label key={g} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleChange} className="accent-amber-500" required />
                        {g}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <Input label="City" name="city" value={formData.city} onChange={handleChange} required />
                  <Input label="State" name="state" value={formData.state} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-500 mb-2">Additional Info</label>
                  <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} className="w-full p-4 rounded-lg border border-stone-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition" rows={4} />
                </div>
              </div>
            )}
          </div>

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          <div className="flex justify-between mt-10 pt-6 border-t border-stone-100">
            {step > 1 && <button type="button" onClick={prevStep} className="px-6 py-2 border rounded-full hover:bg-stone-50">Back</button>}
            <button type="submit" className="px-8 py-2 bg-stone-900 text-white rounded-full hover:bg-amber-600 transition">
              {loading ? "Submitting..." : step === 3 ? "Submit" : "Next"}
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center py-20 bg-stone-50 rounded-2xl">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">✓</div>
          <h2 className="text-2xl font-bold mb-2">Application Received</h2>
          <p className="text-stone-600">Student <strong>{formData.fullName}</strong> ka application successfull submit ho gaya hai.</p>
        </div>
      )}
    </div>
  );
}

// Sub-component for clean input styling
function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase text-stone-500 mb-2">{label} *</label>
      <input {...props} className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition outline-none" />
    </div>
  );
}