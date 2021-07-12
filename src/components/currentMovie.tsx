import * as React from "react";
import { MediaData } from "../types";

interface Props {
  current: MediaData;
  clearData: () => void
}

export const CurrentItemComponent: React.FC<Props> = (props) => {
  const { name, original, year, identifier,key } = props.current;
  const formatedName = `${name} (${year}) [${identifier}=${key}]`;

  function copyToClipboard() {
    navigator.clipboard.writeText(formatedName)
  }

  return (<div>
    <p>Name: {name}</p>
    <p>Original: {original}</p>
    <p>Original: {year}</p>
    <p>Identifier: {identifier}</p>
    <p>{formatedName}</p>
    <button id="copy-name" onClick={copyToClipboard}>Copy To clipboard</button>
    <button id="clear" onClick={props.clearData}>clear Data</button>
  </div>)
};

  // function copyToClipboard(str, mimeType = "text/plain") {
  //   document.oncopy = function (event) {
  //     event.clipboardData.setData(mimeType, str);
  //     event.preventDefault();
  //   };
  //   document.execCommand("copy", false, null);
  // }