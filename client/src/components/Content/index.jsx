const ChoreList = ({ chores = [] }) => {
    if (!chores.length) {
      return <h3>No Chores Yet</h3>;
    }
  
    return (
      <>
        <h3
          className="p-5 display-inline-block"
          style={{ borderBottom: '1px dotted #1a1a1a' }}
        >
          Comments
        </h3>
        <div className="flex-row my-4">
          {chores &&
            chores.map((chore) => (
              <div key={chore._id} className="col-12 mb-3 pb-3">
                <div className="p-3 bg-dark text-light">
                  <h5 className="card-header">
                    {chore.choreAuthor} chores created{' '}
                    <span style={{ fontSize: '0.825rem' }}>
                      on {chore.createdAt}
                    </span>
                  </h5>
                  <p className="card-body">{chore.choreText}</p>
                </div>
              </div>
            ))}
        </div>
      </>
    );
  };
  
  export default ChoreList;