import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const BrowseByCategory = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const categories = [
    { icon: "fa-image", label: "Art" },
    { icon: "fa-music", label: "Music" },
    { icon: "fa-search", label: "Domain Names" },
    { icon: "fa-globe", label: "Virtual Worlds" },
    { icon: "fa-vcard", label: "Trading Cards" },
    { icon: "fa-th", label: "Collectibles" },
  ];

  return (
    <section id="section-category" className="no-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-up">
              <h2>Browse by category</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {categories.map((category, index) => (
            <div
              className="col-md-2 col-sm-4 col-6 mb-sm-30"
              key={index}
              data-aos="fade-right"  // Animation from the left
              data-aos-delay={index * 100} // Stagger delay for each item
            >
              <Link to="/explore" className="icon-box style-2 rounded">
                <i className={`fa ${category.icon}`}></i>
                <span>{category.label}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;
