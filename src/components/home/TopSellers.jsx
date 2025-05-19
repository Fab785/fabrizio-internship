import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const res = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        const data = await res.json();
        setSellers(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch top sellers:", err);
      }
    };

    fetchTopSellers();
  }, []);

  const numColumns = 4;
  const numRows = 3;
  const columns = Array.from({ length: numColumns }, (_, colIndex) =>
    Array.from({ length: numRows }, (_, rowIndex) => {
      const index = rowIndex + colIndex * numRows;
      return sellers[index] ? { ...sellers[index], rank: index + 1 } : null;
    }).filter(Boolean)
  );

  return (
    <section id="section-popular">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center mb-4">
            <h2>Top Sellers</h2>
            <div className="small-border"></div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {columns.map((col, colIndex) => (
              <div
                key={colIndex}
                style={{
                  width: "23%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {col.map((seller) => (
                  <Link
                    to={`/author/${seller.authorId}`}
                    key={seller.rank}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <span style={{ fontWeight: "bold", minWidth: "20px" }}>
                      {seller.rank}.
                    </span>
                    <div
                      style={{
                        position: "relative",
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.firstChild.style.border =
                          "2px solid #8364e2";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.firstChild.style.border =
                          "2px solid transparent";
                      }}
                    >
                      <img
                        src={seller.authorImage}
                        alt={seller.authorName}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "50%",
                          border: "2px solid transparent",
                          transition: "border 0.3s ease",
                        }}
                      />
                    </div>
                    <div>
                      <div style={{ fontWeight: "600" }}>
                        {seller.authorName}
                      </div>
                      <div style={{ fontSize: "0.9em", color: "#777" }}>
                        {seller.price} ETH
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;





