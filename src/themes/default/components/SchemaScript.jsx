export default function SchemaScript({ schemaJson }) {
  if (!schemaJson) return null;

  const schema =
    typeof schemaJson === "string" ? schemaJson : JSON.stringify(schemaJson);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schema }}
    />
  );
}
