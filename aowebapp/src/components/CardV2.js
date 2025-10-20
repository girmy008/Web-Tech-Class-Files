
function CardV2({ itemId, itemName, itemDescription, itemCost, itemImage }) {
    return(
        <div className="card col-4 mb-2" style={{ width: 18 + 'rem' }}>
            <img className="card-img-top" src="..." alt="Card image cap" src={itemImage} alt={"Image of " + itemName} />
            <div className="card-body">
                <h5 className="card-title">props.itemName</h5>
                <p className="card-title">can't be stuffed</p>
                <a href="#" className="btn btn-primary">Explore!</a>

            </div>
        </div >
    )
}

export default CardV2
