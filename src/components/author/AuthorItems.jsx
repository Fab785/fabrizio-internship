import React from "react";
import { Link } from "react-router-dom";

const AuthorItems = ({ items, authorImage }) => {
  return (
    <div className="row">
      {items.map((item) => (
        <div key={item.id} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
          <div className="nft__item">
            <div className="author_list_pp">
              <span>
                <img className="lazy" src={authorImage} alt="author" />
                <i className="fa fa-check"></i>
              </span>
            </div>

            <div className="nft__item_wrap">
              <Link to={`/item-details/${item.id}`}>
                <img
                  src={item.nftImage}
                  className="lazy nft__item_preview"
                  alt={item.title}
                />
              </Link>
            </div>

            <div className="nft__item_info">
              <span>{item.title}</span>
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

export default AuthorItems;


