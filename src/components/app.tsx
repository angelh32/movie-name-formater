import * as React from "react";
import { getMediaFromStorage } from "../helpers/chrome";
import { getMediaData } from "../operations";
import { MediaData } from "../types";
import { CurrentItemComponent } from "./CurrentItemComponent";
import { ListComponent } from "./ListComponent";

const App = () => {
  const queryInfo = {
    active: true,
    currentWindow: true
  };

  const [movies, setMovies] = React.useState<MediaData[]>([]);
  const [current, setCurrent] = React.useState<MediaData>({});

  function setCurrentExternal(newCurrent: MediaData) {
    setCurrent(newCurrent);
  }

  React.useEffect(() => {
    chrome.tabs.query(queryInfo, tabs => {
      const tab = tabs[0];
      function parseData(result) {
        return getMediaData(tab.url, result[0])
        .then(setCurrent)
        .then(getMediaFromStorage)
        .then(setMovies)
      }
      const code = { code: 'document.body.innerHTML' };
      return chrome.tabs.executeScript(tab.id, code, parseData);
    });
  }, []);
  function clearMediaStorage() {
    chrome.storage.local.clear(() => {
      setCurrent({})
      setMovies([])
    });
  }

  return (
    <>
      <CurrentItemComponent clearData={clearMediaStorage} current={current}/>
      <ListComponent movieList={movies} changeCurrent={setCurrentExternal}/>
    </>
  );
};
export default App;