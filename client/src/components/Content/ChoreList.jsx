
import { CheckCircleIcon, CloseIcon,  } from '@chakra-ui/icons'
import { 
    Button ,
    useDisclosure
} from '@chakra-ui/react'
import AddChoreModal from './AddChoreModal'

import Auth from '../../utils/auth'
import { useMutation, useQuery } from '@apollo/client'
import { DELETE_CHORE, UPDATE_CHORE } from '../../utils/mutations'
import { QUERY_USER } from '../../utils/queries'

const ChoreList = function ({chores = []}) {
 
    const { data: userData } = useQuery(QUERY_USER, {variables: {username: Auth.getProfile()?.data?.username}})
    // console.log(userData)

    // console.log("ChoreList chores: ", chores)
    if (chores.length === 0) {
        return <h3>No chores yet</h3>;
    }
     
    const [ deleteChoreMutation, { error, data } ] = useMutation(DELETE_CHORE)
    
    const deleteChore = async (chore) => {
        console.log(chore)
        await deleteChoreMutation({
            variables: {
                choreId: chore.choreId,
                userId: chore.userId
            }
        })
        if (!error) {
            location.reload()
        } else {
            console.log("error deleting chore")
            console.log(error)
        }
    }

    return (
        <div>
        
            <div>
                {chores &&
                    chores.map((chore) => {
                        const { isOpen, onOpen, onClose } = useDisclosure()
                        return (
                            <div key={chore.choreId} className='chore-card'>
                                <div>
                                    <h4>
                                        {chore.description}<br />
                                    </h4>
                                    <div className="chore-card-field">
                                        Complete: &nbsp;
                                        {chore.complete ? (
                                            <CheckCircleIcon
                                                color="green"
                                            />
                                        ):(
                                            <CloseIcon
                                                color="maroon"
                                            />
                                        )}
                                    </div>
                                    <div className="chore-card-field">
                                        Pay rate: ${chore.payRate}
                                    </div>
                                    <div className="chore-card-field">
                                        Due: {chore.dueDate}
                                    </div>
                                    <Button
                                        onClick={()=>{deleteChore(chore)}}
                                    >
                                        Remove chore
                                    </Button>
                                    {/* &nbsp; is an HTML entity representing a space */}
                                    &nbsp;
                                    <Button
                                        onClick={onOpen}
                                    >
                                        Edit chore
                                    </Button>
                                    <AddChoreModal
                                        isOpen={isOpen}
                                        onClose={onClose}
                                        childId={userData?._id}
                                        choreToUpdate={chore}
                                    />
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}



export default ChoreList