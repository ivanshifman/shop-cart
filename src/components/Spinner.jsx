import "./spinner.css";
import { ClockLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "auto",
  borderColor: "rgb(232, 186, 14)",
};

export const Spinner = ({ loading }) => {
  return (
    <div className="spinner-container">
      <ClockLoader
        color="rgb(227, 217, 4)"
        cssOverride={override}
        loading={loading}
        margin={2}
        size={100}
      />
    </div>
  );
};
