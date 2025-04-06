
import React, { useState, useEffect, useRef } from "react";
import { FaClock, FaEye } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";

export const Home = () => {
  const [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recipesRef = useRef(null);
  const homeRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const item = [
        { id: 1, name: "Pesarattu", time: "10 mins", image: "dish1.jpeg", rating: 4, views: 120 },
        { id: 2, name: "Masaladosa", time: "20 mins", image: "dish2.jpeg", rating: 5, views: 300 },
        { id: 3, name: "Paneer Biriyani", time: "50 mins", image: "dish3.jpeg", rating: 5, views: 456 },
        { id: 4, name: "Chowmein", time: "40 mins", image: "dish4.jpeg", rating: 3, views: 210 },
        { id: 5, name: "Chillie Gobi", time: "50 mins", image: "dish5.jpeg", rating: 4, views: 320 },
        { id: 6, name: "Ice-cream", time: "5 mins", image: "dish6.jpeg", rating: 5, views: 500 },
        { id: 7, name: "Curdrice", time: "20 mins", image: "dish7.jpeg", rating: 2, views: 80 },
        { id: 8, name: "Gulab Jamun", time: "10 mins", image: "dish8.jpeg", rating: 5, views: 210 },
        { id: 9, name: "Fried Rice", time: "30 mins", image: "dish9.jpeg", rating: 4, views: 450 },
      ];
      setData(item);
    };
    fetchData();
  }, []);

  const filteredData = searchItem
    ? data.filter((item) =>
        item.name.toLowerCase().includes(searchItem.toLowerCase())
      )
    : data;

  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const scrollToRecipes = () => {
    if (recipesRef.current) {
      recipesRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <AiFillStar
        key={i}
        color={i < rating ? "#FFD700" : "#ccc"}
        style={{ fontSize: "18px" }}
      />
    ));
  };

  return (
    <div
      style={{
        backgroundImage: `url('/bg..jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
        textAlign: "center",
      }}
    >
      <div
        ref={homeRef}
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <h2>Discover Amazing Recipes!</h2>
        <p>Find, cook, and enjoy your favorite dishes.</p>

        <input
          type="text"
          placeholder="Search recipes..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          style={{
            padding: "10px",
            width: "50%",
            maxWidth: "200px",
            borderRadius: "5px",
            border: "none",
            outline: "none",
            fontSize: "16px",
          }}
        />

        <button
          onClick={scrollToRecipes}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#ff9800",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          View Recipes ↓
        </button>
      </div>

      <div
        ref={recipesRef}
        id="recipes-section"
        style={{
          minHeight: "100vh",
          padding: "40px 10px",
          backgroundImage: `url('/bg..jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Recipes</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "25px",
            justifyContent: "center",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {records.length > 0 ? (
            records.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "white",
                  color: "black",
                  borderRadius: "12px",
                  boxShadow: "0px 6px 15px rgba(0,0,0,0.15)",
                  overflow: "hidden",
                  textAlign: "center",
                  paddingBottom: "10px",
                  border: "4px solid #f5f5f5",
                }}
              >
                <div style={{ padding: "8px" }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "230px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </div>

                <h5 style={{ marginTop: "10px" }}>{item.name}</h5>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0 20px",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "brown" }}>
                    <FaClock /> {item.time}
                  </span>

                  <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    {renderStars(item.rating)}
                  </span>
                </div>

                <div style={{ textAlign: "right", padding: "0 20px", marginTop: "5px", color: "#555" }}>
                  <FaEye style={{ marginRight: "5px" }} /> {item.views} views
                </div>
              </div>
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </div>

        {filteredData.length > 3 && (
          <div style={{ marginTop: "30px" }}>
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              style={{
                marginRight: "10px",
                padding: "10px 15px",
                cursor: "pointer",
                backgroundColor: "#ddd",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              style={{
                padding: "10px 15px",
                cursor: "pointer",
                backgroundColor: "#ddd",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
