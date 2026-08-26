
export default function IsolatedContent({ htmlContent }) {
  return (
    <article
      className="
        w-full flow-root isolate text-[16px] leading-[1.8] text-[#404040]

        [&_h1:not([class])]:mt-10 [&_h1:not([class])]:mb-4 [&_h1:not([class])]:font-serif [&_h1:not([class])]:text-2xl [&_h1:not([class])]:font-semibold [&_h1:not([class])]:text-[#171717]
        [&_h2:not([class])]:mt-10 [&_h2:not([class])]:mb-4 [&_h2:not([class])]:font-serif [&_h2:not([class])]:text-xl [&_h2:not([class])]:font-semibold [&_h2:not([class])]:text-[#171717]
        [&_h3:not([class])]:mt-8 [&_h3:not([class])]:mb-3 [&_h3:not([class])]:font-serif [&_h3:not([class])]:text-lg [&_h3:not([class])]:font-semibold [&_h3:not([class])]:text-[#171717]
        [&_h4:not([class])]:mt-6 [&_h4:not([class])]:mb-2 [&_h4:not([class])]:font-serif [&_h4:not([class])]:text-base [&_h4:not([class])]:font-semibold [&_h4:not([class])]:text-[#171717]
        [&_p:not([class])]:mb-6 [&_strong:not([class])]:font-semibold [&_strong:not([class])]:text-[#171717]
        [&_a:not([class])]:text-[#171717] [&_a:not([class])]:underline [&_a:not([class])]:underline-offset-4 [&_a:not([class])]:decoration-[#a3a3a3] hover:[&_a:not([class])]:decoration-[#171717]
        [&_ul:not([class])]:mb-6 [&_ul:not([class])]:list-disc [&_ul:not([class])]:pl-5 [&_ol:not([class])]:mb-6 [&_ol:not([class])]:list-decimal [&_ol:not([class])]:pl-5 [&_li:not([class])]:mb-2
        [&_img:not([class])]:my-8 [&_img:not([class])]:max-w-full [&_img:not([class])]:h-auto [&_img:not([class])]:rounded-md

        /* Table Styles */
        [&_table:not([class])]:w-full [&_table:not([class])]:mb-6 [&_table:not([class])]:border-collapse [&_table:not([class])]:border [&_table:not([class])]:border-[#e5e5e5] [&_table:not([class])]:rounded-md [&_table:not([class])]:overflow-hidden
        [&_thead:not([class])]:bg-[#f9f9f9]
        [&_th:not([class])]:border-2 [&_th:not([class])]:border-[#0c0c0c] [&_th:not([class])]:px-4 [&_th:not([class])]:py-3 [&_th:not([class])]:text-left [&_th:not([class])]:text-xs [&_th:not([class])]:font-semibold [&_th:not([class])]:uppercase [&_th:not([class])]:tracking-wider [&_th:not([class])]:text-[#171717]
        [&_td:not([class])]:border-2 [&_td:not([class])]:border-[#0c0c0c] [&_td:not([class])]:px-4 [&_td:not([class])]:py-3 [&_td:not([class])]:text-sm [&_td:not([class])]:text-[#404040]
        [&_tr:not([class]):nth-child(even)]:bg-[#fafafa]

        /* Student Card Styles */
        [&_.student-card]:bg-white [&_.student-card]:border [&_.student-card]:border-[#e5e5e5] [&_.student-card]:rounded-md [&_.student-card]:overflow-hidden [&_.student-card]:text-center [&_.student-card]:transition-all [&_.student-card]:duration-200 [&_.student-card]:ease-in-out [&_.student-card:hover]:-translate-y-1 [&_.student-card:hover]:border-[#a3a3a3]

        /* Student Image Styles */
        [&_.student-img-container]:overflow-hidden [&_.student-img-container]:w-full [&_.student-img-container]:h-[190px] [&_.student-img-container]:bg-[#f0f0f0]
        [&_.student-img]:w-full [&_.student-img]:h-full [&_.student-img]:object-contain [&_.student-img]:block [&_.student-img]:transition-transform [&_.student-img]:duration-200 [&_.student-img]:ease-in-out
        [&_.student-card:hover_.student-img]:scale-105

        /* Student Details Styles */
        [&_.student-info]:p-3
        [&_.student-name]:text-sm [&_.student-name]:font-medium [&_.student-name]:text-[#1a1a1a] [&_.student-name]:mb-1 [&_.student-name]:whitespace-nowrap [&_.student-name]:overflow-hidden [&_.student-name]:text-ellipsis
        [&_.student-meta]:text-[11px] [&_.student-meta]:text-[#666666] [&_.student-meta]:whitespace-nowrap [&_.student-meta]:overflow-hidden [&_.student-meta]:text-ellipsis
        [&_.student-highlight]:font-semibold [&_.student-highlight]:text-black
      "
      dangerouslySetInnerHTML={{ __html: htmlContent || '' }}
    />
  );
}
