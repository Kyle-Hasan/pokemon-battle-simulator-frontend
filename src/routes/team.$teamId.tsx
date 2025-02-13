import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/team/$teamId')({
  component: TeamComponent,
})

function TeamComponent() {
  const {teamId} = Route.useParams()
  return <div>Hello "/teambuilder"! {teamId}</div>
}
