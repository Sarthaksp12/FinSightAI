import { useEffect, useState } from "react";
import api from "./Api/api";

export default function ConnectionTest() {
  const [message, setMessage] = useState("Checking connection...");

  useEffect(() => {
    api.get("/")
      .then((response) => {
        setMessage("Backend connected successfully!");
        console.log(response.data);
      })
      .catch((error) => {
        setMessage("Backend connection failed. Check FastAPI.");
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>FinSight AI Backend Test</h2>
      <p>{message}</p>
    </div>
  );
}