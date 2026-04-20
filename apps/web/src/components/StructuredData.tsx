export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "DriveSmart Academy",
    image: "https://example.com/logo.png",
    telephone: "+1-555-0100",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Main St",
      addressLocality: "Seattle",
      addressRegion: "WA",
      postalCode: "98101",
      addressCountry: "US"
    },
    areaServed: ["Seattle", "Bellevue", "Tacoma"]
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
