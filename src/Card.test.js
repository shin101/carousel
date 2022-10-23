import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";


// smoke testing to check if things render without crashing

test('it renders without crashing', () => {
  render(<Card />)
})

// snapshot test 
it("matches snapshot", function(){
  const {asFragment} = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
})