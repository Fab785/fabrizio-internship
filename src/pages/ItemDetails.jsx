import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EthImage from "../images/ethereum.svg";

const ItemDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const collection = location.state?.collection;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!collection) {
      navigate("/"); // Redirect to home if no data is available
    }
  }, [collection, navigate]);

  if (!collection) return null;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={collection.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={collection.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{collection.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i> 100
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i> 74
                    </div>
                  </div>

                  <p>
                    This is a placeholder description for {collection.title}.
                  </p>

                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <img className="lazy" src={collection.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="author_list_info">
                          <span>Creator ID: {collection.authorId}</span>
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>

                    <h6>Code</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{collection.code}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
