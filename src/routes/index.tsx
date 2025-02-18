import { createFileRoute, useRouter } from '@tanstack/react-router'
import { Button } from '../components/ui/button'
import ViewTeam from '../components/ViewTeams'
import { gql, useMutation } from "@apollo/client";
import { Team } from '../types/Team';



const BLANK_TEAM = gql`
  mutation BlankTeam($userId: String!) {
    blankTeam(userId: $userId) {
      _id
      name
      pokemon {
        _id
        nickname
      }
    }
  }
`;


interface BlankTeam {
  blankTeam: Team;
}


export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {


  


  const [blankTeam, { data, loading, error }] = useMutation<BlankTeam>(BLANK_TEAM);

  const router = useRouter()

  const goToTeambuilder = async()=> {
    try {
    
    const response = await blankTeam({
      variables: { userId: "67abe4c8201f9cd643c552bf" },
    });

    if(!response || !response.data) {
      return
    }

    const team:Team = response.data.blankTeam

    console.log(response)


  
    router.navigate({href:`/team/${team._id}`})
  }
  catch(e) {
    console.log("errir")
  }
  }

  return(
    <div>
    <div className='flex justify-center mb-4 gap-4 p-4'>
       <h1 className="font-bold text-center text-xl">Your Teams</h1>
    <Button onClick={goToTeambuilder}>
      New Team
    </Button>
    </div>
    <ViewTeam></ViewTeam>
    </div>
  )
}
