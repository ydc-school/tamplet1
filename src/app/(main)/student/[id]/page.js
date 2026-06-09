import { headers } from "next/headers";
import { notFound } from "next/navigation";

import SchemaScript from "@/components/SchemaScript";
import {
  breadcrumbSchema,
  buildMetadata,
  cleanText,
  fetchClientData,
  getSiteUrl,
  personSchema,
  schemaGraph,
} from "@/lib/seo";

import StudentProfile from "./StudentProfileClient";

export const revalidate = 3600;

async function getStudent(id, headerList) {
  return fetchClientData(`/api/client/toper/${id}`, headerList);
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const headerList = await headers();
  const student = await getStudent(id, headerList);

  return buildMetadata({
    title: student
      ? `${student.Student_Name} Student Topper Profile`
      : "Student Profile Not Found",
    description: student
      ? cleanText(
          `${student.Student_Name} ${student.Student_Class || ""} topper profile, rank ${
            student.Rank || ""
          }, score ${student.Marks_Percentage || ""}%. ${student.Description || ""}`,
          160
        )
      : "The requested student profile could not be found.",
    path: `/student/${id}`,
    image: student?.Image ? `/uploads/${student.Image}` : undefined,
    robots: student ? "index,follow" : "noindex,follow",
    headerList,
  });
}

export default async function Page({ params }) {
  const { id } = await params;
  const headerList = await headers();
  const student = await getStudent(id, headerList);
  if (!student) notFound();

  const siteUrl = getSiteUrl(headerList);
  const schema = schemaGraph(
    personSchema({ student, siteUrl, path: `/student/${id}` }),
    breadcrumbSchema(siteUrl, [
      { name: "Home", path: "/" },
      { name: "Toppers", path: "/topper-category" },
      { name: student.Student_Name, path: `/student/${id}` },
    ])
  );

  return (
    <>
      <SchemaScript schemaJson={schema} />
      <StudentProfile id={id} initialStudent={student} initialLoaded />
    </>
  );
}
