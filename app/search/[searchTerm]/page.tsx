import GifyHero from '@/app/components/Gify/GifyHero'
import type { Metadata } from 'next'

type Props = {
    params: { searchTerm: string }
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    // Read route params
    const searchTerm = params.searchTerm
    return {
        title: searchTerm ? `${searchTerm} GIFs` : "GIF results",
        description: "Search results for " + searchTerm,
    }
}

export default function Page({ params }: Props) {
    return (
        <main>
            <GifyHero />
        </main>
    )
}

