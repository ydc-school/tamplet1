'use client';

import { useEffect, useRef } from 'react';

export default function IsolatedContent({ htmlContent }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      if (!containerRef.current.shadowRoot) {
        containerRef.current.attachShadow({ mode: 'open' });
      }

      const styles = `
        <style>
          :host {
            display: block;
            width: 100%;
          }
          table {
            width: 100%;
            margin-bottom: 1.5rem;
            border-collapse: collapse;
            border: 1px solid #e5e5e5;
            border-radius: 0.375rem;
            overflow: hidden;
          }
          thead {
            background-color: #f9f9f9;
          }
          th {
            border: 2px solid #0c0c0c;
            padding: 0.75rem 1rem;
            text-align: left;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #171717;
          }
          td {
            border: 2px solid #0c0c0c;
            padding: 0.75rem 1rem;
            font-size: 0.875rem;
            color: #404040;
          }
          tr:nth-child(even) {
            background-color: #fafafa;
          }

          .student-card {
            background-color: #ffffff;
            border: 1px solid #e5e5e5;
            border-radius: 0.375rem;
            overflow: hidden;
            text-align: center;
            transition: transform 0.2s ease-in-out, border-color 0.2s ease-in-out;
          }
          .student-card:hover {
            transform: translateY(-0.25rem);
            border-color: #a3a3a3;
          }
          .student-img-container {
            overflow: hidden;
            width: 100%;
            height: 190px;
            background-color: #f0f0f0;
          }
          .student-img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
            transition: transform 0.2s ease-in-out;
          }
          .student-card:hover .student-img {
            transform: scale(1.05);
          }
          .student-info {
            padding: 0.75rem;
          }
          .student-name {
            font-size: 0.875rem;
            font-weight: 500;
            color: #1a1a1a;
            margin-bottom: 0.25rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .student-meta {
            font-size: 11px;
            color: #666666;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .student-highlight {
            font-weight: 600;
            color: #000000;
          }
        </style>
      `;

      containerRef.current.shadowRoot.innerHTML = `${styles}${htmlContent || ''}`;
    }
  }, [htmlContent]);

  return <div ref={containerRef} className="w-full flow-root" />;
}