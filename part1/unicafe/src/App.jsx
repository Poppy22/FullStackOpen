import React, { useState } from "react";
import Statistics from "./components/Statistics";
import Button from "./components/Button";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button func={() => setGood(good + 1)} title="good" />
        <Button func={() => setNeutral(neutral + 1)} title="neutral" />
        <Button func={() => setBad(bad + 1)} title="bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
