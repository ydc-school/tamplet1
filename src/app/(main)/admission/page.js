"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSchool } from "@/context/SchoolContext";

const initialForm = {
  Name: "",
  Father_Name: "",
  Mother_Name: "",
  Email: "",
  Phone: "",
  Class: "",
  DOB: "",
  Gender: "",
  Admission_Date: "",
  City: "",
  State: "",
  More_Info: "",
};

export default function AdmissionPage() {
  const { schoolInfo, loading: schoolLoading } = useSchool();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const branchName = useMemo(() => {
    return (
      schoolInfo?.Branch?.Name ||
      schoolInfo?.School_Name ||
      schoolInfo?.Short_Name ||
      (schoolInfo?.Branch_Id ? `Branch ${schoolInfo.Branch_Id}` : "")
    );
  }, [schoolInfo]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setForm((current) => ({
      ...current,
      Admission_Date: current.Admission_Date || today,
    }));
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitAdmission = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    if (!schoolInfo?.Branch_Id) {
      setStatus({
        type: "error",
        message: "Branch information is still loading. Please try again in a moment.",
      });
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        ...form,
        Branch_Id: schoolInfo.Branch_Id,
      };

      const response = await axios.post("/api/client/admission", payload);

      if (response.data?.status === "success") {
        setForm({
          ...initialForm,
          Admission_Date: new Date().toISOString().split("T")[0],
        });
        setStatus({
          type: "success",
          message: "Admission form submitted successfully.",
        });
      } else {
        setStatus({
          type: "error",
          message: response.data?.message || "Unable to submit admission form.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Unable to submit admission form. Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#f7f9fc] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 border-l-4 border-[var(--primary)] bg-white px-5 py-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
            Admission
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Admission Form
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Submit student details for admission. Fields marked with * are required.
          </p>
        </div>

        <form
          onSubmit={submitAdmission}
          className="bg-white p-5 shadow-sm sm:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <FormInput
              label="Full Name"
              name="Name"
              value={form.Name}
              onChange={updateField}
              required
            />
            <FormInput
              label="Father's Name"
              name="Father_Name"
              value={form.Father_Name}
              onChange={updateField}
              required
            />
            <FormInput
              label="Mother's Name"
              name="Mother_Name"
              value={form.Mother_Name}
              onChange={updateField}
              required
            />
            <FormInput
              label="Email Address"
              name="Email"
              type="email"
              value={form.Email}
              onChange={updateField}
              required
            />
            <FormInput
              label="Phone Number"
              name="Phone"
              type="tel"
              value={form.Phone}
              onChange={updateField}
              required
            />
            <FormInput
              label="Branch"
              name="Branch"
              value={schoolLoading ? "Loading branch..." : branchName}
              readOnly
              required
            />
            <FormInput
              label="Class/Grade"
              name="Class"
              value={form.Class}
              onChange={updateField}
              required
            />
            <FormInput
              label="Date of Birth"
              name="DOB"
              type="date"
              value={form.DOB}
              onChange={updateField}
              required
            />
            <FormSelect
              label="Gender"
              name="Gender"
              value={form.Gender}
              onChange={updateField}
              required
              options={[
                { label: "Select gender", value: "" },
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
              ]}
            />
            <FormInput
              label="Admission Date"
              name="Admission_Date"
              type="date"
              value={form.Admission_Date}
              onChange={updateField}
              required
            />
            <FormInput
              label="City"
              name="City"
              value={form.City}
              onChange={updateField}
              required
            />
            <FormInput
              label="State"
              name="State"
              value={form.State}
              onChange={updateField}
            />
          </div>

          <div className="mt-5">
            <label className="block text-sm font-semibold text-slate-700" htmlFor="More_Info">
              Additional Information <span className="font-normal text-slate-400">(Optional)</span>
            </label>
            <textarea
              id="More_Info"
              name="More_Info"
              value={form.More_Info}
              onChange={updateField}
              rows={5}
              className="mt-2 w-full border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_20%,transparent)]"
            />
          </div>

          {status.message && (
            <p
              className={`mt-5 border px-4 py-3 text-sm font-medium ${
                status.type === "success"
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {status.message}
            </p>
          )}

          <div className="mt-7 flex justify-end">
            <button
              type="submit"
              disabled={submitting || schoolLoading}
              className="bg-[var(--primary)] px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Admission"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function FormInput({ label, required = false, className = "", ...props }) {
  return (
    <label className={`block ${className}`} htmlFor={props.name}>
      <span className="text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <input
        id={props.name}
        required={required}
        className="mt-2 w-full border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition read-only:bg-slate-100 focus:border-[var(--primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_20%,transparent)]"
        {...props}
      />
    </label>
  );
}

function FormSelect({ label, options, required = false, ...props }) {
  return (
    <label className="block" htmlFor={props.name}>
      <span className="text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <select
        id={props.name}
        required={required}
        className="mt-2 w-full border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_20%,transparent)]"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
