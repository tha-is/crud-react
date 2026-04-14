import { useState } from "react";

const Greeter = ({ setUser }) => {

  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get("name");

    setUser(name);

    const hour = new Date().getHours();
    let greeting;

    if (hour < 12) {
      greeting = "Good morning";
    } else if (hour < 18) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }

    setMessage(`${greeting}, ${name}`);
  }

  return (
    <>
      <div className="p-2">
        <form
          onSubmit={handleSubmit}
          className="p-6"
        >

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            className="p-2 border border-secondary"
          />

          <button
            type="submit"
            className="p-2 border border-secondary ms-1"
          >
            Greet
          </button>

        </form>
      </div>

      {message && (
        <div className="p-2 text-center align-content-center">
          {message}
        </div>
      )}
    </>
  );
};

export default Greeter;