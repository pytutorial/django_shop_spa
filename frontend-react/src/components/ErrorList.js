import React from "react";

export default function ErrorList({errors}) {
  return (
    <ul style={{ color: "red" }}>
      {errors && errors.map(e => <li>{e}</li>)}
    </ul>
  )
}