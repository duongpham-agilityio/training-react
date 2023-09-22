import { useState } from "react";
import Users from "./Users";

const StaleTime = () => {
  const [{ first, last }, setState] = useState({
    first: false,
    last: false,
  });

  return (
    <section
      style={{
        border: "1px solid",
        padding: "20px",
      }}
    >
      <p>Example for TypeScript</p>
      <h2>Users</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            flex: 1,
          }}
        >
          <button
            onClick={() =>
              setState((prev) => ({ ...prev, first: !prev.first }))
            }
          >
            Click
          </button>
          {first && <Users />}
        </div>
        <div
          style={{
            flex: 1,
          }}
        >
          <button
            onClick={() => setState((prev) => ({ ...prev, last: !prev.last }))}
          >
            Click
          </button>
          {last && <Users />}
        </div>
      </div>
    </section>
  );
};

export default StaleTime;
