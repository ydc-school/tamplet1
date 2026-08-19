"use client";
import React from 'react';
import { useSchool } from "@/context/SchoolContext";
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    School,
    Globe,
    Award,
    BookOpen,
    Users,
    GraduationCap,
    Calendar,
    Youtube,
    User,
    ExternalLink
} from 'lucide-react';

export default () => {
    const { schoolInfo, loading } = useSchool();

    // Helper function to check if value exists
    const hasValue = (value) => {
        return value !== null && value !== undefined && value !== '';
    };

    return (
        <main className="flex-grow pt-[120px] bg-surface min-h-screen">
            <section className="max-w-container-max mx-auto px-gutter pt-stack-lg pb-stack-md">
                <div className="max-w-3xl">
                    {hasValue(schoolInfo?.Short_Name) && (
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-md text-label-md mb-4">
                            <School className="w-4 h-4" />
                            {schoolInfo.Short_Name}
                        </span>
                    )}
                    {hasValue(schoolInfo?.School_Name) && (
                        <h1 className="font-display-lg text-display-lg text-primary text-left mb-stack-sm">
                            {schoolInfo.School_Name}
                        </h1>
                    )}
                    {hasValue(schoolInfo?.Motto) && (
                        <p className="font-body-lg text-body-lg text-secondary text-left italic">
                            "{schoolInfo.Motto}"
                        </p>
                    )}
                </div>
            </section>

            <section className="max-w-container-max mx-auto px-gutter pb-stack-lg">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        {(hasValue(schoolInfo?.Board_Affiliation) ||
                            hasValue(schoolInfo?.Board_Affiliation_Number) ||
                            hasValue(schoolInfo?.Medium_Of_Instruction) ||
                            hasValue(schoolInfo?.Established_Year) ||
                            hasValue(schoolInfo?.Website)) && (
                                <div className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/30">
                                    <h2 className="font-title-lg text-title-lg text-primary mb-6 flex items-center gap-2">
                                        <School className="w-6 h-6 text-primary" />
                                        Overview & Affiliation
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {hasValue(schoolInfo?.Board_Affiliation) && (
                                            <div className="p-4 rounded-2xl bg-surface-container/50 border border-outline-variant/20">
                                                <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-1">
                                                    Board Affiliation
                                                </p>
                                                <p className="font-body-lg text-body-lg text-primary font-semibold flex items-center gap-2">
                                                    <Globe className="w-4 h-4 text-secondary" />
                                                    {schoolInfo.Board_Affiliation}
                                                </p>
                                                {hasValue(schoolInfo?.Board_Affiliation_Number) && (
                                                    <p className="font-body-md text-body-md text-secondary mt-1">
                                                        No: {schoolInfo.Board_Affiliation_Number}
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        {hasValue(schoolInfo?.Medium_Of_Instruction) && (
                                            <div className="p-4 rounded-2xl bg-surface-container/50 border border-outline-variant/20">
                                                <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-1">
                                                    Medium of Instruction
                                                </p>
                                                <p className="font-body-lg text-body-lg text-primary font-semibold flex items-center gap-2">
                                                    <BookOpen className="w-4 h-4 text-secondary" />
                                                    {schoolInfo.Medium_Of_Instruction}
                                                </p>
                                            </div>
                                        )}

                                        {hasValue(schoolInfo?.Established_Year) && (
                                            <div className="p-4 rounded-2xl bg-surface-container/50 border border-outline-variant/20">
                                                <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-1">
                                                    Established Year
                                                </p>
                                                <p className="font-body-lg text-body-lg text-primary font-semibold flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-secondary" />
                                                    {new Date(schoolInfo.Established_Year).getFullYear()}
                                                </p>
                                            </div>
                                        )}

                                        {hasValue(schoolInfo?.Website) && (
                                            <div className="p-4 rounded-2xl bg-surface-container/50 border border-outline-variant/20">
                                                <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-1">
                                                    Official Website
                                                </p>
                                                <a
                                                    href={schoolInfo.Website}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="font-body-lg text-body-lg text-primary hover:text-secondary font-semibold flex items-center gap-2 transition-colors truncate"
                                                >
                                                    <ExternalLink className="w-4 h-4 text-secondary shrink-0" />
                                                    Website Link
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                        {(hasValue(schoolInfo?.Address) ||
                            hasValue(schoolInfo?.City) ||
                            hasValue(schoolInfo?.State) ||
                            hasValue(schoolInfo?.Pin_Code)) && (
                                <div className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/30 flex flex-col gap-6">
                                    <h2 className="font-title-lg text-title-lg text-primary flex items-center gap-2">
                                        <MapPin className="w-6 h-6 text-primary" />
                                        Location & Campus Address
                                    </h2>
                                    <div className="space-y-2">
                                        {hasValue(schoolInfo?.Address) && (
                                            <p className="font-body-lg text-body-lg text-primary font-medium">
                                                {schoolInfo.Address}
                                            </p>
                                        )}
                                        {(hasValue(schoolInfo?.City) || hasValue(schoolInfo?.State)) && (
                                            <p className="font-body-md text-body-md text-secondary">
                                                {hasValue(schoolInfo?.City) && (
                                                    <>City: <span className="text-primary font-medium">{schoolInfo.City}</span></>
                                                )}
                                                {hasValue(schoolInfo?.City) && hasValue(schoolInfo?.State) && ' | '}
                                                {hasValue(schoolInfo?.State) && (
                                                    <>State: <span className="text-primary font-medium">{schoolInfo.State}</span></>
                                                )}
                                            </p>
                                        )}
                                        {hasValue(schoolInfo?.Pin_Code) && (
                                            <p className="font-body-md text-body-md text-secondary">
                                                Pin Code: <span className="text-primary font-medium">{schoolInfo.Pin_Code}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                    </div>

                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {(hasValue(schoolInfo?.Contact_Person_Name) ||
                            hasValue(schoolInfo?.Contact_Person_Position) ||
                            hasValue(schoolInfo?.Contact_Person_Phone) ||
                            hasValue(schoolInfo?.Alternate_Phone) ||
                            hasValue(schoolInfo?.Email) ||
                            hasValue(schoolInfo?.Youtube_Url)) && (
                                <div className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/30 flex flex-col gap-6">

                                    {(hasValue(schoolInfo?.Contact_Person_Name) ||
                                        hasValue(schoolInfo?.Contact_Person_Position) ||
                                        hasValue(schoolInfo?.Contact_Person_Phone)) && (
                                            <>
                                                <div>
                                                    <h3 className="font-title-md text-title-md text-primary mb-4 flex items-center gap-2">
                                                        <User className="w-5 h-5 text-secondary" />
                                                        Key Authority
                                                    </h3>
                                                    <div className="p-4 rounded-2xl bg-surface-container/40 border border-outline-variant/20">
                                                        {hasValue(schoolInfo?.Contact_Person_Name) && (
                                                            <p className="font-body-lg text-body-lg text-primary font-semibold">
                                                                {schoolInfo.Contact_Person_Name}
                                                            </p>
                                                        )}
                                                        {hasValue(schoolInfo?.Contact_Person_Position) && (
                                                            <p className="font-body-md text-body-md text-secondary mb-3">
                                                                {schoolInfo.Contact_Person_Position}
                                                            </p>
                                                        )}
                                                        {hasValue(schoolInfo?.Contact_Person_Phone) && (
                                                            <a
                                                                className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors font-body-md text-body-md"
                                                                href={`tel:${schoolInfo.Contact_Person_Phone}`}
                                                            >
                                                                <Phone className="w-4 h-4 text-secondary" />
                                                                +91 {schoolInfo.Contact_Person_Phone}
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="w-full h-px bg-outline-variant/30"></div>
                                            </>
                                        )}

                                    {(hasValue(schoolInfo?.Alternate_Phone) ||
                                        hasValue(schoolInfo?.Email) ||
                                        hasValue(schoolInfo?.Youtube_Url)) && (
                                            <>
                                                <div>
                                                    <h3 className="font-title-md text-title-md text-primary mb-4 flex items-center gap-2">
                                                        <Phone className="w-5 h-5 text-secondary" />
                                                        Contact & Support
                                                    </h3>
                                                    <div className="flex flex-col gap-3">
                                                        {hasValue(schoolInfo?.Alternate_Phone) && (
                                                            <a
                                                                className="flex items-center gap-3 p-3 rounded-xl bg-surface-container/40 hover:bg-surface-container transition-colors font-body-md text-body-md text-primary"
                                                                href={`tel:${schoolInfo.Alternate_Phone}`}
                                                            >
                                                                <Phone className="w-4 h-4 text-secondary" />
                                                                +91 {schoolInfo.Alternate_Phone}
                                                            </a>
                                                        )}
                                                        {hasValue(schoolInfo?.Email) && (
                                                            <a
                                                                className="flex items-center gap-3 p-3 rounded-xl bg-surface-container/40 hover:bg-surface-container transition-colors font-body-md text-body-md text-primary"
                                                                href={`mailto:${schoolInfo.Email}`}
                                                            >
                                                                <Mail className="w-4 h-4 text-secondary" />
                                                                {schoolInfo.Email}
                                                            </a>
                                                        )}
                                                        {hasValue(schoolInfo?.Youtube_Url) && (
                                                            <a
                                                                className="flex items-center gap-3 p-3 rounded-xl bg-surface-container/40 hover:bg-surface-container transition-colors font-body-md text-body-md text-primary"
                                                                href={schoolInfo.Youtube_Url}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                            >
                                                                <Youtube className="w-4 h-4 text-secondary" />
                                                                Official YouTube Channel
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="w-full h-px bg-outline-variant/30"></div>
                                            </>
                                        )}

                                    <div>
                                        <h3 className="font-title-md text-title-md text-primary mb-3 flex items-center gap-2">
                                            <Clock className="w-5 h-5 text-secondary" />
                                            Office Hours
                                        </h3>
                                        <div className="p-4 rounded-2xl bg-surface-container/40 border border-outline-variant/20">
                                            <p className="font-body-md text-body-md text-secondary">
                                                Monday - Saturday<br />
                                                <span className="text-primary font-medium">8:00 AM - 4:00 PM (IST)</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </section>
        </main>
    );
};