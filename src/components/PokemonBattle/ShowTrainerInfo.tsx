import React from "react";

interface ShowTrainerInfoProps {
  trainerName: string;
  trainerTeamImageLink: string[];
  trainerImageLink: string;
}

export default function ShowTrainerInfo({
  trainerName,
  trainerImageLink,
  trainerTeamImageLink,
}: ShowTrainerInfoProps) {
  return (
    <div className="flex flex-col gap-2 text-black">
      <h1 className="font-bold ">{trainerName}</h1>
      <div >
        <img src={trainerImageLink}></img>
      </div>
      <div>
        {trainerTeamImageLink.map((imageLink) => {
          return <img key={imageLink} src={imageLink}></img>
        })}
      </div>
    </div>
  );
}
