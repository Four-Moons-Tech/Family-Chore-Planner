import { Link } from 'react-router-dom';

const ChildList = ({
  child,
  name,
//   reference choreList component
  chore,
  showName = true,
  showChore = true,
  showUsername = true,
}) => {
  if (!child.length) {
    return <h3>No Child Added Yet</h3>;
  }

  return (
    <div>
      {showName && <h3>{name}</h3>}
      {child &&
        child.map((child) => (
          <div key={child._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${child.childAuthor}`}
                >
                  {child.childAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this child on {child.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this child on {child.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{child.childText}</p>
            </div>
            {/* <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/child/${child._id}`}
            >
              Join the discussion on this thought.
            </Link> */}
          </div>
        ))}
    </div>
  );
};

export default ChildList;
