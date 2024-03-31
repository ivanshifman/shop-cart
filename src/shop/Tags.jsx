const title = "Most popular tags";

const tagsList = [
  { text: "envato" },
  { text: "themeforest" },
  { text: "codecanyon" },
  { text: "videohive" },
  { text: "audiojungle" },
  { text: "3docean" },
  { text: "envato" },
  { text: "themeforest" },
  { text: "codecanyon" },
];

const Tags = () => {
  return (
    <div className="widget widget-tags">
      <div className="widget-header">
        <h5 className="title">{title}</h5>
      </div>
      <ul className="widget-wrapper">
        {tagsList.map((val, i) => (
          <li key={i}>
            <a href="#">{val.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;
