import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}

        <Link to="/pokemonBattle/$battleId" params={{ battleId: '1' }} className="[&.active]:font-bold">
          Battle
        </Link>{' '}
        
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})