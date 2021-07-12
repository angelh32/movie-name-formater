import * as React from "react";
import { MediaData } from "../types";

interface Props {
  movieList: MediaData[];
  changeCurrent: (newCurrent: MediaData) => any;
}

export const ListComponent: React.FC<Props> = (props) => {
  const selectCurrent = (current:MediaData) => {
    return ()=>{
      return props.changeCurrent(current);
    }
  }
  const listItems = props.movieList.map((media)=>{
    return <li key={media.key}>{media.name} <button onClick={selectCurrent(media)}>Select</button></li>;
  })
  return (<ul>{listItems}</ul>)
};