import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ExploreItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchExploreItems = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch explore items:", error);
      }
    };

    fetchExploreItems();
  }, []);

  return (
    <div className="row">
      {items.map((item) => (
        <div key={item.nftId} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
          <div className="nft__item">
            <div className="author_list_pp">
              <Link to={`/author/${item.authorId}`}>
                <img className="lazy" src={item.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>

            <div className="nft__item_wrap">
              <Link to={`/item-details/${item.nftId}`}>
                <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>

            <div className="nft__item_info">
              <Link to={`/item-details/${item.nftId}`}>
                <h4>{item.title}</h4>
              </Link>
              <div className="nft__item_price">{item.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExploreItems;

