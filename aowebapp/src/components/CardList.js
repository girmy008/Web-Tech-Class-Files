import React, { useState, useEffect } from "react";
import CardV3 from "./CardV3";

const CardListSearch = () => {
    const [cardData, setCardData] = useState([]);
    const [searchText, setSearchText] = useState("");

    // Fetch all items initially
    useEffect(() => {
        fetchItems();
    }, []);

    // Fetch items from API with optional search text
    const fetchItems = (query = "") => {
        const url = query
            ? `http://localhost:5154/api/ItemsWebApi/getItems?searchText=${encodeURIComponent(query)}`
            : `http://localhost:5154/api/ItemsWebApi/getItems`;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                // If your API wraps results in an object, adjust here
                // e.g., setCardData(data.items)
                setCardData(data);
            })
            .catch((err) => console.error("Error fetching data:", err));
    };

    // Called when search button is clicked
    const searchQuery = () => {
        fetchItems(searchText.trim()); // fetch items based on current input
    };

    return (
        <div id="CardListSearch" className="container mt-4">
            {/* Search bar */}
            <div className="row justify-content-start mb-3">
                <div className="col-3">
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="form-control"
                        placeholder="Type your query"
                    />
                </div>
                <div className="col text-left">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={searchQuery}
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Cards */}
            <div className="row">
                {cardData.length > 0 ? (
                    cardData.map((obj) => (
                        <CardV3
                            key={obj.itemId}
                            itemId={obj.itemId}
                            itemName={obj.itemName}
                            itemDescription={obj.itemDescription}
                            itemCost={obj.itemCost}
                            itemImage={obj.itemImage}
                        />
                    ))
                ) : (
                    <p>No items found.</p>
                )}
            </div>
        </div>
    );
};

export default CardListSearch;
