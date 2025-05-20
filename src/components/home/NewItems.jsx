import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

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

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHoveringLeft, setIsHoveringLeft] = useState(false);
  const [isHoveringRight, setIsHoveringRight] = useState(false);
  const [isPressingLeft, setIsPressingLeft] = useState(false);
  const [isPressingRight, setIsPressingRight] = useState(false);

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

  const leftIntervalRef = useRef(null);
  const rightIntervalRef = useRef(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        const data = await res.json();
        setItems(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch new items:", err);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Clear intervals on unmount
  useEffect(() => {
    return () => {
      clearInterval(leftIntervalRef.current);
      clearInterval(rightIntervalRef.current);
    };
  }, []);

  const startLeftScroll = () => {
    if (leftIntervalRef.current) return; // already scrolling
    leftIntervalRef.current = setInterval(() => {
      slider.current?.prev();
    }, 150);
  };

  const stopLeftScroll = () => {
    clearInterval(leftIntervalRef.current);
    leftIntervalRef.current = null;
  };

  const startRightScroll = () => {
    if (rightIntervalRef.current) return; // already scrolling
    rightIntervalRef.current = setInterval(() => {
      slider.current?.next();
    }, 150);
  };

  const stopRightScroll = () => {
    clearInterval(rightIntervalRef.current);
    rightIntervalRef.current = null;
  };

  const leftButtonStyle = {
    position: "absolute",
    top: "50%",
    left: "-5px",
    transform: `translateY(-50%) scale(${
      isPressingLeft ? 0.9 : isHoveringLeft ? 1.15 : 1
    })`,
    zIndex: 10,
    backgroundColor: "white",
    border: "2px solid #d1d5db",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "20px",
    boxShadow: isHoveringLeft
      ? "0 6px 18px rgba(0, 0, 0, 0.3)"
      : "0 4px 12px rgba(0, 0, 0, 0.15)",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
    userSelect: "none",
  };

  const rightButtonStyle = {
    position: "absolute",
    top: "50%",
    right: "-5px",
    transform: `translateY(-50%) scale(${
      isPressingRight ? 0.9 : isHoveringRight ? 1.15 : 1
    })`,
    zIndex: 10,
    backgroundColor: "white",
    border: "2px solid #d1d5db",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "20px",
    boxShadow: isHoveringRight
      ? "0 6px 18px rgba(0, 0, 0, 0.3)"
      : "0 4px 12px rgba(0, 0, 0, 0.15)",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
    userSelect: "none",
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row mb-4">
          <div className="col-lg-12 text-center">
            <h2>New Items</h2>
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
              onClick={() => slider.current?.prev()}
              onMouseDown={() => {
                setIsPressingLeft(true);
                startLeftScroll();
              }}
              onMouseUp={() => {
                setIsPressingLeft(false);
                stopLeftScroll();
              }}
              onMouseLeave={() => {
                setIsPressingLeft(false);
                stopLeftScroll();
                setIsHoveringLeft(false);
              }}
              onMouseEnter={() => setIsHoveringLeft(true)}
              onMouseOut={() => setIsHoveringLeft(false)}
              style={leftButtonStyle}
              aria-label="Previous slide"
            >
              &#60;
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => slider.current?.next()}
              onMouseDown={() => {
                setIsPressingRight(true);
                startRightScroll();
              }}
              onMouseUp={() => {
                setIsPressingRight(false);
                stopRightScroll();
              }}
              onMouseLeave={() => {
                setIsPressingRight(false);
                stopRightScroll();
                setIsHoveringRight(false);
              }}
              onMouseEnter={() => setIsHoveringRight(true)}
              onMouseOut={() => setIsHoveringRight(false)}
              style={rightButtonStyle}
              aria-label="Next slide"
            >
              &#62;
            </button>

            {/* Slider */}
            <div ref={sliderRef} className="keen-slider">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="keen-slider__slide"
                  style={{ padding: "0 10px" }}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <CountdownTimer expiryDate={item.expiryDate} />

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="#" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="#" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="#">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <Link
                        to={`/item-details/${item.nftId}`}
                        state={{ collection: item }}
                      >
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>

                    <div className="nft__item_info">
                      <Link
                        to={`/item-details/${item.nftId}`}
                        state={{ collection: item }}
                      >
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
          </div>
        )}
      </div>
    </section>
  );
};

export default NewItems;
