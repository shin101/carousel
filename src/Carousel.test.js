import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
// import { it } from "node:test";

// smoke testing to check if things render without crashing

test('it renders without crashing', () => {
  render(<Carousel />)
})

// snapshot test 
it("matches snapshot", function(){
  const {asFragment} = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
})


it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});


// part 3 Bug - Left arrow


it("works when you click on the left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // first move to the second page. then, click on left arrow to go back to first
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show
  expect(queryByAltText("Photo by Josh Post on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
});

// part 4 Bug - Exhausting the image array

it("hides left arrow when you're on first or last page", function() {
  const { queryByTestId } = render(<Carousel />);
  const rightArrow = queryByTestId('right-arrow');

  expect(queryByTestId("left-arrow")).toHaveClass("hidden");
  expect(queryByTestId("right-arrow")).not.toHaveClass("hidden");

  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  expect(queryByTestId("right-arrow")).toHaveClass("hidden");
  expect(queryByTestId("left-arrow")).not.toHaveClass("hidden");


})