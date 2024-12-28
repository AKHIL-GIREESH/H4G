import { useQuery } from "@tanstack/react-query"
import { getAllGroups } from "../api/getAllGroups"

const Sidebar = () => {

    const {isError,isFetching,data} = useQuery({
        queryKey:['getOneMovie','Movies'],
        queryFn: async () => {
                return await getAllGroups()
      }
    })

    if(isFetching){
        return <>Loading...</>
    }

    if(isError){
        return <>Something went wrong, refresh</>
    }

    if(data){
        return(
            <div>
                Hi
            </div>
        )
    }
    
}

export default Sidebar