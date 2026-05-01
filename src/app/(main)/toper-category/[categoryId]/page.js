import { redirect } from "next/navigation";

export default async function Page({ params }) {
  const { categoryId } = await params;
  redirect(`/topper-category/${categoryId}`);
}
