const Total = (props) => {
  return (
    <>
      <p>
        <b>
          {" "}
          Number of exercises{" "}
          {props.course.parts.reduce(
            (total, currentItem) => total + currentItem.exercises,
            0
          )}
        </b>
      </p>
    </>
  );
};

export default Total;
