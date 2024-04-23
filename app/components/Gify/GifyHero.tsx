import SearchBar from "../Search/SearchBar";
import GifyGrid from "./GifyGrid";

export default function GifyHero() {
    return (
        <div className="flex flex-col justify-center items-center">
            <SearchBar />
            <GifyGrid />
        </div>
    );
}
