import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(expiryDate) - new Date();
      if (difference <= 0) return "Expired";

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      return `${hours}h ${minutes}m ${seconds}s`;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  return <div className="de_countdown">{timeLeft}</div>;
};

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchItems = async (selectedFilter = "") => {
    try {
      setLoading(true);
      const url = selectedFilter
        ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${selectedFilter}`
        : "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

      const response = await fetch(url);
      const data = await response.json();
      setItems(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch items:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(filter);
  }, [filter]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <section id="section-explore" className="pt-5">
      <div className="container">       
      <div className="row mb-4">
  <div className="col-md-3">
    <select className="form-select" onChange={handleFilterChange}>
      <option value="">Default</option>
      <option value="price_low_to_high">Price: Low to High</option>
      <option value="price_high_to_low">Price: High to Low</option>
      <option value="likes_high_to_low">Most Liked</option>
    </select>
  </div>
</div>


        <div className="row">
          {loading ? (
            <div className="text-center">
              <p>Loading...</p>
            </div>
          ) : (
            items.slice(0, visibleCount).map((item) => (
              <div key={item.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img className="lazy" src={item.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  <CountdownTimer expiryDate={item.expiryDate} />

                  <div className="nft__item_wrap">
                    <Link to={`/item-details/${item.nftId}`} state={{ collection: item }}>
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>

                  <div className="nft__item_info">
                    <Link to={`/item-details/${item.nftId}`} state={{ collection: item }}>
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
            ))
          )}
        </div>

        {!loading && visibleCount < items.length && (
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExploreItems;
