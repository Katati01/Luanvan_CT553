import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import EvenDetails from "../components/Events/EventDetailsCard";
import SuggestedProduct from "../components/Products/SuggestedProduct";
import { useSelector } from "react-redux";

const EvenDetailsPage = () => {
  const { allEvents } = useSelector((state) => state.events);
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (allEvents) {
      const data = allEvents && allEvents.find((i) => i._id === id);
      setData(data);
    }
  }, [allEvents, id]);

  return (
    <div>
      <Header />
      <EvenDetails data={data} />
      <Footer />
    </div>
  );
};

export default EvenDetailsPage;
