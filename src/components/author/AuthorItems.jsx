import React from "react";
import { Link } from "react-router-dom";

const AuthorItems = ({ items, authorImage }) => {
  return (
    <div className="row">
      {items.map((item) => (
        <div key={item.nftId} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
          <div className="nft__item">
            <div className="author_list_pp">
              <Link to={`/author/${item.authorId}`}>
                <div
                  style={{
                    position: "relative",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                  }}
                  className="author-hover-wrapper"
                >
                  <img
                    src={authorImage}
                    alt="author"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      border: "2px solid transparent",
                      transition: "border 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.border = "2px solid #8364e2")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.border = "2px solid transparent")
                    }
                  />
                  <i
                    className="fa fa-check"
                    style={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      background: "#fff",
                      borderRadius: "50%",
                      padding: "2px",
                      fontSize: "10px",
                    }}
                  ></i>
                </div>
              </Link>
            </div>

            <div className="nft__item_wrap">
              <Link to={`/item-details/${item.nftId}`}>
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



