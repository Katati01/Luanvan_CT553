import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import PageNotfound from "./PageNotfound";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  console.log(allEvents.length);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          {allEvents && allEvents?.length === 0 ? (
            <PageNotfound />
          ) : (
            <>
              {allEvents.map((allEvents, index) => (
                <EventCard key={index} data={allEvents} />
              ))}{" "}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default EventsPage;
