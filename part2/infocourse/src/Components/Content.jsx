import Part from "./Part";

const Content = (props) => {
  return (
    <>
      {props.course.parts.map((p) => (
        <Part key={p.name} part={p} />
      ))}
    </>
  );
};

export default Content;
