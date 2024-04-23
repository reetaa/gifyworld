import type { Metadata } from "next"
import GifyHero from "./components/Gify/GifyHero"

export const metadata: Metadata = {
  title: "Trending GIFs",
  description: "Current trending GIFs",
}


export default function Home() {
  return (
    <main>
      <GifyHero />
    </main>
  )
}
