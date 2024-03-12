import { Link } from "react-router-dom";


const ChildList = ({
    children = ['Daniel'  ],
    email,
    chores,
    goal,
    username,
    showUsername = true,

}) => {
    
    if (!children.length) {
        return <h3>No Children Yet</h3>;
    }

    return (
        <>

            <Flex justifyContent="center">
                <section className="portfolio container-fluid text-center pb-5">
                    <div className="row gy-4">
                        {children.map((child) => (
                            <div key={child._id} className="col-12 col-md-6 col-lg-4" >
                                <h4 className="card-header bg-primary text-light p-2 m-0">
                                    {showUsername ? (
                                        <Link
                                            className="text-light"
                                            to={`/child-profile/${child.username}`}
                                        >
                                            {child.email} <br />
                                            
                                        </Link>
                                    ) : (
                                        <>
                                            <span style={{ fontSize: '1rem' }}>
                                                You had this thought on 
                                            </span>
                                        </>
                                    )}
                                </h4>
                                <div className="card-body bg-light p-2">
                                    <p>test</p>
                                </div>
                                <Link
                                    className="btn btn-primary btn-block btn-squared"
                                    to={`/thoughts/${thought._id}`}
                                >
                                    Join the discussion on this thought.
                                </Link>
                            

                            </div>
                        ))}


                </div>
            </section>
        </Flex >

        </>
    )
}

export default ChildList