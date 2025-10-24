import '../App.css';
import Card from './Card'
import CardV3 from "./CardV3"
import CardV2 from "./CardV2"
import CardList from './CardList'

function Demo() {
    return (
        <div className="App container">
            <div className="bg-light py-1 mb-2">
                <h2 className="text-center">Example Application</h2>
            </div>
            <div className="row justify-content-center">
                <Card itemId="1"
                    itemName="test record1"
                    itemDescription="test record 1 Desc"
                    itemImage="https://upload.wikimedia.org/wikipedia/commons/0/04/So_happy_smiling_cat.jpg"
                    itemCost="15.00"
                />
                <CardV3 itemId="2"
                    itemName="test record1"
                    itemDescription="test record 2 Desc"
                    itemImage="https://upload.wikimedia.org/wikipedia/commons/0/04/So_happy_smiling_cat.jpg"
                    itemCost="10.00"
                />
                <CardV3 itemId="2"
                    itemName="test record1"
                    itemDescription="test record 3 Desc"
                    itemImage="https://upload.wikimedia.org/wikipedia/commons/0/04/So_happy_smiling_cat.jpg"
                    itemCost="10.00"
                />
                <CardList />
            </div>
        </div>
    );
}

export default Demo;

