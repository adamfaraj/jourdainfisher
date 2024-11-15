import React from "react";
import { Button, Link } from "@mui/material";

import "./EmailListButton.css";

export default function EmailListButton({ variant, invert=false}) {
  return (
    <div className="email-list-container text-center text-uppercase">
      {/* <Button className="p-3"> */}
        <Link
          className={`p-3 ${invert ? 'invertColors' : ''}`}
          underline="none"
          href="https://docs.google.com/forms/d/e/1FAIpQLScUZ8wyzO7khixYcMd2KKmcKHjY5ChwO_k8tqanrUahe1JgRg/viewform?pli=1"
          target="_blank"
          rel="noopener"
          variant={variant}
        >
          Join My Email List
        </Link>
      {/* </Button> */}
    </div>
  );
};
