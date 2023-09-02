
export let theCrate = {
  "@context": [
    "https://w3id.org/ro/crate/1.1/context",
    {
      "@vocab": "http://schema.org/"
    },
    {
      "txc": {
        "@id": "http://purl.archive.org/textcommons/terms#"
      }
    },
    {
      "@base": null
    }
  ],
  "@graph": [
    {
      "@id": "ro-crate-metadata.json",
      "@type": "CreativeWork",
      "conformsTo": {
        "@id": "https://w3id.org/ro/crate/1.1"
      },
      "about": {
        "@id": "./"
      }
    },
    {
      "@id": "./",
      "@type": [
        "Dataset"
      ],
      "name": "./",
      "foo": "bar"
    }
  ]
}

export function setTheCrate(newCrate) {
  theCrate = newCrate
}
