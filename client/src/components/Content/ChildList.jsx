import ChildCard from './ChildCard.jsx'
import { Link } from "react-router-dom";
import { 
    Flex
} from '@chakra-ui/react'



const ChildList = ({
    children = [ ],


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
                            <ChildCard child={child} key={child._id}/>
                        ))}


                </div>
            </section>
        </Flex >

        </>
    )
}

export default ChildList