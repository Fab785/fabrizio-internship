import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { Link } from "react-router-dom";
import "keen-slider/keen-slider.min.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 1, spacing: 10 },
      },
      "(min-width: 769px) and (max-width: 1024px)": {
        slides: { perView: 2, spacing: 12 },
      },
    },
  });

  let holdInterval = null;

  const startHold = (direction) => {
    if (slider.current) {
      holdInterval = setInterval(() => {
        direction === "prev" ? slider.current.prev() : slider.current.next();
      }, 200);
    }
  };

  const stopHold = () => {
    clearInterval(holdInterval);
  };

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        const data = await res.json();
        setCollections(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch hot collections:", err);
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row mb-4">
          <div className="col-lg-12 text-center">
            <h2>Hot Collections</h2>
            <div className="small-border bg-color-2"></div>
          </div>
        </div>

        {loading ? (
          <div className="text-center">
            <p>Loading...</p>
          </div>
        ) : (
          <div style={{ position: "relative" }}>
            {/* Left Arrow */}
            <button
              onMouseDown={() => startHold("prev")}
              onMouseUp={stopHold}
              onMouseLeave={stopHold}
              style={{
                position: "absolute",
                top: "50%",
                left: "-20px",
                transform: "translateY(-50%)",
                zIndex: 10,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                border: "none",
                padding: "10px",
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: "18px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              }}
            >
              &#60;
            </button>

            {/* Right Arrow */}
            <button
              onMouseDown={() => startHold("next")}
              onMouseUp={stopHold}
              onMouseLeave={stopHold}
              style={{
                position: "absolute",
                top: "50%",
                right: "-20px",
                transform: "translateY(-50%)",
                zIndex: 10,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                border: "none",
                padding: "10px",
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: "18px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              }}
            >
              &#62;
            </button>

            {/* Slider */}
            <div ref={sliderRef} className="keen-slider">
              {collections.map((collection, index) => (
                <div key={index} className="keen-slider__slide">
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${collection.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>{collection.authorName}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HotCollections;















