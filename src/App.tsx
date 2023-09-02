
import './App.css'
import DescriboCrateBuilder from "./DescriboCrateBuilder";
import {useState} from "react";
import {JSONObject} from "./types";

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

const crate2 = {
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
      "qqq": "www"
    }
  ]
}
import big from "./big.json"

function App() {
  const [crate, setCrate] = useState<JSONObject>(big)
  const [entityId, setEntityId] = useState("./")
  //#1828::0691bd09-477f-4108-aa28-df95278de417
  function changeCrate() {
    if (JSON.stringify(crate) == JSON.stringify(crate1)) {
      setCrate(crate2)
    }
    else {
      setCrate(crate1)
    }
  }
  return (
    <>
      <button onClick={changeCrate}>Change crate from react</button>
      <button onClick={() => setEntityId('#1828::0691bd09-477f-4108-aa28-df95278de417')}>Change entityId</button>
      <h1>DescriboNewSfcBased / Composition API</h1>
      <DescriboCrateBuilder
        crate={crate}
        language={"hu"}
        enableCratePreview={true}
        entityId={entityId}
        onReady={() => console.log("+++ onReady")}
        onSaveCrate={(updatedCrate: JSONObject) => console.log("+++ onSaveCrate", updatedCrate)}
        onNavigation={entity => console.log("+++ onNavigation", entity)}
        enableInternalRouting={false}
      />
    </>
  )
}

export default App
