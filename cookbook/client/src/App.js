import "./App.css";
import Banner from "./bricks/Banner";
import CookbookList from "./bricks/CookbookList";
import 'bootstrap/dist/css/bootstrap.min.css';



const intro = {
  introTxt: "... ? kuchařka nebo tak něco ...",
};

const cookbookList = [
  {
    name: "Salát z naklíčené čočky",
    description: "čočka",
    ingredients: "Ingredients a b c d",
    process: "Mrkev, okurku a papriku nakrájejte na malé kostičky a dejte do větší mísy spolu s naklíčenou čočkou. Cibuli nakrájejte najemno a přidejte k zelenině. Přisypte nasekanou petrželku. V misce nebo hrníčku důkladně promíchejte lák z okurek, olivový olej a med. Zálivku nalijte do mísy a důkladně promíchejte. Na závěr dochuťte solí a pepřem.",
    id: "8fd09f3f5e2b4326",
  },
  {
    name:  "Ovesné placičky",
    description: "Ovesné placičky desc",
    ingredients: "Ingredients a b c d",
    process: "Cibuli oloupejte a nastrouhejte nahrubo. Mrkev důkladně umyjte a nastrouhejte najemno spolu s česnekem. V míse smíchejte vločky, cibuli, mrkev, česnek a koření. Přidejte strouhanku a důkladně promíchejte, ideálně rukou tak, aby vznikla jednotná směs. Pokud je směs příliš suchá, přidejte trošku vody, pokud je příliš mokrá, přidejte trošku strouhanky. Na pánvi rozpalte olej, ze směsi vytvarujte malé placičky a smažte z obou stran dozlatova.",
    id: "8fd09f3f5e2b4326",
  },
  {
    name: "Barbecue burger ze zbylého kuřete",
    description: "Desc",
    ingredients: "Ingredients a b c d",
    process: "Process",
    id: "8fd09f3f5e2b4326",
  },


];

function App() {
  return (
    <div className="App">
    
      <Banner classroom={intro} />
    
      <CookbookList cookbookList={cookbookList} />
    </div>
  );
}

export default App;
