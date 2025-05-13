import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EthImage from "../images/ethereum.svg";
import ImageSkeleton from "../components/UI/ImageSkeleton";
import TextSkeleton from "../components/UI/TextSkeleton";

const ItemDetails = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const [nft, setNft] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchNFT = async () => {
      try {
        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${itemId}`
        );
        const data = await res.json();
        setNft(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch NFT:", error);
        navigate("/");
      }
    };

    fetchNFT();
  }, [itemId, navigate]);

  if (!nft && !isLoading) return null;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {/* Left - Image */}
              <div className="col-md-6 text-center">
                {isLoading ? (
                  <ImageSkeleton />
                ) : (
                  <img
                    src={nft.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={nft.title}
                  />
                )}
              </div>

              {/* Right - Details */}
              <div className="col-md-6">
                <div className="item_info">
                  {isLoading ? (
                    <>
                      <TextSkeleton width="70%" />
                      <TextSkeleton width="50%" />
                    </>
                  ) : (
                    <>
                      <h2>{nft.title} #{nft.tag}</h2>
                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i> {nft.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i> {nft.likes}
                        </div>
                      </div>
                      <p>{nft.description}</p>
                    </>
                  )}

                  {!isLoading && (
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        {/* Owner Section */}
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <img
                              className="lazy"
                              src={nft.ownerImage}
                              alt={nft.ownerName}
                            />
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="author_list_info">
                            <span>{nft.ownerName}</span>
                          </div>
                        </div>

                        <div className="spacer-20"></div>

                        {/* Creator Section */}
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <img
                              className="lazy"
                              src={nft.creatorImage}
                              alt={nft.creatorName}
                            />
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="author_list_info">
                            <span>{nft.creatorName}</span>
                          </div>
                        </div>

                        <div className="spacer-40"></div>

                        {/* Price */}
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="ETH" />
                          <span>{nft.price} ETH</span>
                        </div>
                      </div>
                    </div>
                  )}
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






