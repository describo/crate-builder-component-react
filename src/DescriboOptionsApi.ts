const crate1 = {
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
      "foo": "barr"
    }
  ]
}

export default {
  data() {
    return {
      currentCrate: crate1,
    };
  },
  methods: {
    changeCrate(newCrate) {
      this.currentCrate = newCrate
      console.log("this.currentCrate", this)
    }
  },
  template: `
            <describo-crate-builder
                :crate="currentCrate"
            />
<!--            <div>{{JSON.stringify(currentCrate)}}</div>-->
        `,
}
