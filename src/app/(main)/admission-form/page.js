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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep((s) => s + 1);
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
      if (response.data?.status === "success") setSuccess(true);
      else setError(response.data?.message || "Submission failed.");
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {/*
        UI PROMPT — ADMISSION FORM PAGE:
        Header: H1 "Student Admission Form" + subtitle paragraph.
        Progress stepper: 3 steps — Basic Info | Academic & Path | Address & Meta (active=gold highlight).
        Form fieldset per step: labeled inputs with required asterisks.
        Step 1: name, father, mother, email, phone. Step 2: class, DOB, gender, admission date.
        Step 3: city, state, additional info textarea.
        Footer: Back (outlined) + Next/Submit (gold primary). Success: checkmark + confirmation with student name.
        Full prompt: UI_PROMPTS.md → Section 16
      */}
      <header>
        <h1>Student Admission Form</h1>
        <p>Please enter accurate details to register your student profile.</p>
      </header>

      {!success ? (
        <form onSubmit={handleSubmit}>
          <nav aria-label="Progress">
            <ol>
              <li aria-current={step === 1 ? "step" : undefined}>Basic Info</li>
              <li aria-current={step === 2 ? "step" : undefined}>Academic & Path</li>
              <li aria-current={step === 3 ? "step" : undefined}>Address & Meta</li>
            </ol>
          </nav>

          <fieldset>
            <legend>Step {step} of 3</legend>
            {step === 1 && (
              <>
                <label htmlFor="fullName">Full Name *</label>
                <input id="fullName" name="fullName" type="text" required value={formData.fullName} onChange={handleChange} />
                {/* ... baki fields htmlFor ke saath */}
              </>
            )}
            {/* Step 2 & 3 content ... */}
          </fieldset>

          <footer>
            {step > 1 && <button type="button" onClick={() => setStep(s => s - 1)}>Back</button>}
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : step === 3 ? "Submit Admission" : "Next"}
            </button>
          </footer>
        </form>
      ) : (
        <section aria-label="Success Message">
          <h2>Admission Form Submitted</h2>
          <p>The profile for <strong>{formData.fullName}</strong> has been successfully configured.</p>
        </section>
      )}
    </main>
  );
}