import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
// import EventCard from "./EventCard";
import EventCard from "./EventSuggestCard";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <div>
      {!isLoading && (
        <>
          {allEvents.length !== 0 && (
            <>
              <div className={`${styles.section}`}>
                <div className={`${styles.heading}`}>
                  <h1>Sự kiện khuyến mãi, giảm giá nổi bật</h1>
                </div>
              </div>

              {/* <div className="w-full bg-[#f0f6f6] grid h-[55vh] overflow-x-auto hover:overflow-scroll">
                <div className={`${styles.section}`}>
                  <div className="">
                    {" "}
                    {allEvents &&
                      allEvents.map((allEvents, index) => (
                        <EventCard key={index} data={allEvents} />
                      ))}
                  </div>
                </div>
              </div> */}
              <div className={`${styles.section} my-8`}>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-4 xl:gap-[30px] mb-12">
                  {allEvents.map((allEvents, index) => (
                    // <EventCard key={index} data={allEvents} />
                    <EventCard key={index} data={allEvents} />
                  ))}{" "}
                </div>
              </div>
            </>
          )}
          <h4>{allEvents?.length === 0 && null}</h4>
        </>
      )}
    </div>
  );
};

export default Events;
