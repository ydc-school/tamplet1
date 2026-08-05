"use client";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useSchool } from "@/context/SchoolContext";


import { motion } from "motion/react";
import { fadeUp } from "@/utils/animtion";

export default function WelcomeSection() {
  return (
    <>
      <section className="py-section-padding bg-white" id="about">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex flex-col items-center mb-stack-lg">
            <motion.h2
              {...fadeUp}
              className="font-headline-lg-main text-headline-lg text-heritage-navy uppercase tracking-widest mb-4">About Us
            </motion.h2>
            <div className="w-24 h-1 bg-academic-gold"></div>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg leading-relaxed text-on-surface-variant font-body-md-main">
            <motion.div
                {...fadeUp}
              className="space-y-4">
              <p>Yaduvanshi Group of Institutions, founded in 1995 by Mr. Rao Bahadur Singh under Rao Chiranji Lal
                Samriti Jan Seva Trust, is a premier educational network across Haryana, including Mahendergarh,
                Narnaul, Rewari, and Satnali.</p>
              <p>Our lush, modern campuses offer top-tier programs in Engineering, Management, Pharmacy, and
                Education. We focus on academic excellence, holistic development, and competitive exam success.
                Combining advanced laboratories, sports, and cultural activities, the Group grooms disciplined,
                skilled global professionals deeply rooted in Indian values, ready to face modern challenges
                with confidence.</p>
            </motion.div>
            <motion.div   {...fadeUp} className="space-y-4">
              <p>Our campuses stand out for their state-of-the-art infrastructure, designed to bridge the gap
                between theoretical knowledge and real-world skills. Students gain hands-on experience through
                regular industry visits, corporate guest lectures, and mandatory internship programs. This
                strong emphasis on practical exposure ensures that our graduates are highly employable and ready
                to excel in the competitive global job market.</p>
              <p>Furthermore, we take immense pride in our dedicated placement cell, which works tirelessly to
                connect students with top-tier national and multinational companies. Through comprehensive
                personality development bootcamps, mock interviews, and soft-skills training, we empower every
                individual to secure rewarding career opportunities and achieve long-term professional success.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
