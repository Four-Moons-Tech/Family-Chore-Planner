import { useQuery } from '@apollo/client'
import { QUERY_USER } from '../../utils/queries'
import Auth from '../../utils/auth'


const Greeting = function(){
    const user = Auth.getProfile()?.data
    const { data, loading, error } = useQuery(QUERY_USER, {
        variables: {
          username: user?.username
        }
      })


    return (

        <h1>Welcome, {data?.user?.username}! You belong the {data?.user?.lastName} family!</h1>



export default Greeting