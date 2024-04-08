const SelectedCategory = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <select value={selectedCategory} onChange={(e) => onSelectCategory(e.target.value)}>
      <option value="all">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default SelectedCategory;
