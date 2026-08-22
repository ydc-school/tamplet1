
export default function IsolatedContent({ htmlContent }) {
  return (
    <div
      className="
        w-full flow-root isolate
        
        /* Table Styles */
        [&_table]:w-full [&_table]:mb-6 [&_table]:border-collapse [&_table]:border [&_table]:border-[#e5e5e5] [&_table]:rounded-md [&_table]:overflow-hidden
        [&_thead]:bg-[#f9f9f9]
        [&_th]:border-2 [&_th]:border-[#0c0c0c] [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-[#171717]
        [&_td]:border-2 [&_td]:border-[#0c0c0c] [&_td]:px-4 [&_td]:py-3 [&_td]:text-sm [&_td]:text-[#404040]
        [&_tr:nth-child(even)]:bg-[#fafafa]

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