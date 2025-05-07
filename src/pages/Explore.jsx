import React, { useEffect } from "react";
import ExploreItems from "../components/explore/ExploreItems";
import HeaderExplore from "../components/explore/HeaderExplore";
import subheader from "../images/subheader.jpg";

const Explore = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="subheader"
          className="text-light"
          style={{
            background: `url(${subheader}) no-repeat top center`,
            backgroundSize: "cover",
          }}
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <HeaderExplore />
              <ExploreItems />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;

