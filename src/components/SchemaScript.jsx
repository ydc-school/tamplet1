export default function SchemaScript({ schemaJson }) {
  if (!schemaJson) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schemaJson }}
    />
  );
}