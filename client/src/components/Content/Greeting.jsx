import Auth from '../../utils/auth'
<utils></utils>;


const Greeting = function(props){
    // const user = Auth.getProfile()?.data
    // console.log(data)
    const {
        _id,
        lastName,
        username,
        
    } = props


    return (
        // <h1>Welcome,___ { username}! You belong to___ {lastName} family!</h1>
        <h1>Welcome!</h1>
    )
}


export default Greeting