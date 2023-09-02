
import './App.css'
import DescriboNewSfcBased from "./DescriboNewSfcBased";
import {useState} from "react";
import DescriboNewOptionsApiBased from "./DescriboNewOptionsApiBased";
import {DescriboCrateBuilder} from "@describo/crate-builder-component-react";

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
function App() {
  const [crate, setCrate] = useState(crate1)
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
      <h1>DescriboNewOptionsApiBased</h1>
      <DescriboNewOptionsApiBased crate={crate}/>
      <h1>DescriboNewSfcBased / Composition API</h1>
      <DescriboNewSfcBased crate={crate}/>
      {/*<h1>Oldschool</h1>*/}
      {/*<DescriboCrateBuilder crate={crate}/>*/}
      {/*{JSON.stringify(crate)}*/}
    </>
  )
}

export default App
