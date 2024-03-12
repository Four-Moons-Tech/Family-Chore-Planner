

const ChoreList = function (chores) {
    if (!chores.length) {
        return <h3>No chores yet</h3>;
    }
    return (
        <div>
        
            <div className="flex-row justify-space-between my-4">
                {chores &&
                    chores.map((chore) => (
                        <div key={chore._id} className="col-12 col-xl-6">
                            <div className="card mb-3">
                                <h4 className="card-header bg-dark text-light p-2 m-0">
                                    {chore.description}  complete: {chore.complete}<br />
           
                                </h4>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}



export default ChoreList