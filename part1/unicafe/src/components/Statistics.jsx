import StatisticsLine from "./StatisticsLine";

const Statistics = ({ good, neutral, bad }) => (
  <>
    <h1>Statistics</h1>
    {good + neutral + bad === 0 ? (
      <p>No feedback given yet</p>
    ) : (
      <div>
        <table border="0">
          <StatisticsLine name="good" value={good} />
          <StatisticsLine name="neutral" value={neutral} />
          <StatisticsLine name="bad" value={bad} />
          <StatisticsLine name="all" value={good + bad + neutral} />
          <StatisticsLine
            name="average"
            value={
              Math.floor(((good - bad) / (good + neutral + bad)) * 100) / 100
            }
          />
          <StatisticsLine
            name="positive"
            value={Math.floor((good / (good + neutral + bad)) * 100) / 100}
          />
        </table>
      </div>
    )}
  </>
);

export default Statistics;
