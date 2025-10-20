
const CardV3 = ({itemId, itemName, itemDescription, itemCost, itemImage}) => (
        <div className="card col-4 mb-2" style={{ width: 18 + 'rem' }}>
            <img className="card-img-top" alt="Card image cap" src={itemImage} alt={"Image of " + itemName} />
            <div className="card-body">
            <h5 className="card-title">{itemName}</h5>
            <p className="card-title">{itemDescription}</p>
            <a href="#" className="btn btn-primary">Explore!</a>

            </div>
        </div >
)

export default CardV3
