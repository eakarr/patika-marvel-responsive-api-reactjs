const PaginationItem = (props) => {
  const { number, offset, onChange } = props;

  return (
    <li
      className={number - 1 === offset ? "current-page" : undefined}
      onClick={() => onChange(number - 1)}
    >
      {number}
    </li>
  );
};

export default PaginationItem;
