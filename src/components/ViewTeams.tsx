import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { Team } from '../types/Team';
import TeamList from './TeamList';


const GET_TEAMS = gql`
  query GetAllUserTeams($userId: String!) {
  getAllUserTeams(userId: $userId) {
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


interface GetAllUserTeamsData {
  getAllUserTeams: Team[];
}

export default function ViewTeams() {

const { data, loading, error } = useQuery<GetAllUserTeamsData>(GET_TEAMS, {
        variables: { userId: "67abe4c8201f9cd643c552bf" }
      });
  console.log(data)

 if(loading) {
    return (
        <div>Loading</div>
    )
 }
  return (
    <>
    <h1 className='font-bold text-center text-xl'>Your Teams</h1>
    <TeamList teams={data?.getAllUserTeams ? data?.getAllUserTeams : [] }></TeamList>
    </>
  )
}
