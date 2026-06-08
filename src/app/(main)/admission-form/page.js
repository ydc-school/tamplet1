
"use client";

import { useState } from "react";

export default function AdmissionFormPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    email: "",
    phone: "",
    branch: "",
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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Admission Form Submitted Successfully");
  };

  return (
    <>
      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #f6f8fc;
          padding: 60px 20px;
          font-family: Arial, sans-serif;
        }

        .container {
          max-width: 1100px;
          margin: auto;
        }

        .header {
          text-align: center;
          margin-bottom: 40px;
        }

        .header h1 {
          font-size: 42px;
          color: #10213a;
          margin-bottom: 10px;
        }

        .header p {
          color: #55708d;
        }

        .card {
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
        }

        .topBar {
          height: 4px;
          background: linear-gradient(
            90deg,
            #c4a048,
            #e0c060,
            #c4a048
          );
        }

        .form {
          padding: 40px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .field {
          display: flex;
          flex-direction: column;
        }

        .field label {
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #10213a;
        }

        .field input,
        .field select,
        .field textarea {
          border: 1px solid #d8e1ee;
          border-radius: 6px;
          padding: 14px;
          font-size: 15px;
          outline: none;
        }

        .field input:focus,
        .field select:focus,
        .field textarea:focus {
          border-color: #c4a048;
        }

        .full {
          grid-column: span 2;
        }

        .radioGroup {
          display: flex;
          gap: 25px;
          margin-top: 8px;
        }

        .radioGroup label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-weight: 500;
        }

        .submitBtn {
          margin-top: 30px;
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 6px;
          background: #c4a048;
          color: white;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.3s;
        }

        .submitBtn:hover {
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
          }

          .full {
            grid-column: span 1;
          }

          .form {
            padding: 25px;
          }

          .header h1 {
            font-size: 30px;
          }
        }
      `}</style>

      <div className="page">
        <div className="container">
          <div className="header">
            <h1>Admission Form</h1>
            <p>
              Complete the form below to apply for admission.
            </p>
          </div>

          <div className="card">
            <div className="topBar"></div>

            <form className="form" onSubmit={handleSubmit}>
              <div className="grid">
                <div className="field">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label>Father's Name *</label>
                  <input
                    type="text"
                    name="fatherName"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label>Mother's Name *</label>
                  <input
                    type="text"
                    name="motherName"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label>Branch *</label>
                  <select
                    name="branch"
                    required
                    onChange={handleChange}
                  >
                    <option value="">Select Branch</option>
                    <option>Science</option>
                    <option>Commerce</option>
                    <option>Arts</option>
                  </select>
                </div>

                <div className="field">
                  <label>Class / Grade *</label>
                  <input
                    type="text"
                    name="classGrade"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label>Date of Birth *</label>
                  <input
                    type="date"
                    name="dob"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="field full">
                  <label>Gender *</label>

                  <div className="radioGroup">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        onChange={handleChange}
                        required
                      />
                      Male
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        onChange={handleChange}
                      />
                      Female
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Other"
                        onChange={handleChange}
                      />
                      Other
                    </label>
                  </div>
                </div>

                <div className="field">
                  <label>Admission Date *</label>
                  <input
                    type="date"
                    name="admissionDate"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label>State *</label>
                  <input
                    type="text"
                    name="state"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="field full">
                  <label>
                    Additional Information (Optional)
                  </label>

                  <textarea
                    rows="5"
                    name="additionalInfo"
                    placeholder="Enter additional information..."
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="submitBtn"
              >
                Submit Admission Form
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

