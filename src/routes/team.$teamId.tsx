import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Team } from '../types/Team'
import { gql, useQuery } from '@apollo/client';
import ViewTeam from '../components/ViewTeam';


const GET_TEAM = gql`
  query GetTeam($teamId: String!) {
  getTeam(teamId: $teamId) {
    _id
    name
    pokemon {
      _id
      nickname
      pokemonSpecies {
        name
        teamBuilderSprite
      }
    }
  }
}
`;

export const Route = createFileRoute('/team/$teamId')({
  component: TeamComponent,
})

interface GetTeam {
  getTeam: Team;
}

function TeamComponent() {
  const {teamId} = Route.useParams()
  const {data,loading,error} = useQuery<GetTeam>(GET_TEAM, {variables:{teamId}})

  if(loading) {
    return <div>loading</div>
  }

  return (
    <>
    
    {data && <ViewTeam team={data.getTeam}></ViewTeam>}
    </>
  )
}
