import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Team } from "../types/Team";
import TeamList from "./TeamList";

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

const DELETE_TEAM = gql`
  mutation DeleteTeam($teamId: String!) {
    deleteTeam(teamId: $teamId)
  }
`;

interface GetAllUserTeamsData {
  getAllUserTeams: Team[];
}

export default function ViewTeams() {
  const { data, loading } = useQuery<GetAllUserTeamsData>(GET_TEAMS, {
    variables: { userId: "67abe4c8201f9cd643c552bf" },
  });

  const [deleteTeam] = useMutation(DELETE_TEAM, {
    update(cache, { data: { deleteTeam } }) {
      cache.modify({
        fields: {
          getAllUserTeams(existingTeams = [], { readField }) {
            return existingTeams.filter(
              (team) => readField("_id", team) !== deleteTeam
            );
          },
        },
      });
    },
  });

  const deleteTeamRequest = async (teamId: string) => {
    await deleteTeam({
      variables: {
        teamId: teamId,
      },
    });
  };

  console.log(data);

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <>
     
      <TeamList
        deleteTeamRequest={deleteTeamRequest}
        teams={data?.getAllUserTeams ? data?.getAllUserTeams : []}
      ></TeamList>
    </>
  );
}
