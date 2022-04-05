import PaginationItem from "./item";

const Dots = () => (
  <div style={{ fontSize: "40px", color: "#7e7e7e" }}>...</div>
);

const Pagination = (props) => {
  const {
    onPrevClick,
    pageNumbers = [],
    onNextClick,
    offset,
    onChange,
  } = props;

  if (pageNumbers.length === 0) return null;

  return (
    <ul>
      {offset >= 4 ? (
        <li className="previous" onClick={onPrevClick}>
          {"<"}
        </li>
      ) : null}
      <PaginationItem number={1} offset={offset} onChange={onChange} />
      {offset >= 4 ? <Dots /> : null}
      {offset < 4 ? (
        <>
          <PaginationItem number={2} offset={offset} onChange={onChange} />
          <PaginationItem number={3} offset={offset} onChange={onChange} />
          <PaginationItem number={4} offset={offset} onChange={onChange} />
          <PaginationItem number={5} offset={offset} onChange={onChange} />
        </>
      ) : null}
      {offset >= 4 && offset < pageNumbers[pageNumbers.length - 4] ? (
        <>
          <PaginationItem number={offset} offset={offset} onChange={onChange} />
          <PaginationItem
            offset={offset}
            number={offset + 1}
            onChange={onChange}
          />
          {pageNumbers[offset + 2] ? (
            <PaginationItem
              offset={offset}
              number={offset + 2}
              onChange={onChange}
            />
          ) : null}
        </>
      ) : null}
      {offset >= pageNumbers[pageNumbers.length - 4] ? (
        <>
          <PaginationItem
            number={pageNumbers[pageNumbers.length - 4]}
            offset={offset}
            onChange={onChange}
          />
          <PaginationItem
            number={pageNumbers[pageNumbers.length - 3]}
            offset={offset}
            onChange={onChange}
          />
          <PaginationItem
            number={pageNumbers[pageNumbers.length - 2]}
            offset={offset}
            onChange={onChange}
          />
          <PaginationItem
            number={pageNumbers[pageNumbers.length - 1]}
            offset={offset}
            onChange={onChange}
          />
        </>
      ) : null}
      {offset < pageNumbers[pageNumbers.length - 4] ? <Dots /> : null}
      {offset < pageNumbers[pageNumbers.length - 4] ? (
        <PaginationItem
          offset={offset}
          onChange={onChange}
          number={pageNumbers[pageNumbers.length - 1]}
        />
      ) : null}
      {offset <= pageNumbers[pageNumbers.length - 4] ? (
        <li className="next" onClick={onNextClick}>
          {">"}
        </li>
      ) : null}
    </ul>
  );
};

export default Pagination;
