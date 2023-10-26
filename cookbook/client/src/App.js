import "./App.css";
import Banner from "./bricks/Banner";
import CookbookList from "./bricks/CookbookList";
import 'bootstrap/dist/css/bootstrap.min.css';
import burgerImg from './assets/burger.PNG';
import cockaImg from './assets/čočka.PNG';
import yummy from './assets/Sprite-0002.png';
import { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import styles from "./css/cookBook.module.css";

const StateType = {
  SUCCESS: "success",
  ERROR: "error",
  PENDING: "pending"  
};

function App() {
  const [cookBookLoadCall, setcookBookLoadCall] = useState({
    state: StateType.PENDING,
  });

  useEffect(() => {
    fetch(`http://localhost:8000/recipe/list`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
    
        setcookBookLoadCall({ state: StateType.ERROR, error: responseJson });
      } else {
        setcookBookLoadCall({ state: StateType.SUCCESS, data: responseJson });
      }
    });
  }, []);

  function getChild() {
  
    switch (cookBookLoadCall.state) {
      case StateType.PENDING:
        return (
          <div className={styles.loading}>
            <Icon size={2} path={mdiLoading} spin={true} />
          </div>
        );
      case StateType.SUCCESS:
        return (
          <>
           
            <CookbookList cookbook={cookBookLoadCall.data} />
          </>
        );
      case StateType.ERROR:
        return (
          <div className={styles.error}>
            <div>Nepodařilo se načíst data o třídě.</div>
            <br />
            <pre>{JSON.stringify(cookBookLoadCall.error, null, 2)}</pre>
          </div>
        );
      default:
        return null;
    }
  }

  return <div className="App">{getChild()}</div>;
}

export default App;
