"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function AdmissionSection() {
  const [admissionData, setAdmissionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmissionData = async () => {
      try {
        const response = await axios.get("/api/client/admission-open-message");
        if (response.data.status === "success") {
          const data = response.data.data;
          const finalData = Array.isArray(data) ? data[0] : (data.data ? data.data[0] : null);
          setAdmissionData(finalData);
        }
      } catch (error) {
        console.error("Error fetching admission data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmissionData();
  }, []);

  if (loading) return <article>Loading...</article>;
  if (!admissionData) return null;

  const titleText = admissionData.Title || "";
  const match = titleText.match(/(.*?)(\d{4}-\d{4})/);
  const mainTitle = match ? match[1].trim() : titleText;
  const yearTitle = match ? match[2] : "";

  return (
    <article>
      <header>
        <span>Admissions</span>
        <h2>
          {mainTitle} <span>{yearTitle}</span>
        </h2>
      </header>

      {admissionData.Image && (
        <figure>
          <Image
            src={`/uploads/${admissionData.Image}`}
            alt={admissionData.Title || "Admission"}
            width={860}
            height={500}
            priority
          />
          <span>Now Open</span>
        </figure>
      )}

      {admissionData.Message && (
        <div dangerouslySetInnerHTML={{ __html: admissionData.Message }} />
      )}

      <footer>
        {admissionData.Read_More_Url && (
          <Link href="https://yaduvanshigroup.edu.in/admission-Form">
            Apply Now
          </Link>
        )}
        <Link href={admissionData.Read_More_Url || "#"}>
          Learn More
        </Link>
      </footer>
    </article>
  );
}