"use client";
import { useEffect, useState, use } from "react";
import axios from "axios";

export default function DynamicPage({ params: paramsPromise }) {
    const params = use(paramsPromise);
    const { id } = params;
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPageContent = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/client/pages/${id}`);
                if (response.data.status === "success") {
                    setPageData(response.data.data);
                } else {
                    setError(response.data.message || "Failed to fetch page data");
                }
            } catch (err) {
                console.error("Error fetching page:", err);
                setError("Error loading page content. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPageContent();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    if (!pageData) return null;

    return (
        <main className="min-h-[60vh] py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 capitalize">
                    {pageData.Name.replace(/-/g, " ")}
                </h1>

                <div
                    className="prose prose-blue max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: pageData.Page_Data }}
                />
            </div>
        </main>
    );
}
