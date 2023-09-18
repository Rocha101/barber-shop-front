"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AiOutlineReload } from "react-icons/ai";

const ConnectionTester = () => {
  const [systemUp, systemSetUp] = useState(false);
  const [reloadClicked, setReloadClicked] = useState(false);

  const reload = () => {
    setReloadClicked(true);
    axios
      .get("http://localhost:8080/api/health")
      .then((res) => {
        console.log(res);
        if (res.data === true) return systemSetUp(true);
        return systemSetUp(false);
      })
      .catch((err) => {
        console.error(err);
        systemSetUp(false);
      });
    setTimeout(() => {
      setReloadClicked(false);
    }, 1000);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/health")
      .then((res) => {
        console.log(res);
        if (res.data === true) return systemSetUp(true);
        return systemSetUp(false);
      })
      .catch((err) => {
        console.error(err);
        systemSetUp(false);
      });
  }, []);

  return (
    <div className="border rounded-md p-4 fixed left-4 bottom-4 flex items-center justify-between gap-3 bg-background z-50 select-none">
      <div
        className={`
            w-3 h-3 rounded-full ${systemUp ? "bg-green-500" : "bg-red-500"}
        `}
      />
      {systemUp ? <p>Online</p> : <p>Offline</p>}
      <Button size="icon" variant="outline" onClick={reload}>
        <AiOutlineReload
          className={`w-5 h-5 ${
            reloadClicked && "animate-spin"
          } transition-all ease-in-out duration-500`}
        />
      </Button>
    </div>
  );
};

export default ConnectionTester;
